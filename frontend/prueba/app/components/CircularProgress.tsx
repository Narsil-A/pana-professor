'use client';

import React from 'react';

interface CircularProgressProps {
  percentage: number;
  text?: string;
  size?: number; // Optional size property in pixels
  strokeWidth?: number; // Optional stroke width property
  color?: string; // Optional color property
  trailColor?: string; // Optional trail color property
  gradient?: [string, string]; // Optional gradient colors
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  text = `${percentage}%`,
  size = 120,
  strokeWidth = 4,
  color = '#4A90E2',
  trailColor = '#d6d6d6',
  gradient,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative circular-progress-container">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="circular-progress"
      >
        <defs>
          {gradient && (
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={gradient[0]} />
              <stop offset="100%" stopColor={gradient[1]} />
            </linearGradient>
          )}
        </defs>
        <circle
          className="circular-progress-trail"
          stroke={trailColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="circular-progress-path"
          stroke={gradient ? "url(#progressGradient)" : color}
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset,
            transition: 'stroke-dashoffset 1s ease-out',
          }}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
          fontSize="1.5em"
          fill={color}
        >
          {text}
        </text>
      </svg>
      <style jsx>{`
        .circular-progress-container:hover .circular-progress-path {
          stroke-dashoffset: ${circumference};
          animation: refill 1s forwards;
        }
        @keyframes refill {
          0% {
            stroke-dashoffset: ${circumference};
          }
          100% {
            stroke-dashoffset: ${strokeDashoffset};
          }
        }
      `}</style>
    </div>
  );
};

export default CircularProgress;



