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
  const shouldPlay = useRef(false);
  const playPending = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [blocked, setBlocked] = useState(false);

  const play = useCallback(async () => {
    const element = video.current;
    if (!element || !shouldPlay.current || playPending.current || (!element.paused && !element.ended)) return;
    element.muted = true;
    element.defaultMuted = true;
    element.volume = 0;
    element.playsInline = true;
    if (!element.getAttribute('src')) element.src = source;
    else if (element.error) element.load();
    playPending.current = true;
    try {
      await element.play();
      if (!shouldPlay.current || video.current !== element) {
        element.pause();
        return;
      }
      setBlocked(false);
      setFailed(false);
    } catch (error: unknown) {
      if (!shouldPlay.current || video.current !== element) return;
      if (error instanceof DOMException && error.name === 'NotAllowedError') setBlocked(true);
      // Pausing while play() is pending is an expected cancellation.
      else if (error instanceof DOMException && error.name === 'AbortError') return;
      else {
        console.error(`Walter ${variant} video playback failed.`, error);
        setFailed(true);
      }
    } finally {
      playPending.current = false;
    }
  }, [source, variant]);

  useEffect(() => {
    let visible = false;
    const sync = () => {
      shouldPlay.current = visible && document.visibilityState === 'visible';
      if (shouldPlay.current) void play();
      else video.current?.pause();
    };
    const element = video.current;
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
      sync();
    }, {threshold: 0.05});
    if (element) intersection.observe(element);
    document.addEventListener('visibilitychange', sync);
    document.addEventListener('touchend', sync, {passive: true});
    document.addEventListener('pointerdown', sync, {passive: true});
    document.addEventListener('keydown', sync);
    window.addEventListener('pageshow', sync);
    window.addEventListener('online', sync);
    return () => {
      shouldPlay.current = false;
      document.removeEventListener('visibilitychange', sync);
      document.removeEventListener('touchend', sync);
      document.removeEventListener('pointerdown', sync);
      document.removeEventListener('keydown', sync);
      window.removeEventListener('pageshow', sync);
      window.removeEventListener('online', sync);
      intersection.disconnect();
      element?.pause();
    };
  }, [play]);

  return <>
    <div className={variant === 'hero' ? 'hero-background' : 'story-film-background'}>
      <Image src={poster} alt="" fill sizes={sizes ?? (variant === 'hero' ? '100vw' : '(max-width: 760px) 82vw, 60vw')} preload={variant === 'hero'} fetchPriority={variant === 'hero' ? 'high' : undefined} className="hero-poster" />
      <video ref={video} className={ready && !failed ? 'hero-video is-ready' : 'hero-video'} autoPlay muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1} onPlaying={() => {
        if (!shouldPlay.current) {
          video.current?.pause();
          return;
        }
        setPlaying(true);
        setReady(true);
        setBlocked(false);
        setFailed(false);
      }} onPause={() => setPlaying(false)} onError={() => {
        console.error(`Walter ${variant} video could not be loaded.`, video.current?.error);
        setFailed(true);
        setPlaying(false);
      }} />
    </div>
    <div className={`hero-playback${variant === 'story' ? ' story-playback' : ''}`} data-playing={playing} data-ready={ready}>
      <p className="sr-only" role="status">{failed || blocked ? t('videoUnavailable') : ''}</p>
      {(failed || blocked) && <p className="video-error">{t('videoUnavailable')}</p>}
    </div>
  </>;
}
