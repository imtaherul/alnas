import Link from "next/link";
import { PublicLayout } from "@/components/layout/public-layout";
import { getServices, getCategories } from "@/lib/server-utils";
import { Home, ChevronRight } from "lucide-react";

export default async function ServicesPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = props.searchParams ? await props.searchParams : {};
  const category =
    typeof searchParams.category === "string"
      ? searchParams.category
      : undefined;
  const type =
    typeof searchParams.type === "string" ? searchParams.type : undefined;

  const { services, error } = await getServices({ categoryId: category, type });
  const { categories } = await getCategories();

  return (
    <PublicLayout>
      <nav className="mx-auto max-w-7xl px-4 pt-25 sm:px-6 lg:px-8">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li>
            <Link
              href="/"
              className="flex items-center gap-1 hover:text-teal-600"
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
          </li>
          <li>
            <ChevronRight className="h-4 w-4" />
          </li>
          <li className="text-gray-900 font-medium">Services</li>
        </ol>
      </nav>

      <section className="relative z-10">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.08),transparent_50%)]" />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.06),transparent_50%)]" />

        <div className="mx-auto max-w-7xl px-4 pt-10 pb-12 sm:pt-14 sm:pb-16 lg:pt-10">
          <div className="mx-auto max-w-330 px-4">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="text-base md:w-2/3">
                <p className="text-2xl font-semibold leading-[1.35]">
                  All Services
                </p>
                <div className="h-3" />
                <p className="text-2xl font-bold leading-[1.3] text-teal-600">
                  Browse Our Full Catalog
                </p>
                <div className="h-3" />
                <p className="text-md font-medium leading-[1.6]">
                  Comprehensive business solutions designed to support
                  investors, entrepreneurs, and companies entering the Saudi
                  market.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              <Link
                href="/services"
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${!category ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                All
              </Link>
              {categories.map((cat: any) => (
                <Link
                  key={cat.$id}
                  href={`/services?category=${cat.$id}`}
                  className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${category === cat.$id ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            <div className="h-px bg-gray-300 my-4" />

            {error && (
              <p className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-700">
                Error loading services: {error}
              </p>
            )}

            {services.length > 0 ? (
              <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6 xl:grid-cols-3">
                {services.map((service: any) => (
                  <article
                    key={service.$id}
                    className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50">
                      <span className="text-lg font-bold text-teal-600">
                        {service.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col gap-2">
                      <h3 className="text-lg font-semibold leading-7 text-neutral-900">
                        {service.name}
                      </h3>
                      <p className="text-sm leading-5 text-gray-700">
                        {service.description}
                      </p>
                      <div className="mt-auto flex gap-2">
                        <Link
                          href={`/services/${service.$id}`}
                          className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Explore benefits
                        </Link>
                        <Link
                          href={`/services/${service.$id}`}
                          className="cursor-pointer rounded-md bg-teal-600 px-4 py-2 text-sm text-white hover:bg-teal-700"
                        >
                          Book now
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border-2 border-dashed border-gray-300 p-16 text-center mt-8">
                <p className="text-lg text-gray-500">No services found.</p>
                <p className="mt-2 text-sm text-gray-400">
                  Try clearing filters or check back later.
                </p>
                <Link href="/services">
                  <span className="mt-4 inline-block rounded-md bg-teal-600 px-4 py-2 text-sm text-white hover:bg-teal-700">
                    Clear filters
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
