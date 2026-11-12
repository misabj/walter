'use client';

import {ArrowUpRight} from 'lucide-react';
import {Link} from '@/i18n/navigation';

export function MagneticButton({href, children}: {href: string; children: React.ReactNode}) {
  return <Link href={href} className="button button-green magnetic-button" onPointerMove={(event) => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--magnetic-x', `${(event.clientX - bounds.left - bounds.width / 2) * 0.06}px`);
    event.currentTarget.style.setProperty('--magnetic-y', `${(event.clientY - bounds.top - bounds.height / 2) * 0.1}px`);
  }} onPointerLeave={(event) => {
    event.currentTarget.style.setProperty('--magnetic-x', '0px');
    event.currentTarget.style.setProperty('--magnetic-y', '0px');
  }}>{children}<ArrowUpRight size={19} aria-hidden="true" /></Link>;
}
