// Inline SVG flags (emoji flags do not render on Windows)
const FLAGS = {
  PL: ["#FFFFFF", "#DC143C"],
  RS: ["#C6363C", "#0C4076", "#FFFFFF"],
  DE: ["#000000", "#DD0000", "#FFCE00"],
  LT: ["#FDB913", "#006A44", "#C1272D"],
};

export default function Flag({ code, name, className = "w-10 h-7" }) {
  const c = FLAGS[code] || ["#ccc", "#999"];
  return (
    <svg
      viewBox="0 0 30 20"
      className={`${className} rounded-sm shadow ring-1 ring-black/10`}
      role="img"
      aria-label={`${name} flag`}
    >
      {code === "PL" ? (
        <>
          <rect width="30" height="10" fill={c[0]} />
          <rect y="10" width="30" height="10" fill={c[1]} />
        </>
      ) : (
        c.map((fill, i) => (
          <rect key={i} y={(20 / c.length) * i} width="30" height={20 / c.length + 0.2} fill={fill} />
        ))
      )}
    </svg>
  );
}
