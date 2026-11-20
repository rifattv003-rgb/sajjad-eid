import React from 'react';
import {Cam, Pop, lerpAt, prog, useT} from '../anim';
import {Character} from '../Character';
import {Clean, Room, Street, Table} from '../Backgrounds';
import {Parcel} from '../Props';
import {BUB, CARD} from '../data';
import {At, Card, Icon, Pill, Say} from '../Ui';
import {OUT, Y, fontFamily} from '../theme';

const ROWS: [string, string, number][] = [['রাফি', 'পাঞ্জাবি', 79.6], ['নুসরাত', 'সুতির শাড়ি', 81.5], ['মা', 'সাদা থান', 83.2], ['বাবা', 'পাঞ্জাবি', 84.4]];

// দৃশ্য ৩ (1:11–2:13): বোনাস, হিসাব, ইস্টার্ন প্লাজার কেনাকাটা
export const Scene3: React.FC = () => {
  const t = useT();
  const bonus = t < 76.0;
  const night = t >= 76.0 && t < 110;
  const street = t >= 110;
  const nx = t < 96.5 ? lerpAt(t, 95.1, 96.5, 2100, 1560) : lerpAt(t, 107.3, 110, 1560, 2100);
  const sx = lerpAt(t, 110, 114.4, -150, 760);
  const fill = prog(t, 71.5, 73.5) * 50;
  const parcels: [number, number, string, string][] = [[116.4, 1250, '#F7D038', 'রাফি'], [122.8, 1450, '#F4A6C0', 'নুসরাত'], [125.0, 1650, '#EDEDED', 'মা']];
  return (
    <>
      {bonus && <Clean/>}
      <Pop from={CARD.bonus.f} to={CARD.bonus.t}>
        <Card x={360} y={260} w={1200}>
          <div style={{fontFamily, fontWeight: 700, fontSize: 76, textAlign: 'center'}}>ঈদ বোনাস</div>
          <div style={{margin: '36px 0 20px', height: 70, border: `5px solid ${OUT}`, borderRadius: 40, background: '#eee', overflow: 'hidden'}}><div style={{width: `${fill * 2}%`, height: '100%', background: '#4CAF50'}}/></div>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily, fontWeight: 700, fontSize: 48}}>
            <span>এখন: ৫০%</span><span style={{display: 'flex', alignItems: 'center', gap: 14}}><Icon k="cal" s={64}/>বাকিটা ঈদের পর</span>
          </div>
        </Card>
      </Pop>
      <Cam z={[[90, 97, 1.5, 860, 600], [128.7, 133.1, 1.3, 760, 600]]}>
        {night && (
          <>
            <Room kind="night"/>
            <Character kind="sajjad" x={860} y={Y} expr={t < 88.4 ? 'think' : 'sad'} armR={40} seed={1}/>
            <Table x={860} w={900} top={690}/>
            <At x={715} y={500}>
              <div style={{position: 'relative', width: 300, height: 200, background: '#FFF8DC', border: `4px solid ${OUT}`, borderRadius: 8, transform: 'rotate(-3deg)', padding: '12px 24px', boxSizing: 'border-box', fontFamily, fontSize: 36, fontWeight: 600, color: OUT}}>
                {ROWS.map(([n, , s]) => t >= s && <div key={n} style={{height: 42}}>{n}</div>)}
                <div style={{position: 'absolute', left: 110, top: 156, height: 6, width: prog(t, 92.5, 94.0) * 120, background: '#E4572E'}}/>
              </div>
            </At>
            {t >= 107.3 && <At x={1080} y={645}><div style={{width: 46, height: 40, background: '#fff', border: `4px solid ${OUT}`, borderRadius: '0 0 14px 14px'}}/></At>}
            {t >= 95.1 && <Character kind="nusrat" x={nx} y={Y} walk={t < 96.5 || t > 107.3} expr={t < 105 ? 'neutral' : 'sad'} talk={t > 98.5 && t < 102.6} holdR={t < 107.3 ? 'cup' : undefined} armR={t < 107.3 ? 40 : 8} seed={2}/>}
          </>
        )}
        {street && (
          <>
            <Street/>
            <Character kind="sajjad" x={sx} y={Y} walk={t < 114.4} expr={t < 116.4 ? 'neutral' : t < 127 ? 'happy' : 'worried'} holdR={t >= 127.2 ? 'wallet' : undefined} armR={t >= 127.2 ? 60 : 8} seed={1}/>
            {parcels.map(([s, x, c]) => <Pop key={s} from={s} to={133.1}><At x={x - 75} y={760}><Parcel color={c}/></At></Pop>)}
            {[130.4, 131.0, 131.6].map((s, i) => <Pop key={s} from={s} to={133.1}><At x={870 + i * 90} y={360 - (i % 2) * 30}><Icon k="coin" s={80}/></At></Pop>)}
          </>
        )}
      </Cam>
      <Pill from={112.3} to={118} x={960} y={50} text="ইস্টার্ন প্লাজা" bg="#9CC3E8"/>
      {parcels.map(([s, x, , n]) => <Pill key={n} from={s} to={133.1} x={x} y={690} text={n} bg="#FFD34D" size={32}/>)}
      <Pop from={CARD.list.f} to={CARD.list.t}>
        <Card x={1260} y={190} w={580}>
          <div style={{fontFamily, fontWeight: 700, fontSize: 50, marginBottom: 14}}>ঈদের কেনাকাটা</div>
          {ROWS.map(([n, what, s]) => t >= s && <div key={n} style={{display: 'flex', alignItems: 'center', gap: 16, fontFamily, fontWeight: 600, fontSize: 42, margin: '12px 0'}}><Icon k="check" s={54}/>{n} – {what}</div>)}
          {t >= 87.4 && <div style={{display: 'flex', alignItems: 'center', gap: 16, fontFamily, fontWeight: 700, fontSize: 42, margin: '12px 0', color: '#E4572E'}}><Icon k="cross" s={54}/>নিজের – ?</div>}
        </Card>
      </Pop>
      <Say b={BUB.nSari} cx={1450} by={340} tx={1560} ty={400} w={560}/>
      <Say b={BUB.sSari} cx={800} by={340} tx={860} ty={400} w={600}/>
    </>
  );
};
