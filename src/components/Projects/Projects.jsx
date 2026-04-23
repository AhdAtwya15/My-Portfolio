import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa"
import ProjectImageSlider from "./ProjectImageSlider"
import { PROJECTS } from "../../data/data"

const Projects = () => {
    const sectionRef = useRef(null)
    const trackRef = useRef(null)
    const dotsRef = useRef([])
    useEffect(() => {
        const ctx = gsap.context(() => {
            const track = trackRef.current
            const cards = gsap.utils.toArray(".project-card")
            const totalW = track.scrollWidth - window.innerWidth
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: () => `+=${totalW + window.innerWidth}`,
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                    onUpdate: (self) => {
                        const progress = self.progress;
                        
                        const activeIndex = Math.max(0, Math.min(PROJECTS.length - 1, Math.round(progress * (PROJECTS.length - 1))));

                        dotsRef.current.forEach((dot, i) => {
                            if (!dot) return;
                            if (i === activeIndex) {
                                gsap.to(dot, { width: 30, backgroundColor: PROJECTS[i].accent, duration: 0.3 })
                            } else {
                                gsap.to(dot, { width: 10, backgroundColor: "rgba(255,255,255,0.2)", duration: 0.3 })
                            }
                        })
                    }
                },
            })

            tl.to(track, {
                x: -totalW,
                ease: "none",
            })
 
            cards.forEach((card, index) => {
                const textCol = card.querySelector(".text-col")
                const imgCol = card.querySelector(".img-col")

                if (textCol) {
                    gsap.from(textCol, {
                        x: 100,
                        opacity: 0,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: index === 0 ? {
                            trigger: sectionRef.current,
                            start: "top 60%",
                        } : {
                            trigger: card,
                            horizontal: true,
                            start: "left 75%",
                            containerAnimation: tl,
                        },
                    })
                }

                if (imgCol) {
                    gsap.from(imgCol, {
                        x: 200,
                        opacity: 0,
                        scale: 0.8,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: index === 0 ? {
                            trigger: sectionRef.current,
                            start: "top 60%",
                        } : {
                            trigger: card,
                            horizontal: true,
                            start: "left 75%",
                            containerAnimation: tl,
                        },
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
            className="relative w-full min-h-screen  overflow-hidden bg-[#080810]  "
        >
            <div className="absolute top-4 sm:top-10 left-1/2 -translate-x-1/2 z-50 text-center pointer-events-none mt-4 sm:mt-0">
                <h2 className="text-xl sm:text-3xl lg:text-5xl font-black  bg-linear-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] text-transparent bg-clip-text drop-shadow-[0_0_20px_rgba(44,199,204,0.3)]">
                    Selected Works
                </h2>
                <div className="flex items-center justify-center gap-2 mt-1 sm:mt-3">
                    <div className="w-8 sm:w-12 h-px bg-white/20 hidden sm:block"></div>
                    <p className="text-white/50 text-[10px] sm:text-xs tracking-[0.3em] uppercase font-bold">
                        Scroll to explore
                    </p>
                    <div className="w-8 sm:w-12 h-px bg-white/20 hidden sm:block"></div>
                </div>
            </div>
            <div>
            </div>
            <div
                ref={trackRef}
                className=" absolute top-0 left-0 h-full flex items-center shadow-[40px_0_100px_rgba(0,0,0,0.8)]"
                style={{ width: `${PROJECTS.length * 100}vw` }}
            >
                {PROJECTS.map((p, i) => (
                    <div
                        key={p.id}
                        className={`project-card relative shrink-0 w-screen h-screen flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-6 sm:gap-12 lg:gap-32 px-6 md:px-16 lg:px-24 xl:px-32 pt-24 sm:pt-32 pb-10 lg:py-0 overflow-hidden bg-linear-to-br ${p.bg}`}
                    >                    
                        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                            <div className="absolute -top-[20%] -left-[10%] w-[400px] lg:w-[600px] h-[400px] lg:h-[600px] blur-[150px] rounded-full opacity-30" style={{ backgroundColor: p.accent }} />
                            <div className="absolute -bottom-[20%] -right-[10%] w-[400px] lg:w-[600px] h-[400px] lg:h-[600px] blur-[150px] rounded-full opacity-20" style={{ backgroundColor: p.accent }} />
                        </div>

                        <div className="text-col relative z-20 w-full lg:w-[42%] max-w-[650px] flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1 mt-2 lg:mt-0">
                            <span
                                className="text-6xl sm:text-8xl md:text-[120px] lg:text-[160px] font-black leading-none absolute -top-10 sm:-top-16 md:-top-24 lg:-top-28 left-1/2 lg:-left-12 -translate-x-1/2 lg:translate-x-0 opacity-10 select-none pointer-events-none"
                                style={{ color: p.accent }}
                            >
                                {p.num}
                            </span>

                            <h3 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-white mb-2 sm:mb-4 lg:mb-6 z-10 tracking-tight drop-shadow-md">
                                {p.title}
                            </h3>

                            <p className="text-white/70 text-xs sm:text-sm lg:text-lg xl:text-xl leading-relaxed mb-4 sm:mb-6 lg:mb-8 max-w-xl z-10 font-light line-clamp-4 sm:line-clamp-none">
                                {p.description}
                            </p>

                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-2 lg:gap-3 mb-6 sm:mb-8 lg:mb-12 z-10">
                                {p.tags.map(tag => (
                                    <span
                                        key={tag}
                                        className="text-[10px] sm:text-xs lg:text-sm font-semibold px-3 py-1.5 lg:px-4 lg:py-2 rounded-full border bg-black/20 backdrop-blur-md"
                                        style={{ borderColor: p.accent + "40", color: p.accent }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3 sm:gap-4 z-10 w-full">
                                <a
                                    href={p.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center justify-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 rounded-full border border-white/20 text-white text-xs sm:text-sm lg:text-base font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
                                >
                                    <FaGithub size={16} className="sm:w-[18px] sm:h-[18px]" /> Source Code
                                </a>
                               {
                                p.demo && (
                                    <a
                                        href={p.demo}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center justify-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 rounded-full text-slate-300 text-xs sm:text-sm lg:text-base font-bold hover:scale-105 transition-all duration-300 shadow-xl"
                                        style={{ background: p.accent, boxShadow: `0 10px 30px -10px ${p.accent}` }}
                                    >
                                        <FaExternalLinkAlt size={14} className="sm:w-[16px] sm:h-[16px]" /> Live Demo
                                    </a>
                                )
                               }
                            </div>
                        </div>
                        <ProjectImageSlider images={p.images} accent={p.accent} title={p.title} />
                    </div>
                ))}
            </div>
            <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 p-3 rounded-full bg-black/40 backdrop-blur-lg border border-white/10 shadow-2xl">
                {PROJECTS.map((p, i) => (
                    <div
                        key={i}
                        ref={el => dotsRef.current[i] = el}
                        className="h-2 rounded-full transition-all duration-300"
                        style={{
                            background: i === 0 ? p.accent : "rgba(255,255,255,0.2)",
                            boxShadow: i === 0 ? `0 0 10px ${p.accent}` : "none",
                            width: i === 0 ? "30px" : "10px"
                        }}
                    />
                ))}
            </div>

        </section>
    )
}

export default Projects