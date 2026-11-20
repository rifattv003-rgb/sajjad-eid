import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Cam, Pop, lerpAt, useT} from '../anim';
import {Character} from '../Character';
import {Room, Stool} from '../Backgrounds';
import {Hanger} from '../Props';
import {BUB} from '../data';
import {At, Icon, Pill, Say} from '../Ui';
import {Y} from '../theme';

// দৃশ্য ১ (0:00–0:38): বেডরুম -> বারান্দা
export const Scene1: React.FC = () => {
  const t = useT();
  const f = useCurrentFrame();
  const room = t < 25.2;
  const sx = lerpAt(t, 25.2, 27.2, -120, 520);
  return (
    <>
      <Cam z={[[19, 24.6, 1.4, 1250, 520]]} shake={[[22.8, 24.6, 3]]}>
        {room ? (
          <>
            <Room kind="bedroom"/>
            <At x={240} y={286}><Hanger size={120}/></At>
            <Character kind="sajjad" x={760} y={Y} expr={t < 6 ? 'surprised' : 'worried'} talk={t > 10.2 && t < 13.8} armL={t > 2.9 && t < 9 ? 70 : 8} seed={1}/>
            <Character kind="nusrat" x={1250} y={Y} expr={t < 17.2 ? 'neutral' : t < 19 ? 'worried' : 'shy'} talk={t > 17.2 && t < 19} down={t > 19} holdR="box:#d94141" armR={30} seed={2}/>
            <Character kind="rafi" x={1520} y={Y} s={0.62} bag expr="happy" seed={3}/>
            <Pop from={2.9} to={9.5}>
              <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0}}><circle cx={300} cy={330} r={80 + 8 * Math.sin(f / 5)} fill="none" stroke="#E4572E" strokeWidth={6} strokeDasharray="14 10"/></svg>
              <At x={235} y={90}><Icon k="q" s={130}/></At>
            </Pop>
          </>
        ) : (
          <>
            <Room kind="veranda"/>
            <Stool x={1100}/>
            <Character kind="baba" x={1100} y={980} sit expr={t < 32.9 ? 'think' : 'happy'} talk={t > 32.9 && t < 38.4} holdL="cloth:#F2E4C4:torn" armL={30} holdR="needle" armR={40} down={t < 32.9} seed={4}/>
            <Character kind="sajjad" x={sx} y={Y} walk={t < 27.2} expr={t < 32.9 ? 'worried' : 'sad'} seed={1}/>
          </>
        )}
      </Cam>
      <Pill from={0.3} to={6} x={960} y={50} text="ঈদের ৪ দিন আগে"/>
      <Pill from={25.3} to={31} x={960} y={50} text="বারান্দা" bg="#9CC3E8"/>
      <Say b={BUB.nNo} cx={1250} by={330} tx={1250} ty={400} w={480}/>
      <Say b={BUB.bCol} cx={1100} by={420} tx={1100} ty={470} w={720}/>
    </>
  );
};
