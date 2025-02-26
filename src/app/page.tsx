"use client";

import SplashCursor from "@/blocks/Animations/SplashCursor/SplashCursor";
import { TypographyH1, TypographyP } from "@/components/Typography";
import { BackgroundLines } from "@/components/ui/background-lines";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <BackgroundLines className="w-full">
        <div className="relative flex flex-col justify-center items-center bg-gradient-to-br bg-linear-65 py-16 w-screen h-screen">
          <TypographyH1 text="Snap Shot" />
          <TypographyP text="Welcome to Snap Spot' Photobooth! Capture memories, anytime, anywhere." />
          <Link href="/welcome" className="z-50 mt-16">
            <Button className="px-8 py-6 rounded-full">Start</Button>
          </Link>
        </div>
      </BackgroundLines>
      <div className="top-0 right-0 bottom-0 left-0 fixed">
        <SplashCursor />
      </div>
    </>
  );
}
