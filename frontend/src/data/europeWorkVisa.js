// ---------------------------------------------------------------
// Europe Work Visa & Work Permit — centralised content/config.
//
// fee / timeline / serviceType / isActive can be overridden from the
// admin panel (Admin → Europe Work Visa); everything else lives here.
//
// Legal descriptions were checked against official/government pages
// (see `sources`). Anything not confirmed is marked
// "Subject to confirmation". Re-verify before relying on it — rules change.
// ---------------------------------------------------------------

export const CURRENCY = "SAR";
export const SUBJECT = "Subject to confirmation";

export const SECTION = {
  title: "Europe Work Visa & Work Permit",
  subtitle: "Explore European Work Opportunities with Yousuf Consultancy",
  description:
    "Explore work-based immigration opportunities in Europe. Review the process, estimated timeline, consultancy fees, eligibility requirements, and application procedures for each country before starting your application.",
};

// Country illustrations live in component/europeVisa/CountryArt.jsx.
// To use a real photo instead, import it and add `photo: myImage,` to a country below.

// Existing, already-published company contacts (see Footer / WhatsAppButton)
export const CONTACT = {
  whatsapp: "https://wa.me/966571461938",
  phones: [
    { label: "Madinah", display: "+966 57 146 1938", tel: "+966571461938" },
    { label: "Jeddah", display: "+966 50 983 2826", tel: "+966509832826" },
  ],
  email: "yousufconsultancy46@gmail.com",
};

export const COMMON_DISCLAIMERS = [
  "Visa and work-permit approval is decided solely by the relevant immigration authorities.",
  "Processing times are estimates only and may vary.",
  "A consultancy package does not automatically guarantee a work permit, visa, job offer, or employment.",
  "Additional government or third-party charges may apply.",
  "Applicants must provide accurate documents and information.",
  "Please review the service agreement, payment terms, refund policy, and service scope before making any payment.",
];

export const NOT_INCLUDED = [
  "Government and embassy/consulate fees",
  "Visa and residence-permit fees",
  "Health or travel insurance",
  "Document translation",
  "Apostille / document legalisation",
  "Travel tickets and accommodation",
  "Other third-party charges",
];
export const NOT_INCLUDED_NOTE =
  "The consultancy fee is separate from the items above. They are not included unless confirmed in your written service agreement.";

const JOB_OWN =
  "Applicants must independently find a suitable job and secure the required employer documentation. Yousuf Consultancy provides the agreed consultancy and application guidance, subject to the actual service agreement. This package does not guarantee a job offer or employment placement.";

const baseDocs = {
  passport: { label: "Valid passport (validity requirements set by the embassy/consulate)", conditional: false },
  photos: { label: "Passport-size photographs (per embassy specification)", conditional: false },
  cv: { label: "Updated CV / résumé", conditional: false },
  edu: { label: "Educational certificates and transcripts", conditional: false },
  exp: { label: "Work-experience certificates", conditional: true, note: "If relevant to the job or route" },
  police: { label: "Police clearance certificate", conditional: true, note: "Where required by the authority" },
  contract: { label: "Employment contract or job offer", conditional: true, note: "Where required for the chosen route" },
  licence: { label: "Proof of qualifications / professional licence or recognition", conditional: true, note: "For regulated professions or where recognition is required" },
  health: { label: "Health insurance or medical documents", conditional: true, note: "Where required" },
  finance: { label: "Financial documents (e.g. proof of funds)", conditional: true, note: "Where required" },
  legal: { label: "Translations, apostilles or legalisations", conditional: true, note: "Where required; typically a separate cost" },
};

