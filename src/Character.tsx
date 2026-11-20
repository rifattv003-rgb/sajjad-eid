import React from 'react';
import {useCurrentFrame} from 'remotion';
import {OUT} from './theme';
import {PunjabiP} from './Props';

export type Expr = 'neutral' | 'happy' | 'sad' | 'cry' | 'surprised' | 'angry' | 'worried' | 'shy' | 'think';
type Look = {skin: string; hair: string; hs: 'short' | 'bun' | 'braid' | 'shaggy' | 'cap'; beard?: 'light' | 'stubble' | 'mustache'; gl?: 'sq' | 'round'; g: 'shirt' | 'punjabi' | 'fatua' | 'dress'; top: string; bottom: string; blouse?: string; border?: string; collar?: 'plain' | 'worn' | 'torn' | 'emb'; kid?: boolean; tika?: string; tape?: boolean};

const LOOKS: Record<string, Look> = {
  sajjad: {skin: '#B07A52', hair: '#1b1b1b', hs: 'short', beard: 'light', g: 'shirt', top: '#9CC3E8', bottom: '#2b2b2b'},
  baba: {skin: '#D9A273', hair: '#DADADA', hs: 'short', beard: 'stubble', gl: 'sq', g: 'fatua', top: '#FFFFFF', bottom: '#5b84b1'},
  ma: {skin: '#D9A273', hair: '#4a4a4a', hs: 'bun', g: 'dress', top: '#FFFFFF', bottom: '#FFFFFF', blouse: '#FFFFFF', border: '#DDDDDD', tika: '#c0392b'},
  nusrat: {skin: '#F2C9A0', hair: '#1b1b1b', hs: 'braid', g: 'dress', top: '#F4A6C0', bottom: '#F4A6C0', blouse: '#D9577D', border: '#C2477A', tika: '#222'},
  rafi: {skin: '#D9A273', hair: '#1b1b1b', hs: 'shaggy', g: 'shirt', top: '#FFFFFF', bottom: '#3A6FD8', kid: true},
  rahim: {skin: '#D9A273', hair: '#1b1b1b', hs: 'cap', beard: 'mustache', gl: 'round', g: 'shirt', top: '#FFFFFF', bottom: '#2b2b2b', tape: true},
  ex1: {skin: '#C48F65', hair: '#222', hs: 'cap', g: 'punjabi', top: '#7DB7D0', bottom: '#FFFFFF', collar: 'plain'},
  ex2: {skin: '#D9A273', hair: '#333', hs: 'short', beard: 'stubble', g: 'shirt', top: '#C9B45A', bottom: '#444'},
  ex3: {skin: '#B07A52', hair: '#222', hs: 'cap', g: 'punjabi', top: '#E8E4D8', bottom: '#FFFFFF', collar: 'plain'},
  ex4: {skin: '#F2C9A0', hair: '#222', hs: 'short', g: 'shirt', top: '#E4572E', bottom: '#334455'},
};
const OUTFIT: Record<string, Partial<Look>> = {
  'sajjad.old': {g: 'punjabi', top: '#8B5A2B', bottom: '#FFFFFF', collar: 'worn'},
  'sajjad.eid': {g: 'punjabi', top: '#1F6B3F', bottom: '#FFFFFF', collar: 'plain'},
  'baba.old': {g: 'punjabi', top: '#F2E4C4', bottom: '#FFFFFF', collar: 'torn'},
  'baba.eid': {g: 'punjabi', top: '#B9BEC4', bottom: '#FFFFFF', collar: 'emb'},
  'rafi.eid': {g: 'punjabi', top: '#F7D038', bottom: '#FFFFFF', collar: 'plain'},
};

export type CharProps = {kind: string; outfit?: string; x: number; y: number; s?: number; expr?: Expr; talk?: boolean; flip?: boolean; armL?: number; armR?: number; holdL?: string; holdR?: string; sit?: boolean; shake?: number; blush?: boolean; bag?: boolean; seed?: number; walk?: boolean; down?: boolean; opacity?: number};

const S = {stroke: OUT, strokeWidth: 2.5, strokeLinejoin: 'round' as const};

