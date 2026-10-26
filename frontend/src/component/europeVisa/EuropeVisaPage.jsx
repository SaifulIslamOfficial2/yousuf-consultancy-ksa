import { Link } from "react-router-dom";
import CountryCard from "./CountryCard";
import ComparisonTable from "./ComparisonTable";
import useEuropeCountries from "../../hooks/useEuropeCountries";
import usePageMeta from "../../hooks/usePageMeta";
import { SECTION, COMMON_DISCLAIMERS, NOT_INCLUDED, NOT_INCLUDED_NOTE } from "../../data/europeWorkVisa";

export default function EuropeVisaPage() {
  const { countries } = useEuropeCountries();
  const list = countries.filter((c) => c.isActive);

  usePageMeta(
    "Europe Work Visa & Work Permit — Poland, Serbia, Germany, Lithuania | Yousuf Consultancy",
    "Compare Europe work visa and work permit consultancy packages for Poland, Serbia, Germany and Lithuania: fees in SAR, estimated timelines, requirements and how to apply."
  );

  return (
    <div className="bg-[#f7f9fc] min-h-screen">
      <header className="bg-gradient-to-r from-[#0B3B75] to-[#1E6FB8] text-white text-center py-16 px-4">
        <h1 className="text-3xl md:text-5xl font-bold">{SECTION.title}</h1>
        <p className="mt-3 text-lg opacity-95">{SECTION.subtitle}</p>
        <p className="mt-4 max-w-3xl mx-auto text-sm md:text-base opacity-90">{SECTION.description}</p>
      </header>

      <div className="container mx-auto px-4 py-14 space-y-16">
        <section aria-label="Country packages">
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {list.map((c) => (
              <CountryCard key={c.slug} country={c} />
            ))}
          </div>
        </section>

        <section aria-labelledby="compare-h">
          <h2 id="compare-h" className="text-2xl md:text-3xl font-bold text-[#0B3B75] mb-6">Compare countries</h2>
          <ComparisonTable countries={list} />
        </section>

        <section className="grid md:grid-cols-2 gap-6" aria-label="Important information">
          <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-[#0B3B75] mb-3">Not included in the consultancy fee</h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
              {NOT_INCLUDED.map((i) => <li key={i}>{i}</li>)}
            </ul>
            <p className="mt-3 text-xs text-gray-500">{NOT_INCLUDED_NOTE}</p>
          </div>
          <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6">
            <h2 className="text-xl font-bold text-amber-900 mb-3">Important conditions</h2>
            <ul className="list-disc pl-5 space-y-1 text-amber-950 text-sm">
              {COMMON_DISCLAIMERS.map((i) => <li key={i}>{i}</li>)}
            </ul>
          </div>
        </section>

        <div className="text-center">
          <Link to="/contact" className="inline-block px-8 py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-[#0B3B75] to-[#1E6FB8] shadow hover:opacity-90">
            Not sure which country? Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
