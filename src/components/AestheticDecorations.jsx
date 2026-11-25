import React from 'react';

// Cute Bear Mascot reading a book (matching the image)
export function BearMascot({ className = "w-24 h-24" }) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Ears */}
      <circle cx="36" cy="38" r="14" fill="#EAD5C3" stroke="#9A7B66" strokeWidth="2.5" />
      <circle cx="36" cy="38" r="8" fill="#F8B4C0" />
      <circle cx="84" cy="38" r="14" fill="#EAD5C3" stroke="#9A7B66" strokeWidth="2.5" />
      <circle cx="84" cy="38" r="8" fill="#F8B4C0" />

      {/* Head */}
      <ellipse cx="60" cy="52" rx="32" ry="28" fill="#FDF3E7" stroke="#9A7B66" strokeWidth="2.5" />

      {/* Cheeks */}
      <ellipse cx="42" cy="58" rx="6" ry="4" fill="#FFAEC0" opacity="0.6" />
      <ellipse cx="78" cy="58" rx="6" ry="4" fill="#FFAEC0" opacity="0.6" />

      {/* Eyes */}
      <circle cx="48" cy="48" r="3" fill="#4A3B32" />
      <circle cx="49" cy="47" r="1" fill="#FFFFFF" />
      <circle cx="72" cy="48" r="3" fill="#4A3B32" />
      <circle cx="73" cy="47" r="1" fill="#FFFFFF" />

      {/* Snout & Nose */}
      <ellipse cx="60" cy="57" rx="9" ry="7" fill="#FFFDF9" stroke="#B08D79" strokeWidth="1.5" />
      <ellipse cx="60" cy="54" rx="3.5" ry="2.5" fill="#5A3E2F" />
      <path d="M60 56.5V60M57 60Q60 62 63 60" stroke="#5A3E2F" strokeWidth="1.5" strokeLinecap="round" />

      {/* Body */}
      <path d="M40 76C36 84 34 100 42 106C52 110 68 110 78 106C86 100 84 84 80 76Z" fill="#F4E4D3" stroke="#9A7B66" strokeWidth="2.5" />

      {/* Lavender / Purple Bow Tie */}
      <path d="M54 74L46 68Q50 74 46 80L54 74Z" fill="#C084FC" stroke="#7E22CE" strokeWidth="1.5" />
      <path d="M66 74L74 68Q70 74 74 80L66 74Z" fill="#C084FC" stroke="#7E22CE" strokeWidth="1.5" />
      <circle cx="60" cy="74" r="3.5" fill="#DDD6FE" stroke="#7E22CE" strokeWidth="1.5" />

      {/* Hands holding open book */}
      <path d="M38 78Q44 86 52 88" stroke="#9A7B66" strokeWidth="3" strokeLinecap="round" />
      <path d="M82 78Q76 86 68 88" stroke="#9A7B66" strokeWidth="3" strokeLinecap="round" />

      {/* Open Lavender Book */}
      <path d="M34 94C46 88 58 92 60 96C62 92 74 88 86 94L83 108C73 103 62 105 60 108C58 105 47 103 37 108Z" fill="#E9D5FF" stroke="#7E22CE" strokeWidth="2" />
      <path d="M60 96V108" stroke="#7E22CE" strokeWidth="1.5" />
      <path d="M42 96C47 94 52 95 56 97" stroke="#A855F7" strokeWidth="1" strokeLinecap="round" />
      <path d="M64 97C68 95 73 94 78 96" stroke="#A855F7" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

// Cute Fluffy White Doggy / Bunny Mascot (like in Motivation card)
export function FluffyMascot({ className = "w-20 h-20" }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="30" cy="30" rx="10" ry="16" fill="#FFFDFD" stroke="#9D8BA1" strokeWidth="2" transform="rotate(-15 30 30)" />
      <ellipse cx="70" cy="30" rx="10" ry="16" fill="#FFFDFD" stroke="#9D8BA1" strokeWidth="2" transform="rotate(15 70 30)" />
      <ellipse cx="30" cy="32" rx="5" ry="9" fill="#FCE7F3" transform="rotate(-15 30 32)" />
      <ellipse cx="70" cy="32" rx="5" ry="9" fill="#FCE7F3" transform="rotate(15 70 32)" />
      <circle cx="50" cy="54" r="26" fill="#FFFFFF" stroke="#9D8BA1" strokeWidth="2" />
      <circle cx="41" cy="52" r="2.5" fill="#3D3043" />
      <circle cx="59" cy="52" r="2.5" fill="#3D3043" />
      <ellipse cx="36" cy="58" rx="5" ry="3" fill="#F472B6" opacity="0.5" />
      <ellipse cx="64" cy="58" rx="5" ry="3" fill="#F472B6" opacity="0.5" />
      <ellipse cx="50" cy="56" rx="2.5" ry="2" fill="#D946EF" />
      <path d="M47 60Q50 63 53 60" stroke="#3D3043" strokeWidth="1.5" strokeLinecap="round" />
      {/* Bow */}
      <path d="M46 72L40 68Q43 72 40 76L46 72Z" fill="#C084FC" />
      <path d="M54 72L60 68Q57 72 60 76L54 72Z" fill="#C084FC" />
      <circle cx="50" cy="72" r="2.5" fill="#E9D5FF" />
    </svg>
  );
}

