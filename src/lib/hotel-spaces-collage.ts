/** Immagini per il collage “ambienti comuni” nella pagina Hotel (hall, bar, solarium, sala bimbi, esterno). */

export type HotelCollageLabelKey =
  | "galleryLabelHall"
  | "galleryLabelBar"
  | "galleryLabelSolarium"
  | "galleryLabelKids"
  | "galleryLabelExterior";

export type HotelCollageAspect = "4/3" | "3/4" | "square";

export type HotelCollageItem = {
  src: string;
  aspect: HotelCollageAspect;
  labelKey: HotelCollageLabelKey;
};

export const HOTEL_SPACES_COLLAGE: readonly HotelCollageItem[] = [
  { src: "/images/hotel-lobby-1.png", aspect: "4/3", labelKey: "galleryLabelHall" },
  { src: "/images/servizi/bar/hotel-dream-rimini-bar-interno-04.jpg", aspect: "3/4", labelKey: "galleryLabelBar" },
  { src: "/images/servizi/solarium/hotel-dream-rimini-servizi-solarium-06.jpg", aspect: "4/3", labelKey: "galleryLabelSolarium" },
  { src: "/images/hotel-lobby-2.png", aspect: "4/3", labelKey: "galleryLabelHall" },
  { src: "/images/servizi/sala-bimbi/hotel-dream-rimini-servizi-sala-bimbi-01.jpg", aspect: "4/3", labelKey: "galleryLabelKids" },
  { src: "/images/servizi/colazione/hotel-dream-rimini-hotel-esterno-07.jpg", aspect: "4/3", labelKey: "galleryLabelExterior" },
  { src: "/images/servizi/bar/hotel-dream-rimini-bar-interno-09.jpg", aspect: "4/3", labelKey: "galleryLabelBar" },
  { src: "/images/servizi/solarium/hotel-dream-rimini-servizi-solarium-02.jpg", aspect: "3/4", labelKey: "galleryLabelSolarium" },
  { src: "/images/servizi/sala-bimbi/hotel-dream-rimini-servizi-sala-bimbi-02.jpg", aspect: "3/4", labelKey: "galleryLabelKids" },
  { src: "/images/servizi/colazione/hotel-dream-rimini-hotel-esterno-05.jpg", aspect: "4/3", labelKey: "galleryLabelExterior" },
  { src: "/images/servizi/bar/hotel-dream-rimini-bar-interno-12.jpg", aspect: "3/4", labelKey: "galleryLabelBar" },
  { src: "/images/servizi/solarium/hotel-dream-rimini-servizi-solarium-10.jpg", aspect: "4/3", labelKey: "galleryLabelSolarium" },
] as const;

export function collageAspectClass(aspect: HotelCollageAspect): string {
  switch (aspect) {
    case "3/4":
      return "aspect-[3/4]";
    case "square":
      return "aspect-square";
    default:
      return "aspect-[4/3]";
  }
}
