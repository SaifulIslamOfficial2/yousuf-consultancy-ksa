// ---------------------------------------------------------------
// Browser-only database (IndexedDB). Replaces the old Express/MongoDB
// backend. All data lives in the visitor's own browser.
// When a real backend is ready, delete this file + localApi.js and
// point api/client.js at the server (see README).
// ---------------------------------------------------------------
const DB_NAME = "yousuf-consultancy";
const STORE = "kv";
const KEY = "db";

const openIdb = () =>
  new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });

const idbGet = async () => {
  const db = await openIdb();
  return new Promise((resolve, reject) => {
    const r = db.transaction(STORE).objectStore(STORE).get(KEY);
    r.onsuccess = () => resolve(r.result);
    r.onerror = () => reject(r.error);
  });
};

const idbSet = async (value) => {
  const db = await openIdb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put(value, KEY);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
};

export const COLLECTIONS = [
  "admins",
  "team",
  "europe",
  "blog",
  "services",
  "gallery",
  "applications",
];

let cache = null;
let queue = Promise.resolve();

// One shared load promise so concurrent first requests use the SAME object
let loading = null;
export const loadDb = () => {
  if (!loading) {
    loading = (async () => {
      let stored = null;
      try {
        stored = await idbGet();
      } catch {
        stored = null;
      }
      cache = stored || {};
      COLLECTIONS.forEach((c) => {
        if (!Array.isArray(cache[c])) cache[c] = [];
      });
      return cache;
    })();
  }
  return loading;
};

// Serialises writes so concurrent requests can't clobber each other
export const saveDb = () => {
  queue = queue.then(() => idbSet(cache)).catch((e) => {
    console.error("DB save failed", e);
    throw e;
  });
  return queue;
};

export const newId = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
