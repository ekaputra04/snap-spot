"use client";

import SplashCursor from "@/blocks/Animations/SplashCursor/SplashCursor";
import { PointerWrapper } from "@/components/magicui/pointer";
import { TypographyH2, TypographyP } from "@/components/Typography";
import { BackgroundLines } from "@/components/ui/background-lines";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function WelcomePage() {
  return (
    <>
      <PointerWrapper>
        <BackgroundLines className="-z-20 w-full">
          <div className="flex flex-col justify-center items-center px-8 md:px-16 lg:px-48 w-screen h-screen">
            <TypographyH2 text="Welcome!" />
            <TypographyP text="You have 3 seconds for each shot – choose manual or automatic mode!" />
            <TypographyP text="This photobooth captures 4 pictures in a row. If you choose manual mode, you can retake each photo before moving to the next one. If you go automatic, let the system handle it and enjoy the moment!" />
            <TypographyP text="After the session, download your digital copy and share the fun! 🎉" />
            <Link href="/photobooth" className="z-50 mt-16">
              <Button className="px-8 py-6 rounded-full">Start</Button>
            </Link>
          </div>
        </BackgroundLines>
        <div className="top-0 right-0 bottom-0 left-0 fixed">
          <SplashCursor />
        </div>
      </PointerWrapper>
    </>
  );
}
