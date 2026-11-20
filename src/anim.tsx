import React from 'react';
import {interpolate, spring, useCurrentFrame} from 'remotion';
import {FPS} from './theme';

export const useT = () => useCurrentFrame() / FPS;
export const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
export const prog = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));

type PopProps = {from: number; to: number; children: React.ReactNode; mode?: 'pop' | 'stamp' | 'slide' | 'fade'; ox?: number; oy?: number};
/** Floating overlay: appears at `from`, disappears at `to` (global seconds). */
export const Pop: React.FC<PopProps> = ({from, to, children, mode = 'pop', ox = 960, oy = 540}) => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  if (t < from || t > to) return null;
  const stamp = mode === 'stamp';
  const sp = spring({frame: frame - from * FPS, fps: FPS, config: {damping: stamp ? 9 : 13, stiffness: stamp ? 220 : 150}});
  const out = interpolate(t, [to - 0.25, to], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  let tr = '';
  if (mode === 'pop') tr = `scale(${0.4 + 0.6 * sp})`;
  if (stamp) tr = `scale(${2.6 - 1.6 * sp}) rotate(${(1 - sp) * -10}deg)`;
  if (mode === 'slide') tr = `translateY(${(1 - sp) * 60}px)`;
  return (
    <div style={{position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: Math.min(1, sp * 1.4) * out, transform: tr, transformOrigin: `${ox}px ${oy}px`}}>
      {children}
    </div>
  );
};

/** Camera: zoom segments [from,to,scale,originX,originY] and screen-shake segments [from,to,amp]. */
export const Cam: React.FC<{z?: number[][]; shake?: number[][]; children: React.ReactNode}> = ({z = [], shake = [], children}) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  let sc = 1, ox = 960, oy = 540, dx = 0, dy = 0;
  z.forEach(([a, b, s, x, y]) => {
    const k = interpolate(t, [a, a + 0.7, b - 0.7, b], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
    if (k > 0) { sc = 1 + (s - 1) * k; ox = x; oy = y; }
  });
  shake.forEach(([a, b, amp]) => {
    if (t >= a && t <= b) { dx += Math.sin(f * 2.9) * amp; dy += Math.cos(f * 3.7) * amp; }
  });
  return <div style={{position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', transform: `translate(${dx}px,${dy}px) scale(${sc})`, transformOrigin: `${ox}px ${oy}px`}}>{children}</div>;
};

/** Linear move between two points over a time window. */
export const lerpAt = (t: number, a: number, b: number, v0: number, v1: number) => v0 + (v1 - v0) * prog(t, a, b);
