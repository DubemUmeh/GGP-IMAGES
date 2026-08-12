import { LuCircleCheck, LuSend } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const highlights = [
  "Fast turnaround times available",
  "Dedicated project manager",
  "Nationwide shipping",
];

const serviceOptions = [
  "Brand Identity & Stationery",
  "Commercial Printing",
  "Large Format & Signage",
  "Custom Packaging",
  "Promotional Products",
];

export function QuoteCtaSection() {
  return (
    <section className="mx-auto mb-16 max-w-7xl px-6 py-16">
      <div className="relative overflow-hidden rounded-[32px] bg-brand-tertiary p-8 shadow-2xl md:p-12 lg:p-16">
        <div className="relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
              Ready to Bring Your Brand to Life?
            </h2>
            <p className="mb-8 max-w-lg text-lg text-white/80">
              Get a custom quote tailored to your project&apos;s exact specifications. Our team of
              experts is ready to help you choose the right materials, finishes, and printing
              techniques to achieve flawless results.
            </p>
            <div className="mb-8 space-y-4">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-3 text-white/90">
                  <LuCircleCheck className="h-5 w-5 text-brand-orange-fixed-dim" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-6 md:p-8">
            <h3 className="mb-6 text-xl font-semibold text-primary">Request a Custom Quote</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" placeholder="John Doe" className="bg-card/80" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@company.com"
                    className="bg-card/80"
                  />
                </div>
              </div>

              <fieldset className="space-y-2">
                <legend className="mb-1 text-sm font-medium leading-none text-foreground">
                  Services Needed
                </legend>
                <p className="text-xs text-muted-foreground">Select all that apply.</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {serviceOptions.map((option) => (
                    <label key={option} className="cursor-pointer">
                      <input
                        type="checkbox"
                        name="services"
                        value={option}
                        className="peer sr-only"
                      />
                      <span className="inline-flex items-center rounded-full border border-border bg-card/80 px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:border-secondary/50 peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="space-y-1">
                <Label htmlFor="details">Project Details</Label>
                <Textarea
                  id="details"
                  name="details"
                  placeholder="Tell us about quantities, materials, timeline..."
                  rows={3}
                  className="resize-none bg-card/80"
                />
              </div>

              <Button
                type="submit"
                className="mt-4 w-full rounded-xl bg-brand-tertiary py-6 text-primary-foreground hover:bg-brand-purple-container"
              >
                Submit Request
                <LuSend className="ml-1 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}