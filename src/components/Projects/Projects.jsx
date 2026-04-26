import { useEffect, useRef } from "react"
import { gsap } from "../../lib/gsap-setup"
import ProjectPanel from "./ProjectPanel"
import { PROJECTS } from "../../data/data"

const Projects = () => {
    const wrapperRef = useRef(null)
    const trackRef = useRef(null)
    const headerRef = useRef(null)
    const dotsRef = useRef([])
    const dotsContainerRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const wrapper = wrapperRef.current
            const track = trackRef.current
            const header = headerRef.current

            const getShift = () => (PROJECTS.length - 1) * window.innerWidth
            gsap.from(header, {
                y: -30,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: wrapper,
                    start: "top 85%",
                    once: true
                },
            })

            gsap.from(track.querySelectorAll(".panel-enter-content"), {
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                stagger: 0.1,
                scrollTrigger: {
                    trigger: wrapper,
                    start: "top 75%",
                    once: true
                },
            })

            gsap.to(track, {
                x: () => -getShift(),
                ease: "none",
                scrollTrigger: {
                    trigger: wrapper,
                    start: "top top",
                    end: () => `+=${getShift()}`,
                    scrub: 0.2, 
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
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

                        if (dotsContainerRef.current) {
                            if (progress > 0.98) {
                                gsap.to(dotsContainerRef.current, { opacity: 0, y: 20, duration: 0.3, ease: "power2.out", overwrite: "auto" })
                            } else {
                                gsap.to(dotsContainerRef.current, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out", overwrite: "auto" })
                            }
                        }
                    },
                },
            })
        }, wrapperRef)

        return () => ctx.revert()
    }, [])

    return (
        <section id="projects" ref={wrapperRef} className="relative w-full ">
            <div className="relative w-full h-dvh overflow-hidden">
                
                <div
                    className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                        backgroundSize: "200px",
                    }}
                />

                <header
                    ref={headerRef}
                    className="absolute top-6 sm:top-10 lg:top-10 xl:top-8 left-1/2 -translate-x-1/2 z-50 flex flex-col  pointer-events-none w-full px-4"
                >
                    <h2 className=" text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight drop-shadow-lg text-center">
                        Selected{" "}
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63]">
                            Works
                        </span>
                    </h2>
                    <div className="flex items-center justify-center gap-2 sm:gap-3 mt-1 sm:mt-2">
                        <div className="h-px w-8 sm:w-12 bg-white/20 hidden sm:block" />
                        <p className="text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase text-white/50 font-bold">
                            Scroll to explore
                        </p>
                        <div className="h-px w-8 sm:w-12 bg-white/20 hidden sm:block" />
                    </div>
                </header>

                    <div
                    ref={trackRef}
                    className="absolute top-0 left-0 h-full flex items-center shadow-[40px_0_100px_rgba(0,0,0,0.8)] will-change-transform"
                    style={{ width: `${PROJECTS.length * 100}vw` }}
                >
                    {PROJECTS.map((project, i) => (
                        <div key={project.id} className="panel-enter-content w-screen h-full">
                            <ProjectPanel project={project} index={i} />
                        </div>
                    ))}
                </div>

                <div 
                    ref={dotsContainerRef}
                    className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-full bg-black/40 backdrop-blur-lg border border-white/10 shadow-2xl"
                >
                    {PROJECTS.map((p, i) => (
                        <div
                            key={p.id}
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
            </div>
        </section>
    )
}
export default Projects