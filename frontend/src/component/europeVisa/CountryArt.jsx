// Original flat illustrations of each country's best-known landmark.
// Drawn as SVG so they stay sharp, load instantly and need no image files.
// To use a real photo instead, set `photo` on the country in data/europeWorkVisa.js.

const Clouds = ({ fill = "#fff", o = 0.85 }) => (
  <g fill={fill} opacity={o}>
    <ellipse cx="70" cy="48" rx="30" ry="9" />
    <ellipse cx="92" cy="42" rx="20" ry="8" />
    <ellipse cx="318" cy="70" rx="34" ry="9" />
    <ellipse cx="338" cy="63" rx="20" ry="8" />
  </g>
);

const Poland = () => (
  <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="pl-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#f8d9dc" />
        <stop offset="1" stopColor="#fff6f0" />
      </linearGradient>
    </defs>
    <rect width="400" height="250" fill="url(#pl-sky)" />
    <circle cx="320" cy="62" r="26" fill="#fff" opacity=".9" />
    <Clouds fill="#fff" />
    {/* city blocks */}
    <g fill="#c9a3a8">
      <rect x="20" y="150" width="46" height="100" />
      <rect x="70" y="170" width="38" height="80" />
      <rect x="285" y="160" width="44" height="90" />
      <rect x="334" y="140" width="48" height="110" />
    </g>
    <g fill="#e9cfd2">
      {[...Array(4)].map((_, r) =>
        [0, 1, 2].map((c) => <rect key={`a${r}${c}`} x={28 + c * 13} y={160 + r * 18} width="7" height="9" />)
      )}
      {[...Array(4)].map((_, r) =>
        [0, 1, 2].map((c) => <rect key={`b${r}${c}`} x={342 + c * 14} y={152 + r * 20} width="7" height="9" />)
      )}
    </g>
    {/* Palace of Culture and Science — stepped tower with spire */}
    <g fill="#8e2330">
      <rect x="150" y="196" width="100" height="54" />
      <rect x="130" y="212" width="140" height="38" />
      <rect x="162" y="150" width="76" height="50" />
      <rect x="172" y="108" width="56" height="46" />
      <rect x="182" y="72" width="36" height="40" />
      <rect x="191" y="46" width="18" height="30" />
      <polygon points="196,46 200,14 204,46" />
      <rect x="199" y="6" width="2" height="12" />
    </g>
    <g fill="#b64453">
      <rect x="150" y="196" width="100" height="6" />
      <rect x="162" y="150" width="76" height="5" />
      <rect x="172" y="108" width="56" height="5" />
      <rect x="182" y="72" width="36" height="5" />
      <rect x="130" y="212" width="12" height="38" />
      <rect x="258" y="212" width="12" height="38" />
    </g>
    <g fill="#f6dadd">
      {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={158 + i * 15} y="222" width="7" height="14" />)}
      {[0, 1, 2, 3].map((i) => <rect key={`w${i}`} x={170 + i * 16} y="166" width="6" height="16" />)}
      {[0, 1, 2].map((i) => <rect key={`x${i}`} x={181 + i * 14} y="124" width="6" height="16" />)}
      <rect x="196" y="88" width="8" height="16" />
    </g>
    <rect y="236" width="400" height="14" fill="#6f1b26" />
  </svg>
);

const Serbia = () => (
  <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="rs-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#bcd4ee" />
        <stop offset="1" stopColor="#f3f7fb" />
      </linearGradient>
    </defs>
    <rect width="400" height="250" fill="url(#rs-sky)" />
    <Clouds />
    {/* hills */}
    <path d="M0 190 Q90 150 190 185 T400 170 V250 H0Z" fill="#9db8d4" />
    {/* Temple of Saint Sava */}
    <g>
      <rect x="110" y="170" width="180" height="70" fill="#f2efe8" />
      <rect x="110" y="170" width="180" height="5" fill="#d8d2c4" />
      {/* side domes */}
      {[[118, 0], [262, 0]].map(([x], i) => (
        <g key={i}>
          <rect x={x} y="140" width="22" height="34" fill="#ece8de" />
          <path d={`M${x - 2} 142 Q${x + 11} 118 ${x + 24} 142Z`} fill="#8fa6c2" />
          <rect x={x + 10} y="108" width="2" height="14" fill="#c9a24b" />
          <rect x={x + 6} y="113" width="10" height="2" fill="#c9a24b" />
        </g>
      ))}
      {/* central drum + great dome */}
      <rect x="160" y="112" width="80" height="62" fill="#f7f4ee" />
      <g fill="#cfc8b8">
        {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={167 + i * 12.5} y="124" width="5" height="22" rx="2.5" />)}
      </g>
      <path d="M156 114 Q200 38 244 114Z" fill="#7f9bbd" />
      <path d="M156 114 Q200 38 244 114" fill="none" stroke="#5f7da3" strokeWidth="3" />
      <rect x="199" y="26" width="3" height="22" fill="#c9a24b" />
      <rect x="192" y="33" width="17" height="3" fill="#c9a24b" />
      {/* entrance */}
      <path d="M186 240 V206 Q200 190 214 206 V240Z" fill="#b9b19d" />
    </g>
    <rect y="236" width="400" height="14" fill="#52709a" />
  </svg>
);

