'use client';

import Image from 'next/image';
import {useCallback, useEffect, useRef, useState} from 'react';
import {useTranslations} from 'next-intl';

const media = {
  hero: {source: '/videos/walter-hero.mp4', poster: '/images/food/cevapi.webp'},
  story: {source: '/videos/walter-story.mp4', poster: '/images/walter-interior.webp'}
} as const;

export function AmbientVideo({variant, sizes}: {variant: keyof typeof media; sizes?: string}) {
  const t = useTranslations('experience');
  const {source, poster} = media[variant];
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [blocked, setBlocked] = useState(false);

  const play = useCallback(async () => {
    const element = video.current;
    if (!element) return;
    if (!element.getAttribute('src')) element.src = source;
    try {
      await element.play();
      setBlocked(false);
    } catch (error: unknown) {
      if (error instanceof DOMException && error.name === 'NotAllowedError') setBlocked(true);
      // Pausing while play() is pending is an expected cancellation.
      else if (error instanceof DOMException && error.name === 'AbortError') return;
      else {
        console.error(`Walter ${variant} video playback failed.`, error);
        setFailed(true);
      }
    }
  }, [source, variant]);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: no-preference)');
    const connection: unknown = Reflect.get(navigator, 'connection');
    const saveData = typeof connection === 'object' && connection !== null && Reflect.get(connection, 'saveData') === true;
    let visible = false;
    const sync = () => {
      if (visible && document.visibilityState === 'visible' && preference.matches && !saveData) void play();
      else video.current?.pause();
    };
    const element = video.current;
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
      sync();
    }, {threshold: 0.05});
    if (element) intersection.observe(element);
    preference.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    return () => {
      preference.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
      intersection.disconnect();
      element?.pause();
    };
  }, [play]);

  return <>
    <div className={variant === 'hero' ? 'hero-background' : 'story-film-background'}>
      <Image src={poster} alt="" fill sizes={sizes ?? (variant === 'hero' ? '100vw' : '(max-width: 760px) 82vw, 60vw')} preload={variant === 'hero'} fetchPriority={variant === 'hero' ? 'high' : undefined} className="hero-poster" />
      <video ref={video} className={ready && !failed ? 'hero-video is-ready' : 'hero-video'} muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1} onPlaying={() => {setPlaying(true); setReady(true);}} onPause={() => setPlaying(false)} onError={() => {
        console.error(`Walter ${variant} video could not be loaded.`, video.current?.error);
        setFailed(true);
        setPlaying(false);
      }} />
      <div className="hero-gradient" />
    </div>
    <div className={`hero-playback${variant === 'story' ? ' story-playback' : ''}`} data-playing={playing} data-ready={ready}>
      <p className="sr-only" role="status">{failed || blocked ? t('videoUnavailable') : ''}</p>
      {(failed || blocked) && <p className="video-error">{t('videoUnavailable')}</p>}
    </div>
  </>;
}
