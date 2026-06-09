import { motion } from 'framer-motion';

interface OptionCardProps {
  title: string;
  description?: string;
  isSelected: boolean;
  onClick: () => void;
  reduceMotion: boolean;
}

const REST_RADIUS = '26px 30px 28px 32px';
const SELECTED_RADIUS = '30px 24px 32px 26px';

export function OptionCard({ title, description, isSelected, onClick, reduceMotion }: OptionCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={reduceMotion ? undefined : { scale: 0.985 }}
      animate={{
        borderColor: isSelected ? '#06192C' : 'rgba(6,25,44,0.16)',
        backgroundColor: isSelected ? 'rgba(243,211,91,0.14)' : '#FFFDF7',
        borderRadius: isSelected ? SELECTED_RADIUS : REST_RADIUS,
        boxShadow: isSelected
          ? '0 16px 36px -14px rgba(228,61,48,0.4)'
          : '0 2px 10px -6px rgba(6,25,44,0.12)',
        scale: isSelected ? 1.012 : 1,
      }}
      transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 280, damping: 24 }}
      className="w-full text-left p-5 border-[1.5px] flex items-start gap-4"
    >
      <span
        className={`mt-0.5 w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center shrink-0 transition-colors duration-200 ${
          isSelected ? 'border-[#06192C] bg-[#E43D30]' : 'border-[#06192C]/30 bg-[#FFFDF7]'
        }`}
      >
        <motion.span
          className="w-2 h-2 rounded-full bg-[#FFFDF7]"
          initial={false}
          animate={{ scale: isSelected ? 1 : 0, opacity: isSelected ? 1 : 0 }}
          transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 26 }}
        />
      </span>
      <span className="flex-1">
        <span className="block font-extrabold text-sm text-[#06192C] leading-snug">{title}</span>
        {description && (
          <span className="block text-xs text-[#06192C]/60 mt-1 leading-relaxed">{description}</span>
        )}
      </span>
    </motion.button>
  );
}
