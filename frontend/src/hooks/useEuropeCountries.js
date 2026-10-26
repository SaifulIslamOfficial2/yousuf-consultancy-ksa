import { useEffect, useState } from "react";
import api from "../api/client";
import { COUNTRIES } from "../data/europeWorkVisa";

// Defaults come from data/europeWorkVisa.js; admin edits (fee, timeline,
// service type, visibility) are layered on top from /api/europe-visa.
export default function useEuropeCountries() {
  const [overrides, setOverrides] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    api
      .get("/api/europe-visa")
      .then((r) => {
        if (!alive) return;
        const map = {};
        (Array.isArray(r.data) ? r.data : []).forEach((o) => (map[o.slug] = o));
        setOverrides(map);
      })
      .catch(() => {})
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  const countries = COUNTRIES.map((c) => {
    const o = overrides[c.slug] || {};
    return {
      ...c,
      fee: o.fee !== undefined && o.fee !== "" ? Number(o.fee) : c.fee,
      timeline: o.timeline || c.timeline,
      serviceType: o.serviceType || c.serviceType,
      isActive: o.isActive !== undefined ? o.isActive : c.isActive,
    };
  });
  return { countries, loading };
}
