import React from 'react';
import {OUT} from './theme';

export const PunjabiP: React.FC<{color: string; collar?: 'plain' | 'worn' | 'torn' | 'emb'; w?: number; style?: React.CSSProperties}> = ({color, collar = 'plain', w = 200, style}) => (
  <svg width={w} height={w} viewBox="0 0 200 200" style={style}>
    <path d="M62 14 L40 22 L4 76 L32 94 L44 70 L44 192 H156 V70 L168 94 L196 76 L160 22 L138 14 Q100 46 62 14Z" fill={color} stroke={OUT} strokeWidth="4" strokeLinejoin="round"/>
    <path d="M62 14 Q100 50 138 14" fill="none" stroke={OUT} strokeWidth="5"/>
    <path d="M100 38 V98" stroke={OUT} strokeWidth="3"/>
    {[56, 72, 88].map((y) => <circle key={y} cx="100" cy={y} r="3" fill={OUT}/>)}
    {collar === 'worn' && <path d="M66 20 Q100 54 134 20" stroke="#6b4423" strokeWidth="6" fill="none" strokeDasharray="6 3"/>}
    {collar === 'torn' && <g><path d="M74 26 l7 10 l7 -10 l7 10 l7 -10 l7 10 l7 -10" stroke="#c0392b" strokeWidth="3.5" fill="none"/><path d="M66 20 Q100 54 134 20" stroke="#8a7a55" strokeWidth="4" fill="none" strokeDasharray="4 5"/></g>}
    {collar === 'emb' && <path d="M66 20 Q100 54 134 20" stroke="#D4A017" strokeWidth="6" fill="none" strokeDasharray="2 8" strokeLinecap="round"/>}
  </svg>
);

export const Hanger: React.FC<{size?: number; color?: string}> = ({size = 120, color = '#d0d0d0'}) => (
  <svg width={size} height={size * 0.6} viewBox="0 0 120 72"><path d="M60 40 L60 26 Q60 14 72 14 Q82 14 82 22" fill="none" stroke={color} strokeWidth="6" strokeLinecap="round"/><path d="M60 40 L8 64 H112 Z" fill="none" stroke={color} strokeWidth="6" strokeLinejoin="round"/></svg>
);

export const Parcel: React.FC<{color: string; w?: number}> = ({color, w = 150}) => (
  <svg width={w} height={w * 0.75} viewBox="0 0 120 90"><rect x="4" y="10" width="112" height="76" rx="8" fill={color} stroke={OUT} strokeWidth="4"/><rect x="52" y="10" width="16" height="76" fill="#fff" stroke={OUT} strokeWidth="4"/><path d="M60 10 Q40 -4 36 10 M60 10 Q80 -4 84 10" fill="none" stroke={OUT} strokeWidth="4"/></svg>
);

export const Notes: React.FC<{w?: number}> = ({w = 120}) => (
  <svg width={w} height={w * 0.5} viewBox="0 0 120 60"><rect x="4" y="6" width="104" height="48" rx="4" fill="#7BC47F" stroke={OUT} strokeWidth="3.5"/><circle cx="56" cy="30" r="13" fill="#d6f0d3" stroke={OUT} strokeWidth="3"/><text x="56" y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill={OUT}>৫০০</text></svg>
);

export const Star: React.FC<{size?: number; color?: string}> = ({size = 70, color = '#FFD34D'}) => (
  <svg width={size} height={size} viewBox="0 0 100 100"><path d="M50 6 L61 38 L94 38 L67 58 L77 90 L50 70 L23 90 L33 58 L6 38 L39 38Z" fill={color} stroke={OUT} strokeWidth="4" strokeLinejoin="round"/></svg>
);

export const Bowl: React.FC<{w?: number}> = ({w = 200}) => (
  <svg width={w} height={w * 0.6} viewBox="0 0 200 120"><path d="M10 40 H190 Q186 112 100 112 Q14 112 10 40Z" fill="#fff" stroke={OUT} strokeWidth="4"/><ellipse cx="100" cy="42" rx="90" ry="14" fill="#F2D38A" stroke={OUT} strokeWidth="4"/><path d="M70 22 q-8 -14 0 -22 M100 22 q-8 -14 0 -22 M130 22 q-8 -14 0 -22" stroke="#bbb" strokeWidth="4" fill="none"/></svg>
);
