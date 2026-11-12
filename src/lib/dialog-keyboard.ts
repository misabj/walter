import type {KeyboardEvent} from 'react';

export function handleDialogKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
  const dialog = event.currentTarget;
  if (event.key === 'Escape') {
    event.preventDefault();
    dialog.close();
    return;
  }
  if (event.key !== 'Tab') return;
  const controls = Array.from(dialog.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )).filter((control) => control.getClientRects().length > 0 && control.tabIndex >= 0);
  const first = controls[0];
  const last = controls[controls.length - 1];
  if (event.shiftKey && document.activeElement === first && last) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last && first) {
    event.preventDefault();
    first.focus();
  }
}
