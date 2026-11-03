import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { FileDropzone } from "./FileDropzone";

const STATUSES = [
  { v: "Diterima & Diagnosa", c: "bg-muted text-foreground border-border" },
  { v: "Dalam Perbaikan", c: "bg-status-blue-soft text-status-blue border-status-blue/30" },
  { v: "Menunggu Sparepart", c: "bg-status-purple-soft text-status-purple border-status-purple/30" },
  { v: "Pengujian / QC Pass", c: "bg-status-green-soft text-status-green border-status-green/30" },
  { v: "Selesai / Siap Ambil", c: "bg-status-green-soft text-status-green border-status-green/30" },
];

export function UpdateStatusModal({ open, onClose, ticket, unit }: { open: boolean; onClose: () => void; ticket: string; unit: string }) {
  const [status, setStatus] = useState(STATUSES[1].v);
  const [notify, setNotify] = useState(true);

  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4 backdrop-blur-sm animate-in fade-in" onClick={onClose}>
      <form role="dialog" aria-modal onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => { e.preventDefault(); toast.success("Progress servis diperbarui", { description: `${ticket} → ${status}${notify ? " · notifikasi WA terkirim" : ""}` }); onClose(); }}
        className="panel flex max-h-[92vh] w-full max-w-xl flex-col animate-in zoom-in-95">
        <header className="flex items-start justify-between border-b border-border p-5">
          <div>
            <h2 className="text-lg font-bold text-foreground">Update Progress Servis</h2>
            <p className="mt-0.5 text-sm text-muted-foreground"><span className="font-mono font-semibold text-primary">#{ticket}</span> · {unit}</p>
          </div>
          <button type="button" aria-label="Tutup" onClick={onClose} className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"><X className="h-5 w-5" /></button>
        </header>

        <div className="space-y-5 overflow-y-auto p-5">
          <fieldset>
            <legend className="label">Status Utama</legend>
            <div className="grid gap-2">
              {STATUSES.map((s) => (
                <label key={s.v} className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3.5 py-2.5 transition ${status === s.v ? "border-primary ring-2 ring-ring/30" : "border-input hover:bg-muted/50"}`}>
                  <input type="radio" name="status" checked={status === s.v} onChange={() => setStatus(s.v)} className="accent-primary" />
                  <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${s.c}`}>{s.v}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <div><label className="label">Estimasi Waktu Selesai</label><input type="datetime-local" required className="field" /></div>
          <div><label className="label">Catatan Teknis Lab / Technical Note</label><textarea rows={4} maxLength={2000} className="field resize-none" placeholder="cth. Penggantian IC charging, pembersihan jalur korosi..." /></div>
          <FileDropzone label="Upload Foto Bukti Component / Part Aus" />
          <label className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-input p-3.5">
            <span className="text-sm font-medium text-foreground">Kirim Notifikasi Otomatis ke WhatsApp Pelanggan</span>
            <button type="button" role="switch" aria-checked={notify} onClick={() => setNotify(!notify)}
              className={`relative h-6 w-11 shrink-0 rounded-full transition ${notify ? "bg-primary" : "bg-input"}`}>
              <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-card shadow transition-all ${notify ? "left-[22px]" : "left-0.5"}`} />
            </button>
          </label>
        </div>

        <footer className="flex justify-end gap-3 border-t border-border p-5">
          <button type="button" onClick={onClose} className="btn-outline">Batal</button>
          <button type="submit" className="btn-primary">Simpan Perubahan</button>
        </footer>
      </form>
    </div>
  );
}
