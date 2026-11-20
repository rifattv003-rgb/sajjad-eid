import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Pop, useT} from '../anim';
import {Character} from '../Character';
import {Building, Clean, Room, Table} from '../Backgrounds';
import {Bowl} from '../Props';
import {CARD} from '../data';
import {At, Card, Icon, Pill} from '../Ui';
import {OUT, Y, fontFamily} from '../theme';

const XS = [420, 720, 1020, 1320, 1620];
const KINDS = ['baba', 'ma', 'sajjad', 'nusrat', 'rafi'];

const Fridge: React.FC<{open: boolean}> = ({open}) => (
  <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0}}>
    {open ? (
      <g stroke={OUT} strokeWidth={4}>
        <rect x={1050} y={260} width={300} height={620} fill="#E8F4FF"/>
        {[400, 540, 680].map((y) => <path key={y} d={`M1050 ${y} H1350`} stroke="#9bb"/>)}
        <path d="M1050 260 L990 290 V850 L1050 880Z" fill="#fff"/>
      </g>
    ) : (
      <g stroke={OUT} strokeWidth={4}>
        <rect x={1050} y={260} width={300} height={620} rx={16} fill="#fff"/>
        <path d="M1050 520 H1350"/>
        <rect x={1318} y={330} width={12} height={120} rx={6} fill="#bbb"/>
      </g>
    )}
  </svg>
);

// দৃশ্য ২ (0:38–1:11): মিরপুরের ফ্ল্যাট ও পরিবার
export const Scene2: React.FC = () => {
  const t = useT();
  const f = useCurrentFrame();
  const building = t < 41.8;
  const cal = t >= CARD.cal15.f && t < CARD.cal15.t;
  const kitchen = t >= 57.0 && t < 62.9;
  const line = !building && !cal && !kitchen;
  const bustle = t >= 62.9;
  const names: [string, number, number][] = [['বাবা', 43.2, 380], ['মা', 43.8, 380], ['সাজ্জাদ', 41.9, 380], ['নুসরাত', 44.7, 380], ['রাফি', 46.5, 560]];
  const nameX = [420, 720, 1020, 1320, 1620];
  const order = [0, 1, 2, 3, 4];
  const pill = [0, 1, 2, 3, 4].map((i) => ({x: nameX[i], ...({0: names[0], 1: names[1], 2: names[2], 3: names[3], 4: names[4]} as Record<number, [string, number, number]>)[i]}));
  return (
    <>
      {building && <Building glow={0.5 + 0.5 * Math.sin(f / 6)}/>}
      {cal && <Clean/>}
      {kitchen && (
        <>
          <Room kind="kitchen"/>
          <Fridge open={t >= 60.4 && t < 62.5}/>
          <Character kind="ma" x={900} y={Y} expr="sad" armR={t >= 60.4 && t < 62.5 ? 70 : 8} seed={5}/>
          <Table x={450} w={500} top={760}/>
          <Pop from={57.0} to={59.4}><At x={340} y={625}><Bowl w={220}/></At></Pop>
        </>
      )}
      {line && (
        <>
          <Room kind="living"/>
          {order.map((i) => (
            <Character key={i} kind={KINDS[i]} x={XS[i]} y={Y - (bustle ? Math.abs(Math.sin(f / 6 + i * 1.3)) * 22 : 0)} s={i === 4 ? 0.62 : 0.9} expr={bustle ? 'happy' : i === 3 ? 'neutral' : 'neutral'} bag={i === 4 ? false : undefined} seed={i + 1}/>
          ))}
        </>
      )}
      {building && (
        <>
          <Pill from={38.6} to={47} x={960} y={50} text="মিরপুর"/>
          <Pill from={39.4} to={41.8} x={1560} y={300} text="তিনতলা" bg="#FFD34D"/>
          <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0}}><path d="M1000 340 H1430" stroke={OUT} strokeWidth={5} strokeDasharray="12 10"/></svg>
        </>
      )}
      {!building && t < 54.8 && pill.map((p, i) => <Pill key={i} from={p[1]} to={48} x={p.x} y={p[2]} text={p[0]} bg={['#9CC3E8', '#F4A6C0', '#B7E4C7', '#FFD34D', '#E9C46A'][i]}/>)}
      <Pill from={48.2} to={50.3} x={1020} y={290} text="প্রাইভেট কোম্পানি" bg="#B7E4C7"/>
      <Pop from={48.2} to={50.3}><At x={970} y={160}><Icon k="bag" s={100}/></At></Pop>
      <Pill from={50.4} to={54.7} x={420} y={290} text="অবসরপ্রাপ্ত শিক্ষক" bg="#E9C46A"/>
      <Pop from={50.4} to={54.7}><At x={370} y={160}><Icon k="board" s={100}/></At></Pop>
      <Pop from={CARD.cal15.f} to={CARD.cal15.t}>
        <Card x={540} y={250} w={840}>
          <div style={{display: 'flex', alignItems: 'center', gap: 40, justifyContent: 'center'}}>
            <Icon k="cal" s={300}/>
            <div style={{fontFamily, fontWeight: 700, lineHeight: 1.1}}><div style={{fontSize: 210, color: '#E4572E'}}>১৫</div><div style={{fontSize: 56}}>তারিখ পার হলে</div></div>
          </div>
        </Card>
      </Pop>
      {[63.6, 64.6, 65.6, 66.6, 67.6].map((s, i) => <Pop key={i} from={s} to={71}><At x={XS[i] - 45} y={i === 4 ? 470 : 280}><Icon k="check" s={90}/></At></Pop>)}
      <Pop from={68.5} to={71}><At x={860} y={120}><Icon k="board" s={200}/></At></Pop>
    </>
  );
};
