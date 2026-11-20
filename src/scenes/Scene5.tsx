import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Cam, Pop, lerpAt, useT} from '../anim';
import {Character} from '../Character';
import {Counter, ShopIn, Street} from '../Backgrounds';
import {Hanger, PunjabiP} from '../Props';
import {BUB, CARD} from '../data';
import {At, Icon, Pill, Say, Stamp, Think} from '../Ui';
import {Y} from '../theme';

// দৃশ্য ৫ (3:14–4:32): রহিম কাকার দোকান
export const Scene5: React.FC = () => {
  const t = useT();
  const f = useCurrentFrame();
  const street = t < 198;
  const walkX = lerpAt(t, 194.6, 197, -150, 700);
  const rx = t < 240.1 ? 1300 : t < 241.5 ? lerpAt(t, 240.1, 241.5, 1300, 1650) : t < 243 ? lerpAt(t, 241.5, 243, 1650, 1300) : 1300;
  const sp = t >= 213.3 && t < 233.2 ? 'talk' : '';
  const rTalk = (t > 213.3 && t < 216.5) || (t > 219.3 && t < 233.2);
  const pulse = 1 + 0.06 * Math.sin(f / 4);
  return (
    <>
      <Cam z={[[233.3, 240, 1.3, 560, 600], [261, 264.5, 1.3, 560, 600]]}>
        {street ? (
          <>
            <Street dusk/>
            <Character kind="sajjad" x={walkX} y={Y} walk={t < 197} expr="neutral" seed={1}/>
          </>
        ) : (
          <>
            <ShopIn wall="#F7E9D0"/>
            {t >= 257.3 && t < 265 && <At x={1540} y={130}><div style={{transform: `scale(${pulse})`}}><Hanger size={200} color="#888"/><div style={{marginTop: -20}}><PunjabiP color="#1b1b1b" w={260}/></div></div></At>}
            <Character kind="rahim" x={rx} y={Y} expr={t >= 210.6 && t < 213.3 ? 'think' : t >= 233.2 ? 'neutral' : 'happy'} talk={rTalk} holdL={t < 205.9 ? 'book' : undefined} armL={t < 205.9 ? 40 : 8} holdR={t >= 241.5 && t < 248 ? 'box:#C9A27A' : undefined} armR={t >= 241.5 && t < 248 ? 50 : 8} seed={6}/>
            <Counter/>
            <Character kind="sajjad" x={560} y={1010} s={1.05} expr={t < 213 ? 'happy' : t < 216.6 ? 'neutral' : t < 219.3 ? 'surprised' : t < 233.3 ? 'sad' : t < 262 ? 'cry' : 'sad'} talk={(t > 205.9 && t < 207) || (t > 208.6 && t < 210.2) || (t > 216.6 && t < 219.1)} holdR={t >= 251 && t < 262 ? 'wallet' : undefined} armR={t >= 251 && t < 262 ? 55 : 8} seed={1}/>
            <Pop from={254.9} to={257.3}><At x={640} y={470}><Icon k="coin" s={110}/></At></Pop>
            <Pop from={266.0} to={272.5}><At x={810} y={180}><div style={{transform: `scale(${pulse})`}}><PunjabiP color="#B9BEC4" collar="emb" w={300}/></div></At></Pop>
          </>
        )}
      </Cam>
      <Pill from={194.8} to={199} x={960} y={50} text="ঈদের আগের দিন" bg="#FFD34D"/>
      <Pill from={198.2} to={203} x={960} y={50} text="রহিম কাকার দোকান" bg="#9CC3E8"/>
      <Think from={233.3} to={236.9} cx={560} cy={230} r={115} tx={560} ty={440}><Hanger size={140}/></Think>
      <Think from={236.9} to={240.1} cx={560} cy={230} r={115} tx={560} ty={440}><Character kind="nusrat" x={560} y={310} s={0.3} expr="shy" seed={2}/></Think>
      <Stamp b={CARD.b12} x={960} y={420} text="১২০০ টাকা" size={90}/>
      <Stamp b={CARD.label} x={960} y={470} text={CARD.label.txt as string} color="#555" rot={-4} size={72}/>
      <Say b={BUB.rKnow} cx={1300} by={330} tx={1300} ty={400} w={640}/>
      <Say b={BUB.sHere} cx={560} by={400} tx={560} ty={470} w={520}/>
      <Say b={BUB.r1} cx={1300} by={330} tx={1300} ty={400} w={680}/>
      <Say b={BUB.r2} cx={1300} by={330} tx={1300} ty={400} w={760}/>
      <Say b={BUB.r3} cx={1300} by={330} tx={1300} ty={400} w={680}/>
    </>
  );
};
