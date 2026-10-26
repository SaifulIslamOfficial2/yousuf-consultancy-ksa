import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import CountryCard from "./CountryCard";
import useEuropeCountries from "../../hooks/useEuropeCountries";
import { SECTION } from "../../data/europeWorkVisa";

// Home-page section (replaces the old Umrah banner)
export default function EuropeVisaSection() {
  const { countries } = useEuropeCountries();
  const list = countries.filter((c) => c.isActive);

  return (
    <section id="europe-work-visa" className="py-20 bg-gradient-to-b from-blue-50 to-white" aria-labelledby="europe-heading">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="inline-block bg-[#0B3B75] text-white text-sm px-4 py-1 rounded-full">Europe</p>
          <h2 id="europe-heading" className="text-3xl md:text-5xl font-bold text-gray-900 mt-4 leading-tight">{SECTION.title}</h2>
          <p className="mt-3 text-lg font-semibold text-[#1E6FB8]">{SECTION.subtitle}</p>
          <p className="mt-4 text-gray-600 leading-relaxed">{SECTION.description}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {list.map((c) => (
            <CountryCard key={c.slug} country={c} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/europe-work-visa" className="inline-flex items-center gap-2 text-[#0B3B75] font-semibold hover:underline">
            Compare all countries <FaArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
