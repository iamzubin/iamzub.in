// app/sitemap.xml/route.ts
import { WEBSITE_URL } from '@/lib/constants'
import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
    // List of static routes
    const staticPages = [''] // Add your static pages here

    // Dynamically get blog post slugs from the file system
    const blogDir = path.join(process.cwd(), 'app/blog')
    const caseStudyDir = path.join(process.cwd(), 'app/case-studies')
    
    const blogSlugs = fs
        .readdirSync(blogDir, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name)

    const caseStudySlugs = fs
        .readdirSync(caseStudyDir, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name)

    // Helper function to get last modification time
    const getLastModTime = (filePath: string): string => {
        try {
            const stats = fs.statSync(filePath)
            return stats.mtime.toISOString()
        } catch (error) {
            // Fallback to current time if file doesn't exist or can't be read
            return new Date().toISOString()
        }
    }

    // Get lastmod times for different types of pages
    const staticPageUrls = staticPages.map((page) => {
        const filePath = page === '' 
            ? path.join(process.cwd(), 'app/page.tsx')
            : path.join(process.cwd(), 'app', page, 'page.tsx')
        return {
            url: `${WEBSITE_URL}/${page}`,
            lastmod: getLastModTime(filePath)
        }
    })

    const blogUrls = blogSlugs.map((slug) => {
        // Try to get the .mdx file first, fallback to page.tsx if not found
        const mdxPath = path.join(blogDir, slug, 'page.mdx')
        const tsxPath = path.join(blogDir, slug, 'page.tsx')
        
        let filePath = mdxPath
        if (!fs.existsSync(mdxPath)) {
            filePath = tsxPath
        }
        
        return {
            url: `${WEBSITE_URL}/blog/${slug}`,
            lastmod: getLastModTime(filePath)
        }
    })

    const caseStudyUrls = caseStudySlugs.map((slug) => {
        // Try to get the .mdx file first, fallback to page.tsx if not found
        const mdxPath = path.join(caseStudyDir, slug, 'page.mdx')
        const tsxPath = path.join(caseStudyDir, slug, 'page.tsx')
        
        let filePath = mdxPath
        if (!fs.existsSync(mdxPath)) {
            filePath = tsxPath
        }
        
        return {
            url: `${WEBSITE_URL}/case-studies/${slug}`,
            lastmod: getLastModTime(filePath)
        }
    })

    // Combine all URLs
    const allUrls = [...staticPageUrls, ...blogUrls, ...caseStudyUrls]

    // Generate XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
            .map(
                (urlData) => `
  <url>
    <loc>${urlData.url}</loc>
    <lastmod>${urlData.lastmod}</lastmod>
  </url>
`
            )
            .join('')}
</urlset>`

    return new NextResponse(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
        },
    })
}