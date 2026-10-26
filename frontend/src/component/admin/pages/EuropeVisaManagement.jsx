import { useEffect, useState } from "react";
import { FaSave, FaGlobeEurope } from "react-icons/fa";
import api, { apiError } from "../../../api/client";
import { COUNTRIES } from "../../../data/europeWorkVisa";

// Edit package fee / timeline / service type / visibility for each country.
// Everything else (process, documents, FAQs) lives in src/data/europeWorkVisa.js.
export default function EuropeVisaManagement() {
  const [rows, setRows] = useState(null);
  const [saving, setSaving] = useState(null);
  const [msg, setMsg] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/api/europe-visa")
      .then(({ data }) => {
        const map = {};
        (Array.isArray(data) ? data : []).forEach((o) => (map[o.slug] = o));
        setRows(
          COUNTRIES.map((c) => {
            const o = map[c.slug] || {};
            return {
              slug: c.slug,
              name: c.name,
              fee: o.fee ?? c.fee,
              timeline: o.timeline || c.timeline,
              serviceType: o.serviceType || c.serviceType,
              isActive: o.isActive ?? c.isActive,
            };
          })
        );
      })
      .catch((e) => setError(apiError(e, "লোড ব্যর্থ")));
  }, []);

  const update = (slug, patch) =>
    setRows((r) => r.map((x) => (x.slug === slug ? { ...x, ...patch } : x)));

  const save = async (row) => {
    setSaving(row.slug);
    setMsg((m) => ({ ...m, [row.slug]: "" }));
    try {
      await api.put(`/api/europe-visa/${row.slug}`, {
        fee: Number(row.fee) || 0,
        timeline: row.timeline,
        serviceType: row.serviceType,
        isActive: row.isActive,
      });
      setMsg((m) => ({ ...m, [row.slug]: "✔ সেভ হয়েছে" }));
    } catch (e) {
      setMsg((m) => ({ ...m, [row.slug]: apiError(e, "সেভ ব্যর্থ") }));
    } finally {
      setSaving(null);
    }
  };

  if (error) return <div className="bg-red-50 text-red-700 p-4 rounded">{error}</div>;
  if (!rows) return <p className="text-gray-500">লোড হচ্ছে...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-1">
        <FaGlobeEurope className="text-blue-600" /> ইউরোপ ওয়ার্ক ভিসা
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        প্রতিটি দেশের প্যাকেজ ফি (SAR), আনুমানিক সময় ও সার্ভিস টাইপ এখান থেকে এডিট করুন।
      </p>
      <div className="grid gap-5 lg:grid-cols-2">
        {rows.map((r) => (
          <div key={r.slug} className="bg-white rounded-lg shadow p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">{r.name}</h2>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={r.isActive}
                  onChange={(e) => update(r.slug, { isActive: e.target.checked })}
                />
                ওয়েবসাইটে দেখান
              </label>
            </div>
            <label className="block text-sm">
              প্যাকেজ ফি (SAR)
              <input type="number" min="0" value={r.fee} onChange={(e) => update(r.slug, { fee: e.target.value })}
                className="mt-1 w-full border rounded px-3 py-2" />
            </label>
            <label className="block text-sm">
              আনুমানিক সময়
              <input value={r.timeline} onChange={(e) => update(r.slug, { timeline: e.target.value })}
                className="mt-1 w-full border rounded px-3 py-2" />
            </label>
            <label className="block text-sm">
              সার্ভিস টাইপ
              <input value={r.serviceType} onChange={(e) => update(r.slug, { serviceType: e.target.value })}
                className="mt-1 w-full border rounded px-3 py-2" />
            </label>
            <div className="flex items-center gap-3">
              <button onClick={() => save(r)} disabled={saving === r.slug}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-60">
                <FaSave /> {saving === r.slug ? "সেভ হচ্ছে..." : "সেভ করুন"}
              </button>
              <span className="text-sm text-gray-600">{msg[r.slug]}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
