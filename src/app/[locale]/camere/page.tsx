import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../../../messages/${locale}.json`)).default;
  return { title: messages.meta.roomsTitle, description: messages.meta.roomsDesc };
}

export default async function RoomsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <RoomsContent />;
}

function RoomsContent() {
  const t = useTranslations("rooms");
  const common = useTranslations("common");

  const roomTypes = [
    { key: "single" as const, count: "4", img: "/images/camere/camera-singola.jpg" },
    { key: "double" as const, count: "14", img: "/images/camere/camera-doppia.jpg" },
    { key: "suite" as const, count: "2", img: "/images/camere/camera-suite.jpg" },
    { key: "triple" as const, count: "5", img: "/images/camere/camera-tripla.jpg" },
    { key: "quadruple" as const, count: "6", img: "/images/camere/camera-quadrupla.jpg" },
    { key: "group" as const, count: "2", img: "/images/camere/camera-gruppo.jpg" },
    { key: "family" as const, count: "2", img: "/images/camere/camera-familiare.jpg" },
  ];

  const amenities = ["amenityAC", "amenityTV", "amenityWifi", "amenityCleaning"] as const;

  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] flex items-end overflow-hidden bg-navy">
        <Image
          src="/images/camere/camera-doppia-balcone.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-navy/60" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-8 pb-16 w-full">
          <p className="text-gold/80 text-[11px] uppercase tracking-[0.35em] font-body mb-4 animate-fade-in">
            {t("subtitle")}
          </p>
          <h1 className="font-heading text-white text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] animate-fade-in delay-100">
            {t("title")}
          </h1>
        </div>
      </section>

      {/* Room blocks — alternating layout like Aria */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 space-y-24 lg:space-y-32">
          {roomTypes.map(({ key, count, img }, i) => (
            <div
              key={key}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center ${
                i % 2 === 1 ? "" : ""
              }`}
            >
              {/* Image */}
              <div className={`relative aspect-[4/3] bg-white overflow-hidden img-zoom ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <Image
                  src={img}
                  alt={key}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-gold text-navy text-[10px] uppercase tracking-[0.15em] font-body px-3 py-1.5">
                    {count}x
                  </span>
                </div>
              </div>

              {/* Text */}
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <p className="text-turquoise text-[11px] uppercase tracking-[0.2em] font-body mb-3">
                  {t(`${key}Count`)}
                </p>
                <h2 className="font-heading text-navy text-2xl md:text-4xl uppercase tracking-[0.1em] mb-5">
                  {t(key)}
                </h2>
                <p className="text-gray text-[15px] leading-[1.9] mb-8">
                  {t(`${key}Desc`)}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {amenities.map((a) => (
                    <span key={a} className="border border-gray-border text-navy text-[11px] uppercase tracking-[0.15em] font-body px-4 py-2">
                      {t(a)}
                    </span>
                  ))}
                </div>

                <Link
                  href="/contatti"
                  className="inline-flex items-center gap-3 border border-navy text-navy text-[11px] uppercase tracking-[0.2em] font-body px-7 py-3 hover:bg-navy hover:text-white transition-all duration-300"
                >
                  {t("requestInfo")}
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
