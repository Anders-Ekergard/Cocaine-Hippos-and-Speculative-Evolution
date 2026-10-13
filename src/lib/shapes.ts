// Placeholder silhouettes (viewBox 0 0 120 60) until real artwork exists.
// Each is inner SVG markup filled with currentColor.
export const shapes = {
  hippo: `
    <ellipse cx="52" cy="30" rx="34" ry="16"/>
    <path d="M76 20 Q92 14 108 22 Q116 27 113 34 Q110 40 98 40 L80 40 Z"/>
    <circle cx="86" cy="17" r="3"/><circle cx="93" cy="17" r="3"/>
    <rect x="26" y="38" width="9" height="14" rx="3"/><rect x="40" y="40" width="9" height="12" rx="3"/>
    <rect x="62" y="40" width="9" height="12" rx="3"/><rect x="74" y="38" width="9" height="14" rx="3"/>
    <path d="M18 28 L10 34 L18 33 Z"/>`,
  croc: `
    <path d="M4 34 Q30 26 60 27 L96 28 Q112 29 117 33 Q112 36 96 36 L60 38 Q30 40 4 34 Z"/>
    <path d="M30 30 L34 24 L38 30 L42 24 L46 30 L50 24 L54 30 Z"/>
    <rect x="40" y="36" width="6" height="10" rx="2"/><rect x="64" y="36" width="6" height="10" rx="2"/>
    <circle cx="90" cy="27" r="2.5"/>`,
  fish: `
    <ellipse cx="54" cy="30" rx="34" ry="14"/>
    <path d="M22 30 L4 16 L8 30 L4 44 Z"/>
    <path d="M44 17 Q54 6 66 17 Z"/><path d="M48 43 Q56 52 62 43 Z"/>`,
  bird: `
    <ellipse cx="58" cy="34" rx="18" ry="11"/>
    <circle cx="76" cy="24" r="8"/>
    <path d="M83 23 L93 25 L83 27 Z"/>
    <path d="M42 32 L20 38 L42 38 Z"/>
    <path d="M54 44 L52 54 M62 44 L64 54" stroke="currentColor" stroke-width="2.5" fill="none"/>`,
  sirenian: `
    <path d="M14 30 Q30 16 64 18 Q96 20 108 28 Q112 32 106 36 Q94 42 64 42 Q30 44 14 30 Z"/>
    <path d="M16 30 L2 18 Q8 30 2 42 Z"/>
    <path d="M78 40 Q84 50 92 48 Q88 42 86 39 Z"/>`,
} as const;

export type Shape = keyof typeof shapes;
