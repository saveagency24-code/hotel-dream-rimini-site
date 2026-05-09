"use client";

import Image from "next/image";
import { useRef } from "react";

export type ServiceGallerySlide = { src: string; alt: string };

type Props = {
  images: ServiceGallerySlide[];
  prevLabel: string;
  nextLabel: string;
};

export default function ServicePhotoCarousel({ images, prevLabel, nextLabel }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByDir = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const slide = el.querySelector<HTMLElement>("[data-carousel-slide]");
    const gap = 16;
    const width = slide?.offsetWidth ?? el.clientWidth * 0.88;
    el.scrollBy({ left: dir * (width + gap), behavior: "smooth" });
  };

  if (images.length === 0) return null;

  if (images.length === 2) {
    return (
      <div className="relative w-full max-w-[1400px]">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {images.map((img) => (
            <div key={img.src} className="min-w-0">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-navy/10 bg-navy img-zoom">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-[1400px]">
      <div
        ref={scrollerRef}
        className="flex snap-carousel gap-4 overflow-x-auto pb-2 px-1 -mx-1 scroll-px-4"
        tabIndex={0}
      >
        {images.map((img) => (
          <div key={img.src} data-carousel-slide className="shrink-0 w-[min(88vw,440px)]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-navy/10 bg-navy img-zoom">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 88vw, 440px"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
      {images.length > 1 ? (
        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => scrollByDir(-1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-navy/15 text-navy transition-colors hover:border-gold/60 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2"
            aria-label={prevLabel}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scrollByDir(1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-navy/15 text-navy transition-colors hover:border-gold/60 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2"
            aria-label={nextLabel}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      ) : null}
    </div>
  );
}
