"use client";

import { TypographyH1, TypographyP } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="relative flex flex-col justify-center items-center bg-gradient-to-br bg-linear-65 py-16 w-screen h-screen">
        <TypographyH1 text="Snap Shot" />
        <TypographyP text="Welcome to Snap Spot' Photobooth! Capture memories, anytime, anywhere." />
        <Link href="/welcome" className="z-50 mt-16">
          <Button className="px-8 py-6 rounded-full">Start</Button>
        </Link>
      </div>
    </>
  );
}
