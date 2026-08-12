import { LuSend } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const serviceOptions = [
  { value: "branding", label: "Branding & Identity" },
  { value: "large-format", label: "Large Format Printing" },
  { value: "packaging", label: "Packaging Solutions" },
  { value: "marketing", label: "Marketing Materials" },
  { value: "other", label: "Other" },
];

export function ContactForm() {
  return (
    <div className="c-glass-panel relative overflow-hidden rounded-3xl p-8 md:p-12">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-purple-fixed-dim opacity-20 blur-[80px]" />
      <h2 className="mb-8 text-2xl font-bold text-card">Send a Message</h2>
      <form className="space-y-6 text-card">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" placeholder="Jane Doe" className="h-auto rounded-xl bg-card py-4" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="jane@company.com"
              className="h-auto rounded-xl bg-card py-4"
            />
          </div>
        </div>

        <fieldset className="space-y-2">
          <legend className="mb-1 text-sm font-medium leading-none">
            Services Needed
          </legend>
          <p className="text-xs text-card/60">Select all that apply.</p>
          <div className="flex flex-wrap gap-2 pt-1">
            {serviceOptions.map((option) => (
              <label key={option.value} className="cursor-pointer">
                <input
                  type="checkbox"
                  name="services"
                  value={option.value}
                  className="peer sr-only"
                />
                <span className="inline-flex items-center rounded-full border border-card/30 bg-card/10 px-4 py-2 text-sm font-medium text-card transition-colors hover:border-card/50 peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="space-y-2">
          <Label htmlFor="details">Project Details</Label>
          <Textarea
            id="details"
            name="details"
            placeholder="Tell us about your goals, timeline, and any specific requirements..."
            rows={5}
            className="resize-none rounded-xl bg-card py-4"
          />
        </div>

        <Button
          type="submit"
          className="group flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-6 text-primary-foreground hover:-translate-y-1 hover:bg-brand-purple-container hover:shadow-lg"
        >
          Submit Request
          <LuSend className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </form>
    </div>
  );
}