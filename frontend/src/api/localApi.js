// ---------------------------------------------------------------
// In-browser implementation of the former Express API.
// Same routes, same request/response shapes, so every page keeps
// calling api.get("/api/...") exactly as before.
// ---------------------------------------------------------------
import { loadDb, saveDb, newId } from "./localDb";
import { ALL_PERMISSIONS } from "./permissions";
import { COUNTRIES } from "../data/europeWorkVisa";

const COUNTRY_SLUGS = COUNTRIES.map((c) => c.slug);

const DEFAULT_ADMIN_EMAIL = (
  import.meta.env.VITE_ADMIN_EMAIL || "yousufconsultancy46@gmail.com"
).toLowerCase();
const DEFAULT_ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "0571446@#";

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}
const fail = (status, message) => {
  throw new HttpError(status, message);
};

// ---------- helpers ----------
const hashPassword = async (pw) => {
  try {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(pw));
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  } catch {
    return "plain:" + pw; // insecure-context fallback
  }
};

const fileToDataUri = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

// Downscale images so the browser database stays small
const compressImage = async (file, maxSize = 1200, quality = 0.82) => {
  try {
    if (file.type === "image/gif") return await fileToDataUri(file);
    const src = await fileToDataUri(file);
    const img = await new Promise((resolve, reject) => {
      const i = new Image();
      i.onload = () => resolve(i);
      i.onerror = reject;
      i.src = src;
    });
    const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(img.width * scale);
    canvas.height = Math.round(img.height * scale);
    canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/webp", quality);
  } catch {
    return await fileToDataUri(file);
  }
};

// Turn axios body (JSON object or FormData) into { fields, files }
const parseBody = (body) => {
  const fields = {};
  const files = {};
  if (typeof FormData !== "undefined" && body instanceof FormData) {
    for (const [k, v] of body.entries()) {
      if (v instanceof File) files[k] = v;
      else fields[k] = v;
    }
  } else if (body && typeof body === "object") {
    Object.assign(fields, body);
  } else if (typeof body === "string" && body) {
    try {
      Object.assign(fields, JSON.parse(body));
    } catch {
      /* ignore */
    }
  }
  return { fields, files };
};

const parseJson = (v, fallback) => {
  if (typeof v !== "string") return v ?? fallback;
  try {
    return JSON.parse(v);
  } catch {
    return fallback;
  }
};
const parseBool = (v) => (typeof v === "string" ? v === "true" : v);

const stamp = (doc, isNew) => {
  const now = new Date().toISOString();
  if (isNew) doc.createdAt = now;
  doc.updatedAt = now;
  return doc;
};

const publicUser = (a) => {
  const { password: _pw, ...rest } = a;
  return { ...rest, id: a._id };
};

// ---------- seed ----------
let seedPromise = null;
const ensureDefaultAdmin = (db) => {
  // Shared promise so concurrent first requests all wait for the seed
  if (!seedPromise) seedPromise = seedDefaultAdmin(db);
  return seedPromise;
};
const seedDefaultAdmin = async (db) => {
  let admin = db.admins.find((a) => a.email === DEFAULT_ADMIN_EMAIL);
  if (!admin) {
    db.admins.push(
      stamp(
        {
          _id: newId(),
          name: "Yousuf Admin",
          email: DEFAULT_ADMIN_EMAIL,
          password: await hashPassword(DEFAULT_ADMIN_PASSWORD),
          role: "admin",
          permissions: [...ALL_PERMISSIONS],
          avatar: "",
          phone: "",
        },
        true
      )
    );
    await saveDb();
  } else if (admin.role !== "admin" || !ALL_PERMISSIONS.every((p) => admin.permissions.includes(p))) {
    admin.role = "admin";
    admin.permissions = [...ALL_PERMISSIONS];
    await saveDb();
  }
};

// ---------- auth ----------
const TOKEN_PREFIX = "local.";
const authenticate = (db, headers) => {
  const raw = headers?.Authorization || headers?.authorization || "";
  const token = raw.split(" ")[1];
  if (!token || !token.startsWith(TOKEN_PREFIX)) fail(401, "টোকেন প্রয়োজন");
  const admin = db.admins.find((a) => a._id === token.slice(TOKEN_PREFIX.length));
  if (!admin) fail(401, "অ্যাডমিন পাওয়া যায়নি");
  return admin;
};
const requireSuper = (u) => {
  if (u.role !== "admin") fail(403, "শুধুমাত্র প্রধান অ্যাডমিন অনুমোদিত");
};
const requirePerm = (u, perm) => {
  if (u.role === "admin") return;
  if (!u.permissions?.includes(perm)) fail(403, "এই অপারেশনের জন্য অনুমতি নেই");
};

// ---------- generic CRUD for image-bearing collections ----------
const sortNewest = (list) =>
  [...list].sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));

