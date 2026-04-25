import { useEffect, useRef } from "react"
import gsap from "gsap"
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa"
import ProjectImageSlider from "./ProjectImageSlider"
import { PROJECTS } from "../../data/data"


const ProjectsDesktop = () => {
    const sectionRef = useRef(null)
    const trackRef = useRef(null)
    const dotsRef = useRef([])

    useEffect(() => {
        const ctx = gsap.context(() => {
            const track = trackRef.current
            const cards = gsap.utils.toArray(".project-card")
            const getScrollAmount = () => track.scrollWidth - window.innerWidth

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: () => `+=${getScrollAmount()}`,
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        const activeIndex = Math.max(0, Math.min(
                            PROJECTS.length - 1,
                            Math.round(self.progress * (PROJECTS.length - 1))
                        ))
                        dotsRef.current.forEach((dot, i) => {
                            if (!dot) return
                            gsap.to(dot, {
                                width: i === activeIndex ? 30 : 10,
                                backgroundColor: i === activeIndex
                                    ? PROJECTS[i].accent
                                    : "rgba(255,255,255,0.2)",
                                duration: 0.3,
                            })
                        })
                    },
                },
            })

            tl.to(track, {
                x: () => -getScrollAmount(),
                ease: "none",
            })

            cards.forEach((card, index) => {
                const textCol = card.querySelector(".text-col")
                const imgCol = card.querySelector(".img-col")
                const trigger = index === 0
                    ? { trigger: sectionRef.current, start: "top 60%" }
                    : { trigger: card, horizontal: true, start: "left 75%", containerAnimation: tl }

                if (textCol) {
                    gsap.from(textCol, {
                        x: 100, opacity: 0, duration: 1,
                        ease: "power3.out",
                        scrollTrigger: trigger,
                    })
                }
                if (imgCol) {
                    gsap.from(imgCol, {
                        x: 200, opacity: 0, scale: 0.8, duration: 1,
                        ease: "power3.out",
                        scrollTrigger: trigger,
                    })
                }
            })

        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={sectionRef}
            id="projects"
            className="relative w-full min-h-screen overflow-hidden bg-[#080810]"
        >
            {/* Heading */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 z-50 text-center pointer-events-none">
                <h2 className="text-3xl lg:text-5xl font-black bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] text-transparent bg-clip-text drop-shadow-[0_0_20px_rgba(44,199,204,0.3)]">
                    Selected Works
                </h2>
                <div className="flex items-center justify-center gap-2 mt-3">
                    <div className="w-12 h-px bg-white/20" />
                    <p className="text-white/50 text-xs tracking-[0.3em] uppercase font-bold">
                        Scroll to explore
                    </p>
                    <div className="w-12 h-px bg-white/20" />
                </div>
            </div>

            {/* Track */}
            <div
                ref={trackRef}
                className="absolute top-0 left-0 h-full flex items-center"
                style={{ width: `${PROJECTS.length * 100}vw` }}
            >
                {PROJECTS.map((p, i) => (
                    <div
                        key={p.id}
                        className={`project-card relative shrink-0 w-screen h-screen flex flex-row items-center justify-between gap-16 px-16 xl:px-32 overflow-hidden bg-gradient-to-br ${p.bg}`}
                    >
                        {/* Glow */}
                        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                            <div
                                className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] blur-[150px] rounded-full opacity-30"
                                style={{ backgroundColor: p.accent }}
                            />
                            <div
                                className="absolute -bottom-[20%] -right-[10%] w-[600px] h-[600px] blur-[150px] rounded-full opacity-20"
                                style={{ backgroundColor: p.accent }}
                            />
                        </div>

                        {/* Text col */}
                        <div className="text-col relative z-20 w-[42%] max-w-[650px] flex flex-col items-start text-left">
                            <span
                                className="text-[160px] font-black leading-none absolute -top-28 -left-12 opacity-10 select-none pointer-events-none"
                                style={{ color: p.accent }}
                            >
                                {p.num}
                            </span>

                            <h3 className="text-5xl xl:text-6xl font-black text-white mb-6 z-10 tracking-tight drop-shadow-md">
                                {p.title}
                            </h3>

                            <p className="text-white/70 text-lg xl:text-xl leading-relaxed mb-8 max-w-xl z-10 font-light">
                                {p.description}
                            </p>

                            <div className="flex flex-wrap items-center gap-3 mb-12 z-10">
                                {p.tags.map(tag => (
                                    <span
                                        key={tag}
                                        className="text-xs font-semibold px-4 py-2 rounded-full border bg-black/20 backdrop-blur-md"
                                        style={{ borderColor: p.accent + "40", color: p.accent }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center gap-4 z-10">
<a
                                href={p.github}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white text-sm font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
                >
                                <FaGithub size={18} /> Source Code
                            </a>
                            {p.demo && (
<a
                                href = { p.demo }
                    target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 px-8 py-4 rounded-full text-black text-sm font-bold hover:scale-105 transition-all duration-300 shadow-xl"
                            style={{ background: p.accent, boxShadow: `0 10px 30px -10px ${p.accent}` }}
                  >
                            <FaExternalLinkAlt size={16} /> Live Demo
                        </a>
                )}
                    </div>
            </div>

            {/* Image col */}
            <ProjectImageSlider images={p.images} accent={p.accent} title={p.title} />
        </div>
    ))
}
      </div >

    {/* Dots */ }
    < div className = "absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 p-3 rounded-full bg-black/40 backdrop-blur-lg border border-white/10 shadow-2xl" >
    {
        PROJECTS.map((p, i) => (
            <div
                key={i}
                ref={el => dotsRef.current[i] = el}
                className="h-2 rounded-full"
                style={{
                    background: i === 0 ? p.accent : "rgba(255,255,255,0.2)",
                    boxShadow: i === 0 ? `0 0 10px ${p.accent}` : "none",
                    width: i === 0 ? "30px" : "10px",
                }}
            />
        ))
    }
      </div >
    </section >
  )
}

export default ProjectsDesktop