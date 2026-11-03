import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import { Wrench } from "lucide-react";
import { TrackingSearch } from "@/components/electrotrack/TrackingSearch";
import { IntakeForm } from "@/components/electrotrack/IntakeForm";
import { UpdateStatusModal } from "@/components/electrotrack/UpdateStatusModal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ElectroTrack — Lacak & Kelola Servis Elektronik" },
      { name: "description", content: "Cek status servis, entri tiket baru, dan update progres perbaikan alat elektronik." },
      { property: "og:title", content: "ElectroTrack Service & Diagnostics" },
      { property: "og:description", content: "Cek status servis alat elektronik Anda secara real-time." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen font-sans">
      <Toaster richColors position="top-right" />
      <nav className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-5xl items-center gap-2 px-6 py-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"><Wrench className="h-4 w-4" /></span>
          <span className="font-bold text-foreground">ElectroTrack</span>
          <span className="text-sm text-muted-foreground">Service & Diagnostics</span>
        </div>
      </nav>

      <section className="px-6 py-16 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">Lacak servis Anda, <span className="text-primary">tanpa ribet.</span></h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Cukup masukkan nomor resi atau nomor telepon — tanpa login.</p>
        <div className="mt-8"><TrackingSearch onSearch={(q) => toast.info(`Mencari status: ${q}`)} /></div>
      </section>

      <main className="mx-auto max-w-3xl space-y-6 px-6 pb-20">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Express Intake Form</h2>
            <p className="text-sm text-muted-foreground">Form entri servis baru untuk front desk.</p>
          </div>
          <button onClick={() => setOpen(true)} className="btn-outline">Demo: Update Status</button>
        </div>
        <IntakeForm />
      </main>

      <UpdateStatusModal open={open} onClose={() => setOpen(false)} ticket="REP-2024-8849" unit="Asus ROG Zephyrus G14" />
    </div>
  );
}
