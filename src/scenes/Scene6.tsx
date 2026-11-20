import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Cam, Pop, lerpAt, useT} from '../anim';
import {Character} from '../Character';
import {Clean, Ground, Room} from '../Backgrounds';
import {PunjabiP, Star} from '../Props';
import {BUB, CARD} from '../data';
import {At, Card, Icon, Pill, Say} from '../Ui';
import {OUT, Y, fontFamily} from '../theme';

const Quote: React.FC<{b: {f: number; t: number; txt?: string}; children: React.ReactNode}> = ({b, children}) => (
  <Pop from={b.f} to={b.t}>
    <div style={{position: 'absolute', left: 110, top: 200, width: 760, height: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20}}>{children}</div>
    <Card x={930} y={230} w={880}><div style={{fontFamily, fontWeight: 700, fontSize: 56, lineHeight: 1.45}}>{b.txt}</div></Card>
  </Pop>
);
const Opt: React.FC<{x: number; text: string; color: string; letter: string}> = ({x, text, color, letter}) => (
  <Card x={x} y={720} w={540} bg={color} pad={24}><div style={{fontFamily, fontWeight: 700, fontSize: 54, textAlign: 'center'}}>{letter}. {text}</div></Card>
);

// দৃশ্য ৬ (4:32–6:08): ঈদের সকাল, নামাজের মাঠ, শেষ বার্তা
export const Scene6: React.FC = () => {
  const t = useT();
  const f = useCurrentFrame();
  const home = t < 318.4;
  const field = t >= 318.4 && t < CARD.q1.f;
  const clean = t >= CARD.q1.f;
  const eid = t >= 286;
  const open = t >= 284.4 && t < 286;
  const rx = t < 298.2 ? lerpAt(t, 296.7, 298.2, -150, 520) : 520;
  const flash = Math.max(0, 1 - Math.abs(t - 286) / 0.25);
  const hop = (i: number) => Math.abs(Math.sin(f / 5 + i)) * 12;
  const babaHold = t < 281 ? 'box:#C9A27A' : t < 284.4 ? 'box:#B9BEC4' : open ? 'cloth:#B9BEC4:emb' : undefined;
  const sajHoldL = t < 277.7 ? undefined : t < 281 ? 'box:#B9BEC4' : t < 284.4 ? 'box:#C9A27A' : open ? 'cloth:#1F6B3F' : undefined;
  const sajHoldR = t >= 309 && t < 310.8 ? 'wallet' : t >= 310.8 && t < 313 ? 'money' : undefined;
  const babaArm = t >= 274.2 && t < 286 ? (open ? 90 : 70) : 8;
  const sajArmL = t >= 277.7 && t < 286 ? (open ? 90 : 70) : 8;
  const dark = t >= CARD.ask1.f && t < CARD.cta.f;
  return (
    <>
      <Cam z={[[302.3, 305.5, 1.4, 1330, 560], [321, 324.7, 1.6, 960, 560]]}>
        {home && (
          <>
            <Room kind="living"/>
            <Character kind="baba" outfit={eid ? 'eid' : undefined} x={760} y={Y} expr={t >= 288 ? 'surprised' : 'happy'} talk={t > 288 && t < 290.8} holdR={babaHold} armR={babaArm} seed={4}/>
            <Character kind="sajjad" outfit={eid ? 'eid' : undefined} x={1010} y={Y} expr="happy" talk={t > 290.9 && t < 293.9} holdL={sajHoldL} holdR={sajHoldR} armL={sajArmL} armR={t >= 309 && t < 313 ? 60 : 8} seed={1}/>
            <Character kind="nusrat" x={1330} y={Y} s={0.95} expr={t < 302.3 ? 'happy' : 'shy'} talk={t > 305.7 && t < 308.9} down={t >= 304} armL={t >= 311 && t < 313 ? 70 : 8} seed={2}/>
            {t >= 293.9 && <Character kind="ma" x={1630} y={Y} expr="cry" armR={140} seed={5}/>}
            {t >= 296.7 && <Character kind="rafi" outfit="eid" x={t < 299.5 ? rx : lerpAt(t, 299.5, 300.2, 520, 590)} y={Y - hop(1)} s={0.62} expr="happy" armR={t >= 300 ? 70 : 8} shake={t >= 300 && t < 302.3 ? 2 : 0} walk={t < 298.2} seed={3}/>}
            <Pop from={286.1} to={287.6}><At x={640} y={300}><Star size={70}/></At></Pop>
            <Pop from={286.3} to={287.8}><At x={1130} y={300}><Star size={70}/></At></Pop>
          </>
        )}
        {field && (
          <>
            <Ground/>
            {[0, 1, 2, 3, 4, 5].map((i) => <Character key={i} kind={['ex1', 'ex3', 'ex1', 'ex3', 'ex1', 'ex3'][i]} x={320 + i * 250} y={720} s={0.5} seed={i + 9}/>)}
            <Character kind="baba" outfit="eid" x={800} y={990} s={1.05} expr="happy" seed={4}/>
            <Character kind="sajjad" outfit="eid" x={1120} y={990} s={1.05} expr="happy" seed={1}/>
            <Pop from={321.2} to={324.7}><At x={765} y={570}><Star size={60}/></At></Pop>
            <Pop from={322.9} to={324.7}><At x={1085} y={570}><Star size={60}/></At></Pop>
          </>
        )}
      </Cam>
      {clean && <Clean dark={dark}/>}
      {t >= CARD.cta.f && <Clean/>}
      <div style={{position: 'absolute', inset: 0, background: '#fff', opacity: flash * 0.9}}/>
      <Pill from={272.6} to={277} x={960} y={50} text="ঈদের সকাল" bg="#FFD34D"/>
      <Pill from={318.6} to={324} x={960} y={50} text="ঈদের নামাজের মাঠ" bg="#9CC3E8"/>
      <Say b={BUB.bSize} cx={760} by={340} tx={760} ty={400} w={560}/>
      <Say b={BUB.sSize} cx={1010} by={340} tx={1010} ty={400} w={600}/>
      <Say b={BUB.nBan} cx={1330} by={340} tx={1330} ty={400} w={560}/>
      <Say b={BUB.sSaree} cx={1010} by={340} tx={1010} ty={400} w={680}/>
      <Quote b={CARD.q1}><PunjabiP color="#F2E4C4" collar="torn" w={560}/></Quote>
      <Quote b={CARD.q2}><PunjabiP color="#F2E4C4" collar="torn" w={340}/><Icon k="heart" s={80}/><PunjabiP color="#8B5A2B" collar="worn" w={340}/></Quote>
      <Quote b={CARD.q3}><PunjabiP color="#B9BEC4" collar="emb" w={330}/><Icon k="heart" s={90}/><PunjabiP color="#1F6B3F" w={330}/></Quote>
      <Pop from={CARD.ask1.f} to={CARD.ask1.t}>
        <At x={900} y={60}><Icon k="q" s={140}/></At>
        <Card x={210} y={260} w={1500}><div style={{fontFamily, fontWeight: 700, fontSize: 60, lineHeight: 1.45, textAlign: 'center'}}>{CARD.ask1.txt}</div></Card>
        <Opt x={260} text="ভুল হতো" color="#FFD6CC" letter="ক"/>
        <Opt x={1120} text="ভুল হতো না" color="#D3F0D6" letter="খ"/>
      </Pop>
      <Pop from={CARD.ask2.f} to={CARD.ask2.t}>
        <At x={900} y={60}><Icon k="heart" s={140}/></At>
        <Card x={210} y={300} w={1500}><div style={{fontFamily, fontWeight: 700, fontSize: 60, lineHeight: 1.45, textAlign: 'center'}}>{CARD.ask2.txt}</div></Card>
      </Pop>
      <Pop from={CARD.cta.f} to={CARD.cta.t} mode="fade">
        <div style={{position: 'absolute', left: 0, width: '100%', top: 90, textAlign: 'center', fontFamily, fontWeight: 700, fontSize: 120, color: '#E4572E'}}>Sajjad Animation</div>
      </Pop>
      {[['কমেন্টে আমাদের জানাও', 357.2, 260, '#9CC3E8'], ['লাইক ও শেয়ার করো', 358.4, 420, '#FFD6CC'], ['চ্যানেলটা সাবস্ক্রাইব করো', 361.4, 580, '#E4572E']].map(([txt, s, y, bg]) => (
        <Pop key={txt as string} from={s as number} to={368.1}>
          <Card x={480} y={y as number} w={960} bg={bg as string} pad={20}><div style={{fontFamily, fontWeight: 700, fontSize: 60, textAlign: 'center', color: (txt as string).includes('সাবস্ক্রাইব') ? '#fff' : OUT}}>{txt}</div></Card>
        </Pop>
      ))}
      <Pop from={364.3} to={368.1} mode="slide">
        <div style={{position: 'absolute', left: 0, width: '100%', top: 800, textAlign: 'center', fontFamily, fontWeight: 700, fontSize: 54}}>এমন মনের কাছাকাছি গল্প নিয়ে আমরা আবার আসছি</div>
      </Pop>
    </>
  );
};