const Held: React.FC<{spec?: string}> = ({spec}) => {
  if (!spec) return null;
  const [n, c = '#E8B4B8', k] = spec.split(':');
  if (n === 'cup') return <g><path d="M-14 -26 H14 V-4 Q14 4 6 4 H-6 Q-14 4 -14 -4Z" fill="#fff" {...S}/><circle cx="17" cy="-14" r="8" fill="none" {...S}/><path d="M-5 -34 q-5 -8 0 -14 M5 -34 q-5 -8 0 -14" fill="none" stroke="#999" strokeWidth="3"/></g>;
  if (n === 'box') return <g><rect x="-36" y="-46" width="72" height="50" rx="5" fill={c} {...S}/><rect x="-5" y="-46" width="10" height="50" fill="#fff" {...S}/></g>;
  if (n === 'book') return <g><rect x="-30" y="-54" width="60" height="74" rx="4" fill="#F6E7B4" {...S}/>{[-34, -22, -10, 2].map((y) => <path key={y} d={`M-20 ${y}H20`} stroke="#999" strokeWidth="2"/>)}</g>;
  if (n === 'wallet') return <g><rect x="-26" y="-28" width="52" height="34" rx="6" fill="#6d4520" {...S}/><path d="M26 -14 q14 8 0 20" fill="none" stroke="#D4A017" strokeWidth="4"/></g>;
  if (n === 'cloth') return <g transform="translate(-45 -86)"><PunjabiP color={c} collar={(k as 'plain') || 'plain'} w={90}/></g>;
  if (n === 'note') return <g transform="rotate(-8)"><rect x="-24" y="-38" width="48" height="38" fill="#FFFBE0" {...S}/></g>;
  if (n === 'money') return <g><rect x="-34" y="-30" width="68" height="34" rx="4" fill="#7BC47F" {...S}/><circle cx="0" cy="-13" r="9" fill="#d6f0d3" {...S}/></g>;
  if (n === 'needle') return <g><path d="M0 0 L26 -40" stroke="#bbb" strokeWidth="4" strokeLinecap="round"/><path d="M26 -40 q20 -10 10 -30 q-8 -14 14 -22" fill="none" stroke="#c0392b" strokeWidth="3"/></g>;
  return null;
};

