import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Cover: ({
      src,
      alt,
      caption,
    }: {
      src: string
      alt: string
      caption: string
    }) => {
      return (
        <figure className="my-8">
          <div className="border-2 border-brutalist-fg dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] overflow-hidden">
            <img src={src} alt={alt} className="w-full h-auto" />
          </div>
          <figcaption className="mt-2 text-xs font-bold uppercase opacity-50 text-center">{caption}</figcaption>
        </figure>
      )
    },
    h1: ({ children }) => <h1 className="text-4xl font-black uppercase tracking-tight my-8">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-black uppercase tracking-tight my-6 border-b-2 border-brutalist-fg dark:border-white pb-2">{children}</h2>,
    p: ({ children }) => <p className="text-lg leading-relaxed my-4">{children}</p>,
    a: ({ children, href }) => <a href={href} className="font-bold underline decoration-neon-yellow decoration-2 underline-offset-4 hover:bg-neon-yellow hover:text-black transition-colors">{children}</a>,
  }
}
