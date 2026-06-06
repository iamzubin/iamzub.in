'use client'
import { Magnetic } from '@/components/ui/magnetic'
import {
  MorphingDialog,
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogTrigger,
} from '@/components/ui/morphing-dialog'
import { XIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { EMAIL, PROJECTS, SOCIAL_LINKS } from './data'

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const TRANSITION_SECTION = {
  duration: 0.3,
}

type ProjectMediaProps = {
  src: string
}

function ProjectMedia({ src }: ProjectMediaProps) {
  const isVideo =
    src.endsWith('.mp4') ||
    src.endsWith('.webm') ||
    src.indexOf('cloudinary') !== -1
  const isImage =
    src.endsWith('.jpg') ||
    src.endsWith('.jpeg') ||
    src.endsWith('.png') ||
    src.endsWith('.gif') ||
    src.endsWith('.webp')

  return (
    <MorphingDialog
      transition={{
        type: 'spring',
        bounce: 0,
        duration: 0.3,
      }}
    >
      <MorphingDialogTrigger>
        {isVideo ? (
          <video
            src={src}
            autoPlay
            loop
            muted
            playsInline
            className="aspect-video w-full cursor-zoom-in rounded-xl"
          />
        ) : isImage ? (
          <img
            src={src}
            alt="Project screenshot"
            className="aspect-video w-full cursor-zoom-in rounded-xl object-cover"
          />
        ) : (
          <div className="flex aspect-video w-full items-center justify-center rounded-xl bg-zinc-200 dark:bg-zinc-800">
            No media available
          </div>
        )}
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent className="relative aspect-video rounded-2xl bg-zinc-50 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950 dark:ring-zinc-800/50">
          {isVideo ? (
            <video
              src={src}
              autoPlay
              loop
              muted
              playsInline
              className="aspect-video h-[50vh] w-full rounded-xl md:h-[70vh]"
            />
          ) : isImage ? (
            <img
              src={src}
              alt="Project screenshot"
              className="aspect-video h-[50vh] w-full rounded-xl object-contain md:h-[70vh]"
            />
          ) : (
            <div className="flex aspect-video h-[50vh] w-full items-center justify-center rounded-xl bg-zinc-200 md:h-[70vh] dark:bg-zinc-800">
              No media available
            </div>
          )}
        </MorphingDialogContent>
        <MorphingDialogClose
          className="fixed top-6 right-6 h-fit w-fit rounded-full bg-white p-1"
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: { delay: 0.3, duration: 0.1 },
            },
            exit: { opacity: 0, transition: { duration: 0 } },
          }}
        >
          <XIcon className="h-5 w-5 text-zinc-500" />
        </MorphingDialogClose>
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}

function MagneticSocialLink({
  children,
  link,
}: {
  children: React.ReactNode
  link: string
}) {
  return (
    <Magnetic springOptions={{ bounce: 0 }} intensity={0.3}>
      <a
        href={link}
        target="_black"
        className="group relative inline-flex shrink-0 items-center gap-[1px] rounded-full bg-zinc-100 px-2.5 py-1 text-sm text-black transition-colors duration-200 hover:bg-zinc-950 hover:text-zinc-50 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
      >
        {children}
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
        >
          <path
            d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </a>
    </Magnetic>
  )
}

export default function Personal() {
  return (
    <motion.main
      className="space-y-20"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      {/* Hero */}
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="space-y-6"
      >
        <div className="flex-1 space-y-4">
          <h1 className="text-2xl font-medium text-zinc-900 dark:text-zinc-50">
            I ship hard-to-ship product features.
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            I work with startups and product teams on important technical work
            that spans too many systems for a simple handoff: complex
            integrations, backend-heavy features, desktop apps, and specialized
            systems work including Web3 when relevant.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="#selected-work"
            className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            See selected work
          </a>
          <a
            href="https://cal.com/iamzubin"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900"
          >
            Book a scoping call
          </a>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Tauri desktop product with 130 GitHub stars • ERC-4337 SDK + demo app
          • GSoC alumnus • Commercial internal-tool delivery
        </p>
      </motion.section>

      {/* What teams bring me in for */}
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 text-lg font-medium">What teams bring me in for</h3>
        <ul className="space-y-3 text-zinc-600 dark:text-zinc-400">
          <li className="flex items-start gap-3">
            <span className="text-zinc-400">•</span>
            <span>
              A feature that keeps slipping because it touches too many systems.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-zinc-400">•</span>
            <span>
              A tricky integration that needs careful implementation, not glue
              code.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-zinc-400">•</span>
            <span>
              A backend-heavy product slice that needs end-to-end ownership.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-zinc-400">•</span>
            <span>
              A short sprint to de-risk an important technical decision.
            </span>
          </li>
        </ul>
      </motion.section>

      {/* Engagements */}
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 text-lg font-medium">Engagements</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-zinc-50 p-4 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950 dark:ring-zinc-800/50">
            <h4 className="font-medium text-zinc-900 dark:text-zinc-50">
              Spike Sprint
            </h4>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              5 days to de-risk one technical problem with a working
              implementation slice, technical notes, and a rollout path.
            </p>
          </div>
          <div className="rounded-2xl bg-zinc-50 p-4 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950 dark:ring-zinc-800/50">
            <h4 className="font-medium text-zinc-900 dark:text-zinc-50">
              Build Sprint
            </h4>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              2 to 4 weeks to ship a feature or integration end-to-end.
            </p>
          </div>
          <div className="rounded-2xl bg-zinc-50 p-4 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950 dark:ring-zinc-800/50">
            <h4 className="font-medium text-zinc-900 dark:text-zinc-50">
              Technical Rescue
            </h4>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              A short engagement to stabilize a fragile code path or unblock a
              delayed feature.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Selected Work */}
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        id="selected-work"
      >
        <h3 className="mb-5 text-lg font-medium">Selected work</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {PROJECTS.map((project) => (
            <div key={project.name} className="space-y-2">
              <div className="relative rounded-2xl bg-zinc-50/40 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950/40 dark:ring-zinc-800/50">
                <ProjectMedia src={project.media} />
              </div>
              <div className="px-1">
                <a
                  className="font-base group relative inline-block font-[450] text-zinc-900 dark:text-zinc-50"
                  href={project.link}
                  {...(project.linkTab && { target: '_blank' })}
                >
                  {project.name}
                  <span className="absolute bottom-0.5 left-0 block h-[1px] w-full max-w-0 bg-zinc-900 transition-all duration-200 group-hover:max-w-full dark:bg-zinc-50"></span>
                </a>
                <p className="text-base text-zinc-600 dark:text-zinc-400">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Contact */}
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Have a project in mind? Reach out at{' '}
          <a className="underline dark:text-zinc-300" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
        </p>
        <div className="mt-4 flex items-center justify-start space-x-3">
          {SOCIAL_LINKS.map((link) => (
            <MagneticSocialLink key={link.label} link={link.link}>
              {link.label}
            </MagneticSocialLink>
          ))}
        </div>
      </motion.section>
    </motion.main>
  )
}
