import { useState } from "react";
import { Search } from "lucide-react";

const SAMPLES = ["REP-2024-8849", "TRX-2026-1002", "TRX-2026-1005"];

export function TrackingSearch({ onSearch }: { onSearch?: (q: string) => void }) {
  const [q, setQ] = useState("");
  return (
    <form onSubmit={(e) => { e.preventDefault(); if (q.trim()) onSearch?.(q.trim()); }} className="panel mx-auto w-full max-w-3xl p-3 sm:p-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} maxLength={40} placeholder="Masukkan Nomor Resi (contoh: REP-2024-8849) atau No. Telepon..." className="field h-14 pl-12 text-base" />
        </div>
        <button type="submit" className="btn-primary h-14 px-7 text-base">Cek Status →</button>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
        <span className="text-muted-foreground">Sample Resi:</span>
        {SAMPLES.map((s) => (
          <button key={s} type="button" onClick={() => setQ(s)} className="rounded-full border border-primary/20 bg-primary-soft px-3 py-1 font-mono font-medium text-primary transition hover:bg-primary hover:text-primary-foreground">{s}</button>
        ))}
      </div>
    </form>
  );
}
