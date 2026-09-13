"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import { products, type Product } from "@/data/products";

type FilterGroup = {
  key: keyof Pick<Product, "collection" | "category" | "metal" | "setting" | "gender">;
  label: string;
  options: string[];
};

const groups: FilterGroup[] = [
  {
    key: "collection",
    label: "Collection",
    options: [...new Set(products.map((p) => p.collection))],
  },
  {
    key: "category",
    label: "Category",
    options: [...new Set(products.map((p) => p.category))],
  },
  {
    key: "gender",
    label: "For",
    options: [...new Set(products.map((p) => p.gender))],
  },
  {
    key: "setting",
    label: "Diamond Setting",
    options: [...new Set(products.map((p) => p.setting))],
  },
  {
    key: "metal",
    label: "Metal",
    options: [...new Set(products.map((p) => p.metal))],
  },
];

const priceBands = [
  { id: "under3", label: "Under ₹3,00,000", test: (n: number) => n < 300000 },
  { id: "3to6", label: "₹3,00,000 – ₹6,00,000", test: (n: number) => n >= 300000 && n < 600000 },
  { id: "6to12", label: "₹6,00,000 – ₹12,00,000", test: (n: number) => n >= 600000 && n < 1200000 },
  { id: "12to25", label: "₹12,00,000 – ₹25,00,000", test: (n: number) => n >= 1200000 && n < 2500000 },
  { id: "over25", label: "₹25,00,000 & above", test: (n: number) => n >= 2500000 },
];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price · Low to High" },
  { value: "price-desc", label: "Price · High to Low" },
  { value: "name", label: "Alphabetical" },
] as const;

type SortValue = (typeof sortOptions)[number]["value"];

function titleFor(collection: string | null, gender: string | null, newOnly: boolean) {
  if (newOnly) return "New Arrivals";
  if (collection) return collection;
  if (gender === "Men") return "Diamonds for Men";
  if (gender === "Women") return "Diamonds for Women";
  return "Diamond Jewellery";
}

