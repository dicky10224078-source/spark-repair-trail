import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, KanbanSquare, PlusCircle } from "lucide-react";
import { AppHeader } from "@/components/electrotrack/AppHeader";
import { IntakeForm } from "@/components/electrotrack/IntakeForm";
import { UpdateStatusModal, STATUS_STYLE } from "@/components/electrotrack/UpdateStatusModal";
import { getSession, STATUSES, useTickets, type Ticket } from "@/lib/service-store";

export const Route = createFileRoute("/admin")({
  ssr: false,
  beforeLoad: () => { if (!getSession()) throw redirect({ to: "/admin-login" }); },
  head: () => ({ meta: [{ title: "Admin Console — ElectroTrack" }, { name: "description", content: "Antrean servis & update status teknisi." }, { property: "og:title", content: "Admin Console — ElectroTrack" }, { property: "og:description", content: "Antrean servis internal." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

function AdminPage() {
  const tickets = useTickets();
  const [tab, setTab] = useState<"board" | "intake">("board");
  const [sel, setSel] = useState<Ticket | null>(null);
  const tabCls = (on: boolean) => `inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${on ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`;

  return (
    <div className="min-h-screen font-sans">
      <AppHeader mode="admin" user={getSession()} />
      <main className="mx-auto max-w-6xl space-y-6 px-6 py-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div><h1 className="text-2xl font-bold text-foreground">Internal Console</h1><p className="text-sm text-muted-foreground">{tickets.length} tiket dalam antrean</p></div>
          <div className="panel flex gap-1 p-1">
            <button onClick={() => setTab("board")} className={tabCls(tab === "board")}><KanbanSquare className="h-4 w-4" />Papan Antrean</button>
            <button onClick={() => setTab("intake")} className={tabCls(tab === "intake")}><PlusCircle className="h-4 w-4" />Servis Baru</button>
          </div>
        </div>

        {tab === "intake" ? (
          <div className="mx-auto max-w-3xl"><IntakeForm onSaved={() => setTab("board")} /></div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-4">
            {STATUSES.map((s) => {
              const col = tickets.filter((t) => t.status === s);
              return (
                <div key={s} className="w-64 shrink-0 rounded-xl bg-muted/60 p-3">
                  <div className="mb-3 flex items-center justify-between">
                    <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLE[s]}`}>{s}</span>
                    <span className="text-xs font-semibold text-muted-foreground">{col.length}</span>
                  </div>
                  <div className="space-y-2">
                    {col.map((t) => (
                      <button key={t.resi} onClick={() => setSel(t)} className="panel block w-full p-3 text-left transition hover:border-primary/50 hover:shadow-md">
                        <p className="font-mono text-xs font-bold text-primary">{t.resi}</p>
                        <p className="mt-1 text-sm font-semibold text-foreground">{t.device.model || t.device.category}</p>
                        <p className="text-xs text-muted-foreground">{t.customer.name}</p>
                        <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                          <span className={t.priority === "Urgent" ? "font-semibold text-primary" : ""}>{t.priority}</span>
                          {t.eta && <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{new Date(t.eta).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}</span>}
                        </div>
                      </button>
                    ))}
                    {!col.length && <p className="py-6 text-center text-xs text-muted-foreground">Kosong</p>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
      {sel && <UpdateStatusModal ticket={sel} onClose={() => setSel(null)} />}
    </div>
  );
}