const Germany = () => (
  <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="de-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#f6d9a2" />
        <stop offset="1" stopColor="#fdf3df" />
      </linearGradient>
    </defs>
    <rect width="400" height="250" fill="url(#de-sky)" />
    <circle cx="82" cy="70" r="28" fill="#fff" opacity=".7" />
    <Clouds fill="#fff" o={0.7} />
    {/* trees */}
    <g fill="#6b7b4a">
      <circle cx="40" cy="190" r="26" />
      <circle cx="68" cy="200" r="22" />
      <circle cx="360" cy="192" r="26" />
      <circle cx="334" cy="202" r="22" />
    </g>
    {/* Brandenburg Gate */}
    <g transform="translate(200 236) scale(.9) translate(-200 -236)">
      {/* quadriga */}
      <g fill="#7a6a3a">
        <rect x="170" y="52" width="60" height="5" />
        <path d="M176 52 Q184 36 198 40 Q214 36 224 52Z" />
        <rect x="196" y="22" width="8" height="22" />
        <circle cx="200" cy="18" r="6" />
        <path d="M200 8 L210 0 L206 12Z" />
      </g>
      <rect x="112" y="64" width="176" height="14" fill="#d9c79a" />
      <rect x="104" y="78" width="192" height="12" fill="#e6d7ae" />
      <rect x="104" y="90" width="192" height="4" fill="#bfa974" />
      {/* columns */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const x = i < 3 ? 108 + i * 22 : 232 + (i - 3) * 22;
        return <rect key={i} x={x} y="94" width="14" height="126" fill="#efe3c0" stroke="#cdbb8a" strokeWidth="1.5" />;
      })}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const x = i < 3 ? 106 + i * 22 : 230 + (i - 3) * 22;
        return <rect key={`c${i}`} x={x} y="92" width="18" height="5" fill="#cdbb8a" />;
      })}
      {/* base */}
      <rect x="98" y="220" width="204" height="16" fill="#cdbb8a" />
      {/* dark passage */}
      <rect x="176" y="96" width="48" height="124" fill="#8a7a50" opacity=".25" />
    </g>
    <rect y="236" width="400" height="14" fill="#4a3b1a" />
    {/* flag-colour stripe */}
    <rect y="236" width="400" height="5" fill="#000" opacity=".0" />
    <g>
      <rect y="244" width="400" height="2" fill="#111" />
      <rect y="246" width="400" height="2" fill="#d4201a" />
      <rect y="248" width="400" height="2" fill="#f2c200" />
    </g>
  </svg>
);

const Lithuania = () => (
  <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="lt-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#f9e7a6" />
        <stop offset="1" stopColor="#fff9e6" />
      </linearGradient>
    </defs>
    <rect width="400" height="250" fill="url(#lt-sky)" />
    <circle cx="330" cy="58" r="24" fill="#fff" opacity=".85" />
    <Clouds fill="#fff" o={0.8} />
    {/* green hill */}
    <path d="M-10 250 V176 Q60 118 150 150 T290 176 Q350 160 420 186 V250Z" fill="#2f8d5f" />
    <path d="M-10 250 V206 Q90 176 200 204 T420 200 V250Z" fill="#1f7049" />
    {/* Gediminas Tower — brick, with flag */}
    <g transform="translate(115 160) scale(.8) translate(-115 -150)">
      <polygon points="96,150 134,150 142,118 88,118" fill="#a8452f" />
      <rect x="92" y="78" width="46" height="44" fill="#bb5238" />
      <rect x="92" y="78" width="46" height="5" fill="#8c3622" />
      <g fill="#8c3622">
        {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={92 + i * 10} y="70" width="6" height="9" />)}
      </g>
      <polygon points="88,70 115,40 142,70" fill="#8c3622" />
      <rect x="114" y="14" width="2" height="30" fill="#4a3b1a" />
      <rect x="116" y="14" width="22" height="5" fill="#fdb913" />
      <rect x="116" y="19" width="22" height="5" fill="#006a44" />
      <rect x="116" y="24" width="22" height="5" fill="#c1272d" />
      <path d="M108 122 V100 Q115 90 122 100 V122Z" fill="#6f2a1a" />
      <rect x="104" y="84" width="6" height="10" fill="#6f2a1a" />
      <rect x="120" y="84" width="6" height="10" fill="#6f2a1a" />
    </g>
    {/* Vilnius cathedral facade + belfry */}
    <g>
      <rect x="196" y="150" width="120" height="64" fill="#f4f0e6" />
      <polygon points="190,150 256,118 322,150" fill="#e4ddcb" />
      <polygon points="214,150 256,128 298,150" fill="#f4f0e6" />
      {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={204 + i * 18} y="154" width="8" height="58" fill="#e1d9c4" />)}
      <rect x="196" y="212" width="120" height="6" fill="#c9bfa5" />
      <rect x="326" y="104" width="30" height="110" fill="#efe9db" />
      <rect x="322" y="100" width="38" height="6" fill="#d6ccb3" />
      <rect x="330" y="76" width="22" height="26" fill="#f8f4ea" />
      <path d="M328 78 Q341 52 354 78Z" fill="#7a9b86" />
      <rect x="340" y="44" width="2" height="16" fill="#c9a24b" />
      <rect x="336" y="49" width="10" height="2" fill="#c9a24b" />
      <path d="M333 214 V186 Q341 176 349 186 V214Z" fill="#c9bfa5" />
    </g>
  </svg>
);

const ART = { PL: Poland, RS: Serbia, DE: Germany, LT: Lithuania };

export default function CountryArt({ code, photo, alt = "", className = "" }) {
  if (photo) return <img src={photo} alt={alt} loading="lazy" className={`w-full h-full object-cover ${className}`} />;
  const Art = ART[code];
  return Art ? (
    <div className={`w-full h-full [&>svg]:w-full [&>svg]:h-full ${className}`} role={alt ? "img" : undefined} aria-label={alt || undefined}>
      <Art />
    </div>
  ) : null;
}
