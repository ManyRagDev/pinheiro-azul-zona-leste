import { motion } from 'framer-motion';

interface FluidMeshBackgroundProps {
  reduceMotion: boolean;
}

const blobs = [
  {
    color: '#28C7BA',
    className: 'w-[640px] h-[640px] -left-48 -top-40',
    duration: 30,
    path: { x: [0, 70, -30, 0], y: [0, -40, 50, 0], scale: [1, 1.1, 0.96, 1] },
  },
  {
    color: '#E43D30',
    className: 'w-[560px] h-[560px] right-[-220px] top-[18%]',
    duration: 36,
    path: { x: [0, -60, 40, 0], y: [0, 60, -30, 0], scale: [1, 0.94, 1.08, 1] },
  },
  {
    color: '#F3D35B',
    className: 'w-[520px] h-[520px] left-[12%] bottom-[-260px]',
    duration: 42,
    path: { x: [0, 50, -50, 0], y: [0, -30, 20, 0], scale: [1, 1.06, 0.98, 1] },
  },
];

export function FluidMeshBackground({ reduceMotion }: FluidMeshBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#F4F0E8]" />
      {blobs.map((blob, i) => (
        <motion.div
          key={blob.color}
          className={`absolute rounded-full blur-[120px] ${blob.className}`}
          style={{
            background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
            opacity: 0.16,
          }}
          animate={
            reduceMotion
              ? undefined
              : { x: blob.path.x, y: blob.path.y, scale: blob.path.scale }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: blob.duration,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 1.5,
                }
          }
        />
      ))}
      <div className="absolute inset-0 bg-[#F4F0E8]/55" />
    </div>
  );
}
