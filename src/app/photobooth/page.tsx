"use client";

import { useState, useRef, useEffect } from "react";
import SplashCursor from "@/blocks/Animations/SplashCursor/SplashCursor";
import { TypographyH2 } from "@/components/Typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

export default function Photobooth() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [isAutoCapture, setIsAutoCapture] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await new Promise((resolve) => {
          videoRef.current!.onloadedmetadata = resolve; // Tunggu sampai video siap
        });
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const captureImage = () => {
    console.log("Capturing image..."); // Debugging
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        const imageData = canvasRef.current.toDataURL("image/png");
        setCapturedImages((prev) => {
          if (prev.length >= 4) return prev; // Jangan tambahkan jika sudah 4 gambar
          return [...prev, imageData];
        });
      }
    }
  };

  const handleManualCapture = async () => {
    if (capturedImages.length >= 4 || isCapturing) return;
    setIsCapturing(true);
    setCountdown(3);

    let count = 3;
    const interval = setInterval(() => {
      if (count === 1) {
        clearInterval(interval);
        captureImage();
        setIsCapturing(false);
        setCountdown(null);
      } else {
        setCountdown(count - 1);
        count--;
      }
    }, 1000);
  };

  const startAutoCapture = async () => {
    setIsAutoCapture(true);

    for (let i = 0; i < 4; i++) {
      setCountdown(3);

      await new Promise<void>((resolve) => {
        let count = 3;
        const interval = setInterval(() => {
          if (count === 1) {
            clearInterval(interval);
            captureImage();
            setCountdown(null);
            setTimeout(resolve, 2000);
          } else {
            setCountdown(count - 1);
            count--;
          }
        }, 1000);
      });
    }

    setIsAutoCapture(false);
  };

  const handleRefresh = () => {
    if (capturedImages.length > 0) {
      setCapturedImages((prev) => prev.slice(0, -1));
    }
  };

  useEffect(() => {
    startCamera();
  }, []);

  return (
    <>
      <div>
        <TypographyH2 text="Capture your moments" />
        <div className="gap-16 grid grid-cols-3 px-8 md:px-16 lg:px-32">
          <div className="space-y-8 col-span-2">
            <div className="relative rounded-xl w-full aspect-video">
              {countdown !== null && (
                <div className="absolute inset-0 flex justify-center items-center bg-opacity-50 font-bold text-yellow-400 text-6xl">
                  {countdown}
                </div>
              )}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full"
              />
            </div>
            <div className="flex justify-between items-center gap-4">
              <div className="flex gap-4">
                <Button onClick={startAutoCapture} disabled={isAutoCapture}>
                  Start Auto Capture
                </Button>
                <Button
                  onClick={handleManualCapture}
                  variant="outline"
                  disabled={isAutoCapture || capturedImages.length >= 4}
                >
                  Manual Capture
                </Button>
                <Button
                  variant="outline"
                  onClick={handleRefresh}
                  disabled={isAutoCapture || capturedImages.length === 0}
                >
                  <RefreshCcw />
                </Button>
              </div>
              <div className="flex justify-between items-center gap-4">
                <p>Captured images </p>
                <Badge>{capturedImages.length}</Badge>
                <p>of</p>
                <Badge>4</Badge>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 col-span-1">
            {capturedImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="preview"
                className="rounded-lg w-full object-cover aspect-video"
              />
            ))}
          </div>
        </div>
        <canvas
          ref={canvasRef}
          width={640} // Sesuaikan dengan lebar video
          height={480} // Sesuaikan dengan tinggi video
          style={{ display: "none" }} // Sembunyikan canvas dari tampilan
        />
      </div>
    </>
  );
}