export const COUNTRIES = [
  {
    slug: "poland",
    name: "Poland",
    flag: "PL",
    accent: "#DC143C",
    fee: 32000,
    timeline: "Approximately 6 months",
    serviceType: "Work Visa / Work Permit Assistance",
    jobResponsibility: "own-verify",
    jobLabel: "Subject to confirmation",
    isActive: true,
    seo: {
      title: "Poland Work Visa & Work Permit Assistance | Yousuf Consultancy",
      description:
        "Poland work visa and work permit consultancy from Yousuf Consultancy: process, SAR 32,000 package, about 6 months estimated timeline, documents and FAQs.",
    },
    overview: [
      "Poland generally requires a work permit for foreign nationals who work there, unless an exemption applies. The work permit is requested by the employer from the voivode (regional authority); the foreign national separately needs a residence title or visa that allows work.",
      "Our package covers consultancy and application guidance for the Poland work route, as set out in your service agreement.",
    ],
    opportunities: "Eligible categories depend on the employer, the position and the permit type issued by the voivode. Specific sectors: " + SUBJECT + ".",
    jobOfferRequired: "Yes — a work permit is requested by a Polish employer for a specific position, so a job offer / employer is required.",
    jobSearch:
      "How the employer or job is arranged for Poland applicants depends on the specific service actually agreed with Yousuf Consultancy. Employer sponsorship and placement are " + SUBJECT + " and are not guaranteed.",
    eligibility: [
      "A Polish employer willing to employ you and apply for the work permit.",
      "For standard (type A) permits the employer generally has to show the position cannot be filled locally (labour-market test), unless an exemption applies.",
      "Pay must be no lower than that of local employees in a comparable position.",
      "Clean documentation and, where required, a police clearance certificate.",
      "Other conditions (language, qualifications, nationality-specific rules): " + SUBJECT + ".",
    ],
    steps: [
      { title: "Initial consultation and eligibility assessment", text: "We review your profile, work history and target role to see whether the Poland work route is realistic for you." },
      { title: "Passport and document review", text: "We check your passport, education and experience documents and tell you what must be prepared, translated or legalised." },
      { title: "Employer and job verification", text: "The job and the Polish employer are identified and verified. Poland requires an employer-led process, so a registered employer is essential. How this step is handled depends on your service agreement." },
      { title: "Employment contract and employer documentation", text: "The employer prepares the documents needed for the permit application, including the job description and contract terms." },
      { title: "Work permit application (employer → voivode)", text: "The employer submits the work-permit application to the competent voivode. For a standard permit the employer may need to complete a labour-market test through the local Labour Office. Decision time: " + SUBJECT + "." },
      { title: "National visa (type D) application", text: "With the permit and supporting documents you apply for a Polish national visa for work at the competent consulate or visa centre. Exact documents and fees: " + SUBJECT + "." },
      { title: "Biometrics and original-document submission", text: "Attend the appointment, give biometric data where required, and submit originals as instructed." },
      { title: "Application review and decision", text: "The consulate decides on the visa. Timing varies and is not controlled by us." },
      { title: "Travel preparation", text: "After approval we help you prepare for travel: arrival checklist, document set and next-step reminders. Tickets and accommodation are separate." },
      { title: "Arrival, registration and employment formalities", text: "After arrival you begin work with the permitted employer and complete registration and any residence-card formalities required in Poland (" + SUBJECT + ")." },
    ],
    documents: [
      baseDocs.passport, baseDocs.photos, baseDocs.cv, baseDocs.edu, baseDocs.exp, baseDocs.police,
      { ...baseDocs.contract, conditional: false, note: "Work permit and contract from the Polish employer" },
      baseDocs.licence, baseDocs.health, baseDocs.finance, baseDocs.legal,
    ],
    faqs: [
      { q: "Do I need a job offer for Poland?", a: "A Polish work permit is requested by an employer for a specific position, so an employer is required. How the job is arranged under our package depends on your written service agreement and is not guaranteed." },
      { q: "Is the SAR 32,000 the total cost?", a: "No. It is our consultancy package fee only. Government fees, visa fees, insurance, translation, legalisation and travel are separate unless confirmed in writing." },
      { q: "Will I definitely get a visa in 6 months?", a: "No. About 6 months is our current estimate. Authorities decide approval and timing, and delays are possible." },
      { q: "Who applies for the work permit?", a: "The employer applies to the voivode. You then apply for the visa or residence title that allows you to work." },
    ],
    sources: [
      { label: "Work permits — Public Employment Services (praca.gov.pl)", url: "https://lang-psz.praca.gov.pl/en/-/work-permits" },
    ],
  },
  {
    slug: "serbia",
    name: "Serbia",
    flag: "RS",
    accent: "#C6363C",
    fee: 30000,
    timeline: "Approximately 3 months",
    serviceType: "Work Visa / Work Permit Assistance",
    jobResponsibility: "own-verify",
    jobLabel: "Subject to confirmation",
    isActive: true,
    seo: {
      title: "Serbia Work Visa & Work Permit Assistance | Yousuf Consultancy",
      description:
        "Serbia work visa and single permit consultancy from Yousuf Consultancy: process, SAR 30,000 package, about 3 months estimated timeline, documents and FAQs.",
    },
    overview: [
      "Serbia issues a combined single permit for residence and work. It can be requested by the foreign citizen, or by the employer on the citizen's behalf through an authorised person. Citizens who need a visa to enter apply for a long-stay (type D) visa based on employment.",
      "Our package covers consultancy and application guidance for the Serbia work route, as set out in your service agreement.",
    ],
    opportunities: "Eligible categories depend on the employer and position. Specific sectors: " + SUBJECT + ".",
    jobOfferRequired: "Yes — the permit is based on employment with a Serbian employer.",
    jobSearch:
      "How the employer or job is arranged for Serbia applicants depends on the specific service actually agreed with Yousuf Consultancy. Employer sponsorship and placement are " + SUBJECT + " and are not guaranteed.",
    eligibility: [
      "Employment with a Serbian employer.",
      "Applicants who require a visa to enter apply for a long-stay (type D) employment visa; others can apply for the single permit after arriving in Serbia. Whether your nationality needs a visa: check with us / the embassy.",
      "The single permit is issued for up to 36 months and as a biometric document.",
      "Employer-side requirements, quotas, salary levels and other conditions: " + SUBJECT + ".",
    ],
    steps: [
      { title: "Initial consultation and eligibility assessment", text: "We review your profile and target role and check whether the Serbia route fits your situation." },
      { title: "Passport and document review", text: "We check your documents and list what must be prepared, translated or legalised." },
      { title: "Employer and job verification", text: "The job and the Serbian employer are identified and verified. Arrangement depends on your service agreement." },
      { title: "Employment contract and employer documentation", text: "The employer prepares the employment contract and company documents needed for the application." },
      { title: "Employment assessment", text: "For a long-stay employment visa, the competent employment authority gives an assessment. Exact process: " + SUBJECT + "." },
      { title: "Long-stay (type D) employment visa application", text: "Where a visa is required, you apply at the competent Serbian diplomatic mission. A long-stay employment visa can act as a residence and work permit during its validity." },
      { title: "Biometric appointment and original documents", text: "Attend the appointment and submit originals where required." },
      { title: "Application review and decision", text: "Serbian authorities state that a properly completed single-permit request is resolved within 15 days. Visa and overall timelines vary — about 3 months is our estimate." },
      { title: "Travel preparation", text: "We help you prepare your arrival checklist. Tickets and accommodation are separate." },
      { title: "Arrival, single permit and employment formalities", text: "Complete the single permit / registration formalities in Serbia and begin work with your employer. Extensions can be requested until the previous permit expires." },
    ],
    documents: [
      baseDocs.passport, baseDocs.photos, baseDocs.cv, baseDocs.edu, baseDocs.exp, baseDocs.police,
      { ...baseDocs.contract, conditional: false, note: "Employment contract / offer from the Serbian employer" },
      baseDocs.licence, baseDocs.health, baseDocs.finance, baseDocs.legal,
    ],
    faqs: [
      { q: "What is the Serbian single permit?", a: "A combined residence and work permit. Serbian authorities state it is issued for 36 months as a biometric document." },
      { q: "Do I need a visa to enter Serbia?", a: "It depends on your nationality. If a visa is required, you apply for a long-stay (type D) employment visa. We will confirm for your passport." },
      { q: "Is the SAR 30,000 the total cost?", a: "No. It is our consultancy fee only. Government, visa, insurance, translation, legalisation and travel costs are separate unless confirmed in writing." },
      { q: "Is about 3 months guaranteed?", a: "No. It is an estimate; authorities decide timing and approval." },
    ],
    sources: [
      { label: "Information about the Single Permit — welcometoserbia.gov.rs", url: "https://welcometoserbia.gov.rs/information-about-the-single-permit" },
      { label: "Residence and work permit — welcometoserbia.gov.rs", url: "https://welcometoserbia.gov.rs/residence-and-work-permit" },
    ],
  },
  {
    slug: "germany",
    name: "Germany",
    flag: "DE",
    accent: "#DD0000",
    fee: 50000,
    timeline: "Approximately 6 months",
    serviceType: "Work Visa / Work Permit Guidance",
    jobResponsibility: "own",
    jobLabel: "Applicant finds own job",
    isActive: true,
    seo: {
      title: "Germany Work Visa & Work Permit Guidance | Yousuf Consultancy",
      description:
        "Germany work visa guidance from Yousuf Consultancy: skilled worker visa, EU Blue Card and Opportunity Card routes, SAR 50,000 package, about 6 months estimate. Applicants find their own jobs.",
    },
    overview: [
      "Germany offers several routes for non-EU nationals: the skilled-worker visa, the EU Blue Card and the Opportunity Card (Chancenkarte) for qualified people who want to look for work.",
      "Applicants are responsible for finding their own job. Our package provides consultancy and application guidance only.",
    ],
    opportunities: "Skilled qualified employment, EU Blue Card positions (university degree) and job-search stays under the Opportunity Card. Regulated professions (e.g. healthcare) need professional licensing.",
    jobOfferRequired: "Skilled-worker visa and EU Blue Card: yes, a concrete job offer in Germany. Opportunity Card: no job offer is required, but you must qualify (see conditions).",
    jobSearch: JOB_OWN,
    eligibility: [
      "Skilled-worker visa: a German-recognised (or comparable) academic or vocational qualification plus a concrete job offer that requires qualifications.",
      "EU Blue Card: a university degree or comparable qualification and a job in Germany that requires it. Salary thresholds: " + SUBJECT + ".",
      "Opportunity Card: a recognised vocational/academic qualification, or at least six points in the points system (language, experience, age, ties to Germany, etc.), plus proof of funds for the job-search period. Holders may work up to 20 hours a week in side jobs; the card is issued for up to one year initially.",
      "Regulated professions need professional licensure. Applicants over 45 starting their first job in Germany may need to show a minimum salary or retirement savings.",
    ],
    steps: [
      { title: "Initial consultation and route assessment", text: "We assess whether the skilled-worker visa, EU Blue Card or Opportunity Card fits your qualifications and experience." },
      { title: "Passport and document review", text: "We check certificates and identify whether your qualification needs recognition in Germany." },
      { title: "Qualification recognition (where applicable)", text: "Many routes need a German-recognised or comparable qualification. We guide you on the process; recognition decisions are made by German authorities." },
      { title: "Job search — your responsibility", text: "You search for and secure a suitable job and employer documentation. Yousuf Consultancy does not supply jobs or guarantee employer sponsorship for Germany." },
      { title: "Employment contract / job offer", text: "For the skilled-worker visa and Blue Card, you obtain a concrete job offer or contract from a German employer. Not required for the Opportunity Card." },
      { title: "Visa application at the German mission", text: "You apply for the entry visa at the German embassy/consulate in your country of residence. Check the mission's site for its exact document list and appointment rules." },
      { title: "Appointment and document submission", text: "Attend your appointment, give biometrics where required and submit originals." },
      { title: "Application review and decision", text: "The mission (and, where needed, the German immigration authority) decides. Timing varies." },
      { title: "Travel preparation", text: "We help you prepare your arrival checklist. Tickets and accommodation are separate." },
      { title: "Arrival and residence permit", text: "After arrival, apply for the residence permit with the immigration office of your town before the visa expires, then register and complete employment formalities." },
    ],
    documents: [
      baseDocs.passport, baseDocs.photos, baseDocs.cv, baseDocs.edu, baseDocs.exp, baseDocs.police,
      { ...baseDocs.contract, note: "Required for skilled-worker visa and Blue Card; not for Opportunity Card" },
      { label: "Proof of recognised / comparable qualification (e.g. recognition result or Anabin/ZAB comparison)", conditional: true, note: "Where required for the route" },
      { label: "Professional licence", conditional: true, note: "Regulated professions only" },
      { label: "Language certificates (German/English)", conditional: true, note: "Opportunity Card points route" },
      { label: "Proof of funds for the job-search period", conditional: true, note: "Opportunity Card" },
      baseDocs.health, baseDocs.legal,
    ],
    faqs: [
      { q: "Will Yousuf Consultancy find me a job in Germany?", a: "No. Applicants must find their own job. The package does not guarantee a job offer or employment placement." },
      { q: "Can I go to Germany without a job offer?", a: "The Opportunity Card allows qualified applicants to enter to look for work without a job offer, if they meet the qualification or points requirements and can show funds." },
      { q: "Is SAR 50,000 the total cost?", a: "No. It is the consultancy fee only. Government, visa, recognition, insurance, translation, legalisation and travel costs are separate." },
      { q: "Is the 6-month timeline guaranteed?", a: "No. It is an estimate and depends on recognition, your job search and the authorities." },
    ],
    sources: [
      { label: "Work visa — Make it in Germany (RLP)", url: "https://make-it-in.rlp.de/en/entry-residence/work-visa" },
      { label: "EU Blue Card — Make it in Germany", url: "https://www.make-it-in-germany.com/en/visa-recognition/types/eu-blue-card" },
    ],
  },
  {
    slug: "lithuania",
    name: "Lithuania",
    flag: "LT",
    accent: "#FDB913",
    fee: 40000,
    timeline: "Approximately 4–5 months",
    serviceType: "Work Visa / Residence Permit Assistance",
    jobResponsibility: "own",
    jobLabel: "Applicant finds own job",
    isActive: true,
    seo: {
      title: "Lithuania Work Visa & Residence Permit Assistance | Yousuf Consultancy",
      description:
        "Lithuania work visa and residence permit assistance from Yousuf Consultancy: process, SAR 40,000 package, 4–5 months estimate. Applicants find their own jobs.",
    },
    overview: [
      "In Lithuania the employer initiates the employment procedure. Where no suitable local candidate is found, a work permit decision is made by the Labour Exchange, after which the foreign national can apply for a national visa (type D) and later a residence permit.",
      "Applicants are responsible for finding their own job. Our package provides consultancy and application guidance only.",
    ],
    opportunities: "General employment with a Lithuanian employer, and EU Blue Card routes for highly qualified specialists. Eligible occupations: " + SUBJECT + ".",
    jobOfferRequired: "Yes — an employer in Lithuania starts the process.",
    jobSearch: JOB_OWN,
    eligibility: [
      "A Lithuanian employer who starts the procedure and publishes the vacancy (the Migration Department states the vacancy must be advertised for at least 5 working days).",
      "If no local candidate is found, the Labour Exchange decides on the work permit.",
      "Blue Card: a highly qualified specialist with a recognised higher-education diploma and a salary of at least 1.5× the sector's average gross salary (a simplified route applies to in-demand specialists or salaries of at least 3× the average).",
      "Other conditions: " + SUBJECT + ".",
    ],
    steps: [
      { title: "Initial consultation and eligibility assessment", text: "We review your profile and discuss which Lithuanian route may apply." },
      { title: "Passport and document review", text: "We check your documents and list what to prepare, translate or legalise. A foreign diploma may need recognition in Lithuania (Blue Card route)." },
      { title: "Job search and employer verification — your responsibility", text: "You find a suitable job and employer. Yousuf Consultancy does not supply jobs or guarantee employer sponsorship for Lithuania." },
      { title: "Employment contract and employer documentation", text: "The employer prepares the contract and company documents. The employer starts all employment procedures." },
      { title: "Vacancy advertisement and Labour Exchange decision", text: "The employer first searches for a local candidate; if none is found, the Labour Exchange decides on the work permit (Blue Card routes follow their own steps)." },
      { title: "National visa (type D) application", text: "After the work permit you can apply for a national visa D, which the Migration Department says allows residence and work for up to one year. Decision time stated: up to 15 days (check current figure)." },
      { title: "Biometrics and original-document submission", text: "Attend the appointment and submit documents as required." },
      { title: "Application review and decision", text: "Authorities decide. Timing varies; about 4–5 months is our overall estimate." },
      { title: "Travel preparation", text: "We help prepare your arrival checklist. Tickets and accommodation are separate." },
      { title: "Arrival and residence permit", text: "After the first year, a residence permit application follows; the Migration Department states a decision takes about 2–4 months. Complete employment formalities on arrival." },
    ],
    documents: [
      baseDocs.passport, baseDocs.photos, baseDocs.cv, baseDocs.edu, baseDocs.exp, baseDocs.police,
      { ...baseDocs.contract, conditional: false, note: "Employer documentation from the Lithuanian employer" },
      { label: "Diploma recognition in Lithuania", conditional: true, note: "Blue Card route" },
      baseDocs.licence, baseDocs.health, baseDocs.finance, baseDocs.legal,
    ],
    faqs: [
      { q: "Will Yousuf Consultancy find me a job in Lithuania?", a: "No. Applicants must find their own job. The package does not guarantee a job offer or employment placement." },
      { q: "Who starts the process in Lithuania?", a: "The employer initiates the employment procedure. You then apply for the visa and, later, the residence permit." },
      { q: "Is SAR 40,000 the total cost?", a: "No. It is the consultancy fee only. Government, visa, insurance, translation, legalisation and travel costs are separate." },
      { q: "Is 4–5 months guaranteed?", a: "No. It is an estimate; actual timing depends on your job search and the authorities." },
    ],
    sources: [
      { label: "Employment — Migration Department of Lithuania", url: "https://www.migration.lt/?p=2319" },
    ],
  },
];

export const getCountry = (slug) => COUNTRIES.find((c) => c.slug === slug);

export const formatFee = (fee) => `${CURRENCY} ${Number(fee).toLocaleString("en-US")}`;
