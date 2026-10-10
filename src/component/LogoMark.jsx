import { useId } from "react";

const LogoMark = ({ letter, className = "" }) => {
  const gradientId = `logo-gold-${useId()}`;
  const fill = `url(#${gradientId})`;

  return (
    <svg viewBox="0 0 60 56" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d9b97f" />
          <stop offset="45%" stopColor="#a8875a" />
          <stop offset="100%" stopColor="#7a5c33" />
        </linearGradient>
      </defs>

      <text
        x="27"
        y="45"
        textAnchor="middle"
        fontSize="50"
        fontWeight="500"
        fill={fill}
        style={{ fontFamily: '"Cormorant Garamond", "Times New Roman", serif' }}
      >
        {letter}
      </text>

      {/* Open orbit: an ellipse with a gap near the star */}
      <ellipse
        cx="28"
        cy="34"
        rx="25"
        ry="8.5"
        transform="rotate(-22 28 34)"
        fill="none"
        stroke={fill}
        strokeWidth="1.3"
        strokeLinecap="round"
        pathLength="100"
        strokeDasharray="80 20"
        strokeDashoffset="-4"
      />

      <path
        d="M51 6c.35 3.4 2.6 5.65 6 6-3.4.35-5.65 2.6-6 6-.35-3.4-2.6-5.65-6-6 3.4-.35 5.65-2.6 6-6Z"
        fill={fill}
        className="origin-[51px_12px] transition-transform duration-500 group-hover:rotate-90"
      />
    </svg>
  );
};

export default LogoMark;
