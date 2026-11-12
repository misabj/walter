'use client';

import {useCallback, useEffect, useRef, useState} from 'react';
import {Check, ChevronDown, Globe2, MapPin} from 'lucide-react';

type Option = {value: string; label: string};

export function LocationFilter({id, label, value, options, kind, onChange}: {
  id: string;
  label: string;
  value: string;
  options: Option[];
  kind: 'country' | 'city';
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [popup, setPopup] = useState({placement: 'bottom', maxHeight: 320});
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const search = useRef({text: '', time: 0});
  const selected = options.findIndex((option) => option.value === value);
  const selectedOption = options[selected];
  if (!selectedOption) throw new Error(`Unknown selection in location filter "${id}".`);
  const Icon = kind === 'country' ? Globe2 : MapPin;

  const positionPopup = useCallback(() => {
    if (!root.current) return;
    const rect = root.current.getBoundingClientRect();
    const header = Math.max(0, document.querySelector('.site-header')?.getBoundingClientRect().bottom ?? 0);
    const below = window.innerHeight - rect.bottom - 12;
    const above = rect.top - header - 12;
    const placement = below < 240 && above > below ? 'top' : 'bottom';
    const maxHeight = Math.max(88, Math.min(320, Math.floor(placement === 'top' ? above : below)));
    setPopup((current) => current.placement === placement && current.maxHeight === maxHeight ? current : {placement, maxHeight});
  }, []);

  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Node && !root.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', dismiss);
    window.addEventListener('resize', positionPopup);
    window.addEventListener('scroll', positionPopup, true);
    return () => {
      document.removeEventListener('pointerdown', dismiss);
      window.removeEventListener('resize', positionPopup);
      window.removeEventListener('scroll', positionPopup, true);
    };
  }, [open, positionPopup]);

  useEffect(() => {
    if (open) document.getElementById(`${id}-option-${active}`)?.scrollIntoView({block: 'nearest'});
  }, [open, active, id]);

  function show(index = selected) {
    positionPopup();
    setActive(index);
    search.current = {text: '', time: 0};
    setOpen(true);
  }

  function choose(index: number) {
    const option = options[index];
    if (!option) throw new Error(`Unknown option in location filter "${id}".`);
    onChange(option.value);
    setOpen(false);
    trigger.current?.focus({preventScroll: true});
  }

  return <div className="select-field" ref={root} onBlur={(event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
  }}>
    <button id={id} ref={trigger} type="button" className="location-filter-trigger" role="combobox"
      aria-expanded={open} aria-haspopup="listbox" aria-controls={`${id}-list`}
      aria-labelledby={`${id}-label ${id}-value`} aria-activedescendant={open ? `${id}-option-${active}` : undefined}
      onClick={() => open ? setOpen(false) : show()} onKeyDown={(event) => {
        if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
          event.preventDefault();
          const next = event.key === 'Home' ? 0 : event.key === 'End' ? options.length - 1
            : Math.max(0, Math.min(options.length - 1, active + (event.key === 'ArrowDown' ? 1 : -1)));
          if (open) setActive(next);
          else show(event.key === 'Home' ? 0 : event.key === 'End' ? options.length - 1 : selected);
        } else if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          if (open) choose(active);
          else show();
        } else if (event.key === 'Escape' && open) {
          event.preventDefault();
          event.stopPropagation();
          setOpen(false);
        } else if (event.key === 'Tab') {
          setOpen(false);
        } else if (event.key.length === 1 && !event.ctrlKey && !event.altKey && !event.metaKey) {
          event.preventDefault();
          const key = event.key.toLocaleLowerCase();
          const time = performance.now();
          const previous = search.current;
          const text = time - previous.time > 700 || previous.text === key ? key : previous.text + key;
          const collator = new Intl.Collator(undefined, {usage: 'search', sensitivity: 'base'});
          const start = open ? active : selected;
          const matches = (option: Option) => collator.compare(option.label.slice(0, text.length), text) === 0;
          const after = options.findIndex((option, index) => index > start && matches(option));
          const index = after === -1 ? options.findIndex(matches) : after;
          if (!open) show(index === -1 ? selected : index);
          else if (index !== -1) setActive(index);
          search.current = {text, time};
        }
      }}>
      <span className="location-filter-text"><span id={`${id}-label`} className="location-filter-label">{label}</span>
        <span className="location-filter-value"><Icon size={16} aria-hidden="true" /><span id={`${id}-value`}>{selectedOption.label}</span></span>
      </span>
      <ChevronDown size={17} aria-hidden="true" />
    </button>
    {open && <div id={`${id}-list`} className="location-filter-list" role="listbox" aria-labelledby={`${id}-label`}
      data-placement={popup.placement} style={{maxHeight: popup.maxHeight}}>
      {options.map((option, index) => <button key={option.value} id={`${id}-option-${index}`} type="button"
        className="location-filter-option" role="option" aria-selected={value === option.value}
        data-active={index === active} tabIndex={-1}
        onMouseDown={(event) => event.preventDefault()} onClick={() => choose(index)}>
        <span>{option.label}</span>{value === option.value && <Check size={17} aria-hidden="true" />}
      </button>)}
    </div>}
  </div>;
}
