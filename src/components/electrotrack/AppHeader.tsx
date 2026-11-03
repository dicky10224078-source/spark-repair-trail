import { Link, useNavigate } from "@tanstack/react-router";
import { LogOut, ShieldCheck, Users, Wrench } from "lucide-react";
import { logout } from "@/lib/service-store";

export function AppHeader({ mode, user }: { mode: "public" | "admin"; user?: string | null }) {
  const nav = useNavigate();
  return (
    <nav className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-6 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"><Wrench className="h-4 w-4" /></span>
          <span className="font-bold text-foreground">ElectroTrack</span>
          <span className="hidden text-sm text-muted-foreground sm:inline">{mode === "admin" ? "Internal Console" : "Service & Diagnostics"}</span>
        </Link>
        <div className="ml-auto flex items-center gap-2">
          {mode === "public" ? (
            <Link to="/admin" className="btn-outline py-2"><ShieldCheck className="h-4 w-4" />Login Admin</Link>
          ) : (
            <>
              {user && <span className="hidden text-sm text-muted-foreground md:inline">{user}</span>}
              <Link to="/" className="btn-outline py-2"><Users className="h-4 w-4" />Tampilan Pelanggan</Link>
              <button onClick={() => { logout(); nav({ to: "/admin-login", replace: true }); }} className="btn-outline py-2" aria-label="Keluar"><LogOut className="h-4 w-4" /></button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
