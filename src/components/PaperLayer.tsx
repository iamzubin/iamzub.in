import { ReactNode } from "react"
import { PaperTexture } from "@paper-design/shaders-react"
import { useTheme } from "./ThemeProvider"

type PaperLayerProps = {
  children: ReactNode
  className?: string
  seedOffset?: number
}

export function PaperLayer({ children, className = "", seedOffset = 1 }: PaperLayerProps) {
  const { isDark } = useTheme()
  
  const colorBack = isDark ? "#303030" : "#ccc9c9"
  const colorFront = isDark ? "#000000" : "#9fadbc"

  return (
    <div className={`relative ${className}`}>
      {/* 
        The PaperTexture provides the solid background and texture for this layer.
        We wrap the filter in a parent div to safely apply the drop shadow.
      */}
      <div className="absolute inset-0 z-0 drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)] pointer-events-none">
        <div 
          className="w-full h-full"
          style={{ filter: 'url(#torn-edge)' }}
        >
          <div className="w-full h-full overflow-hidden relative rounded-sm">
          <PaperTexture
            width="100%"
            height="100%"
            colorBack={colorBack}
            colorFront={colorFront}
            contrast={0.35}
            roughness={0.37}
            fiber={0.02}
            fiberSize={0.008}
            crumples={0}
            crumpleSize={0}
            folds={0}
            foldCount={0}
            drops={0.01}
            fade={0}
            seed={0 + seedOffset}
            fit="cover"
          />
        </div>
        </div>
      </div>
      
      {/* Content sits above the background */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
