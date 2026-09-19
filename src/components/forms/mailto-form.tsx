"use client";

import { useId, useState, type FormEvent } from "react";

import { ArrowUpRight, Check } from "lucide-react";

import { Button } from "@/components/ui";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export interface MailtoField {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "number" | "textarea" | "select";
  options?: string[];
  required?: boolean;
  autoComplete?: string;
}

interface MailtoFormProps {
  fields: MailtoField[];
  /** Subject template; `{field}` placeholders are replaced with values. */
  subject: string;
  submitLabel: string;
  note: string;
  to?: string;
  className?: string;
}

/**
 * Backend-free form: composes a `mailto:` with the fields as the body and opens
 * the visitor's mail client. Swap the `onSubmit` for a real API call once the
 * backend exists — the markup and validation stay the same.
 */
export function MailtoForm({
  fields,
  subject,
  submitLabel,
  note,
  to = siteConfig.contact.email,
  className,
}: MailtoFormProps) {
  const id = useId();
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const values: Record<string, string> = Object.fromEntries(
      fields.map((f) => {
        const v = data.get(f.name);
        return [f.name, typeof v === "string" ? v.trim() : ""];
      }),
    );
    const subj = subject.replace(/\{(\w+)\}/g, (_, k: string) => values[k] ?? "");
    const body = fields.map((f) => `${f.label}: ${values[f.name] ?? ""}`).join("\n");
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const inputClass =
    "w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-[15px] text-ink-900 placeholder:text-ink-400 transition focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/15";

  return (
    <form onSubmit={onSubmit} className={cn("grid gap-4", className)} noValidate={false}>
      {fields.map((f) => {
        const fid = `${id}-${f.name}`;
        return (
          <div key={f.name} className={cn(f.type === "textarea" && "sm:col-span-2")}>
            <label htmlFor={fid} className="mb-1.5 block text-[13px] font-semibold text-ink-700">
              {f.label}
            </label>
            {f.type === "textarea" ? (
              <textarea
                id={fid}
                name={f.name}
                required={f.required}
                rows={5}
                className={cn(inputClass, "resize-y")}
              />
            ) : f.type === "select" ? (
              <select
                id={fid}
                name={f.name}
                required={f.required}
                className={inputClass}
                defaultValue={f.options?.[0]}
              >
                {f.options?.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={fid}
                name={f.name}
                type={f.type ?? "text"}
                required={f.required}
                autoComplete={f.autoComplete}
                inputMode={f.type === "tel" ? "tel" : f.type === "number" ? "numeric" : undefined}
                className={inputClass}
              />
            )}
          </div>
        );
      })}
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" className="w-full sm:w-auto">
          {sent ? <Check className="size-4" /> : null}
          {submitLabel}
          {!sent && <ArrowUpRight className="size-4 rtl:-scale-x-100" />}
        </Button>
        <p className="text-[12px] leading-relaxed text-ink-400">{note}</p>
      </div>
    </form>
  );
}