export const Character: React.FC<CharProps> = (p) => {
  const f = useCurrentFrame();
  const L: Look = {...LOOKS[p.kind], ...(OUTFIT[`${p.kind}.${p.outfit}`] || {})};
  const s = p.s ?? 1;
  const sd = p.seed ?? 0;
  const bob = Math.sin((f + sd * 17) / 14) * 4;
  const wk = p.walk ? Math.sin(f / 3.5) * 14 : 0;
  const jx = p.shake ? Math.sin(f * 2.3 + sd) * p.shake : 0;
  const blink = (f + sd * 23) % 110 < 5;
  const E = p.expr ?? 'neutral';
  const mo = p.talk ? [0, 1, 2, 1, 0, 2, 1][Math.floor(f / 4) % 7] : -1;
  const aL = p.armL ?? 8, aR = p.armR ?? 8;
  const legEnd = p.sit ? 470 : 525;
  const dark = (c: string) => c;
  const brow = ({neutral: [0, 0], happy: [-4, -2], sad: [-12, 4], cry: [-14, 5], surprised: [-12, -12], angry: [10, -2], worried: [-10, 2], shy: [-3, 2], think: [-8, 0]} as Record<string, number[]>)[E];
  const lx = E === 'think' ? 4 : E === 'shy' ? -3 : 0;
  const ly = p.down || E === 'shy' || E === 'sad' ? 6 : E === 'think' ? -5 : 0;
  const eye = (cx: number) =>
    E === 'happy' && !p.talk ? (
      <path d={`M${cx - 12} 110 Q${cx} 92 ${cx + 12} 110`} fill="none" stroke={OUT} strokeWidth="4.5" strokeLinecap="round"/>
    ) : (
      <g>
        <ellipse cx={cx} cy={106} rx={E === 'surprised' ? 15 : 13} ry={blink ? 1.5 : E === 'surprised' ? 18 : 15} fill="#fff" {...S}/>
        {!blink && <circle cx={cx + lx} cy={106 + ly} r={E === 'surprised' ? 4.5 : 6.5} fill={OUT}/>}
      </g>
    );
  const mouth = () => {
    if (mo === 0) return <path d="M138 152 Q150 156 162 152" fill="none" stroke={OUT} strokeWidth="4" strokeLinecap="round"/>;
    if (mo === 1) return <ellipse cx="150" cy="152" rx="9" ry="6" fill="#7a2a2a" {...S}/>;
    if (mo === 2) return <g><ellipse cx="150" cy="154" rx="14" ry="12" fill="#7a2a2a" {...S}/><ellipse cx="150" cy="160" rx="8" ry="4" fill="#e9808a"/></g>;
    const st = {fill: 'none', stroke: OUT, strokeWidth: 4, strokeLinecap: 'round' as const};
    if (E === 'happy') return <path d="M128 142 Q150 168 172 142" fill="#fff" {...S}/>;
    if (E === 'sad') return <path d="M132 158 Q150 142 168 158" {...st}/>;
    if (E === 'cry') return <path d="M130 160 Q150 140 170 160 Z" fill="#7a2a2a" {...S}/>;
    if (E === 'surprised') return <ellipse cx="150" cy="156" rx="9" ry="12" fill="#7a2a2a" {...S}/>;
    if (E === 'angry') return <path d="M134 156 Q150 146 166 156" {...st}/>;
    if (E === 'worried') return <path d="M134 154 Q142 148 150 154 T166 154" {...st}/>;
    if (E === 'shy') return <path d="M138 146 Q150 158 162 146" {...st}/>;
    if (E === 'think') return <path d="M140 152 L162 148" {...st}/>;
    return <path d="M136 150 Q150 156 164 150" {...st}/>;
  };
  const hair = () => {
    const top = <path d="M94 100 Q90 46 150 42 Q210 46 206 100 Q196 70 150 68 Q104 70 94 100Z" fill={L.hair} {...S}/>;
    if (L.hs === 'short') return top;
    if (L.hs === 'bun') return <g><circle cx="150" cy="36" r="22" fill={L.hair} {...S}/>{top}<path d="M108 60 Q135 50 165 56" stroke="#eee" strokeWidth="6" fill="none" strokeLinecap="round"/></g>;
    if (L.hs === 'braid') return top;
    if (L.hs === 'shaggy') return <path d="M92 102 Q76 62 100 48 Q110 28 135 38 Q150 22 170 36 Q198 28 204 54 Q226 70 208 102 Q196 72 150 70 Q104 72 92 102Z" fill={L.hair} {...S}/>;
    return <g><path d="M96 80 Q98 34 150 32 Q202 34 204 80 Q150 64 96 80Z" fill="#fff" {...S}/>{[120, 135, 150, 165, 180].map((x) => <path key={x} d={`M${x} 38 V68`} stroke="#ccc" strokeWidth="2.5"/>)}</g>;
  };
  const collar = (c?: string) => {
    if (c === 'worn') return <path d="M122 182 Q150 214 178 182" stroke="#5c3a1c" strokeWidth="6" fill="none" strokeDasharray="6 3"/>;
    if (c === 'torn') return <g><path d="M126 186 l7 10 l7 -10 l7 10 l7 -10 l7 10" stroke="#c0392b" strokeWidth="3" fill="none"/><path d="M122 182 Q150 214 178 182" stroke="#8a7a55" strokeWidth="4" fill="none" strokeDasharray="4 5"/></g>;
    if (c === 'emb') return <path d="M122 182 Q150 214 178 182" stroke="#D4A017" strokeWidth="5" fill="none" strokeDasharray="2 7" strokeLinecap="round"/>;
    return <path d="M122 182 Q150 214 178 182" stroke={OUT} strokeWidth="2.5" fill="none"/>;
  };
  const arm = (side: 'L' | 'R') => {
    const px = side === 'L' ? 104 : 196;
    const ang = side === 'L' ? aL : -aR;
    const hold = side === 'L' ? p.holdL : p.holdR;
    const sleeve = L.g === 'dress' ? L.skin : L.top;
    return (
      <g transform={`rotate(${ang} ${px} 205)`}>
        <rect x={px - 14} y="205" width="28" height="125" rx="14" fill={sleeve} {...S}/>
        {L.g === 'dress' && <rect x={px - 14} y="205" width="28" height="42" rx="14" fill={L.blouse} {...S}/>}
        <circle cx={px} cy="332" r="15" fill={L.skin} {...S}/>
        <g transform={`translate(${px} 332) rotate(${-ang})`}>{hold && <Held spec={hold}/>}</g>
      </g>
    );
  };
  const legs = () => {
    if (L.g === 'fatua') return <path d={`M104 350 H196 L204 ${p.sit ? 470 : 528} H96 Z`} fill="url(#lungi)" {...S}/>;
    if (L.g === 'dress') return <path d="M96 255 Q90 300 82 524 H218 Q210 300 204 255 Z" fill={L.top} {...S}/>;
    return (
      <g>
        <g transform={`rotate(${wk} 126 335)`}><rect x="108" y="330" width="36" height={legEnd - 330} rx="18" fill={L.bottom} {...S}/><ellipse cx="124" cy={legEnd + 8} rx="26" ry="11" fill="#333" {...S}/></g>
        <g transform={`rotate(${-wk} 174 335)`}><rect x="156" y="330" width="36" height={legEnd - 330} rx="18" fill={L.bottom} {...S}/><ellipse cx="176" cy={legEnd + 8} rx="26" ry="11" fill="#333" {...S}/></g>
      </g>
    );
  };
  const feet = (L.g === 'fatua' || L.g === 'dress') && <g><ellipse cx="124" cy={p.sit ? 478 : 534} rx="26" ry="11" fill="#333" {...S}/><ellipse cx="176" cy={p.sit ? 478 : 534} rx="26" ry="11" fill="#333" {...S}/></g>;
  const torso = () => {
    if (L.g === 'shirt') return <g><rect x="92" y="185" width="116" height="175" rx="36" fill={L.top} {...S}/><path d="M128 186 L150 214 L172 186" fill="#fff" {...S}/>{[240, 272, 304].map((y) => <circle key={y} cx="150" cy={y} r="3.5" fill={OUT}/>)}</g>;
    if (L.g === 'punjabi') return <g><path d="M92 196 Q92 182 110 182 H190 Q208 182 208 196 V420 Q208 436 190 436 H110 Q92 436 92 420 Z" fill={L.top} {...S}/><path d="M150 206 V300" stroke={OUT} strokeWidth="2.5"/>{[226, 256, 286].map((y) => <circle key={y} cx="150" cy={y} r="3.5" fill={OUT}/>)}{collar(L.collar)}</g>;
    if (L.g === 'fatua') return <g><path d="M92 196 Q92 182 110 182 H190 Q208 182 208 196 V372 Q208 388 190 388 H110 Q92 388 92 372 Z" fill={L.top} {...S}/><path d="M150 206 V270" stroke={OUT} strokeWidth="2.5"/><path d="M126 184 Q150 208 174 184" fill="none" stroke={OUT} strokeWidth="2.5"/></g>;
    return <g><rect x="94" y="185" width="112" height="85" rx="28" fill={L.blouse} {...S}/><path d="M100 190 L152 200 L206 336 L172 350 L112 252 Z" fill={L.top === '#FFFFFF' ? '#EFEFEF' : '#E48AAA'} {...S}/><rect x="84" y="500" width="132" height="24" fill={L.border} stroke="none"/></g>;
  };
  return (
    <svg width={300 * s} height={560 * s} viewBox="0 0 300 560" style={{position: 'absolute', left: p.x - 150 * s + jx, top: p.y - 560 * s, overflow: 'visible', opacity: p.opacity ?? 1, transform: `translateY(${bob}px) ${p.flip ? 'scaleX(-1)' : ''}`}}>
      <defs>
        <pattern id="lungi" width="28" height="28" patternUnits="userSpaceOnUse"><rect width="28" height="28" fill="#5b84b1"/><path d="M0 14H28M14 0V28" stroke="#2f4f73" strokeWidth="5"/><path d="M0 0H28M0 0V28" stroke="#fff" strokeWidth="1.5"/></pattern>
      </defs>
      {L.kid && p.bag && <rect x="84" y="195" width="132" height="125" rx="22" fill="#d94141" {...S}/>}
      {L.hs === 'braid' && <g><path d="M198 110 Q232 160 216 240 Q208 300 218 346" stroke={OUT} strokeWidth="30" fill="none" strokeLinecap="round"/><path d="M198 110 Q232 160 216 240 Q208 300 218 346" stroke={L.hair} strokeWidth="24" fill="none" strokeLinecap="round"/><circle cx="218" cy="346" r="9" fill="#d33" {...S}/></g>}
      {legs()}
      {feet}
      <rect x="136" y="160" width="28" height="34" fill={L.skin} {...S}/>
      {torso()}
      {L.tape && <g><path d="M116 188 Q150 236 184 188" stroke={OUT} strokeWidth="16" fill="none"/><path d="M116 188 Q150 236 184 188" stroke="#F2C230" strokeWidth="11" fill="none"/><path d="M124 210 L120 300 M176 210 L180 300" stroke="#F2C230" strokeWidth="10"/></g>}
      {p.bag && !L.kid && <g><path d="M100 188 L206 316" stroke="#6d4520" strokeWidth="9"/><rect x="186" y="300" width="68" height="54" rx="8" fill="#8B5A2B" {...S}/></g>}
      {L.kid && p.bag && [112, 188].map((x) => <path key={x} d={`M${x} 190 V300`} stroke="#d94141" strokeWidth="10"/>)}
      {arm('L')}
      {arm('R')}
      <g transform={L.kid ? 'translate(150 175) scale(1.2) translate(-150 -175)' : undefined}>
        <circle cx="94" cy="114" r="11" fill={L.skin} {...S}/><circle cx="206" cy="114" r="11" fill={L.skin} {...S}/>
        {(p.blush || E === 'shy') && <g><circle cx="94" cy="114" r="9" fill="#ff4d4d" opacity=".85"/><circle cx="206" cy="114" r="9" fill="#ff4d4d" opacity=".85"/><circle cx="112" cy="136" r="9" fill="#ff7a7a" opacity=".6"/><circle cx="188" cy="136" r="9" fill="#ff7a7a" opacity=".6"/></g>}
        <ellipse cx="150" cy="108" rx="57" ry="64" fill={L.skin} {...S}/>
        {L.beard === 'light' && <path d="M100 128 Q100 170 150 174 Q200 170 200 128 Q190 152 150 154 Q110 152 100 128Z" fill="#2b2b2b" opacity=".6"/>}
        {L.beard === 'stubble' && <path d="M100 128 Q100 170 150 174 Q200 170 200 128 Q190 152 150 154 Q110 152 100 128Z" fill="#8a8a8a" opacity=".55"/>}
        <path d={`M106 ${80 + brow[1]} L142 ${80 + brow[0]}`} stroke={OUT} strokeWidth="5" strokeLinecap="round"/>
        <path d={`M194 ${80 + brow[1]} L158 ${80 + brow[0]}`} stroke={OUT} strokeWidth="5" strokeLinecap="round"/>
        {eye(126)}{eye(174)}
        {L.tika && <circle cx="150" cy="70" r="4.5" fill={L.tika}/>}
        {mouth()}
        {L.beard === 'mustache' && <path d="M118 142 Q134 132 150 141 Q166 132 182 142 Q170 156 150 148 Q130 156 118 142Z" fill="#111"/>}
        {E === 'cry' && [126, 174].map((cx, i) => { const k = (f * 2.5 + i * 30) % 70; return <path key={i} d="M0 -9 Q7 2 0 8 Q-7 2 0 -9Z" transform={`translate(${cx} ${124 + k})`} fill="#6EC6FF" {...S} opacity={1 - k / 70}/>; })}
        {E === 'worried' && <path d="M0 -10 Q8 2 0 9 Q-8 2 0 -10Z" transform={`translate(208 ${64 + Math.sin(f / 6) * 4})`} fill="#6EC6FF" {...S}/>}
        {hair()}
        {L.gl === 'sq' && <g fill="none" stroke="#111" strokeWidth="3.5"><rect x="106" y="90" width="40" height="32" rx="7"/><rect x="154" y="90" width="40" height="32" rx="7"/><path d="M146 104 H154"/></g>}
        {L.gl === 'round' && <g fill="none" stroke="#111" strokeWidth="3.5"><circle cx="126" cy="106" r="20"/><circle cx="174" cy="106" r="20"/><path d="M146 104 H154"/></g>}
      </g>
    </svg>
  );
};
