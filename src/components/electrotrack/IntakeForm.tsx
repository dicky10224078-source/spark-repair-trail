import { useState } from "react";
import { Check, Cpu, Stethoscope, User } from "lucide-react";
import { toast } from "sonner";
import { FileDropzone } from "./FileDropzone";
import { addTicket, newResi } from "@/lib/service-store";

const CONDITIONS = ["Lecet Sudut / Dent", "Segel Utuh", "Layar Bergores", "Baut Kurang"];
export const TECHNICIANS = ["Budi Santoso — Laptop/PC", "Rina Kartika — Smartphone", "Agus Wijaya — TV & Audio", "Dewi Lestari — Microsoldering"];

function Section({ n, icon: Icon, title, children }: { n: number; icon: typeof User; title: string; children: React.ReactNode }) {
  return (
    <section className="panel p-6">
      <header className="mb-5 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary"><Icon className="h-5 w-5" /></span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">Langkah {n}</p>
          <h3 className="text-base font-bold text-foreground">{title}</h3>
        </div>
      </header>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </section>
  );
}

export function IntakeForm({ onSaved }: { onSaved?: () => void }) {
  const [tags, setTags] = useState<string[]>([]);
  const [resi, setResi] = useState(newResi);
  const [formKey, setFormKey] = useState(0);

  return (
    <form key={formKey}
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        const g = (k: string) => String(f.get(k) ?? "").trim();
        const now = new Date();
        addTicket({
          resi, createdAt: now.toISOString(),
          customer: { name: g("name"), phone: g("phone").replace(/^0/, ""), email: g("email"), address: g("address") },
          device: { category: g("category"), model: g("model"), serial: g("serial"), tags },
          complaint: g("complaint"), priority: g("priority"), technician: g("technician"),
          status: "Diterima & Diagnosa", eta: "",
          logs: [{ at: now.toISOString(), status: "Diterima & Diagnosa", note: `Unit diterima. Keluhan: ${g("complaint")}`, photos: 0 }],
        });
        toast.success(`Tiket ${resi} tersimpan`, { description: "Resi siap dicetak & bisa dilacak pelanggan." });
        setTimeout(() => window.print(), 300);
        setTags([]); setResi(newResi()); setFormKey((k) => k + 1); onSaved?.();
      }}
      className="space-y-5"
    >
      <Section n={1} icon={User} title="Data Pelanggan">
        <div><label className="label">Nama Pelanggan <span className="text-primary">*</span></label><input name="name" required maxLength={100} className="field" placeholder="cth. Dicky Maulana" /></div>
        <div>
          <label className="label">Nomor WhatsApp <span className="text-primary">*</span></label>
          <div className="flex">
            <span className="inline-flex items-center rounded-l-lg border border-r-0 border-input bg-muted px-3 text-sm font-medium text-muted-foreground">+62</span>
            <input name="phone" required type="tel" pattern="[0-9]{8,13}" maxLength={13} className="field rounded-l-none" placeholder="81234567890" />
          </div>
        </div>
        <div className="sm:col-span-2"><label className="label">Email <span className="text-xs font-normal text-muted-foreground">(opsional)</span></label><input name="email" type="email" maxLength={255} className="field" placeholder="nama@email.com" /></div>
        <div className="sm:col-span-2"><label className="label">Alamat <span className="text-xs font-normal text-muted-foreground">(opsional)</span></label><textarea name="address" rows={2} maxLength={500} className="field resize-none" /></div>
      </Section>

      <Section n={2} icon={Cpu} title="Spesifikasi Perangkat">
        <div><label className="label">Kategori Perangkat</label>
          <select name="category" className="field">{["Laptop & PC Workstation", "Smartphone", "TV", "Audio", "Lainnya"].map((o) => <option key={o}>{o}</option>)}</select>
        </div>
        <div><label className="label">Merk / Seri Unit</label><input name="model" maxLength={100} className="field" placeholder="Asus ROG Zephyrus G14" /></div>
        <div className="sm:col-span-2"><label className="label">Serial Number / IMEI</label><input name="serial" maxLength={50} className="field font-mono" placeholder="SN / IMEI" /></div>
        <div className="sm:col-span-2">
          <span className="label">Tag Kondisi Fisik</span>
          <div className="flex flex-wrap gap-2">
            {CONDITIONS.map((c) => {
              const on = tags.includes(c);
              return (
                <button key={c} type="button" aria-pressed={on} onClick={() => setTags((t) => on ? t.filter((x) => x !== c) : [...t, c])}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${on ? "border-primary bg-primary text-primary-foreground" : "border-input bg-card text-foreground hover:border-primary/50"}`}>
                  {on && <Check className="h-3.5 w-3.5" />}{c}
                </button>
              );
            })}
          </div>
        </div>
      </Section>

      <Section n={3} icon={Stethoscope} title="Diagnosa Awal & Resi Engine">
        <div className="sm:col-span-2">
          <label className="label">Preview Resi Otomatis</label>
          <input disabled value={resi} className="field font-mono text-base font-bold tracking-wider !text-primary" />
        </div>
        <div className="sm:col-span-2"><label className="label">Keluhan Awal <span className="text-primary">*</span></label><textarea name="complaint" required rows={3} maxLength={1000} className="field resize-none" placeholder="Jelaskan kendala unit..." /></div>
        <div><label className="label">Prioritas SLA</label>
          <select name="priority" className="field">{["Standard Queue", "Express Service", "Urgent"].map((o) => <option key={o}>{o}</option>)}</select>
        </div>
        <div><label className="label">Assign Teknisi</label>
          <select name="technician" required className="field"><option value="">Pilih teknisi PIC</option>{TECHNICIANS.map((o) => <option key={o}>{o}</option>)}</select>
        </div>
        <div className="sm:col-span-2"><FileDropzone label="Upload Foto Awal Kondisi Unit" /></div>
      </Section>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button type="button" onClick={() => { setTags([]); setFormKey((k) => k + 1); }} className="btn-outline">Batal</button>
        <button type="submit" className="btn-primary">Simpan & Cetak Resi</button>
      </div>
    </form>
  );
}
