import Image from "next/image";

export function BedLayersIllustration() {
  return (
    <Image
      src="/media/bed-layers.webp"
      alt="Seven layers of the Kibber House bed, from the wooden frame and mattress to the electric blanket, quilts, sheet and duvet"
      width={1536}
      height={1024}
      sizes="(min-width: 1024px) 52vw, 100vw"
      className="bed-layers-illustration"
    />
  );
}
