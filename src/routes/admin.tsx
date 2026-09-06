import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Mail, Trash2, CheckCheck, LogOut, RefreshCw, Inbox } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Reveal } from "@/components/Reveal";

const SITE = "https://avatar-journey-web.lovable.app";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — SAIF Solutions" },
      { name: "description", content: "Private dashboard for SAIF Solutions project enquiries." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin Dashboard — SAIF Solutions" },
      { property: "og:description", content: "Private dashboard for SAIF Solutions project enquiries." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/admin` },
    ],
  }),
  component: AdminPage,
});

type Submission = {
  id: string;
  name: string;
  email: string;
  service: string;
  brief: string;
  is_read: boolean;
  created_at: string;
};

function AdminPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "denied" | "ready">("loading");
  const [rows, setRows] = useState<Submission[]>([]);
  const [email, setEmail] = useState("");

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error("Could not load enquiries.");
      return;
    }
    setRows((data ?? []) as Submission[]);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      if (!session) {
        navigate({ to: "/auth" });
        return;
      }
      setEmail(session.user.email ?? "");
      await supabase.rpc("claim_admin");
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin");
      if (cancelled) return;
      if (!roles || roles.length === 0) {
        setStatus("denied");
        return;
      }
      setStatus("ready");
      await load();
    })();
    return () => {
      cancelled = true;
    };
  }, [navigate, load]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  };

  const markRead = async (row: Submission) => {
    const { error } = await supabase
      .from("contact_submissions")
      .update({ is_read: !row.is_read })
      .eq("id", row.id);
    if (error) return toast.error("Update failed.");
    setRows((r) => r.map((x) => (x.id === row.id ? { ...x, is_read: !x.is_read } : x)));
  };

  const remove = async (row: Submission) => {
    const { error } = await supabase.from("contact_submissions").delete().eq("id", row.id);
    if (error) return toast.error("Delete failed.");
    setRows((r) => r.filter((x) => x.id !== row.id));
    toast.success("Enquiry deleted.");
  };

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">
        Loading dashboard...
      </div>
    );
  }

  if (status === "denied") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="chrome-text text-3xl">ADMIN ONLY</h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          {email} does not have admin access. Sign in with the admin account to view enquiries.
        </p>
        <button
          onClick={signOut}
          className="rounded-full border border-border px-5 py-2 font-semibold transition hover:bg-secondary"
        >
          Switch account
        </button>
      </div>
    );
  }

  const unread = rows.filter((r) => !r.is_read).length;

  return (
    <div className="px-4 pb-32 pt-28 md:px-6 md:pt-32">
      <Reveal>
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-display text-xs tracking-[0.4em] text-accent">DASHBOARD</p>
            <h1 className="chrome-text mt-2 text-4xl md:text-5xl">ENQUIRIES</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Signed in as {email} · {rows.length} total · {unread} unread
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={load}
              className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold transition hover:bg-secondary"
            >
              <RefreshCw className="h-4 w-4" /> Refresh
            </button>
            <button
              onClick={signOut}
              className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold transition hover:bg-secondary"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </div>
      </Reveal>

      <div className="mx-auto mt-10 grid max-w-5xl gap-4">
        {rows.length === 0 && (
          <div className="glass-card flex flex-col items-center gap-3 rounded-3xl p-12 text-center text-muted-foreground">
            <Inbox className="h-8 w-8 text-accent" />
            No enquiries yet. Briefs sent from the contact page land here.
          </div>
        )}

        {rows.map((row, i) => (
          <Reveal key={row.id} delay={Math.min(i * 60, 240)}>
            <article
              className={`tilt-3d glass-card rounded-2xl p-6 ${row.is_read ? "opacity-70" : ""}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-display text-lg">{row.name}</p>
                  <a
                    href={`mailto:${row.email}`}
                    className="mt-1 flex items-center gap-2 text-sm text-accent"
                  >
                    <Mail className="h-4 w-4" /> {row.email}
                  </a>
                </div>
                <div className="text-right text-xs text-muted-foreground">
                  <p className="font-display tracking-widest text-accent">{row.service}</p>
                  <p className="mt-1">{new Date(row.created_at).toLocaleString()}</p>
                </div>
              </div>
              <p className="mt-4 whitespace-pre-wrap text-sm text-muted-foreground">{row.brief}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  onClick={() => markRead(row)}
                  className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition hover:scale-105"
                >
                  <CheckCheck className="h-4 w-4" /> {row.is_read ? "Mark unread" : "Mark read"}
                </button>
                <button
                  onClick={() => remove(row)}
                  className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold transition hover:bg-secondary"
                >
                  <Trash2 className="h-4 w-4" /> Delete
                </button>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
