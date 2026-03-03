import React from 'react';
import { motion } from 'framer-motion';

export const Sunny = () => (
  <motion.svg
    viewBox="0 0 64 64"
    className="w-full h-full"
    animate={{ rotate: 360 }}
    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
  >
    <circle cx="32" cy="32" r="12" fill="#FACC15" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
      <line
        key={angle}
        x1="32"
        y1="12"
        x2="32"
        y2="4"
        stroke="#FACC15"
        strokeWidth="4"
        strokeLinecap="round"
        transform={`rotate(${angle} 32 32)`}
      />
    ))}
  </motion.svg>
);

export const Cloudy = () => (
  <div className="relative w-full h-full">
    <motion.svg
      viewBox="0 0 64 64"
      className="absolute inset-0"
      animate={{ x: [-5, 5, -5] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <path
        d="M46.5,31.5c0-4.7-3.8-8.5-8.5-8.5c-0.6,0-1.2,0.1-1.8,0.2c-1.3-3.6-4.7-6.2-8.7-6.2c-5.1,0-9.2,4.1-9.2,9.2c0,0.5,0,0.9,0.1,1.4 C14.3,28.6,11,32.2,11,36.5c0,5.2,4.2,9.5,9.5,9.5h26c4.7,0,8.5-3.8,8.5-8.5C55,34.3,51.2,31.5,46.5,31.5z"
        fill="#94A3B8"
      />
    </motion.svg>
    <motion.svg
      viewBox="0 0 64 64"
      className="absolute inset-0"
      animate={{ x: [5, -5, 5] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      <path
        d="M47,39c0-4.4-3.6-8-8-8c-0.6,0-1.1,0.1-1.7,0.2c-1.2-3.4-4.5-5.8-8.3-5.8c-4.8,0-8.7,3.9-8.7,8.7c0,0.4,0,0.9,0.1,1.3 C16.5,36.3,13.3,39.6,13.3,43.7c0,4.9,4,8.9,8.9,8.9H47c4.4,0,8-3.6,8-8C55,41.6,51.4,39,47,39z"
        fill="#CBD5E1"
      />
    </motion.svg>
  </div>
);

export const Rainy = () => (
  <div className="relative w-full h-full">
    <motion.svg viewBox="0 0 64 64">
      <path
        d="M46.5,31.5c0-4.7-3.8-8.5-8.5-8.5c-0.6,0-1.2,0.1-1.8,0.2c-1.3-3.6-4.7-6.2-8.7-6.2c-5.1,0-9.2,4.1-9.2,9.2c0,0.5,0,0.9,0.1,1.4 C14.3,28.6,11,32.2,11,36.5c0,5.2,4.2,9.5,9.5,9.5h26c4.7,0,8.5-3.8,8.5-8.5C55,34.3,51.2,31.5,46.5,31.5z"
        fill="#64748B"
      />
      {[1, 2, 3].map((i) => (
        <motion.line
          key={i}
          x1={20 + i * 10}
          y1="48"
          x2={18 + i * 10}
          y2="58"
          stroke="#60A5FA"
          strokeWidth="3"
          strokeLinecap="round"
          animate={{ y: [0, 10], opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
    </motion.svg>
  </div>
);

export const Snowy = () => (
  <div className="relative w-full h-full">
    <motion.svg viewBox="0 0 64 64">
      <path
        d="M46.5,31.5c0-4.7-3.8-8.5-8.5-8.5c-0.6,0-1.2,0.1-1.8,0.2c-1.3-3.6-4.7-6.2-8.7-6.2c-5.1,0-9.2,4.1-9.2,9.2c0,0.5,0,0.9,0.1,1.4 C14.3,28.6,11,32.2,11,36.5c0,5.2,4.2,9.5,9.5,9.5h26c4.7,0,8.5-3.8,8.5-8.5C55,34.3,51.2,31.5,46.5,31.5z"
        fill="#94A3B8"
      />
      {[1, 2, 3].map((i) => (
        <motion.circle
          key={i}
          cx={20 + i * 10}
          cy="48"
          r="2.5"
          fill="white"
          animate={{ y: [0, 12], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}
    </motion.svg>
  </div>
);

export const PartlyCloudy = () => (
  <div className="relative w-full h-full">
    <motion.svg
      viewBox="0 0 64 64"
      className="absolute w-2/3 h-2/3 top-2 left-2"
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      <circle cx="32" cy="32" r="12" fill="#FACC15" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <line
          key={angle}
          x1="32"
          y1="12"
          x2="32"
          y2="4"
          stroke="#FACC15"
          strokeWidth="4"
          strokeLinecap="round"
          transform={`rotate(${angle} 32 32)`}
        />
      ))}
    </motion.svg>
    <motion.svg
      viewBox="0 0 64 64"
      className="absolute inset-0"
      animate={{ x: [-3, 3, -3] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <path
        d="M47,39c0-4.4-3.6-8-8-8c-0.6,0-1.1,0.1-1.7,0.2c-1.2-3.4-4.5-5.8-8.3-5.8c-4.8,0-8.7,3.9-8.7,8.7c0,0.4,0,0.9,0.1,1.3 C16.5,36.3,13.3,39.6,13.3,43.7c0,4.9,4,8.9,8.9,8.9H47c4.4,0,8-3.6,8-8C55,41.6,51.4,39,47,39z"
        fill="#E2E8F0"
      />
    </motion.svg>
  </div>
);

export const Stormy = () => (
  <div className="relative w-full h-full">
    <motion.svg viewBox="0 0 64 64">
      <path
        d="M46.5,31.5c0-4.7-3.8-8.5-8.5-8.5c-0.6,0-1.2,0.1-1.8,0.2c-1.3-3.6-4.7-6.2-8.7-6.2c-5.1,0-9.2,4.1-9.2,9.2c0,0.5,0,0.9,0.1,1.4 C14.3,28.6,11,32.2,11,36.5c0,5.2,4.2,9.5,9.5,9.5h26c4.7,0,8.5-3.8,8.5-8.5C55,34.3,51.2,31.5,46.5,31.5z"
        fill="#475569"
      />
      <motion.path
        d="M32,46 L28,54 L32,54 L28,62"
        fill="none"
        stroke="#FACC15"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ opacity: [0, 1, 0, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, times: [0, 0.1, 0.2, 0.8, 1] }}
      />
      {[1, 2].map((i) => (
        <motion.line
          key={i}
          x1={20 + i * 15}
          y1="48"
          x2={18 + i * 15}
          y2="58"
          stroke="#60A5FA"
          strokeWidth="3"
          strokeLinecap="round"
          animate={{ y: [0, 10], opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </motion.svg>
  </div>
);

export const WeatherIcon = ({ type, className }: { type: string, className?: string }) => {
  const icons: Record<string, React.ReactNode> = {
    sunny: <Sunny />,
    cloudy: <Cloudy />,
    rainy: <Rainy />,
    snowy: <Snowy />,
    'partly-cloudy': <PartlyCloudy />,
    stormy: <Stormy />,
  };

  return <div className={className}>{icons[type] || <Sunny />}</div>;
};
