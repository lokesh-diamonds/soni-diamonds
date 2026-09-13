import Image from "next/image";

export default function Loading() {
  return (
    <div className="container-luxe flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-5">
        <div className="relative h-16 w-16 animate-pulse">
          <Image
            src="/images/logo-transparent.png"
            alt="Soni Diamonds Emblem Loading"
            fill
            className="object-contain drop-shadow-[0_0_12px_rgba(212,175,55,0.5)]"
          />
        </div>
        <p className="text-[0.75rem] uppercase tracking-[0.35em] text-gold">
          SONI DIAMONDS
        </p>
      </div>
    </div>
  );
}
