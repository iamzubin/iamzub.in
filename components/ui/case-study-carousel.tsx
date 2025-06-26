'use client'
import {
  Carousel,
  CarouselContent,
  CarouselNavigation,
  CarouselIndicator,
  CarouselItem,
} from '@/components/motion-primitives/carousel'
import Image from 'next/image'

export function CaseStudyCarousel({ images }: { images: string[] }) {
  return (
    <div className="relative w-full">
      <Carousel>
        <CarouselContent>
          {images.map((src, i) => (
            <CarouselItem key={i}>
              <div className="flex aspect-video items-center justify-center">
                <Image
                  src={src}
                  alt={`Case study image ${i + 1}`}
                  width={1200}
                  height={675}
                  className="rounded-lg object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNavigation alwaysShow />
        <CarouselIndicator />
      </Carousel>
    </div>
  )
} 