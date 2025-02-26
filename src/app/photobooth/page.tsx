"use client";

import { useState, useRef, useEffect } from "react";
import { TypographyH2 } from "@/components/Typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const themeColors = [
  { title: "White", color: "#ffffff" },
  { title: "Black", color: "#000000" },
  { title: "Pink", color: "#fee2e2" },
  { title: "Orange", color: "#fed7aa" },
  { title: "Yellow", color: "#fef08a" },
  { title: "Green", color: "#bbf7d0" },
  { title: "Blue", color: "#bfdbfe" },
  { title: "Purple", color: "#d8b4fe" },
];

export default function Photobooth() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [isAutoCapture, setIsAutoCapture] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isProcess, setIsProcess] = useState(false);
  const [title, setTitle] = useState("Memories");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [date, setDate] = useState(new Date());

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await new Promise((resolve) => {
          videoRef.current!.onloadedmetadata = resolve;
        });
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  useEffect(() => {
    console.log("bgColor: ", bgColor);
    console.log("title: ", title);
  }, [bgColor, title]);

  const captureImage = () => {
    console.log("Capturing image...");
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
          if (prev.length >= 4) return prev;
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

  const handleTitleChange = (title: string) => {
    setTitle(title);
  };

  useEffect(() => {
    startCamera();
  }, []);

  interface handleDownloadProps {
    bgColor: string;
    title: string;
    textColor: string;
  }

  const handleDownload = ({
    bgColor,
    title,
    textColor,
  }: handleDownloadProps) => {
    const paddingX = 20;
    const paddingY = 20;
    const imageWidth = 640;
    const imageHeight = 360;
    const spacing = 30;
    const textHeight = 100;
    const totalHeight =
      capturedImages.length * (imageHeight + spacing) + textHeight;

    const canvas = document.createElement("canvas");
    canvas.width = imageWidth + paddingX * 2;
    canvas.height = totalHeight + paddingY * 2;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      capturedImages.forEach((img, index) => {
        const image = new Image();
        image.src = img;
        image.onload = () => {
          const y = index * (imageHeight + spacing);
          ctx.drawImage(image, paddingX, y, imageWidth, imageHeight);
        };
      });

      setTimeout(() => {
        ctx.textAlign = "center";
        ctx.fillStyle = textColor;

        ctx.font = "28px Arial";
        ctx.fillText(title, canvas.width / 2, totalHeight - textHeight / 2);

        ctx.font = "24px Arial";
        ctx.fillText(
          new Date().toLocaleDateString(),
          canvas.width / 2,
          totalHeight - textHeight / 4
        );

        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "snapspot.png";
        link.click();
      }, 1000);
    }
  };

  return (
    <>
      <div
        className={`${
          isProcess ? "hidden" : "block"
        } transition-all pb-16 py-24 lg:pt-0`}
      >
        <TypographyH2 text="Capture your moments" />
        <div className="gap-16 grid grid-cols-1 md:grid-cols-3 px-8 md:px-16 lg:px-32">
          <div className="space-y-8 md:col-span-2">
            <div className="relative rounded-xl w-full aspect-video overflow-hidden">
              {countdown !== null && (
                <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50 p-4 rounded-full font-bold text-yellow-400 text-6xl animate-ping">
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
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={startAutoCapture}
                  disabled={isAutoCapture || capturedImages.length >= 4}
                >
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
              <div className="flex justify-between items-center gap-2">
                <p>Captured images </p>
                <Badge variant={"outline"}>{capturedImages.length}</Badge>
                <p>of</p>
                <Badge variant={"outline"}>4</Badge>
              </div>
            </div>
            {capturedImages.length === 4 && (
              <Button className="w-full" onClick={() => setIsProcess(true)}>
                Process Images
              </Button>
            )}
          </div>
          <div className="flex flex-col gap-4 col-span-1 px-8">
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
      </div>
      <div className={`${isProcess ? "block" : "hidden"} `}>
        <div className="px-8 md:px-16 lg:px-48 py-24">
          <TypographyH2 text="Customize your photo" />
          {capturedImages.length == 4 && (
            <div className="flex md:flex-row flex-col justify-between space-y-8">
              <div
                className={`flex flex-col gap-4  p-4 border md:w-1/3 `}
                style={{ backgroundColor: bgColor }}
              >
                {capturedImages.map((img, index) => (
                  <img
                    src={img}
                    alt="polaroid"
                    className="object-cover aspect-video"
                    key={index}
                  />
                ))}
                <h2
                  className="font-semibold text-center"
                  style={{ color: textColor }}
                >
                  {title}
                </h2>
                <p className="-mt-4 text-center" style={{ color: textColor }}>
                  {date.toLocaleDateString()}
                </p>
              </div>
              <div className="md:w-1/3">
                <Label htmlFor="title">Title</Label>
                <Input
                  type="text"
                  className="bg-white dark:bg-background"
                  id="title"
                  placeholder="Title"
                  onChange={(e) => handleTitleChange(e.target.value)}
                />
                <div className="flex flex-wrap gap-4 mt-8">
                  {themeColors.map((color, index) => (
                    <Button
                      variant={"outline"}
                      className={`px-4 py-2 border  ${
                        bgColor == color.color ? `bg-black text-white` : ""
                      } `}
                      key={index}
                      onClick={() => {
                        setBgColor(color.color);
                      }}
                    >
                      {color.title}
                    </Button>
                  ))}
                </div>
                <Label htmlFor="bgColor" className="block mt-4">
                  Background Color
                </Label>
                <Input
                  type="color"
                  id="bgColor"
                  className="mt-2 w-32"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                />
                <Label htmlFor="textColor" className="block mt-4">
                  Text Color
                </Label>
                <Input
                  type="color"
                  id="textColor"
                  className="mt-2 w-32"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-4 mt-4">
                <Button
                  onClick={() =>
                    handleDownload({
                      bgColor: bgColor,
                      title: title,
                      textColor: textColor,
                    })
                  }
                >
                  Download Photo Grid
                </Button>
                <Button
                  className=""
                  variant={"outline"}
                  onClick={() => {
                    setIsProcess(false);
                    setCapturedImages([]);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <canvas
        className="hidden"
        ref={canvasRef}
        width={640}
        height={480}
        style={{ display: "none" }}
      />
    </>
  );
}
