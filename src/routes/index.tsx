import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Circle, Clock, SearchX } from "lucide-react";
import { AppHeader } from "@/components/electrotrack/AppHeader";
import { TrackingSearch } from "@/components/electrotrack/TrackingSearch";
import { STATUS_STYLE } from "@/components/electrotrack/UpdateStatusModal";
import { findTicket, STATUSES, useTickets, type Ticket } from "@/lib/service-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ElectroTrack — Lacak Status Servis Elektronik" },
      { name: "description", content: "Cek status servis alat elektronik Anda dengan nomor resi atau nomor telepon, tanpa login." },
      { property: "og:title", content: "ElectroTrack Service & Diagnostics" },
      { property: "og:description", content: "Cek status servis alat elektronik Anda secara real-time." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

const fmt = (d: string) => new Date(d).toLocaleString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

function Result({ t }: { t: Ticket }) {
  const idx = STATUSES.indexOf(t.status);
  return (
    <div className="panel mx-auto mt-6 max-w-3xl p-6 text-left">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-mono text-sm font-bold text-primary">#{t.resi}</p>
          <h2 className="text-xl font-bold text-foreground">{t.device.model || t.device.category}</h2>
          <p className="text-sm text-muted-foreground">a.n. {t.customer.name} · Teknisi: {t.technician.split(" — ")[0] || "-"}</p>
        </div>
        <span className={`rounded-full border px-3 py-1 text-sm font-semibold ${STATUS_STYLE[t.status]}`}>{t.status}</span>
      </div>
      <div className="mt-6 grid grid-cols-5 gap-1">
        {STATUSES.map((s, i) => (
          <div key={s} className="text-center">
            <div className={`h-1.5 rounded-full ${i <= idx ? "bg-primary" : "bg-muted"}`} />
            <p className={`mt-2 text-[11px] leading-tight ${i <= idx ? "font-semibold text-foreground" : "text-muted-foreground"}`}>{s}</p>
          </div>
        ))}
      </div>
      {t.eta && <p className="mt-5 flex items-center gap-2 text-sm text-foreground"><Clock className="h-4 w-4 text-primary" />Estimasi selesai: <b>{fmt(t.eta)}</b></p>}
      <h3 className="mt-6 mb-3 text-sm font-bold text-foreground">Riwayat Progres</h3>
      <ol className="space-y-3">
        {[...t.logs].reverse().map((l, i) => (
          <li key={i} className="flex gap-3">
            {i === 0 ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> : <Circle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />}
            <div>
              <p className="text-sm font-semibold text-foreground">{l.status} <span className="font-normal text-muted-foreground">· {fmt(l.at)}</span></p>
              <p className="text-sm text-muted-foreground">{l.note}{l.photos > 0 && ` (${l.photos} foto bukti)`}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Index() {
  useTickets(); // re-render when data changes
  const [q, setQ] = useState<string | null>(null);
  const found = q ? findTicket(q) : undefined;
  return (
    <div className="min-h-screen font-sans">
      <AppHeader mode="public" />
      <section className="px-6 py-16 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">Lacak servis Anda, <span className="text-primary">tanpa ribet.</span></h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Cukup masukkan nomor resi atau nomor telepon — tanpa login.</p>
        <div className="mt-8"><TrackingSearch onSearch={setQ} /></div>
        {q && (found ? <Result t={found} /> : (
          <div className="panel mx-auto mt-6 flex max-w-3xl items-center gap-3 p-6 text-left">
            <SearchX className="h-6 w-6 text-primary" />
            <p className="text-sm text-foreground">Resi / nomor <b>{q}</b> tidak ditemukan. Periksa kembali nomor Anda.</p>
          </div>
        ))}
      </section>
    </div>
  );
}