export default function ShopClient() {
  const params = useSearchParams();
  const initialCollection = params.get("collection");
  const showNewOnly = params.get("filter") === "new";

  const initialGender = params.get("for");

  const [selected, setSelected] = useState<Record<string, string[]>>(() => ({
    collection: initialCollection ? [initialCollection] : [],
    category: [],
    gender: initialGender ? [initialGender] : [],
    setting: [],
    metal: [],
  }));
  const [pricePicks, setPricePicks] = useState<string[]>([]);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    collection: true,
    category: true,
    gender: true,
    setting: false,
    metal: false,
    price: false,
  });
  const [sort, setSort] = useState<SortValue>("featured");

  function toggleOption(groupKey: string, option: string) {
    setSelected((prev) => {
      const current = prev[groupKey] ?? [];
      return {
        ...prev,
        [groupKey]: current.includes(option)
          ? current.filter((o) => o !== option)
          : [...current, option],
      };
    });
  }

  function togglePrice(id: string) {
    setPricePicks((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  }

  function clearAll() {
    setSelected({ collection: [], category: [], gender: [], setting: [], metal: [] });
    setPricePicks([]);
  }

  const activeCount =
    Object.values(selected).flat().length + pricePicks.length;

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (showNewOnly && !p.isNew) return false;
      if (pricePicks.length > 0) {
        const bands = priceBands.filter((b) => pricePicks.includes(b.id));
        if (!bands.some((b) => b.test(p.price))) return false;
      }
      return groups.every((g) => {
        const picks = selected[g.key] ?? [];
        return picks.length === 0 || picks.includes(String(p[g.key]));
      });
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return Number(b.isFeatured ?? 0) - Number(a.isFeatured ?? 0);
      }
    });

    return list;
  }, [selected, sort, showNewOnly, pricePicks]);

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  return (
    <>
      <section className="container-luxe pt-16 pb-10 md:pt-24">
        <Reveal>
          <p className="eyebrow">Shop · Certified &amp; Non-Certified Diamonds</p>
          <h1 className="mt-4 font-serif text-4xl md:text-6xl text-bone">
            {titleFor(initialCollection, initialGender, showNewOnly)}
          </h1>
          <p className="mt-5 max-w-xl text-bone-dim">
            {filtered.length} piece{filtered.length === 1 ? "" : "s"} shown · every
            centre stone GIA or IGI graded, each piece set to order in our Surat
            workshop.
          </p>
        </Reveal>
        <div className="hairline mt-10" />
      </section>

      <section className="container-luxe pb-28">
        <div className="grid gap-8 lg:gap-12 lg:grid-cols-[260px_1fr]">
          {/* Mobile Filter Toggle Button */}
          <div className="lg:hidden">
            <button
              type="button"
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-gold/40 bg-ink-panel text-gold font-serif text-sm shadow-md"
            >
              <span className="flex items-center gap-2">
                <span>🔍 Filter &amp; Refine</span>
                {activeCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-gold text-black text-xs font-sans font-bold">
                    {activeCount}
                  </span>
                )}
              </span>
              <span>{mobileFilterOpen ? "▲ Hide Filters" : "▼ Show Filters"}</span>
            </button>
          </div>

          {/* Sticky filter sidebar (collapsible on mobile, persistent on lg+) */}
          <aside className={`lg:block lg:sticky lg:top-28 lg:self-start ${mobileFilterOpen ? "block" : "hidden lg:block"}`}>
            <div className="flex items-center justify-between">
              <p className="eyebrow">Filter Options</p>
              {activeCount > 0 && (
                <button
                  onClick={clearAll}
                  className="text-[0.65rem] uppercase tracking-[0.2em] text-bone-faint hover:text-gold transition-colors"
                >
                  Clear ({activeCount})
                </button>
              )}
            </div>

            <div className="mt-6 divide-y divide-line-soft border-y border-line-soft">
              {groups.map((group) => {
                const isOpen = openGroups[group.key];
                return (
                  <div key={group.key} className="py-4">
                    <button
                      onClick={() =>
                        setOpenGroups((p) => ({ ...p, [group.key]: !p[group.key] }))
                      }
                      className="flex w-full items-center justify-between text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="text-sm uppercase tracking-[0.18em] text-bone">
                        {group.label}
                      </span>
                      <span className="text-gold text-lg leading-none">
                        {isOpen ? "–" : "+"}
                      </span>
                    </button>
                    <div
                      className={`overflow-hidden transition-[max-height] duration-400 ${
                        isOpen ? "max-h-72" : "max-h-0"
                      }`}
                    >
                      <ul className="space-y-2.5 pt-4">
                        {group.options.map((option) => {
                          const checked = (selected[group.key] ?? []).includes(
                            option
                          );
                          return (
                            <li key={option}>
                              <label className="flex cursor-pointer items-center gap-3 text-sm text-bone-dim hover:text-bone transition-colors">
                                <span
                                  className={`grid h-4 w-4 place-items-center border transition-colors ${
                                    checked
                                      ? "border-gold bg-gold"
                                      : "border-line"
                                  }`}
                                >
                                  {checked && (
                                    <span className="h-1.5 w-1.5 bg-ink" />
                                  )}
                                </span>
                                <input
                                  type="checkbox"
                                  className="sr-only"
                                  checked={checked}
                                  onChange={() =>
                                    toggleOption(group.key, option)
                                  }
                                />
                                {option}
                              </label>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                );
              })}

              {/* Price band */}
              <div className="py-4">
                <button
                  onClick={() =>
                    setOpenGroups((p) => ({ ...p, price: !p.price }))
                  }
                  className="flex w-full items-center justify-between text-left"
                  aria-expanded={openGroups.price}
                >
                  <span className="text-sm uppercase tracking-[0.18em] text-bone">
                    Price
                  </span>
                  <span className="text-gold text-lg leading-none">
                    {openGroups.price ? "–" : "+"}
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-[max-height] duration-400 ${
                    openGroups.price ? "max-h-72" : "max-h-0"
                  }`}
                >
                  <ul className="space-y-2.5 pt-4">
                    {priceBands.map((band) => {
                      const checked = pricePicks.includes(band.id);
                      return (
                        <li key={band.id}>
                          <label className="flex cursor-pointer items-center gap-3 text-sm text-bone-dim hover:text-bone transition-colors">
                            <span
                              className={`grid h-4 w-4 place-items-center border transition-colors ${
                                checked ? "border-gold bg-gold" : "border-line"
                              }`}
                            >
                              {checked && <span className="h-1.5 w-1.5 bg-ink" />}
                            </span>
                            <input
                              type="checkbox"
                              className="sr-only"
                              checked={checked}
                              onChange={() => togglePrice(band.id)}
                            />
                            {band.label}
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </aside>

          {/* Product grid */}
          <div>
            <div className="flex items-center justify-between border-b border-line-soft pb-5">
              <p className="text-sm text-bone-faint">
                Showing {filtered.length} of {products.length}
              </p>
              <label className="flex items-center gap-3 text-sm text-bone-dim">
                <span className="uppercase tracking-[0.18em] text-[0.65rem] text-bone-faint">
                  Sort
                </span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortValue)}
                  className="bg-ink-soft border border-line px-3 py-2 text-sm text-bone focus:border-gold focus:outline-none"
                >
                  {sortOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {filtered.length === 0 ? (
              <div className="py-24 text-center">
                <p className="font-serif text-xl text-bone">
                  No pieces match these filters.
                </p>
                <button
                  onClick={clearAll}
                  className="btn-ghost mt-6 text-xs"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((product, i) => (
                  <Reveal key={product.slug} delay={(i % 3) * 80}>
                    <ProductCard product={product} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
