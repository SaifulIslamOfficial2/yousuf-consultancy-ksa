import { Link, useParams, Navigate } from "react-router-dom";
import { useState } from "react";
import { FaWhatsapp, FaPhoneAlt, FaCheckCircle, FaRegCircle, FaExclamationTriangle, FaChevronDown, FaArrowLeft, FaExternalLinkAlt } from "react-icons/fa";
import Flag from "./Flag";
import CountryArt from "./CountryArt";
import InquiryForm from "./InquiryForm";
import useEuropeCountries from "../../hooks/useEuropeCountries";
import usePageMeta from "../../hooks/usePageMeta";
import { CONTACT, COMMON_DISCLAIMERS, NOT_INCLUDED, NOT_INCLUDED_NOTE, formatFee, getCountry } from "../../data/europeWorkVisa";

const Section = ({ id, title, children }) => (
  <section id={id} aria-labelledby={`${id}-h`} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
    <h2 id={`${id}-h`} className="text-2xl font-bold text-[#0B3B75] mb-4">{title}</h2>
    {children}
  </section>
);

function Faq({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-lg">
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open}
        className="w-full flex justify-between items-center gap-3 text-left px-4 py-3 font-medium text-gray-800">
        {q} <FaChevronDown className={`shrink-0 transition ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
      {open && <p className="px-4 pb-4 text-sm text-gray-600">{a}</p>}
    </div>
  );
}

export default function CountryDetailPage() {
  const { slug } = useParams();
  const base = getCountry(slug);
  const { countries } = useEuropeCountries();
  const country = base && countries.find((c) => c.slug === slug);

  usePageMeta(country?.seo.title, country?.seo.description);

  if (!base) return <Navigate to="/europe-work-visa" replace />;
  const c = country;
  const own = c.jobResponsibility === "own";
  const waUrl = `${CONTACT.whatsapp}?text=${encodeURIComponent(`Hello, I am interested in the ${c.name} work visa package.`)}`;

  return (
    <div className="bg-[#f7f9fc] min-h-screen">
      <header className="relative text-white py-14 px-4 overflow-hidden bg-[#0B3B75]">
        <div className="absolute inset-0 opacity-40" aria-hidden="true">
          <CountryArt code={c.flag} photo={c.photo} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B3B75] via-[#0B3B75]/85 to-[#0B3B75]/30" aria-hidden="true" />
        <div className="container mx-auto relative">
          <Link to="/europe-work-visa" className="inline-flex items-center gap-2 text-sm opacity-90 hover:underline mb-4">
            <FaArrowLeft aria-hidden="true" /> All countries
          </Link>
          <div className="flex items-center gap-4">
            <Flag code={c.flag} name={c.name} className="w-16 h-11" />
            <div>
              <h1 className="text-3xl md:text-5xl font-bold">{c.name} Work Visa & Work Permit</h1>
              <p className="opacity-90 mt-1">{c.serviceType}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-10 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {!c.isActive && (
            <p className="rounded-lg bg-red-50 border border-red-200 text-red-800 p-4 text-sm">
              This package is currently not accepting new inquiries. Please contact us for availability.
            </p>
          )}

          <Section id="overview" title="A. Country Overview">
            {c.overview.map((p) => <p key={p} className="text-gray-700 mb-3">{p}</p>)}
            <dl className="grid sm:grid-cols-2 gap-4 mt-4 text-sm">
              <div className="bg-gray-50 rounded-lg p-4"><dt className="font-semibold text-[#0B3B75]">Opportunities / work categories</dt><dd className="text-gray-700 mt-1">{c.opportunities}</dd></div>
              <div className="bg-gray-50 rounded-lg p-4"><dt className="font-semibold text-[#0B3B75]">Is a job offer required?</dt><dd className="text-gray-700 mt-1">{c.jobOfferRequired}</dd></div>
            </dl>
            <div className={`mt-4 rounded-lg p-4 text-sm border ${own ? "bg-amber-50 border-amber-200 text-amber-950" : "bg-blue-50 border-blue-100 text-blue-950"}`}>
              <p className="font-semibold mb-1">{own ? "Applicants must find their own job" : "Job / employer arrangement"}</p>
              <p>{c.jobSearch}</p>
            </div>
            <h3 className="font-semibold text-gray-800 mt-6 mb-2">Important eligibility conditions</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
              {c.eligibility.map((e) => <li key={e}>{e}</li>)}
            </ul>
          </Section>

          <Section id="package" title="B. Package Details">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl bg-gradient-to-br from-[#0B3B75] to-[#1E6FB8] text-white p-6">
                <p className="text-sm opacity-80">Consultancy package fee</p>
                <p className="text-4xl font-extrabold mt-1">{formatFee(c.fee)}</p>
              </div>
              <div className="rounded-xl bg-blue-50 border border-blue-100 p-6">
                <p className="text-sm text-gray-500">Estimated processing time</p>
                <p className="text-2xl font-bold text-[#0B3B75] mt-1">{c.timeline}</p>
                <p className="text-xs text-gray-500 mt-1">Estimate only — not a guaranteed timeline.</p>
              </div>
            </div>
            <div className="mt-5 text-sm">
              <p className="font-semibold text-gray-800 mb-2">Separate from the consultancy fee (not included unless confirmed in writing):</p>
              <ul className="grid sm:grid-cols-2 gap-1 list-disc pl-5 text-gray-700">
                {NOT_INCLUDED.map((i) => <li key={i}>{i}</li>)}
              </ul>
              <p className="text-xs text-gray-500 mt-3">{NOT_INCLUDED_NOTE}</p>
            </div>
          </Section>

          <Section id="process" title="C. Detailed Application Process">
            <ol className="space-y-4">
              {c.steps.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="shrink-0 w-9 h-9 rounded-full bg-[#0B3B75] text-white flex items-center justify-center font-bold text-sm">{i + 1}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{s.title}</h3>
                    <p className="text-sm text-gray-600 mt-0.5">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Section>

          <Section id="documents" title="D. Required Documents">
            <p className="text-sm text-gray-500 mb-4">Not every applicant needs every document. Items marked “If applicable” depend on your route, profession and the authority’s instructions.</p>
            <ul className="space-y-2">
              {c.documents.map((d) => (
                <li key={d.label} className="flex items-start gap-3 text-sm text-gray-700">
                  {d.conditional ? <FaRegCircle className="text-amber-500 mt-1 shrink-0" aria-hidden="true" /> : <FaCheckCircle className="text-green-600 mt-1 shrink-0" aria-hidden="true" />}
                  <span>
                    {d.label}
                    {d.conditional && <span className="ml-2 text-xs rounded bg-amber-100 text-amber-900 px-2 py-0.5">If applicable</span>}
                    {d.note && <span className="block text-xs text-gray-500">{d.note}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="conditions" title="E. Important Conditions and Disclaimers">
            <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
              <p className="flex items-center gap-2 font-semibold text-amber-900 mb-2"><FaExclamationTriangle aria-hidden="true" /> Please read before applying</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-amber-950">
                {COMMON_DISCLAIMERS.map((d) => <li key={d}>{d}</li>)}
              </ul>
            </div>
            {own && <p className="mt-4 text-sm font-semibold text-gray-800">{c.name}: this package does not guarantee a job offer or employment placement.</p>}
          </Section>

          <Section id="faq" title={`${c.name} FAQs`}>
            <div className="space-y-2">{c.faqs.map((f) => <Faq key={f.q} {...f} />)}</div>
          </Section>

          <Section id="sources" title="Official information sources">
            <p className="text-sm text-gray-500 mb-2">Descriptions above are based on the following official pages. Rules change — always confirm the latest requirements with the authority. Anything not confirmed is marked “Subject to confirmation”.</p>
            <ul className="space-y-1 text-sm">
              {c.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-[#1E6FB8] hover:underline inline-flex items-center gap-2">
                    {s.label} <FaExternalLinkAlt className="text-xs" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </Section>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 self-start">
          <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">
            <p className="text-sm text-gray-500">Package</p>
            <p className="text-3xl font-extrabold text-[#0B3B75]">{formatFee(c.fee)}</p>
            <p className="text-sm text-gray-600 mt-1">{c.timeline}</p>
            <div className="mt-4 space-y-2">
              <a href={waUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold transition">
                <FaWhatsapp aria-hidden="true" /> WhatsApp us
              </a>
              {CONTACT.phones.map((p) => (
                <a key={p.tel} href={`tel:${p.tel}`}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-[#0B3B75] text-[#0B3B75] font-semibold hover:bg-blue-50 transition">
                  <FaPhoneAlt aria-hidden="true" /> {p.label}: {p.display}
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <div className="container mx-auto px-4 pb-16 max-w-4xl" id="apply">
        {c.isActive && <InquiryForm key={c.slug} defaultCountry={c.name} />}
      </div>
    </div>
  );
}
