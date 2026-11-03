import { useSyncExternalStore } from "react";

export const STATUSES = ["Diterima & Diagnosa", "Dalam Perbaikan", "Menunggu Sparepart", "QC Pass", "Selesai"] as const;
export type Status = (typeof STATUSES)[number];

export type LogEntry = { at: string; status: Status; note: string; photos: number };
export type Ticket = {
  resi: string; createdAt: string;
  customer: { name: string; phone: string; email: string; address: string };
  device: { category: string; model: string; serial: string; tags: string[] };
  complaint: string; priority: string; technician: string;
  status: Status; eta: string; logs: LogEntry[];
};

const KEY = "electrotrack.tickets.v1";
const SESSION = "electrotrack.session.v1";

const seed = (): Ticket[] => {
  const mk = (resi: string, name: string, model: string, category: string, status: Status, complaint: string, tech: string): Ticket => ({
    resi, createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    customer: { name, phone: "81234567890", email: "", address: "" },
    device: { category, model, serial: "SN-" + resi.slice(-4), tags: ["Segel Utuh"] },
    complaint, priority: "Standard Queue", technician: tech, status,
    eta: new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 16),
    logs: [{ at: new Date(Date.now() - 86400000 * 2).toISOString(), status: "Diterima & Diagnosa", note: "Unit diterima di front desk.", photos: 0 },
      ...(status !== "Diterima & Diagnosa" ? [{ at: new Date().toISOString(), status, note: "Progres diperbarui teknisi lab.", photos: 0 }] : [])],
  });
  return [
    mk("REP-2024-8849", "Dicky Maulana", "Asus ROG Zephyrus G14", "Laptop & PC Workstation", "Dalam Perbaikan", "Laptop mati total setelah terkena air.", "Budi Santoso — Laptop/PC"),
    mk("TRX-2026-1002", "Siti Aminah", "Samsung Galaxy S23", "Smartphone", "Menunggu Sparepart", "Layar retak & touchscreen tidak responsif.", "Rina Kartika — Smartphone"),
    mk("TRX-2026-1005", "Andi Pratama", "LG OLED 55\"", "TV", "Selesai", "Gambar bergaris horizontal.", "Agus Wijaya — TV & Audio"),
  ];
};

let cache: Ticket[] | null = null;
const listeners = new Set<() => void>();
const read = (): Ticket[] => {
  if (cache) return cache;
  if (typeof window === "undefined") return [];
  try { cache = JSON.parse(localStorage.getItem(KEY) || "null") ?? seed(); } catch { cache = seed(); }
  localStorage.setItem(KEY, JSON.stringify(cache));
  return cache!;
};
const write = (t: Ticket[]) => { cache = t; localStorage.setItem(KEY, JSON.stringify(t)); listeners.forEach((l) => l()); };
const subscribe = (l: () => void) => {
  listeners.add(l);
  const onStorage = (e: StorageEvent) => { if (e.key === KEY) { cache = null; l(); } };
  window.addEventListener("storage", onStorage);
  return () => { listeners.delete(l); window.removeEventListener("storage", onStorage); };
};
const EMPTY: Ticket[] = [];
export const useTickets = () => useSyncExternalStore(subscribe, read, () => EMPTY);

export const addTicket = (t: Ticket) => write([t, ...read()]);
export const updateTicket = (resi: string, status: Status, eta: string, note: string, photos: number) =>
  write(read().map((t) => t.resi === resi ? { ...t, status, eta, logs: [...t.logs, { at: new Date().toISOString(), status, note, photos }] } : t));

export const findTicket = (q: string) => {
  const s = q.trim().toUpperCase().replace(/^#/, "");
  const digits = q.replace(/\D/g, "").replace(/^(62|0)/, "");
  return read().find((t) => t.resi.toUpperCase() === s || (digits.length >= 8 && t.customer.phone.replace(/^0/, "") === digits));
};

export const newResi = () => {
  const d = new Date();
  return `TRX-${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}-${Math.floor(1000 + Math.random() * 9000)}`;
};

// Simulated session (demo only — not real security)
export const DEMO_ACCOUNTS = [{ user: "admin@electrotrack.id", pass: "admin123", name: "Admin Front Desk" }, { user: "teknisi", pass: "teknisi123", name: "Teknisi Lab" }];
export const getSession = (): string | null => typeof window === "undefined" ? null : localStorage.getItem(SESSION);
export const login = (u: string, p: string) => {
  const a = DEMO_ACCOUNTS.find((x) => x.user === u.trim().toLowerCase() && x.pass === p);
  if (a) localStorage.setItem(SESSION, a.name);
  return !!a;
};
export const logout = () => localStorage.removeItem(SESSION);
