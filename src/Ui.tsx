import React from 'react';
import {Pop} from './anim';
import {fontFamily, H, OUT, W} from './theme';
import {R} from './data';

export const Say: React.FC<{b: R; cx: number; by: number; tx: number; ty: number; w?: number; color?: string}> = ({b, cx, by, tx, ty, w = 560, color = '#fff'}) => {
  const tx0 = Math.max(cx - w / 2 + 50, Math.min(cx + w / 2 - 50, tx));
  return (
    <Pop from={b.f} to={b.t} ox={tx} oy={ty}>
      <div style={{position: 'absolute', left: cx - w / 2, bottom: H - by, width: w, boxSizing: 'border-box', padding: '18px 26px', background: color, border: `4px solid ${OUT}`, borderRadius: 34, fontFamily, fontWeight: 700, fontSize: 40, lineHeight: 1.35, textAlign: 'center', color: OUT}}>{b.txt}</div>
      <svg width={W} height={H} style={{position: 'absolute', left: 0, top: 0}}>
        <polygon points={`${tx0 - 20},${by - 3} ${tx0 + 20},${by - 3} ${tx},${ty}`} fill={color} stroke={OUT} strokeWidth={4} strokeLinejoin="round"/>
        <rect x={tx0 - 17} y={by - 6} width={34} height={8} fill={color}/>
      </svg>
    </Pop>
  );
};

