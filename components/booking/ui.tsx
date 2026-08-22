import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ChangeEvent } from "react";

const inputClasses =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/30";

const labelClasses = "mb-2 block text-sm font-medium text-foreground";

function Feature({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-secondary/40 bg-secondary/10 text-secondary">
        {icon}
      </div>
      <div>
        <p className="text-sm font-bold text-white">{title}</p>
        <p className="text-xs text-white/60">{text}</p>
      </div>
    </div>
  );
}

function FormSection({ number, title }: { number: string; title: string }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
        {number}
      </span>
      <h2 className="text-lg font-bold text-card-foreground">{title}</h2>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className={labelClasses}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={inputClasses}
      />
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium text-card-foreground">{value}</span>
    </div>
  );
}

function Reason({ title, text }: { title: string; text: string }) {
  return (
    <div className="flex gap-3">
      <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-secondary" />
      <div>
        <h3 className="text-sm font-semibold text-card-foreground">{title}</h3>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}

function SuccessMessage() {
  return (
    <div className="flex min-h-125 flex-col items-center justify-center px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
        <CheckCircle2 size={32} />
      </div>
      <h2 className="mt-6 text-2xl font-black text-card-foreground">Booking Request Received</h2>
      <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
        Thank you. GGP Images has received your request and will contact you to confirm the
        details and provide your final quotation.
      </p>
      <Link
        href="/"
        className="mt-7 inline-flex items-center gap-2 rounded-lg bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary/90"
      >
        Back to Home
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}

export { Feature, FormSection, Field, SummaryRow, Reason, SuccessMessage, inputClasses, labelClasses }