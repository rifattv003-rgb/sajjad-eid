import React from 'react';
import {W, H, OUT} from './theme';
import {PunjabiP, Hanger} from './Props';

const Svg: React.FC<{children: React.ReactNode}> = ({children}) => (
  <svg width={W} height={H} viewBox="0 0 1920 1080" style={{position: 'absolute', left: 0, top: 0}}>{children}</svg>
);
const S = {stroke: OUT, strokeWidth: 3, strokeLinejoin: 'round' as const};

export const Room: React.FC<{kind: 'bedroom' | 'veranda' | 'night' | 'dining' | 'living' | 'kitchen'}> = ({kind}) => {
  const dark = kind === 'night' || kind === 'dining';
  const wall = dark ? '#2B3558' : kind === 'veranda' ? '#F2D9A8' : kind === 'kitchen' ? '#CDE8E4' : '#F6E3C0';
  const floor = dark ? '#3b2f2a' : kind === 'kitchen' ? '#B8C4C8' : '#C9996A';
  return (
    <Svg>
      <defs><radialGradient id="lamp" cx="50%" cy="55%" r="55%"><stop offset="0" stopColor="#FFE9A8" stopOpacity=".5"/><stop offset="1" stopColor="#FFE9A8" stopOpacity="0"/></radialGradient></defs>
      <rect width={W} height={H} fill={wall}/>
      {kind === 'kitchen' && [...Array(12)].map((_, i) => <path key={i} d={`M0 ${i * 80}H${W}`} stroke="#fff" strokeWidth="3" opacity=".6"/>)}
      {kind === 'bedroom' && <g>
        <rect x="90" y="190" width="430" height="690" fill="#9B6B43" {...S}/>
        <rect x="130" y="230" width="350" height="610" fill="#4a2f1b" {...S}/>
        <path d="M130 300 H480" stroke="#cfcfcf" strokeWidth="8"/>
        <path d="M130 230 L40 262 V850 L130 840Z" fill="#B07C50" {...S}/>
        <rect x="1280" y="170" width="320" height="330" fill="#BFE3F5" stroke="#fff" strokeWidth="14"/>
        <path d="M1440 170 V500 M1280 335 H1600" stroke="#fff" strokeWidth="10"/>
        <circle cx="1000" cy="260" r="50" fill="#fff" {...S}/><path d="M1000 260 V228 M1000 260 L1020 272" stroke={OUT} strokeWidth="5" strokeLinecap="round"/>
      </g>}
      {kind === 'veranda' && <g>
        <rect y="430" width={W} height="440" fill="#CDEBFA"/>
        {[[120, 520, 160, 350], [420, 560, 120, 310], [1300, 500, 200, 370], [1650, 560, 150, 310]].map(([x, y, w, h], i) => <rect key={i} x={x} y={y} width={w} height={h} fill="#B8C7D6" opacity=".8"/>)}
        {[...Array(25)].map((_, i) => <rect key={i} x={i * 80 + 10} y="430" width="12" height="440" fill="#7a5b3a"/>)}
        <rect y="410" width={W} height="30" fill="#7a5b3a" {...S}/>
        <rect x="1620" y="700" width="110" height="130" rx="10" fill="#C0674A" {...S}/><ellipse cx="1675" cy="680" rx="90" ry="60" fill="#4CAF50" {...S}/>
      </g>}
      {dark && <g>
        <rect x="1380" y="150" width="300" height="320" fill="#16203D" stroke="#fff" strokeWidth="12"/>
        <circle cx="1560" cy="250" r="36" fill="#FFF3B0"/><path d="M1530 150 V470" stroke="#fff" strokeWidth="8"/>
      </g>}
      {kind === 'dining' && <g><path d="M960 0 V170" stroke="#aaa" strokeWidth="5"/><path d="M880 250 Q960 150 1040 250Z" fill="#FFD34D" {...S}/></g>}
      {kind === 'living' && <g>
        <rect x="260" y="170" width="360" height="300" fill="#BFE3F5" stroke="#fff" strokeWidth="14"/><path d="M440 170 V470 M260 320 H620" stroke="#fff" strokeWidth="10"/>
        <rect x="1480" y="230" width="300" height="650" fill="#E9D3AC" {...S}/><rect x="1500" y="250" width="260" height="630" fill="#8f7a5c"/>
      </g>}
      <rect y="880" width={W} height="200" fill={floor}/><rect y="872" width={W} height="14" fill="#0002"/>
      {dark && <rect width={W} height={H} fill="url(#lamp)"/>}
    </Svg>
  );
};