export const Think: React.FC<{from: number; to: number; cx: number; cy: number; r?: number; tx: number; ty: number; children: React.ReactNode}> = ({from, to, cx, cy, r = 130, tx, ty, children}) => {
  const dots = [0.25, 0.55, 0.82].map((k, i) => ({x: tx + (cx - tx) * k, y: ty + (cy + r * 0.75 - ty) * k, r: 8 + i * 6}));
  return (
    <Pop from={from} to={to} ox={tx} oy={ty}>
      <svg width={W} height={H} style={{position: 'absolute', left: 0, top: 0}}>
        {dots.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="#fff" stroke={OUT} strokeWidth={4}/>)}
        <ellipse cx={cx} cy={cy} rx={r * 1.25} ry={r} fill="#fff" stroke={OUT} strokeWidth={4}/>
      </svg>
      <div style={{position: 'absolute', left: cx - r * 1.25, top: cy - r, width: r * 2.5, height: r * 2, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{children}</div>
    </Pop>
  );
};

export const Pill: React.FC<{from: number; to: number; x: number; y: number; text: string; bg?: string; fg?: string; size?: number}> = ({from, to, x, y, text, bg = '#FFD34D', fg = OUT, size = 36}) => (
  <Pop from={from} to={to} mode="slide">
    <div style={{position: 'absolute', left: x, top: y, transform: 'translateX(-50%)', padding: '6px 28px', borderRadius: 999, background: bg, color: fg, border: `3px solid ${OUT}`, fontFamily, fontWeight: 700, fontSize: size, whiteSpace: 'nowrap'}}>{text}</div>
  </Pop>
);

export const Stamp: React.FC<{b: R; x: number; y: number; text: string; sub?: string; color?: string; rot?: number; size?: number}> = ({b, x, y, text, sub, color = '#E4572E', rot = -6, size = 84}) => (
  <Pop from={b.f} to={b.t} mode="stamp" ox={x} oy={y}>
    <div style={{position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) rotate(${rot}deg)`, border: `8px solid ${color}`, color, borderRadius: 22, padding: '10px 40px', fontFamily, fontWeight: 700, fontSize: size, textAlign: 'center', background: 'rgba(255,255,255,.94)', lineHeight: 1.15, whiteSpace: 'nowrap'}}>
      {text}
      {sub && <div style={{fontSize: size * 0.45}}>{sub}</div>}
    </div>
  </Pop>
);

export const Note: React.FC<{b: R; x: number; y: number; w?: number; rot?: number; size?: number; font?: string}> = ({b, x, y, w = 560, rot = -3, size = 46}) => (
  <Pop from={b.f} to={b.t} ox={x} oy={y}>
    <div style={{position: 'absolute', left: x - w / 2, top: y, width: w, boxSizing: 'border-box', transform: `rotate(${rot}deg)`, background: '#FFF6B0', border: `3px solid ${OUT}`, borderRadius: 8, padding: '46px 34px 34px', fontFamily, fontWeight: 600, fontSize: size, lineHeight: 1.4, textAlign: 'center', color: OUT, boxShadow: '8px 10px 0 rgba(0,0,0,.18)'}}>
      <div style={{position: 'absolute', left: '50%', top: -16, width: 30, height: 30, marginLeft: -15, borderRadius: 15, background: '#E4572E', border: `3px solid ${OUT}`}}/>
      {b.txt}
    </div>
  </Pop>
);

export const Card: React.FC<{x: number; y: number; w: number; children: React.ReactNode; bg?: string; pad?: number}> = ({x, y, w, children, bg = '#fff', pad = 34}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, boxSizing: 'border-box', padding: pad, background: bg, border: `5px solid ${OUT}`, borderRadius: 36, boxShadow: '10px 12px 0 rgba(0,0,0,.16)', fontFamily, color: OUT}}>{children}</div>
);

export const Icon: React.FC<{k: string; s?: number}> = ({k, s = 100}) => {
  const st = {stroke: OUT, strokeWidth: 4, strokeLinejoin: 'round' as const};
  let g: React.ReactNode = null;
  if (k === 'q') g = <><circle cx="50" cy="50" r="42" fill="#FFD34D" {...st}/><text x="50" y="72" textAnchor="middle" fontSize="70" fontWeight="700" fill={OUT} fontFamily={fontFamily}>?</text></>;
  if (k === 'coin') g = <><circle cx="50" cy="50" r="42" fill="#F6C945" {...st}/><circle cx="50" cy="50" r="30" fill="none" stroke="#C9971C" strokeWidth="4"/><text x="50" y="64" textAnchor="middle" fontSize="42" fontWeight="700" fill="#8a6410" fontFamily={fontFamily}>৳</text></>;
  if (k === 'cal') g = <><rect x="10" y="16" width="80" height="74" rx="10" fill="#fff" {...st}/><rect x="10" y="16" width="80" height="24" rx="10" fill="#E4572E" {...st}/><path d="M30 8 V24 M70 8 V24" {...st} strokeLinecap="round"/></>;
  if (k === 'check') g = <><circle cx="50" cy="50" r="42" fill="#4CAF50" {...st}/><path d="M28 52 L44 68 L74 34" fill="none" stroke="#fff" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/></>;
  if (k === 'cross') g = <><circle cx="50" cy="50" r="42" fill="#E4572E" {...st}/><path d="M32 32 L68 68 M68 32 L32 68" stroke="#fff" strokeWidth="10" strokeLinecap="round"/></>;
  if (k === 'heart') g = <path d="M50 84 C8 56 12 20 34 20 C44 20 50 30 50 30 C50 30 56 20 66 20 C88 20 92 56 50 84Z" fill="#E94B6A" {...st}/>;
  if (k === 'bulb') g = <><circle cx="50" cy="40" r="28" fill="#FFE066" {...st}/><rect x="38" y="66" width="24" height="18" rx="4" fill="#bbb" {...st}/></>;
  if (k === 'bag') g = <><rect x="12" y="32" width="76" height="56" rx="10" fill="#8B5A2B" {...st}/><path d="M34 32 V22 Q34 12 44 12 H56 Q66 12 66 22 V32" fill="none" {...st}/></>;
  if (k === 'board') g = <><rect x="8" y="14" width="84" height="60" rx="6" fill="#2F6B4F" stroke="#8B5A2B" strokeWidth="6"/><path d="M24 36 H60 M24 52 H46" stroke="#fff" strokeWidth="5" strokeLinecap="round"/></>;
  if (k === 'clock') g = <><circle cx="50" cy="50" r="42" fill="#fff" {...st}/><path d="M50 50 V24 M50 50 L68 60" stroke={OUT} strokeWidth="6" strokeLinecap="round"/></>;
  return <svg width={s} height={s} viewBox="0 0 100 100" style={{display: 'block'}}>{g}</svg>;
};

export const At: React.FC<{x: number; y: number; children: React.ReactNode}> = ({x, y, children}) => <div style={{position: 'absolute', left: x, top: y}}>{children}</div>;
