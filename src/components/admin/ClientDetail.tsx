"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, Save, Plus, Trash2, MessageCircle, MapPin, Building2, Phone, Mail, Wallet } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { cleanPhone, formatDate, waLink } from "@/lib/utils";
import type { Client, ClientNote, Payment } from "@/lib/admin-data";

const statusLabels: Record<Client["status"], string> = {
  active: "عميل نشط",
  won: "مكتمل",
  prospect: "عميل محتمل",
  archived: "مؤرشف",
};

const currencyFmt = (n: number) => Number(n).toLocaleString("ar-EG") + " ج.م";

export function ClientDetail({
  client,
  notes,
  payments,
}: {
  client: Client;
  notes: ClientNote[];
  payments: Payment[];
}) {
  const router = useRouter();
  const [info, setInfo] = useState({
    name: client.name,
    company: client.company ?? "",
    phone: client.phone ?? "",
    email: client.email ?? "",
    location: client.location ?? "القاهرة، مصر",
    status: client.status,
  });
  const [savingInfo, setSavingInfo] = useState(false);

  const [noteText, setNoteText] = useState("");
  const [addingNote, setAddingNote] = useState(false);
  const [allNotes, setAllNotes] = useState(notes);

  const [showPayment, setShowPayment] = useState(false);

  async function saveInfo() {
    if (!info.name.trim()) {
      toast.error("الاسم مطلوب");
      return;
    }
    setSavingInfo(true);
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    const { error } = await supabase
      .from("clients")
      .update({
        name: info.name.trim(),
        company: info.company.trim() || null,
        phone: info.phone.trim() || null,
        email: info.email.trim() || null,
        location: info.location.trim() || null,
        status: info.status,
      })
      .eq("id", client.id);
    setSavingInfo(false);
    if (error) {
      toast.error("مش قادر أحفظ التعديلات");
      return;
    }
    toast.success("اتحفظت التعديلات");
    router.refresh();
  }

  async function addNote() {
    if (!noteText.trim()) return;
    setAddingNote(true);
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    const { data, error } = await supabase
      .from("client_notes")
      .insert({ client_id: client.id, body: noteText.trim() })
      .select()
      .single();
    setAddingNote(false);
    if (error) {
      toast.error("مش قادر أضيف الملاحظة");
      return;
    }
    setNoteText("");
    if (data) setAllNotes((n) => [data as ClientNote, ...n]);
    router.refresh();
  }

  async function deleteNote(id: string) {
    if (!confirm("تحذف الملاحظة دي؟")) return;
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    const { error } = await supabase.from("client_notes").delete().eq("id", id);
    if (error) {
      toast.error("مش قادر أحذف الملاحظة");
      return;
    }
    setAllNotes((n) => n.filter((x) => x.id !== id));
    toast.success("اتحذفت الملاحظة");
    router.refresh();
  }

  const totalPaid = payments
    .filter((p) => p.status === "paid")
    .reduce((s, p) => s + Number(p.amount), 0);
  const totalPending = payments
    .filter((p) => p.status === "pending")
    .reduce((s, p) => s + Number(p.amount), 0);

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <Link
          href="/admin/clients"
          className="inline-flex items-center gap-1 rounded-md border border-line px-3 py-1.5 text-sm font-semibold text-ink hover:bg-surface-2"
        >
          <ArrowLeft size={15} />
          العملاء
        </Link>
      </div>

      {/* Header card */}
      <div className="mb-6 rounded-lg border border-line bg-white p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-ink">{client.name}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
              {client.company && (
                <span className="inline-flex items-center gap-1">
                  <Building2 size={14} /> {client.company}
                </span>
              )}
              {client.phone && (
                <span className="inline-flex items-center gap-1" dir="ltr">
                  <Phone size={13} /> {client.phone}
                </span>
              )}
              {client.email && (
                <span className="inline-flex items-center gap-1" dir="ltr">
                  <Mail size={13} /> {client.email}
                </span>
              )}
              {client.location && (
                <span className="inline-flex items-center gap-1">
                  <MapPin size={14} /> {client.location}
                </span>
              )}
            </div>
            <div className="mt-2">
              <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-bold", client.status === "active" ? "bg-success/10 text-success" : "bg-brand-soft/30 text-brand-deep")}>
                {statusLabels[client.status]}
              </span>
            </div>
          </div>
          {client.phone && (
            <a
              href={waLink(cleanPhone(client.phone), `مرحبًا ${client.name} 🎨`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-wa px-4 py-2.5 font-semibold text-white hover:brightness-105"
            >
              <MessageCircle size={17} />
              فتح واتساب
            </a>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Edit info */}
        <div className="rounded-lg border border-line bg-white p-5">
          <h2 className="mb-4 text-lg font-bold text-ink">بيانات العميل</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm font-semibold text-ink">
              الاسم *
              <input
                value={info.name}
                onChange={(e) => setInfo({ ...info, name: e.target.value })}
                className="rounded-md border border-line px-3 py-2 text-sm font-normal text-ink focus:border-brand focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm font-semibold text-ink">
              الشركة
              <input
                value={info.company}
                onChange={(e) => setInfo({ ...info, company: e.target.value })}
                className="rounded-md border border-line px-3 py-2 text-sm font-normal text-ink focus:border-brand focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm font-semibold text-ink">
              الهاتف
              <input
                value={info.phone}
                onChange={(e) => setInfo({ ...info, phone: e.target.value })}
                dir="ltr"
                className="rounded-md border border-line px-3 py-2 text-sm font-normal text-ink focus:border-brand focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm font-semibold text-ink">
              الإيميل
              <input
                value={info.email}
                onChange={(e) => setInfo({ ...info, email: e.target.value })}
                dir="ltr"
                className="rounded-md border border-line px-3 py-2 text-sm font-normal text-ink focus:border-brand focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm font-semibold text-ink">
              المكان
              <input
                value={info.location}
                onChange={(e) => setInfo({ ...info, location: e.target.value })}
                className="rounded-md border border-line px-3 py-2 text-sm font-normal text-ink focus:border-brand focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm font-semibold text-ink">
              الحالة
              <select
                value={info.status}
                onChange={(e) => setInfo({ ...info, status: e.target.value as Client["status"] })}
                className="rounded-md border border-line px-3 py-2 text-sm text-ink focus:border-brand focus:outline-none"
              >
                {Object.entries(statusLabels).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={saveInfo}
              disabled={savingInfo}
              className="inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-deep disabled:opacity-50"
            >
              <Save size={15} />
              {savingInfo ? "جاري..." : "حفظ"}
            </button>
          </div>
        </div>

        {/* Payments summary + ledger */}
        <div className="rounded-lg border border-line bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-ink">المدفوعات</h2>
            <Link
              href={`/admin/revenue?client=${client.id}`}
              className="text-sm font-semibold text-brand hover:underline"
            >
              فتح في الإيرادات
            </Link>
          </div>
          <div className="mb-4 grid grid-cols-2 gap-3">
            <div className="rounded-md bg-success/5 p-3">
              <p className="text-xs text-muted">مدفوع</p>
              <p className="mt-1 text-xl font-black text-success" dir="ltr">
                {currencyFmt(totalPaid)}
              </p>
            </div>
            <div className="rounded-md bg-amber-500/5 p-3">
              <p className="text-xs text-muted">متبقي/مستحق</p>
              <p className="mt-1 text-xl font-black text-amber-600" dir="ltr">
                {currencyFmt(totalPending)}
              </p>
            </div>
          </div>
          {payments.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted">مفيش مدفوعات مسجلة لسه.</p>
          ) : (
            <ul className="divide-y divide-line">
              {payments.slice(0, 8).map((p) => (
                <li key={p.id} className="flex items-center justify-between py-2.5 text-sm">
                  <div>
                    <p className="font-semibold text-ink" dir="ltr">
                      {currencyFmt(p.amount)}
                    </p>
                    <p className="text-xs text-muted">{formatDate(p.date)} · {p.method}</p>
                  </div>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-xs font-bold",
                      p.status === "paid"
                        ? "bg-success/10 text-success"
                        : p.status === "pending"
                          ? "bg-amber-500/10 text-amber-600"
                          : "bg-brand-soft/30 text-brand-deep"
                    )}
                  >
                    {p.status === "paid" ? "مدفوع" : p.status === "pending" ? "مستحق" : "جزئي"}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <button
            type="button"
            onClick={() => setShowPayment((v) => !v)}
            className="mt-3 inline-flex items-center gap-2 rounded-md border border-brand/40 px-3 py-1.5 text-sm font-semibold text-brand hover:bg-brand/5"
          >
            <Plus size={15} />
            إضافة دفعة
          </button>
          {showPayment && <AddPaymentForm clientId={client.id} onDone={() => { setShowPayment(false); router.refresh(); }} />}
        </div>
      </div>

      {/* Notes timeline */}
      <div className="mt-6 rounded-lg border border-line bg-white p-5">
        <h2 className="mb-4 text-lg font-bold text-ink">ملاحظات ومتابعة</h2>
        <div className="mb-4">
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="اكتب متابعة أو ملاحظة على العميل..."
            rows={3}
            className="w-full rounded-md border border-line px-3 py-2 text-sm text-ink focus:border-brand focus:outline-none"
          />
          <div className="mt-2 flex justify-end">
            <button
              type="button"
              onClick={addNote}
              disabled={addingNote || !noteText.trim()}
              className="rounded-md bg-brand px-4 py-1.5 text-sm font-semibold text-white hover:bg-brand-deep disabled:opacity-50"
            >
              {addingNote ? "جاري..." : "إضافة متابعة"}
            </button>
          </div>
        </div>
        {allNotes.length === 0 ? (
          <p className="py-6 text-center text-muted">مفيش ملاحظات لسه.</p>
        ) : (
          <ul className="space-y-3">
            {allNotes.map((n) => (
              <li
                key={n.id}
                className="flex items-start justify-between gap-3 rounded-md border border-line/60 bg-surface/40 p-3"
              >
                <div>
                  <p className="text-sm text-ink">{n.body}</p>
                  <p className="mt-1 text-xs text-muted">{formatDate(n.created_at)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => deleteNote(n.id)}
                  className="shrink-0 rounded-md p-1.5 text-danger hover:bg-danger/5"
                  aria-label="حذف"
                >
                  <Trash2 size={14} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function AddPaymentForm({ clientId, onDone }: { clientId: string; onDone: () => void }) {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    amount: "",
    date: new Date().toISOString().slice(0, 10),
    status: "paid",
    method: "cash",
    note: "",
  });

  async function submit() {
    const amount = Number(form.amount);
    if (!amount || amount <= 0) {
      toast.error("اكتب مبلغ صحيح");
      return;
    }
    setSaving(true);
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    const { error } = await supabase.from("payments").insert({
      client_id: clientId,
      amount,
      currency: "EGP",
      date: form.date,
      status: form.status,
      method: form.method,
      note: form.note.trim() || null,
    });
    setSaving(false);
    if (error) {
      toast.error("مش قادر أضيف الدفعة");
      return;
    }
    toast.success("اتضافت الدفعة");
    onDone();
  }

  return (
    <div className="mt-3 space-y-3 rounded-md border border-line bg-surface/50 p-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs font-semibold text-ink">
          المبلغ (ج.م)
          <input
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            type="number"
            dir="ltr"
            className="rounded-md border border-line px-3 py-2 text-sm text-ink focus:border-brand focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1 text-xs font-semibold text-ink">
          التاريخ
          <input
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            type="date"
            dir="ltr"
            className="rounded-md border border-line px-3 py-2 text-sm text-ink focus:border-brand focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1 text-xs font-semibold text-ink">
          الحالة
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="rounded-md border border-line px-3 py-2 text-sm text-ink focus:border-brand focus:outline-none"
          >
            <option value="paid">مدفوع</option>
            <option value="pending">مستحق</option>
            <option value="partial">جزئي</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs font-semibold text-ink">
          الطريقة
          <select
            value={form.method}
            onChange={(e) => setForm({ ...form, method: e.target.value })}
            className="rounded-md border border-line px-3 py-2 text-sm text-ink focus:border-brand focus:outline-none"
          >
            <option value="cash">كاش</option>
            <option value="bank_transfer">تحويل بنكي</option>
            <option value="instapay">إنستا باي</option>
            <option value="vodafone_cash">فودافون كاش</option>
            <option value="other">آخر</option>
          </select>
        </label>
      </div>
      <label className="flex flex-col gap-1 text-xs font-semibold text-ink">
        ملاحظة (اختياري)
        <input
          value={form.note}
          onChange={(e) => setForm({ ...form, note: e.target.value })}
          className="rounded-md border border-line px-3 py-2 text-sm text-ink focus:border-brand focus:outline-none"
        />
      </label>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onDone}
          className="rounded-md border border-line px-3 py-1.5 text-sm font-semibold text-ink hover:bg-surface-2"
        >
          إلغاء
        </button>
        <button
          type="button"
          onClick={submit}
          disabled={saving}
          className="inline-flex items-center gap-1 rounded-md bg-brand px-4 py-1.5 text-sm font-semibold text-white hover:bg-brand-deep disabled:opacity-50"
        >
          <Wallet size={14} />
          {saving ? "جاري..." : "تسجيل"}
        </button>
      </div>
    </div>
  );
}