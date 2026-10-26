import { Link } from "react-router-dom";
import Flag from "./Flag";
import { formatFee } from "../../data/europeWorkVisa";

export default function ComparisonTable({ countries }) {
  return (
    <div className="overflow-x-auto rounded-2xl shadow border border-gray-100 bg-white">
      <table className="w-full text-left text-sm min-w-[640px]">
        <caption className="sr-only">Comparison of Europe work visa packages by country</caption>
        <thead className="bg-[#0B3B75] text-white">
          <tr>
            <th scope="col" className="px-4 py-3">Country</th>
            <th scope="col" className="px-4 py-3">Package price</th>
            <th scope="col" className="px-4 py-3">Estimated time</th>
            <th scope="col" className="px-4 py-3">Job-search responsibility</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {countries.map((c) => (
            <tr key={c.slug} className="hover:bg-blue-50/50">
              <th scope="row" className="px-4 py-3 font-semibold">
                <Link to={`/europe-work-visa/${c.slug}`} className="flex items-center gap-2 text-[#0B3B75] hover:underline">
                  <Flag code={c.flag} name={c.name} className="w-7 h-5" /> {c.name}
                </Link>
              </th>
              <td className="px-4 py-3 font-semibold">{formatFee(c.fee)}</td>
              <td className="px-4 py-3">{c.timeline}</td>
              <td className="px-4 py-3">
                {c.jobResponsibility === "own" ? (
                  <span className="inline-block rounded-full bg-amber-100 text-amber-900 px-3 py-1 text-xs font-semibold">
                    Applicant finds own job
                  </span>
                ) : (
                  <span className="inline-block rounded-full bg-blue-100 text-blue-900 px-3 py-1 text-xs font-semibold">
                    Subject to confirmation
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="px-4 py-3 text-xs text-gray-500 bg-gray-50">
        Prices are in Saudi Riyals (SAR) and are our consultancy package fees, not government fees. Timelines are estimates, not guarantees. No package guarantees a visa, work permit, job offer or employment.
      </p>
    </div>
  );
}
