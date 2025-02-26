"use client";

import { TypographyH2, TypographyP } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function WelcomePage() {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="flex flex-col justify-center items-center">
        <TypographyH2 text="Welcome!" />
        <TypographyP text="You have 3 seconds for each shot – choose manual or automatic mode!" />
        <TypographyP text="This photobooth captures 4 pictures in a row. If you choose manual mode, you can retake each photo before moving to the next one. If you go automatic, let the system handle it and enjoy the moment!" />
        <TypographyP text="After the session, download your digital copy and share the fun! 🎉" />
        <Link href="/photobooth" className="z-50 mt-16">
          <Button className="px-8 py-6 rounded-full">Start</Button>
        </Link>
      </div>
    </div>
  );
}