const crudConfig = {
  team: {
    perm: "team",
    key: "member",
    msgs: ["টিম সদস্য যোগ হয়েছে", "টিম সদস্য আপডেট হয়েছে", "টিম সদস্য মুছে দেওয়া হয়েছে"],
    notFound: "সদস্য পাওয়া যায়নি",
    prep: (b) => {
      if (typeof b.socialLinks === "string") b.socialLinks = parseJson(b.socialLinks, {});
      if (b.order !== undefined && b.order !== "") b.order = Number(b.order) || 0;
    },
    sort: (l) =>
      [...l].sort(
        (a, b) =>
          (a.order || 0) - (b.order || 0) ||
          (b.createdAt || "").localeCompare(a.createdAt || "")
      ),
  },
  blog: {
    perm: "blog",
    key: "post",
    msgs: ["পোস্ট প্রকাশিত হয়েছে", "পোস্ট আপডেট হয়েছে", "পোস্ট মুছে দেওয়া হয়েছে"],
    notFound: "পোস্ট পাওয়া যায়নি",
    prep: (b) => {
      if (b.isPublished !== undefined) b.isPublished = parseBool(b.isPublished);
    },
  },
  services: {
    perm: "services",
    key: "service",
    msgs: ["সার্ভিস যোগ হয়েছে", "সার্ভিস আপডেট হয়েছে", "সার্ভিস মুছে দেওয়া হয়েছে"],
    notFound: "সার্ভিস পাওয়া যায়নি",
    prep: (b) => {
      if (b.isActive !== undefined) b.isActive = parseBool(b.isActive);
      if (b.price !== undefined && b.price !== "") b.price = Number(b.price) || 0;
    },
  },
};

const REQUIRED = {
  team: ["name", "position"],
  blog: ["title", "content"],
  services: ["name", "description"],
};

const ensureRequired = (col, doc) => {
  for (const f of REQUIRED[col] || []) {
    if (!doc[f]) fail(400, `${f} প্রয়োজন`);
  }
};

