import React from 'react';
import {AbsoluteFill, Audio, staticFile, useCurrentFrame} from 'remotion';
import {CAPS, overlayActive} from './data';
import {FPS, OUT, fontFamily} from './theme';
import {Scene1} from './scenes/Scene1';
import {Scene2} from './scenes/Scene2';
import {Scene3} from './scenes/Scene3';
import {Scene4} from './scenes/Scene4';
import {Scene5} from './scenes/Scene5';
import {Scene6} from './scenes/Scene6';

const B = [38.5, 71.0, 133.1, 194.6, 272.5]; // scene boundaries (seconds)

const Caption: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const i = CAPS.findIndex((c, k) => t >= c.t && t < (CAPS[k + 1] ? CAPS[k + 1].t : 999));
  if (i < 0 || overlayActive(t)) return null;
  const c = CAPS[i];
  const end = Math.min(CAPS[i + 1] ? CAPS[i + 1].t - 0.04 : 999, c.t + 4.5);
  if (t > end) return null;
  const k = Math.min(1, (t - c.t) / 0.25);
  const parts = c.s.split('*');
  return (
    <div style={{position: 'absolute', left: 0, width: '100%', bottom: 56, display: 'flex', justifyContent: 'center', opacity: k, transform: `translateY(${(1 - k) * 24}px)`}}>
      <div style={{fontFamily, fontWeight: 700, fontSize: 56, whiteSpace: 'nowrap', color: '#fff', background: 'rgba(34,34,34,.8)', border: `3px solid ${OUT}`, borderRadius: 20, padding: '8px 36px'}}>
        {parts.map((p, n) => <span key={n} style={n % 2 ? {color: '#FFD34D'} : undefined}>{p}</span>)}
      </div>
    </div>
  );
};

export const Main: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const near = Math.max(0, ...B.map((b) => 1 - Math.abs(t - b) / 0.2));
  return (
    <AbsoluteFill style={{background: '#000', fontFamily, overflow: 'hidden'}}>
      <Audio src={staticFile('voice.mp3')}/>
      {t < B[0] && <Scene1/>}
      {t >= B[0] && t < B[1] && <Scene2/>}
      {t >= B[1] && t < B[2] && <Scene3/>}
      {t >= B[2] && t < B[3] && <Scene4/>}
      {t >= B[3] && t < B[4] && <Scene5/>}
      {t >= B[4] && <Scene6/>}
      <Caption/>
      <AbsoluteFill style={{background: '#FFF4DC', opacity: near * 0.85, pointerEvents: 'none'}}/>
    </AbsoluteFill>
  );
};
