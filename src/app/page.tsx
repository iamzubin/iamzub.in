"use client"
import FloatingDiv from "@/components/FloatingDiv";
import { useEffect } from "react";

import { useState } from "react";

export default function Portfolio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredImages, setHoveredImages] = useState<string[] | null>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX + 130, y: event.clientY + 50 });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 flex items-center justify-center p-4">
      <div className="max-w-xl w-full space-y-16 py-16">
        <header className="space-y-1">
          <p className="text-lg font-serif">hi i&apos;m zubin,</p>
          <p className="text-lg font-serif">i like to build cool stuff.</p>
        </header>

        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-lg font-serif font-medium">work</h2>
            <div className="space-y-1 pl-8 flex flex-col">
              <a href="#" 
                 className="text-lg font-serif hover:text-blue-600 transition-colors"
                 onMouseEnter={() => setHoveredImages(["https://placekeanu.com/500/304", "https://placekeanu.com/500/300/blur"])} // {{ edit_1 }}
                 onMouseLeave={() => setHoveredImages(null)} // {{ edit_2 }}
              >
                misc
              </a>
              <a href="#" 
                 className=" text-lg font-serif hover:text-blue-600 transition-colors"
                 onMouseEnter={() => setHoveredImages(["https://placekeanu.com/500/453/y", "https://placekeanu.com/500/301/y"])} // {{ edit_3 }}
                 onMouseLeave={() => setHoveredImages(null)} // {{ edit_4 }}
              >
                ffreed
              </a>
              <a href="#" 
                 className=" text-lg font-serif hover:text-blue-600 transition-colors"
                 onMouseEnter={() => setHoveredImages(["https://placekeanu.com/500/300", "https://placekeanu.com/500/303"])} // {{ edit_5 }}
                 onMouseLeave={() => setHoveredImages(null)} // {{ edit_6 }}
              >
                jobs
              </a>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-serif font-medium">other</h2>
            <div className="space-y-1 pl-8 flex flex-col">
              <a href="#" 
                 className=" text-lg font-serif hover:text-blue-600 transition-colors"
                 onMouseEnter={() => setHoveredImages(["image7_url", "image8_url"])} // {{ edit_7 }}
                 onMouseLeave={() => setHoveredImages(null)} // {{ edit_8 }}
              >
                keyboards
              </a>
              <a href="#" 
                 className=" text-lg font-serif hover:text-blue-600 transition-colors"
                 onMouseEnter={() => setHoveredImages(["image9_url", "image10_url"])} // {{ edit_9 }}
                 onMouseLeave={() => setHoveredImages(null)} // {{ edit_10 }}
              >
                in a year
              </a>
              <a href="#" 
                 className=" text-lg font-serif hover:text-blue-600 transition-colors"
                 onMouseEnter={() => setHoveredImages(["image11_url", "image12_url"])} // {{ edit_11 }}
                //  onMouseLeave={() => setHoveredImages(null)} // {{ edit_12 }}
              >
                you might as well enjoy it
              </a>
            </div>
          </div>
        </section>
      </div>
      {/* Conditionally render the FloatingDiv based on hoveredImages */}
      {hoveredImages && (
        <FloatingDiv position={mousePosition} images={hoveredImages} />
      )}
    </main>
  )
}