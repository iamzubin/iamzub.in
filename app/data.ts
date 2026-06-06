type Project = {
  name: string
  description: string
  link: string
  linkTab?: boolean
  media: string
  mediaType?: 'image' | 'video'
  id: string
}

type WorkExperience = {
  company: string
  title: string
  start: string
  end: string
  link: string
  id: string
}

type BlogPost = {
  title: string
  description: string
  link: string
  uid: string
}

type SocialLink = {
  label: string
  link: string
}

export const PROJECTS: Project[] = [
  {
    name: 'Holdem',
    description:
      'A Tauri desktop utility for smoother file workflows, designed, shipped, and grown as an open-source product.',
    link: '/case-studies/holdem',
    media: '/assets/holdem.gif',
    mediaType: 'image',
    linkTab: false,
    id: 'project1',
  },
  {
    name: 'Burner Wallet',
    description:
      'A web interface for Burner NFC hardware wallets—tap-to-sign transactions with WalletConnect integration and no seed phrases.',
    link: '/case-studies/ffreed',
    linkTab: false,
    media: '/assets/ffreed-image.jpg',
    mediaType: 'image',
    id: 'project2',
  },
  {
    name: 'StockDesk',
    description:
      'An internal product for a furniture retailer that simplified live stock checks and booking workflows to reduce operational friction on the ground.',
    link: '/case-studies/stock-desk',
    linkTab: false,
    media: '/assets/F3/ScreenShot4.png',
    mediaType: 'video',
    id: 'project4',
  },
]

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'Contract + Open Source',
    title: 'Contract Product Engineer',
    start: '2024',
    end: 'Present',
    link: 'https://github.com/iamzubin',
    id: 'work2',
  },
  {
    company: 'FFREED',
    title: 'Built ERC-4337 SDK & Demo App',
    start: 'May 2024',
    end: 'Dec 2025',
    link: 'https://x.com/ffreedwallet/',
    id: 'work1',
  },
  {
    company: 'Stubs',
    title: 'Smart Contract Systems & Web3 Frontend',
    start: '2022',
    end: '2023',
    link: 'https://x.com/StubsWorldHQ',
    id: 'work3',
  },
  {
    company: 'Sublime Finance',
    title: 'DeFi Frontend & Solidity',
    start: '2021',
    end: '2022',
    link: 'https://x.com/sublimefinance',
    id: 'work4',
  },
  {
    company: 'Google Summer of Code (Fedora)',
    title: 'Open Source Developer',
    start: '2019',
    end: '2019',
    link: 'https://communityblog.fedoraproject.org/gsoc-summer-2019-fedora-gooey-karma/',
    id: 'work5',
  },
]

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'Built dev tools for deploying contracts without gas or keys',
    description: 'Integrated OAuth-based private key schemes',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-1',
  },
  {
    title: 'Built cross-chain tools using PolygonZkEVM, EVM bridges',
    description: 'Worked on security hooks for Hyperlane',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-2',
  },
  {
    title: 'Deployed ERC721/1155 contracts, built governance + relayers',
    description: 'Built React token grid UI for on-chain collections',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-3',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Calendar',
    link: 'https://cal.com/iamzubin',
  },
  {
    label: 'GitHub',
    link: 'https://github.com/iamzubin',
  },
  {
    label: 'Twitter',
    link: 'https://twitter.com/iamzub_in',
  },
  {
    label: 'LinkedIn',
    link: 'https://linkedin.com/in/iamzubin',
  },
]

export const EMAIL = 'me@iamzub.in'
