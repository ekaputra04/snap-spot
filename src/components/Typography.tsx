export function TypographyH1({ text }: { text: string }) {
  return (
    <h1 className="z-50 relative bg-clip-text bg-gradient-to-b from-neutral-900 dark:from-neutral-600 to-neutral-700 dark:to-white py-2 md:py-10 font-sans font-bold text-transparent text-2xl md:text-4xl lg:text-7xl text-center tracking-tight">
      {text}
    </h1>
  );
}

export function TypographyH2({ text }: { text: string }) {
  <h2 className="z-50 relative bg-clip-text bg-gradient-to-b from-neutral-900 dark:from-neutral-600 to-neutral-700 dark:to-white py-2 md:py-10 font-sans font-bold text-transparent text-xl md:text-2xl lg:text-4xl text-center tracking-tight">
    {text}
  </h2>;
}

export function TypographyH3({ text }: { text: string }) {
  return (
    <h3 className="font-semibold text-2xl tracking-tight scroll-m-20">
      {text}
    </h3>
  );
}

export function TypographyH4({ text }: { text: string }) {
  return (
    <h4 className="font-semibold text-xl tracking-tight scroll-m-20">{text}</h4>
  );
}

export function TypographyP({ text }: { text: string }) {
  return (
    <p className="z-50 mx-auto max-w-xl text-neutral-700 dark:text-neutral-400 text-sm md:text-lg text-center">
      {text}
    </p>
  );
}
