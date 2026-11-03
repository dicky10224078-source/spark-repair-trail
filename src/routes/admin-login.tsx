import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Lock } from "lucide-react";
import { AppHeader } from "@/components/electrotrack/AppHeader";
import { DEMO_ACCOUNTS, login } from "@/lib/service-store";

export const Route = createFileRoute("/admin-login")({
  head: () => ({ meta: [{ title: "Login Admin — ElectroTrack" }, { name: "description", content: "Masuk ke Internal Console ElectroTrack." }, { property: "og:title", content: "Login Admin — ElectroTrack" }, { property: "og:description", content: "Masuk ke Internal Console." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex" }] }),
  component: LoginPage,
});

function LoginPage() {
  const nav = useNavigate();
  const [u, setU] = useState(""); const [p, setP] = useState(""); const [err, setErr] = useState("");
  return (
    <div className="min-h-screen font-sans">
      <AppHeader mode="public" />
      <div className="mx-auto max-w-sm px-6 py-16">
        <form className="panel space-y-4 p-6" onSubmit={(e) => { e.preventDefault(); if (login(u, p)) nav({ to: "/admin", replace: true }); else setErr("Email/username atau password salah."); }}>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-primary"><Lock className="h-5 w-5" /></span>
            <div><h1 className="text-lg font-bold text-foreground">Login Admin / Teknisi</h1><p className="text-xs text-muted-foreground">Internal Console</p></div>
          </div>
          <div><label className="label">Email / Username</label><input required maxLength={100} value={u} onChange={(e) => setU(e.target.value)} className="field" /></div>
          <div><label className="label">Password</label><input required type="password" maxLength={100} value={p} onChange={(e) => setP(e.target.value)} className="field" /></div>
          {err && <p className="text-sm text-destructive">{err}</p>}
          <button className="btn-primary w-full">Masuk</button>
          <div className="rounded-lg bg-muted p-3 text-xs text-muted-foreground">
            <p className="mb-1 font-semibold">Akun demo:</p>
            {DEMO_ACCOUNTS.map((a) => <button type="button" key={a.user} onClick={() => { setU(a.user); setP(a.pass); }} className="block font-mono hover:text-primary">{a.user} / {a.pass}</button>)}
          </div>
        </form>
      </div>
    </div>
  );
}
