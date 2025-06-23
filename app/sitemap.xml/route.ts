// app/sitemap.xml/route.ts
import { WEBSITE_URL } from '@/lib/constants'
import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// GitHub API helper function
async function getLastCommitDate(filePath: string): Promise<string> {
    try {
        const response = await fetch(
            `https://api.github.com/repos/iamzubin/iamzub.in/commits?path=${filePath}&per_page=1`,
            {
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                },
                next: { revalidate: 36000 } // Cache for 10 hours
            }
        )

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`)
        }

        const commits = await response.json()
        
        if (commits.length > 0) {
            return new Date(commits[0].commit.committer.date).toISOString()
        }
        
        return new Date().toISOString()
    } catch (error) {
        console.error(`Error fetching commit date for ${filePath}:`, error)
        return new Date().toISOString()
    }
}

export async function GET() {
    // Define the type for URL entries
    type UrlEntry = {
        url: string
        lastmod: string
    }

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

    // Get last commit dates for static pages
    const homePageDate = await getLastCommitDate('app/page.tsx')

    // List of static routes with their lastmod times
    const staticPages: UrlEntry[] = [
        {
            url: `${WEBSITE_URL}/`,
            lastmod: homePageDate
        }
    ]

    // Blog posts with their lastmod times
    const blogPosts: UrlEntry[] = await Promise.all(
        blogSlugs.map(async (slug) => {
            const filePath = `app/blog/${slug}/page.mdx`
            const lastmod = await getLastCommitDate(filePath)
            return {
                url: `${WEBSITE_URL}/blog/${slug}`,
                lastmod
            }
        })
    )

    // Case studies with their lastmod times
    const caseStudies: UrlEntry[] = await Promise.all(
        caseStudySlugs.map(async (slug) => {
            const filePath = `app/case-studies/${slug}/page.mdx`
            const lastmod = await getLastCommitDate(filePath)
            return {
                url: `${WEBSITE_URL}/case-studies/${slug}`,
                lastmod
            }
        })
    )

    // Combine all URLs
    const allUrls = [...staticPages, ...blogPosts, ...caseStudies]

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