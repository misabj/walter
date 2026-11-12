'use client';

import {useEffect, useRef, useState} from 'react';
import {useTranslations} from 'next-intl';
import {ChevronLeft, ChevronRight, Maximize, Minus, Plus, RotateCw} from 'lucide-react';
import type {PDFDocumentLoadingTask, PDFDocumentProxy, RenderTask} from 'pdfjs-dist';

export default function PdfMenuViewer({file, name}: {file: string; name: string}) {
  const t = useTranslations('pdfMenus');
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [page, setPage] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [fit, setFit] = useState<'page' | 'width'>('page');
  const [size, setSize] = useState({width: 0, height: 0});
  const [loading, setLoading] = useState(true);
  const [rendering, setRendering] = useState(true);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [text, setText] = useState('');
  const scroll = useRef<HTMLDivElement>(null);
  const surface = useRef<HTMLDivElement>(null);
  const renderedPage = useRef(0);

  useEffect(() => {
    let disposed = false;
    let task: PDFDocumentLoadingTask | undefined;
    async function load() {
      try {
        const pdfjs = await import('pdfjs-dist');
        if (disposed) return;
        pdfjs.GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.min.mjs';
        task = pdfjs.getDocument({
          url: file,
          cMapUrl: '/pdfjs/cmaps/',
          cMapPacked: true,
          standardFontDataUrl: '/pdfjs/standard_fonts/',
          wasmUrl: '/pdfjs/wasm/',
          disableAutoFetch: true,
          disableStream: true
        });
        const document = await task.promise;
        if (disposed) return;
        setPdf(document);
        setLoading(false);
      } catch (error: unknown) {
        if (disposed) return;
        console.error('Walter PDF menu could not be loaded.', error);
        setFailed(true);
        setLoading(false);
        setRendering(false);
      }
    }
    void load();
    return () => {
      disposed = true;
      if (task) void task.destroy().catch((error: unknown) => console.error('Walter PDF cleanup failed.', error));
    };
  }, [file, attempt]);

  useEffect(() => {
    const element = scroll.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return;
      setSize({width: entry.contentRect.width, height: entry.contentRect.height});
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const loadedPdf = pdf;
    if (!loadedPdf || size.width <= 0 || size.height <= 0) return;
    let cancelled = false;
    let task: RenderTask | undefined;
    const render = async () => {
      try {
        const sheet = await loadedPdf.getPage(page);
        if (cancelled) return;
        const original = sheet.getViewport({scale: 1});
        const scale = fit === 'width' ? size.width / original.width : Math.min(size.width / original.width, size.height / original.height);
        const viewport = sheet.getViewport({scale: scale * zoom});
        const density = Math.min(window.devicePixelRatio || 1, 2, Math.sqrt(12000000 / (viewport.width * viewport.height)));
        const canvas = document.createElement('canvas');
        canvas.width = Math.ceil(viewport.width * density);
        canvas.height = Math.ceil(viewport.height * density);
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;
        task = sheet.render({canvas, viewport, transform: [density, 0, 0, density, 0, 0]});
        await task.promise;
        const content = await sheet.getTextContent();
        if (cancelled || !surface.current) return;
        surface.current.replaceChildren(canvas);
        if (renderedPage.current !== page) scroll.current?.scrollTo({top: 0, left: 0});
        renderedPage.current = page;
        setText(content.items.flatMap((item) => 'str' in item ? [item.str] : []).join(' '));
        setRendering(false);
      } catch (error: unknown) {
        if (cancelled) return;
        console.error('Walter PDF page could not be rendered.', error);
        scroll.current?.focus({preventScroll: true});
        setFailed(true);
        setRendering(false);
      }
    };
    void render();
    return () => {cancelled = true; task?.cancel();};
  }, [pdf, page, zoom, fit, size]);

  function changePage(next: number) {
    if (next === 1 || next === pdf?.numPages) scroll.current?.focus({preventScroll: true});
    setRendering(true);
    setPage(next);
  }

  function changeZoom(next: number) {
    if (next <= 0.75 || next >= 3) scroll.current?.focus({preventScroll: true});
    setRendering(true);
    setZoom(Math.round(next * 100) / 100);
  }

  return <>
    <div className="pdf-reader-scroll" ref={scroll} role="region" aria-label={t('document', {name})} aria-busy={loading || rendering} tabIndex={0}>
      {failed && <div className="pdf-reader-message" role="alert">
        <p>{t('error')}</p>
        <button type="button" className="button button-green" onClick={() => {scroll.current?.focus({preventScroll: true}); setFailed(false); setLoading(true); setRendering(true); setPdf(null); setAttempt((value) => value + 1);}}><RotateCw size={18} aria-hidden="true" />{t('retry')}</button>
        <a className="text-link" href={file} download>{t('download')}</a>
      </div>}
      {!failed && <div className="pdf-page-mount" ref={surface} role="img" aria-label={loading || rendering ? t('loading') : t('page', {current: page, total: pdf?.numPages ?? 0})} />}
      {!failed && (loading || rendering) && <p className="pdf-reader-loading" role="status">{t('loading')}</p>}
      {!loading && !rendering && !failed && <p className="sr-only">{text}</p>}
    </div>
    <div className="pdf-reader-toolbar">
      <div className="pdf-page-controls">
        <button type="button" className="icon-button" aria-label={t('previous')} disabled={!pdf || failed || page <= 1} onClick={() => changePage(page - 1)}><ChevronLeft size={22} aria-hidden="true" /></button>
        <label className="sr-only" htmlFor="pdf-page-select">{t('choosePage')}</label>
        <select id="pdf-page-select" value={page} disabled={!pdf || failed} onChange={(event) => changePage(Number(event.target.value))}>
          {Array.from({length: pdf?.numPages ?? 1}, (_, index) => <option key={index + 1} value={index + 1}>{index + 1}</option>)}
        </select>
        <span aria-hidden="true">/ {pdf?.numPages ?? '—'}</span>
        <button type="button" className="icon-button" aria-label={t('next')} disabled={!pdf || failed || page >= pdf.numPages} onClick={() => changePage(page + 1)}><ChevronRight size={22} aria-hidden="true" /></button>
      </div>
      <div className="pdf-zoom-controls">
        <button type="button" className="icon-button" aria-label={t('zoomOut')} disabled={!pdf || failed || zoom <= 0.75} onClick={() => changeZoom(zoom - 0.25)}><Minus size={19} aria-hidden="true" /></button>
        <output aria-label={t('zoom')}>{Math.round(zoom * 100)}%</output>
        <button type="button" className="icon-button" aria-label={t('zoomIn')} disabled={!pdf || failed || zoom >= 3} onClick={() => changeZoom(zoom + 0.25)}><Plus size={19} aria-hidden="true" /></button>
        <button type="button" className="pdf-fit-button" disabled={!pdf || failed} onClick={() => {setRendering(true); setZoom(1); setFit((value) => value === 'page' ? 'width' : 'page');}}><Maximize size={16} aria-hidden="true" />{fit === 'page' ? t('fitWidth') : t('fitPage')}</button>
      </div>
      <p className="sr-only" role="status">{!loading && !rendering && !failed && pdf ? t('page', {current: page, total: pdf.numPages}) : ''}</p>
    </div>
  </>;
}
