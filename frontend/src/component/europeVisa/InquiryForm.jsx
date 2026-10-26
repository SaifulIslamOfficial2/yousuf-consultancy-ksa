import { useState } from "react";
import emailjs from "@emailjs/browser";
import { FaPaperPlane, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import api from "../../api/client";
import { COUNTRIES } from "../../data/europeWorkVisa";

const EMAILJS_SERVICE = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const initial = (country) => ({
  name: "", whatsapp: "", email: "", residence: "", nationality: "",
  country, occupation: "", experience: "", message: "",
});

const REQUIRED = {
  name: "Full name is required",
  whatsapp: "WhatsApp number is required",
  email: "Email address is required",
  residence: "Country of residence is required",
  nationality: "Nationality is required",
  occupation: "Current occupation is required",
};

const validate = (f) => {
  const e = {};
  Object.entries(REQUIRED).forEach(([k, msg]) => {
    if (!String(f[k]).trim()) e[k] = msg;
  });
  if (!e.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = "Enter a valid email address";
  if (!e.whatsapp && !/^\+?[0-9\s\-()]{7,20}$/.test(f.whatsapp.trim())) e.whatsapp = "Enter a valid number, e.g. +966 5X XXX XXXX";
  return e;
};

export default function InquiryForm({ defaultCountry }) {
  const [form, setForm] = useState(initial(defaultCountry));
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((x) => ({ ...x, [name]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length) return;

    setStatus("loading");
    const service = `Europe Work Visa – ${form.country}`;
    const message = [
      `Selected country: ${form.country}`,
      `Country of residence: ${form.residence}`,
      `Nationality: ${form.nationality}`,
      `Current occupation: ${form.occupation}`,
      `Work experience: ${form.experience || "N/A"}`,
      `Message: ${form.message || "N/A"}`,
    ].join("\n");

    try {
      // 1) save through the existing applications API (shows in admin → Applications)
      await api.post("/api/applications", {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.whatsapp.trim(),
        service,
        message,
      });
      // 2) notify the company by email (same EmailJS template as the main contact form)
      await emailjs.send(
        EMAILJS_SERVICE,
        EMAILJS_TEMPLATE,
        {
          from_name: form.name.trim(),
          from_email: form.email.trim(),
          phone: form.whatsapp.trim(),
          service,
          message,
          reply_to: form.email.trim(),
        },
        EMAILJS_KEY
      );
      setStatus("success");
      setForm(initial(defaultCountry));
    } catch (err) {
      console.error("Inquiry submit error:", err);
      setStatus("error");
    }
  };

  const field = (name, label, props = {}) => (
    <div className={props.full ? "md:col-span-2" : ""}>
      <label htmlFor={`eu-${name}`} className="block text-sm font-medium text-gray-700 mb-1">
        {label}{REQUIRED[name] && <span className="text-red-500"> *</span>}
      </label>
      {props.textarea ? (
        <textarea
          id={`eu-${name}`} name={name} rows={props.rows || 3} value={form[name]} onChange={onChange}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1E6FB8]"
        />
      ) : (
        <input
          id={`eu-${name}`} name={name} type={props.type || "text"} value={form[name]} onChange={onChange}
          autoComplete={props.autoComplete} placeholder={props.placeholder}
          aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `eu-${name}-err` : undefined}
          className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1E6FB8] ${errors[name] ? "border-red-400" : "border-gray-300"}`}
        />
      )}
      {errors[name] && <p id={`eu-${name}-err`} className="text-xs text-red-600 mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
      <h3 className="text-2xl font-bold text-[#0B3B75]">Apply for Consultation</h3>
      <p className="text-sm text-gray-500 mt-1 mb-6">
        Fill in your details and our team will contact you. Submitting this form is an inquiry — it is not a visa application and does not guarantee approval.
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        {field("name", "Full Name", { autoComplete: "name" })}
        {field("whatsapp", "WhatsApp Number", { type: "tel", autoComplete: "tel", placeholder: "+966 ..." })}
        {field("email", "Email Address", { type: "email", autoComplete: "email" })}
        {field("residence", "Current Country of Residence")}
        {field("nationality", "Nationality")}
        <div>
          <label htmlFor="eu-country" className="block text-sm font-medium text-gray-700 mb-1">Selected Country</label>
          <select id="eu-country" name="country" value={form.country} onChange={onChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#1E6FB8]">
            {COUNTRIES.map((c) => <option key={c.slug} value={c.name}>{c.name}</option>)}
          </select>
        </div>
        {field("occupation", "Current Occupation")}
        {field("experience", "Relevant Work Experience", { textarea: true, rows: 2 })}
        {field("message", "Message", { textarea: true, full: true })}
      </div>

      <button type="submit" disabled={status === "loading"}
        className="mt-6 w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-[#0B3B75] to-[#1E6FB8] hover:opacity-90 disabled:opacity-60 transition shadow">
        <FaPaperPlane aria-hidden="true" /> {status === "loading" ? "Submitting…" : "Apply for Consultation"}
      </button>

      <div aria-live="polite" className="mt-4">
        {status === "success" && (
          <p className="flex items-start gap-2 rounded-lg bg-green-50 border border-green-200 text-green-800 p-3 text-sm">
            <FaCheckCircle className="mt-0.5" /> Thank you! Your inquiry has been received. Our team will contact you on WhatsApp or email.
          </p>
        )}
        {status === "error" && (
          <p className="flex items-start gap-2 rounded-lg bg-red-50 border border-red-200 text-red-800 p-3 text-sm">
            <FaExclamationCircle className="mt-0.5" /> We could not submit your inquiry. Please try again or contact us on WhatsApp.
          </p>
        )}
      </div>
    </form>
  );
}
