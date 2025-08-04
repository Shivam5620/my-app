"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

export function Banner() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const banners = [
    {
      title: "Step Into Style",
      description: "Explore our latest collection crafted for professionals.",
    },
    {
      title: "Elegance in Every Step",
      description: "Timeless shoes designed to match your workwear.",
    },
    {
      title: "Comfort Meets Confidence",
      description: "Feel great and look sharp from desk to dinner.",
    },
  ];

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };
    api.on("select", onSelect);

    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000); // Auto-scroll every 5 seconds

    return () => {
      api.off("select", onSelect);
      clearInterval(interval);
    };
  }, [api]);

  return (
    <div className=" px-4 py-4 bg-gradient-to-r from-yellow-300 to-yellow-500 p-6 text-black rounded-lg">
      <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
        <CarouselContent className="-mx-2">
          {banners.map((banner, index) => (
            <CarouselItem key={index} className="mx-2">
              <div className="relative h-64 w-full overflow-hidden rounded-2xl shadow-xl">
                {/* Decorative Yellow Rings */}
                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full border-4 border-yellow-400 z-10"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full border-4 border-yellow-400 z-10"></div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-yellow-100/70 backdrop-blur-sm flex items-center justify-center text-center rounded-2xl p-6">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-yellow-950 drop-shadow-sm">
                      {banner.title}
                    </h2>
                    <p className="text-sm md:text-base mt-2 text-yellow-800 font-medium">
                      {banner.description}
                    </p>
                    <Button className="mt-4 bg-yellow-300 text-yellow-900 font-semibold px-5 py-2 rounded-full shadow hover:bg-yellow-300 transition">
                      Scroll More Products{" "}
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
