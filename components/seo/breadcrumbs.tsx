import Link from "next/link";

export function Breadcrumbs({ items }: { items: Array<{ name: string; path: string }> }) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-6 py-4 text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={item.path} className="flex items-center gap-2">
            {index > 0 && <span aria-hidden>›</span>}
            <Link href={item.path} className="hover:text-secondary hover:underline underline-offset-4">
              {item.name}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
