import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';

export type CaminhoStatus = 'done' | 'active' | 'upcoming' | 'skipped';

export interface CaminhoWaypoint {
  label: string;
  status: CaminhoStatus;
  hint?: string;
}

interface CaminhoOrganicoProps {
  waypoints: CaminhoWaypoint[];
  progress: number;
  mode: 'compact' | 'synthesis';
  reduceMotion: boolean;
}

const HORIZONTAL_D = 'M 6 34 C 70 4, 140 64, 210 34 S 350 4, 420 34 S 540 60, 594 30';
const VERTICAL_D = 'M 28 6 C 4 80, 64 150, 28 220 S 4 360, 28 430 S 60 540, 24 594';

const dotClasses: Record<CaminhoStatus, string> = {
  done: 'bg-[#E43D30] border-[#E43D30]',
  active: 'bg-[#FFFDF7] border-[#E43D30]',
  upcoming: 'bg-transparent border-[#06192C]/25 border-dashed',
  skipped: 'bg-transparent border-[#06192C]/15 border-dashed',
};

function CurveWithMarker({
  d,
  viewBox,
  progress,
  reduceMotion,
  className,
}: {
  d: string;
  viewBox: string;
  progress: number;
  reduceMotion: boolean;
  className: string;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const progressMotion = useMotionValue(0);
  const [marker, setMarker] = useState({ x: 0, y: 0, ready: false });

  useEffect(() => {
    const place = (value: number) => {
      const path = pathRef.current;
      if (!path) return;
      const length = path.getTotalLength();
      const point = path.getPointAtLength(length * Math.min(Math.max(value, 0), 1));
      setMarker({ x: point.x, y: point.y, ready: true });
    };
    place(progressMotion.get());
    const unsubscribe = progressMotion.on('change', place);
    return unsubscribe;
  }, [d, progressMotion]);

  useEffect(() => {
    if (reduceMotion) {
      progressMotion.set(progress);
      return;
    }
    const controls = animate(progressMotion, progress, {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [progress, reduceMotion, progressMotion]);

  return (
    <svg viewBox={viewBox} className={className} aria-hidden="true">
      <path
        d={d}
        fill="none"
        stroke="#06192C"
        strokeOpacity={0.14}
        strokeWidth={2}
        strokeDasharray="1.5 7"
        strokeLinecap="round"
      />
      <motion.path
        ref={pathRef}
        d={d}
        fill="none"
        stroke="#E43D30"
        strokeWidth={2.25}
        strokeLinecap="round"
        style={{ pathLength: progressMotion }}
      />
      {marker.ready && (
        <>
          <circle cx={marker.x} cy={marker.y} r={8} fill="#E43D30" opacity={0.16} style={{ filter: 'blur(3px)' }} />
          <circle cx={marker.x} cy={marker.y} r={3.5} fill="#FFFDF7" stroke="#E43D30" strokeWidth={2} />
        </>
      )}
    </svg>
  );
}

export function CaminhoOrganico({ waypoints, progress, mode, reduceMotion }: CaminhoOrganicoProps) {
  if (mode === 'compact') {
    return (
      <motion.div layoutId="caminho-organico" className="relative w-full max-w-md mx-auto">
        <CurveWithMarker
          d={HORIZONTAL_D}
          viewBox="0 0 600 68"
          progress={progress}
          reduceMotion={reduceMotion}
          className="w-full h-12 overflow-visible"
        />
        <div className="absolute inset-0 flex items-center justify-between px-1">
          {waypoints.map((wp) => (
            <div key={wp.label} className="flex flex-col items-center gap-1.5">
              <span
                className={`w-3 h-3 rounded-full border-[1.5px] transition-colors duration-300 ${dotClasses[wp.status]} ${
                  wp.status === 'active' && !reduceMotion ? 'animate-pulse' : ''
                }`}
              />
              <span
                className={`text-[9px] uppercase font-bold tracking-wider whitespace-nowrap ${
                  wp.status === 'upcoming' || wp.status === 'skipped' ? 'text-[#06192C]/35' : 'text-[#06192C]'
                }`}
              >
                {wp.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div layoutId="caminho-organico" className="relative w-full md:w-44 shrink-0 md:py-4">
      <CurveWithMarker
        d={VERTICAL_D}
        viewBox="0 0 56 600"
        progress={progress}
        reduceMotion={reduceMotion}
        className="hidden md:block absolute left-3 top-0 w-12 h-full overflow-visible"
      />
      <div className="relative flex md:flex-col gap-4 md:gap-7 md:pl-12 overflow-x-auto md:overflow-visible pb-1">
        {waypoints.map((wp) => (
          <div key={wp.label} className="flex items-start gap-3 shrink-0">
            <span
              className={`mt-0.5 w-3.5 h-3.5 rounded-full border-[1.5px] shrink-0 transition-colors duration-300 ${dotClasses[wp.status]}`}
            />
            <div className="min-w-[7rem]">
              <span
                className={`block text-[10px] uppercase font-black tracking-wider ${
                  wp.status === 'upcoming' || wp.status === 'skipped' ? 'text-[#06192C]/35' : 'text-[#06192C]'
                }`}
              >
                {wp.label}
              </span>
              {wp.hint && (
                <span className="block text-[10px] text-[#06192C]/55 leading-snug mt-0.5 max-w-[11rem]">
                  {wp.hint}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