// ---------- router ----------
export async function handleRequest({ method, url, data, headers }) {
  const db = await loadDb();
  await ensureDefaultAdmin(db);

  const [path, queryStr = ""] = url.replace(/^https?:\/\/[^/]+/, "").split("?");
  const query = Object.fromEntries(new URLSearchParams(queryStr));
  const seg = path.replace(/^\/+|\/+$/g, "").split("/"); // ["api", "team", ":id"]
  if (seg[0] !== "api") fail(404, "Not found");
  const [, res, id, sub] = seg;
  const M = method.toUpperCase();
  const { fields, files } = parseBody(data);

  if (res === "health") return { ok: true, ts: Date.now() };

  // ----- auth -----
  if (res === "auth" && id === "login" && M === "POST") {
    const { email, password } = fields;
    if (!email || !password) fail(400, "ইমেইল এবং পাসওয়ার্ড প্রয়োজন");
    const admin = db.admins.find((a) => a.email === String(email).toLowerCase().trim());
    if (!admin) fail(401, "ভুল ইমেইল বা পাসওয়ার্ড");
    const hashed = await hashPassword(password);
    if (admin.password !== hashed) fail(401, "ভুল ইমেইল বা পাসওয়ার্ড");
    return { success: true, token: TOKEN_PREFIX + admin._id, user: publicUser(admin) };
  }
  if (res === "auth" && id === "me" && M === "GET") {
    return publicUser(authenticate(db, headers));
  }

  // ----- public submissions -----
  if (res === "applications" && !id && M === "POST") {
    const { name, email, phone, service, message } = fields;
    if (!name || !email) fail(400, "নাম ও ইমেইল প্রয়োজন");
    const doc = stamp(
      { _id: newId(), name, email, phone, service, message, status: "pending", notes: "" },
      true
    );
    db.applications.push(doc);
    await saveDb();
    return { success: true, application: doc, message: "আবেদন গ্রহণ করা হয়েছে" };
  }

  // ----- public reads -----
  if (res === "europe-visa" && !id && M === "GET") return db.europe;

  if (M === "GET" && ["team", "services", "gallery", "blog"].includes(res)) {
    if (res === "blog") {
      if (id) {
        const post = db.blog.find((p) => p._id === id);
        if (!post) fail(404, "পোস্ট পাওয়া যায়নি");
        return post;
      }
      const all = query.all === "true";
      return sortNewest(db.blog.filter((p) => all || p.isPublished));
    }
    if (id) fail(404, "Not found");
    const cfg = crudConfig[res];
    return (cfg?.sort || sortNewest)(db[res]);
  }

  // ===== everything below needs a logged-in admin =====
  const user = authenticate(db, headers);

  // ----- profile -----
  if (res === "admin") {
    if (id === "profile" && M === "PUT") {
      const me = db.admins.find((a) => a._id === user._id);
      if (fields.name) me.name = String(fields.name).trim();
      if (fields.email) {
        const email = String(fields.email).toLowerCase().trim();
        if (email !== me.email && db.admins.some((a) => a.email === email))
          fail(400, "এই ইমেইল ইতিমধ্যে ব্যবহৃত");
        me.email = email;
      }
      if (fields.phone !== undefined) me.phone = fields.phone;
      stamp(me);
      await saveDb();
      return { success: true, user: publicUser(me), message: "প্রোফাইল আপডেট হয়েছে" };
    }
    if (id === "avatar" && M === "POST") {
      if (!files.avatar) fail(400, "ছবি প্রয়োজন");
      const me = db.admins.find((a) => a._id === user._id);
      me.avatar = await compressImage(files.avatar, 400);
      stamp(me);
      await saveDb();
      return { success: true, avatar: me.avatar, user: publicUser(me) };
    }
    if (id === "change-password" && M === "POST") {
      const { currentPassword, newPassword } = fields;
      if (!currentPassword || !newPassword) fail(400, "সকল ফিল্ড প্রয়োজন");
      if (newPassword.length < 6) fail(400, "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে");
      const me = db.admins.find((a) => a._id === user._id);
      if (me.password !== (await hashPassword(currentPassword)))
        fail(401, "বর্তমান পাসওয়ার্ড সঠিক নয়");
      me.password = await hashPassword(newPassword);
      stamp(me);
      await saveDb();
      return { success: true, message: "পাসওয়ার্ড পরিবর্তিত হয়েছে" };
    }
  }

  // ----- sub-admin management -----
  if (res === "admins") {
    requireSuper(user);
    if (!id && M === "GET") return sortNewest(db.admins).map(publicUser);
    if (!id && M === "POST") {
      const { name, email, password, permissions } = fields;
      if (!name || !email || !password) fail(400, "নাম, ইমেইল এবং পাসওয়ার্ড প্রয়োজন");
      if (password.length < 6) fail(400, "পাসওয়ার্ড কমপক্ষে ৬ অক্ষর হতে হবে");
      const mail = String(email).toLowerCase().trim();
      if (db.admins.some((a) => a.email === mail)) fail(400, "এই ইমেইল ইতিমধ্যে ব্যবহৃত");
      const admin = stamp(
        {
          _id: newId(),
          name: name.trim(),
          email: mail,
          password: await hashPassword(password),
          role: "sub_admin",
          permissions: Array.isArray(permissions) ? permissions : [],
          avatar: "",
          phone: "",
        },
        true
      );
      db.admins.push(admin);
      await saveDb();
      return { success: true, admin: publicUser(admin) };
    }
    const target = db.admins.find((a) => a._id === id);
    if (id && M === "PUT") {
      if (!target) fail(404, "অ্যাডমিন পাওয়া যায়নি");
      if (target.role === "admin") fail(400, "প্রধান অ্যাডমিন পরিবর্তন করা যাবে না");
      if (fields.name) target.name = fields.name.trim();
      if (Array.isArray(fields.permissions)) target.permissions = fields.permissions;
      stamp(target);
      await saveDb();
      return { success: true, admin: publicUser(target) };
    }
    if (id && M === "DELETE") {
      if (!target) fail(404, "পাওয়া যায়নি");
      if (target.role === "admin") fail(400, "প্রধান অ্যাডমিন মুছে ফেলা যাবে না");
      db.admins = db.admins.filter((a) => a._id !== id);
      await saveDb();
      return { success: true, message: "মুছে ফেলা হয়েছে" };
    }
  }

  // ----- Europe work visa package overrides (fee / timeline / visibility) -----
  if (res === "europe-visa") {
    if (!id && M === "GET") return db.europe;
    if (id && M === "PUT") {
      requirePerm(user, "europe");
      if (!COUNTRY_SLUGS.includes(id)) fail(404, "দেশ পাওয়া যায়নি");
      const body = {};
      if (fields.fee !== undefined && fields.fee !== "") body.fee = Number(fields.fee) || 0;
      if (fields.timeline !== undefined) body.timeline = String(fields.timeline).trim();
      if (fields.serviceType !== undefined) body.serviceType = String(fields.serviceType).trim();
      if (fields.isActive !== undefined) body.isActive = parseBool(fields.isActive);
      const idx = db.europe.findIndex((e) => e.slug === id);
      const doc = stamp(idx < 0 ? { _id: id, slug: id, ...body } : { ...db.europe[idx], ...body }, idx < 0);
      if (idx < 0) db.europe.push(doc);
      else db.europe[idx] = doc;
      await saveDb();
      return { success: true, country: doc };
    }
  }

  // ----- team / blog / services -----
  if (crudConfig[res]) {
    const cfg = crudConfig[res];
    requirePerm(user, cfg.perm);
    const body = { ...fields };
    cfg.prep(body);

    if (!id && M === "POST") {
      if (files.image) body.image = await compressImage(files.image);
      if (res === "blog" && !body.author) body.author = user.name;
      const doc = stamp({ _id: newId(), ...body }, true);
      ensureRequired(res, doc);
      db[res].push(doc);
      await saveDb();
      return { success: true, [cfg.key]: doc, message: cfg.msgs[0] };
    }
    const idx = db[res].findIndex((d) => d._id === id);
    if (id && M === "PUT") {
      if (idx < 0) fail(404, cfg.notFound);
      if (files.image) body.image = await compressImage(files.image);
      delete body._id;
      const doc = stamp({ ...db[res][idx], ...body });
      ensureRequired(res, doc);
      db[res][idx] = doc;
      await saveDb();
      return { success: true, [cfg.key]: doc, message: cfg.msgs[1] };
    }
    if (id && M === "DELETE") {
      if (idx < 0) fail(404, cfg.notFound);
      db[res].splice(idx, 1);
      await saveDb();
      return { success: true, message: cfg.msgs[2] };
    }
  }

  // ----- gallery -----
  if (res === "gallery") {
    requirePerm(user, "gallery");
    if (!id && M === "POST") {
      if (!files.image) fail(400, "ছবি প্রয়োজন");
      const item = stamp(
        {
          _id: newId(),
          title: fields.title || "",
          description: fields.description || "",
          category: fields.category || "সাধারণ",
          image: await compressImage(files.image),
        },
        true
      );
      db.gallery.push(item);
      await saveDb();
      return { success: true, gallery: item };
    }
    if (id && M === "DELETE") {
      const idx = db.gallery.findIndex((g) => g._id === id);
      if (idx < 0) fail(404, "ছবি পাওয়া যায়নি");
      db.gallery.splice(idx, 1);
      await saveDb();
      return { success: true, message: "ছবি মুছে দেওয়া হয়েছে" };
    }
  }

  // ----- applications -----
  if (res === "applications") {
    requirePerm(user, "applications");
    if (!id && M === "GET") return sortNewest(db.applications);
    const idx = db.applications.findIndex((a) => a._id === id);
    if (id && sub === "status" && M === "PUT") {
      if (idx < 0) fail(404, "পাওয়া যায়নি");
      if (fields.status) db.applications[idx].status = fields.status;
      if (fields.notes !== undefined) db.applications[idx].notes = fields.notes;
      stamp(db.applications[idx]);
      await saveDb();
      return { success: true, application: db.applications[idx] };
    }
    if (id && !sub && M === "DELETE") {
      if (idx < 0) fail(404, "পাওয়া যায়নি");
      db.applications.splice(idx, 1);
      await saveDb();
      return { success: true, message: "মুছে ফেলা হয়েছে" };
    }
  }

  // ----- dashboard / analytics -----
  const count = (col, status) =>
    db[col].filter((d) => (status ? d.status === status : true)).length;

  if (res === "dashboard" && id === "stats" && M === "GET") {
    return {
      totalApplications: count("applications"),
      pendingApplications: count("applications", "pending"),
      completedApplications: count("applications", "approved"),
      totalTeamMembers: count("team"),
      totalEuropeCountries: COUNTRY_SLUGS.length,
      totalBlogPosts: count("blog"),
      totalServices: count("services"),
      totalGallery: count("gallery"),
    };
  }
  if (res === "analytics" && M === "GET") {
    requirePerm(user, "analytics");
    return {
      applicationStats: {
        total: count("applications"),
        pending: count("applications", "pending"),
        inProgress: count("applications", "in_progress"),
        approved: count("applications", "approved"),
        rejected: count("applications", "rejected"),
      },
      totalVisitors: 0,
      totalPageViews: 0,
      activeSessions: 0,
      avgSessionDuration: "—",
    };
  }

  fail(404, "Route পাওয়া যায়নি");
}

// Adapter for axios: turns HttpError into a normal axios-style error
export const localAdapter = async (config) => {
  const fullUrl = (config.baseURL || "") + (config.url || "");
  try {
    const payload = await handleRequest({
      method: config.method || "get",
      url: fullUrl,
      data: config.data,
      headers: config.headers,
    });
    return { data: payload, status: 200, statusText: "OK", headers: {}, config, request: {} };
  } catch (e) {
    const status = e instanceof HttpError ? e.status : 500;
    const err = new Error(e.message || "Local API error");
    err.config = config;
    err.response = {
      data: { error: e.message || "সার্ভার ত্রুটি" },
      status,
      statusText: String(status),
      headers: {},
      config,
    };
    if (!(e instanceof HttpError)) console.error("Local API error:", e);
    throw err;
  }
};