export const Table: React.FC<{x: number; w?: number; top?: number; color?: string}> = ({x, w = 800, top = 690, color = '#8B5A2B'}) => (
  <Svg>
    <rect x={x - w / 2 + 40} y={top} width="30" height={1080 - top} fill="#6d4520" {...S}/><rect x={x + w / 2 - 70} y={top} width="30" height={1080 - top} fill="#6d4520" {...S}/>
    <rect x={x - w / 2} y={top - 6} width={w} height="42" rx="8" fill={color} {...S}/>
  </Svg>
);

export const Stool: React.FC<{x: number; top?: number}> = ({x, top = 775}) => (
  <Svg>
    <rect x={x - 80} y={top} width="160" height="26" rx="8" fill="#B07C50" {...S}/>
    <path d={`M${x - 60} ${top + 26} L${x - 76} 900 M${x + 60} ${top + 26} L${x + 76} 900`} stroke={OUT} strokeWidth="12" strokeLinecap="round"/>
  </Svg>
);

export const Street: React.FC<{dusk?: boolean}> = ({dusk}) => {
  const cols = ['#D98E73', '#8FB8C9', '#E3C07A', '#A9A3C9', '#C9B08A'];
  return (
    <Svg>
      <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={dusk ? '#F6A96B' : '#9FD6F2'}/><stop offset="1" stopColor={dusk ? '#FFE2B0' : '#EAF7FF'}/></linearGradient></defs>
      <rect width={W} height={H} fill="url(#sky)"/>
      {[...Array(6)].map((_, i) => <g key={i}><rect x={i * 340 - 40} y={120 + (i % 3) * 70} width="320" height="560" fill={cols[i % 5]} {...S}/>{[0, 1, 2].map((r) => [0, 1].map((c) => <rect key={r + '-' + c} x={i * 340 + 20 + c * 130} y={160 + (i % 3) * 70 + r * 120} width="90" height="80" fill={dusk ? '#FFE9A8' : '#EAF7FF'} {...S}/>))}</g>)}
      {[0, 1, 2].map((i) => <g key={i}><rect x={i * 660 + 20} y="560" width="600" height="300" fill="#F3E6D0" {...S}/><path d={`M${i * 660 + 0} 560 H${i * 660 + 640} L${i * 660 + 610} 500 H${i * 660 + 30}Z`} fill={i % 2 ? '#E4572E' : '#2F8F83'} {...S}/><rect x={i * 660 + 60} y="610" width="300" height="220" fill="#BFE3F5" {...S}/><rect x={i * 660 + 400} y="610" width="150" height="250" fill="#8B5A2B" {...S}/></g>)}
      <rect y="860" width={W} height="40" fill="#D6CFC2" {...S}/><rect y="900" width={W} height="180" fill="#8c8c94"/>
      <path d="M0 1000 H1920" stroke="#fff" strokeWidth="8" strokeDasharray="60 50"/>
    </Svg>
  );
};