// Cute Pastel Bow (like the top Pomodoro & Sidebar bows)
export function CuteRibbonBow({ className = "w-8 h-8", color = "#F472B6" }) {
  return (
    <svg className={className} viewBox="0 0 50 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 18C12 8 4 16 14 26C18 28 22 21 24 19Z" fill={color} stroke="#BE185D" strokeWidth="1.2" />
      <path d="M29 18C38 8 46 16 36 26C32 28 28 21 26 19Z" fill={color} stroke="#BE185D" strokeWidth="1.2" />
      {/* Tails */}
      <path d="M22 22C18 28 14 36 10 38C14 34 18 32 21 26Z" fill={color} />
      <path d="M28 22C32 28 36 36 40 38C36 34 32 32 29 26Z" fill={color} />
      {/* Center knot */}
      <ellipse cx="25" cy="19" rx="4.5" ry="4" fill="#FBCFE8" stroke="#BE185D" strokeWidth="1.2" />
    </svg>
  );
}

// Lavender Sprigs in a ceramic vase
export function LavenderVase({ className = "w-16 h-20" }) {
  return (
    <svg className={className} viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Stems */}
      <path d="M30 45Q22 25 18 10" stroke="#78716C" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M30 45Q30 20 30 6" stroke="#78716C" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M30 45Q38 25 42 10" stroke="#78716C" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Lavender Blossoms */}
      <circle cx="17" cy="11" r="2.5" fill="#C084FC" />
      <circle cx="19" cy="14" r="2.5" fill="#A855F7" />
      <circle cx="16" cy="17" r="2.5" fill="#DDD6FE" />
      <circle cx="20" cy="20" r="2.5" fill="#C084FC" />
      <circle cx="17" cy="23" r="2.5" fill="#9333EA" />

      <circle cx="29" cy="7" r="2.5" fill="#C084FC" />
      <circle cx="31" cy="10" r="2.5" fill="#DDD6FE" />
      <circle cx="28" cy="14" r="2.5" fill="#A855F7" />
      <circle cx="32" cy="17" r="2.5" fill="#9333EA" />
      <circle cx="29" cy="21" r="2.5" fill="#C084FC" />

      <circle cx="43" cy="11" r="2.5" fill="#C084FC" />
      <circle cx="41" cy="14" r="2.5" fill="#A855F7" />
      <circle cx="44" cy="17" r="2.5" fill="#DDD6FE" />
      <circle cx="40" cy="20" r="2.5" fill="#C084FC" />
      <circle cx="43" cy="23" r="2.5" fill="#9333EA" />

      {/* Ceramic Bottle */}
      <path d="M26 42H34V46C34 46 44 49 44 65C44 73 38 74 30 74C22 74 16 73 16 65C16 49 26 46 26 46V42Z" fill="#F5F3FF" stroke="#A78BFA" strokeWidth="1.8" />
      <ellipse cx="30" cy="42" rx="4" ry="1.5" fill="#DDD6FE" stroke="#A78BFA" strokeWidth="1.5" />
      <ellipse cx="30" cy="62" rx="9" ry="5" fill="#EDE9FE" />
      <text x="30" y="64" textAnchor="middle" fontSize="6" fill="#8B5CF6" fontFamily="sans-serif">focus</text>
    </svg>
  );
}

// Paperclip SVG
export function Paperclip({ className = "w-5 h-8", color = "#D8B4FE" }) {
  return (
    <svg className={className} viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 12V28C8 32.4183 11.5817 36 16 36C20.4183 36 24 32.4183 24 28V8C24 3.58172 20.4183 0 16 0C11.5817 0 8 3.58172 8 8V27C8 29.2091 9.79086 31 12 31C14.2091 31 16 29.2091 16 27V12"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Decorative Sparkles
export function SparkleIcon({ className = "w-4 h-4 text-purple-400" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
    </svg>
  );
}
