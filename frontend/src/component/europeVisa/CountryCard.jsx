import { Link } from "react-router-dom";
import Flag from "./Flag";
import CountryArt from "./CountryArt";
import { formatFee } from "../../data/europeWorkVisa";

const Row = ({ label, children }) => (
  <div className="flex items-baseline justify-between gap-4 py-2.5 border-b border-gray-100 last:border-0">
    <dt className="text-sm text-gray-500 shrink-0">{label}</dt>
    <dd className="text-sm text-right text-gray-900">{children}</dd>
  </div>
);

export default function CountryCard({ country }) {
  const { slug, name, flag, photo, fee, timeline, serviceType, jobResponsibility } = country;
  const own = jobResponsibility === "own";
  const url = `/europe-work-visa/${slug}`;

  return (
    <article className="group bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col hover:border-[#1E6FB8] hover:shadow-lg transition">
      <Link to={url} className="relative block aspect-[8/5] overflow-hidden bg-gray-100" aria-label={`${name} — view details`} tabIndex={-1}>
        <CountryArt code={flag} photo={photo} alt={`${name}`} className="group-hover:scale-105 transition-transform duration-500" />
        <span className="absolute top-3 left-3 bg-white/95 rounded-md px-2 py-1 flex items-center gap-2 shadow-sm">
          <Flag code={flag} name={name} className="w-6 h-4" />
          <span className="text-xs font-semibold text-gray-800 tracking-wide">{name.toUpperCase()}</span>
        </span>
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-500">{serviceType}</p>

        <dl className="mt-3">
          <Row label="Package fee"><span className="text-lg font-bold text-[#0B3B75]">{formatFee(fee)}</span></Row>
          <Row label="Est. time">{timeline}</Row>
          <Row label="Job search">
            {own ? <span className="font-semibold text-amber-800">You find your own job</span> : "Per service agreement"}
          </Row>
        </dl>

        <p className="mt-3 text-xs text-gray-400 leading-relaxed">
          {own ? "No job offer or placement is guaranteed. " : ""}
          Fee covers consultancy only — government and third-party costs are separate.
        </p>

        <Link
          to={url}
          className="mt-5 text-center rounded-lg border border-[#0B3B75] text-[#0B3B75] font-semibold py-2.5 hover:bg-[#0B3B75] hover:text-white transition"
        >
          View {name} Process<span className="sr-only"> — View Details</span> →
        </Link>
      </div>
    </article>
  );
}
