import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Plus, Pencil, Trash2, LogOut, ExternalLink } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { portfolioListQuery, type PortfolioProject } from "@/lib/portfolio";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin — KG365 LLC" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

type Editing = Partial<PortfolioProject> & { id?: string };

const empty: Editing = {
  title: "",
  slug: "",
  description: "",
  category: "renovation",
  location: "",
  before_image_url: "",
  after_image_url: "",
  featured: false,
  display_order: 0,
};

function AdminPage() {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const { data, isLoading } = useQuery(portfolioListQuery);
  const [editing, setEditing] = useState<Editing | null>(null);
  const [saving, setSaving] = useState(false);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  const save = async () => {
    if (!editing) return;
    if (!editing.title || !editing.slug || !editing.after_image_url) {
      toast.error("Title, slug, and after image are required");
      return;
    }
    setSaving(true);
    const payload = {
      title: editing.title,
      slug: editing.slug,
      description: editing.description ?? "",
      category: editing.category ?? "renovation",
      location: editing.location || null,
      before_image_url: editing.before_image_url || null,
      after_image_url: editing.after_image_url,
      featured: !!editing.featured,
      display_order: Number(editing.display_order ?? 0),
    };
    const { error } = editing.id
      ? await supabase.from("portfolio_projects").update(payload).eq("id", editing.id)
      : await supabase.from("portfolio_projects").insert(payload);
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Saved");
    setEditing(null);
    qc.invalidateQueries({ queryKey: ["portfolio"] });
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    const { error } = await supabase.from("portfolio_projects").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    qc.invalidateQueries({ queryKey: ["portfolio"] });
  };

  const input =
    "block w-full rounded-md border border-input bg-background px-3 py-2.5 text-base text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

  return (
    <section className="w-full px-5 py-12 md:px-10 md:py-16">
      <div className="container-prose">
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:flex-wrap sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-sm uppercase tracking-[0.25em] text-primary">Admin</p>
            <h1 className="mt-2 truncate text-3xl md:text-4xl">Portfolio</h1>
            <p className="mt-2 text-ink-soft">
              Add, edit, and remove projects displayed on the public portfolio.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <Button asChild variant="muted" size="sm">
              <Link to="/portfolio">
                <ExternalLink className="h-4 w-4" /> View public
              </Link>
            </Button>
            <Button variant="muted" size="sm" onClick={signOut}>
              <LogOut className="h-4 w-4" /> Sign out
            </Button>
          </div>
        </header>

        <div className="mt-8 flex justify-end">
          <Button variant="primary" size="md" onClick={() => setEditing(empty)}>
            <Plus /> New project
          </Button>
        </div>

        {isLoading ? (
          <div className="mt-12 flex justify-center">
            <Loader2 className="h-7 w-7 animate-spin text-primary" />
          </div>
        ) : (
          <div className="mt-8 overflow-hidden rounded-xl border border-border bg-card">
            <table className="w-full text-left">
              <thead className="bg-sand text-sm uppercase tracking-wider text-ink-soft">
                <tr>
                  <th className="px-4 py-3">Project</th>
                  <th className="hidden px-4 py-3 md:table-cell">Category</th>
                  <th className="hidden px-4 py-3 md:table-cell">Featured</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {(data ?? []).map((p) => (
                  <tr key={p.id}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={p.after_image_url} alt="" className="h-12 w-16 rounded object-cover" />
                        <div className="min-w-0">
                          <p className="truncate font-medium">{p.title}</p>
                          <p className="truncate text-sm text-ink-soft">{p.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="hidden px-4 py-3 capitalize md:table-cell">{p.category}</td>
                    <td className="hidden px-4 py-3 md:table-cell">{p.featured ? "Yes" : "—"}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex gap-2">
                        <Button variant="muted" size="icon" onClick={() => setEditing(p)} aria-label="Edit">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="icon" onClick={() => remove(p.id)} aria-label="Delete">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {(data ?? []).length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-10 text-center text-ink-soft">
                      No projects yet — click "New project" to add one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {editing && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/60 p-4 md:items-center">
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-background p-6 md:p-8">
              <h2 className="text-2xl">{editing.id ? "Edit project" : "New project"}</h2>
              <div className="mt-6 grid gap-4">
                <Field label="Title">
                  <input className={input} value={editing.title ?? ""}
                    onChange={(e) => setEditing({ ...editing, title: e.target.value, slug: editing.slug || slugify(e.target.value) })} />
                </Field>
                <Field label="Slug (URL identifier)">
                  <input className={input} value={editing.slug ?? ""}
                    onChange={(e) => setEditing({ ...editing, slug: e.target.value })} />
                </Field>
                <Field label="Category">
                  <select className={input} value={editing.category ?? "renovation"}
                    onChange={(e) => setEditing({ ...editing, category: e.target.value })}>
                    {["kitchen", "bathroom", "flooring", "tile", "painting", "handyman", "renovation"].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Location (optional)">
                  <input className={input} value={editing.location ?? ""}
                    onChange={(e) => setEditing({ ...editing, location: e.target.value })} />
                </Field>
                <Field label="Description">
                  <textarea rows={3} className={input} value={editing.description ?? ""}
                    onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
                </Field>
                <Field label="Before image URL (optional)">
                  <input className={input} value={editing.before_image_url ?? ""}
                    onChange={(e) => setEditing({ ...editing, before_image_url: e.target.value })} />
                </Field>
                <Field label="After image URL">
                  <input className={input} value={editing.after_image_url ?? ""}
                    onChange={(e) => setEditing({ ...editing, after_image_url: e.target.value })} />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Display order">
                    <input type="number" className={input} value={editing.display_order ?? 0}
                      onChange={(e) => setEditing({ ...editing, display_order: Number(e.target.value) })} />
                  </Field>
                  <Field label="Featured">
                    <label className="inline-flex h-[46px] items-center gap-2">
                      <input type="checkbox" checked={!!editing.featured}
                        onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
                        className="h-5 w-5 accent-primary" />
                      Show on homepage
                    </label>
                  </Field>
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <Button variant="muted" size="md" onClick={() => setEditing(null)}>
                  Cancel
                </Button>
                <Button variant="primary" size="md" onClick={save} disabled={saving}>
                  {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                  Save
                </Button>
              </div>
            </div>
          </div>
        )}

        <p className="mt-10 rounded-lg border border-border bg-sand p-5 text-sm text-ink-soft">
          <strong className="text-ink">Note:</strong> only users with the <code>admin</code> role
          can write to the portfolio. To grant yourself admin, open the backend and insert a row in
          <code> user_roles </code> with your user ID and role <code>admin</code>.
        </p>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      {children}
    </label>
  );
}

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
}
