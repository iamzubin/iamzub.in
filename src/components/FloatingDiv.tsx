import { useEffect, useMemo, useState } from "react";

// FloatingDiv component for displaying dynamic content
export default function FloatingDiv({ position, images }: { position: { x: number, y: number }, images: string[] }) {
    const [visibleImages, setVisibleImages] = useState<boolean[]>([false, false, false]);

    useEffect(() => {
        console.log(visibleImages)
    }, [visibleImages])

    useEffect(() => {
        console.log(images, "invoked", visibleImages)
        let timers: NodeJS.Timeout[] = []; // Store multiple timers
        setVisibleImages(Array(images.length).fill(false)); // Reset visibility state

        for (let i = 0; i < images.length; i++) {
            const timer = setTimeout(() => {
                setVisibleImages(prevState => {
                    const newState = [...prevState];
                    newState[i] = true; // Set the current image to visible
                    return newState;
                });
            }, i * 1000); // Delay each update by 1 second
            timers.push(timer); // Store the timer
        }

        return () => {
            timers.forEach(timer => clearTimeout(timer)); // Clear all timers on cleanup
        };
    }, [images]);

    const stackedImages = useMemo(() => {
         
      return images.slice(-3).map((src, index) => {
        const rotation = Math.random() * 10 - 5; // Random rotation between -5 and 5 degrees
        const translateX = Math.random() * 10 - 5 + index * 150; // Random horizontal translation
        const translateY = Math.random() * 10 - 5; // Random vertical translation
        const zIndex = images.length - index; // Stack order

        return (
          <div
            key={index}
            className="absolute inset-0 flex items-center justify-center overflow-hidden shadow-2xl"
            style={{
              transform: `rotate(${rotation}deg) translate(${translateX}px, ${translateY}px)`,
              transition: 'opacity 0.5s ease-in-out', // Smooth transition for visibility
              zIndex,
            }}
          >
            <img src={src} alt={`Floating ${index}`} className="w-44 h-28 object-cover rounded" />
          </div>
        );
      });
    },[]);
  
    return (
      <div
        style={{
          position: 'absolute',
          top: position.y,
          left: position.x,
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
        }}
        className="w-44 h-28 "
      >
        <div>
          {stackedImages}
        </div>
      </div>
    );
  }