export const ShopIn: React.FC<{wall?: string}> = ({wall = '#F3E6D0'}) => {
  const cl = ['#E4572E', '#2F8F83', '#F2C230', '#6A7BD9', '#E48AAA', '#9CC3E8'];
  return (
    <Svg>
      <rect width={W} height={H} fill={wall}/>
      {[260, 440, 620].map((y, r) => <g key={y}><rect x="60" y={y} width="900" height="16" fill="#8B5A2B" {...S}/>{[0, 1, 2, 3, 4].map((i) => <rect key={i} x={90 + i * 170} y={y - 70} width="150" height="70" rx="6" fill={cl[(i + r) % 6]} {...S}/>)}</g>)}
      <path d="M1100 140 H1840" stroke="#888" strokeWidth="10"/>
      {[1150, 1330, 1510, 1690].map((x, i) => <g key={x} transform={`translate(${x} 130)`}><Hanger size={110}/></g>)}
      {[1150, 1330, 1510, 1690].map((x, i) => <g key={'p' + x} transform={`translate(${x - 10} 175)`}><PunjabiP color={['#7DB7D0', '#B9A27A', '#C77D8E', '#6A9F6B'][i]} w={130}/></g>)}
      <rect y="880" width={W} height="200" fill="#B58D63"/>
    </Svg>
  );
};

export const Counter: React.FC<{top?: number}> = ({top = 760}) => (
  <Svg>
    <rect x="0" y={top} width={W} height={1080 - top} fill="#A8743F" {...S}/>
    <rect x="0" y={top} width={W} height="30" fill="#C88F52" {...S}/>
    {[...Array(8)].map((_, i) => <rect key={i} x={i * 250 + 30} y={top + 70} width="190" height={1080 - top - 90} rx="8" fill="#96662F" stroke="#00000033" strokeWidth="3"/>)}
  </Svg>
);

export const Building: React.FC<{glow: number}> = ({glow}) => (
  <Svg>
    <defs><linearGradient id="sky2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9FD6F2"/><stop offset="1" stopColor="#EAF7FF"/></linearGradient></defs>
    <rect width={W} height={H} fill="url(#sky2)"/>
    <rect y="900" width={W} height="180" fill="#8c8c94"/><rect y="880" width={W} height="30" fill="#D6CFC2" {...S}/>
    <rect x="560" y="90" width="800" height="790" fill="#C98F6B" {...S}/>
    {[0, 1, 2, 3].map((fl) => [0, 1, 2].map((c) => {
      const hi = fl === 2 && c === 1; // third floor (ground = 0)
      return <g key={fl + '-' + c}>{hi && <rect x={655 + c * 240 - 18} y={150 + (3 - fl) * 150 - 18} width="136" height="116" rx="12" fill="#FFD34D" opacity={0.4 + 0.5 * glow}/>}
        <rect x={655 + c * 240} y={150 + (3 - fl) * 150} width="100" height="80" fill={hi ? '#FFE9A8' : '#BFE3F5'} {...S}/></g>;
    }))}
    <rect x="860" y="760" width="200" height="120" fill="#5b3a21" {...S}/>
    <path d="M700 240 l30 60 l-20 40 M1200 500 l-30 50" stroke="#8c5a3c" strokeWidth="5" fill="none"/>
  </Svg>
);

export const Ground: React.FC = () => (
  <Svg>
    <rect width={W} height={H} fill="#BEE6F7"/>
    <circle cx="1600" cy="160" r="70" fill="#FFF3B0"/>
    <rect x="780" y="300" width="360" height="300" fill="#EFE7D6" {...S}/><path d="M780 300 Q960 90 1140 300Z" fill="#CFE9D3" {...S}/><path d="M960 100 V60" stroke={OUT} strokeWidth="6"/>
    <rect x="620" y="220" width="70" height="380" fill="#EFE7D6" {...S}/><rect x="1230" y="220" width="70" height="380" fill="#EFE7D6" {...S}/>
    <rect y="600" width={W} height="480" fill="#CFE0A8"/>
    {[0, 1, 2, 3].map((i) => <path key={i} d={`M0 ${660 + i * 110} H${W}`} stroke="#fff" strokeWidth="6" opacity=".7"/>)}
  </Svg>
);

export const Clean: React.FC<{dark?: boolean}> = ({dark}) => (
  <div style={{position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', background: dark ? 'radial-gradient(circle at 50% 45%, #33406B 0%, #1F2A44 65%, #141B30 100%)' : 'radial-gradient(circle at 50% 45%, #FFF8E6 0%, #F6E7C1 62%, #E7CFA0 100%)'}}/>
);
