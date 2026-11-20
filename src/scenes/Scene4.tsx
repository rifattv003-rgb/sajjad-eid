import React from 'react';
import {Cam, Pop, lerpAt, useT} from '../anim';
import {Character} from '../Character';
import {Counter, Room, ShopIn, Street, Table} from '../Backgrounds';
import {Bowl, Notes, PunjabiP} from '../Props';
import {BUB, CARD} from '../data';
import {At, Icon, Note, Pill, Say, Stamp} from '../Ui';
import {OUT, Y} from '../theme';

// দৃশ্য ৪ (2:13–3:14): তিন দোকান, রাতের খাবার টেবিল, চিরকুট
export const Scene4: React.FC = () => {
  const t = useT();
  const shop1 = t < 141.9, shop2 = t >= 141.9 && t < 151.7, st = t >= 151.7 && t < 156.4, dine = t >= 156.4 && t < 172.7, night = t >= 172.7;
  const kx = t >= 148.4 ? lerpAt(t, 148.4, 149.4, 1350, 1680) : 1350;
  const dx = lerpAt(t, 156.4, 159.5, -150, 560);
  const bowlX = lerpAt(t, 169, 171.2, 1150, 780);
  const noteX = lerpAt(t, 189.7, 191.0, 750, 1010);
  return (
    <>
      <Cam z={[[187, 192, 1.35, 900, 500]]}>
        {(shop1 || shop2) && (
          <>
            <ShopIn wall={shop1 ? '#F3E6D0' : '#E6EAD0'}/>
            <Character kind={shop1 ? 'ex2' : 'ex4'} x={kx} y={Y} flip={t >= 148.4} expr="neutral" seed={7}/>
            <Counter/>
            <Character kind="sajjad" x={560} y={1010} s={1.05} expr={t < 138.8 ? 'neutral' : 'sad'} talk={t > 144.4 && t < 147.2} holdR={shop1 && t >= 136.5 && t < 139.4 ? 'cloth:#1F2A44' : undefined} armR={shop1 && t >= 136.5 && t < 139.4 ? 55 : 8} seed={1}/>
            {shop1 && t >= 140 && <At x={640} y={620}><PunjabiP color="#1F2A44" w={190}/></At>}
          </>
        )}
        {st && (
          <>
            <Street/>
            <Character kind="sajjad" x={t < 154.6 ? 520 : lerpAt(t, 154.6, 156.4, 520, 1000)} y={Y} walk={t >= 154.6} expr="sad" seed={1}/>
            <Pop from={153.5} to={156.4}><At x={380} y={600}><div style={{width: 150, height: 90, background: '#fff', border: `4px solid ${OUT}`, borderRadius: 8, transform: 'rotate(-5deg)', fontSize: 70, fontWeight: 700, textAlign: 'center'}}>৳</div></At></Pop>
          </>
        )}
        {dine && (
          <>
            <Room kind="dining"/>
            <Character kind="baba" x={1250} y={Y} expr={t < 166.4 ? 'worried' : 'happy'} talk={t > 162.7 && t < 166.4} seed={4}/>
            <Character kind="sajjad" x={dx} y={Y} walk={t < 159.5} expr="sad" talk={t > 166.6 && t < 168.9} seed={1}/>
            <Table x={1000} w={1000} top={700}/>
            <At x={820} y={600}><svg width={160} height={110}><path d="M10 100 Q10 10 80 10 Q150 10 150 100Z" fill="#cfd8dc" stroke={OUT} strokeWidth={4}/><circle cx={80} cy={8} r={9} fill="#90a4ae" stroke={OUT} strokeWidth={3}/></svg></At>
            <At x={bowlX - 75} y={618}><Bowl w={150}/></At>
          </>
        )}
        {night && (
          <>
            <Room kind="night"/>
            <Character kind="sajjad" x={860} y={Y} expr={t < 180 ? 'think' : t < 187 ? 'sad' : 'cry'} holdR={t >= 189.7 ? 'wallet' : undefined} armR={t >= 189.7 ? 55 : 40} seed={1}/>
            <Table x={860} w={900} top={690}/>
            <At x={715} y={500}><div style={{width: 300, height: 200, background: '#FFF8DC', border: `4px solid ${OUT}`, borderRadius: 8, transform: 'rotate(-3deg)'}}/></At>
            <Pop from={176.4} to={191.4}><At x={t < 189.7 ? 700 : noteX} y={t < 189.7 ? 560 : lerpAt(t, 189.7, 191, 560, 500)}><Notes w={130}/></At></Pop>
            <Pop from={176.9} to={191.4}><At x={t < 189.7 ? 770 : noteX + 40} y={t < 189.7 ? 600 : lerpAt(t, 189.7, 191, 600, 520)}><Notes w={130}/></At></Pop>
            <Pop from={178.5} to={182.5}><At x={960} y={600}><div style={{width: 80, height: 60, background: '#FFF6B0', border: `3px solid ${OUT}`, transform: 'rotate(8deg)'}}/></At></Pop>
          </>
        )}
      </Cam>
      <Pill from={133.3} to={137} x={960} y={50} text="প্রথম দোকান" bg="#9CC3E8"/>
      <Pill from={142.1} to={146} x={960} y={50} text="দ্বিতীয় দোকান" bg="#9CC3E8"/>
      <Pill from={151.8} to={155} x={960} y={50} text="তৃতীয় দোকান" bg="#9CC3E8"/>
      <Pill from={156.5} to={161} x={960} y={50} text="রাত ১০টা" bg="#FFD34D"/>
      <Stamp b={CARD.b1k} x={960} y={400} text="বাজেট: ১০০০ টাকা" size={84}/>
      <Say b={BUB.bLate} cx={1250} by={340} tx={1250} ty={400} w={560}/>
      <Say b={BUB.sAll} cx={560} by={340} tx={560} ty={400} w={560}/>
      <Note b={CARD.chit} x={960} y={210} w={760} size={56}/>
      <Pop from={182.5} to={186.8}><At x={1560} y={250}><Icon k="heart" s={110}/></At></Pop>
    </>
  );
};
