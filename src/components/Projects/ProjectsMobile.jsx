import { useRef, useEffect } from "react"
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa"
import ProjectImageSlider from "./ProjectImageSlider"
import { PROJECTS } from "../../data/data"


const ProjectsMobile = () => {
    const containerRef = useRef(null)
    const trackRef = useRef(null)
    const dotsRef = useRef([])

    useEffect(() => {
        const track = trackRef.current
        if (!track) return

        // sync dots مع الـ scroll
        const onScroll = () => {
            const scrollLeft = track.scrollLeft
            const cardWidth = track.offsetWidth
            const activeIndex = Math.round(scrollLeft / cardWidth)

            dotsRef.current.forEach((dot, i) => {
                if (!dot) return
                dot.style.width = i === activeIndex ? "24px" : "8px"
                dot.style.backgroundColor = i === activeIndex
                    ? PROJECTS[i].accent
                    : "rgba(255,255,255,0.2)"
                dot.style.boxShadow = i === activeIndex
                    ? `0 0 8px ${PROJECTS[i].accent}`
                    : "none"
            })
        }

        track.addEventListener("scroll", onScroll, { passive: true })
        return () => track.removeEventListener("scroll", onScroll)
    }, [])

    return (
        <div ref={containerRef} id="projects" className="relative bg-[#080810]">

            {/* Heading */}
            <div className="relative z-50 text-center pt-8 pb-4 bg-[#080810]">
                <h2 className="text-2xl font-black bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#2CC7CC] text-transparent bg-clip-text">
                    Selected Works
                </h2>
                <div className="flex items-center justify-center gap-2 mt-2">
                    <div className="w-8 h-px bg-white/20" />
                    <p className="text-white/50 text-[10px] tracking-[0.3em] uppercase font-bold">
                        Swipe to explore
                    </p>
                    <div className="w-8 h-px bg-white/20" />
                </div>
            </div>

            {/* Horizontal scroll track */}
            <div
                ref={trackRef}
                className="flex overflow-x-scroll snap-x snap-mandatory"
                style={{
                    scrollbarWidth: "none",          // Firefox
                    msOverflowStyle: "none",         // IE
                    WebkitOverflowScrolling: "touch", // iOS smooth
                    height: "90vh",
                }}
            >
                <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>

                {PROJECTS.map((p, i) => (
                    <div
                        key={p.id}
                        className={`relative shrink-0 w-screen h-full snap-start flex flex-col items-center justify-center gap-5 px-5 pt-6 pb-16 overflow-hidden bg-gradient-to-br ${p.bg}`}
                    >
                        {/* Glow */}
                        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                            <div className="absolute -top-[20%] -left-[10%] w-[300px] h-[300px] blur-[100px] rounded-full opacity-30"
                                style={{ backgroundColor: p.accent }} />
                            <div className="absolute -bottom-[20%] -right-[10%] w-[300px] h-[300px] blur-[100px] rounded-full opacity-20"
                                style={{ backgroundColor: p.accent }} />
                        </div>

                        {/* Accent top line */}
                        <div
                            className="absolute top-0 left-0 right-0 h-[2px]"
                            style={{ background: `linear-gradient(to right, transparent, ${p.accent}, transparent)` }}
                        />

                        {/* Number */}
                        <span
                            className="absolute top-4 left-4 text-[80px] font-black leading-none opacity-10 select-none pointer-events-none"
                            style={{ color: p.accent }}
                        >
                            {p.num}
                        </span>

                        {/* Image */}
                        <div className="relative z-10 w-full">
                            <ProjectImageSlider images={p.images} accent={p.accent} title={p.title} />
                        </div>

                        {/* Text */}
                        <div className="relative z-10 w-full flex flex-col items-center text-center">
                            <h3 className="text-2xl font-black text-white mb-2">
                                {p.title}
                            </h3>
                            <p className="text-white/70 text-xs leading-relaxed mb-4 max-w-sm line-clamp-3">
                                {p.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap justify-center gap-2 mb-4">
                                {p.tags.map(tag => (
                                    <span
                                        key={tag}
                                        className="text-[10px] font-semibold px-3 py-1 rounded-full border bg-black/20"
                                        style={{ borderColor: p.accent + "40", color: p.accent }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-wrap justify-center gap-3">
<a
                                href={p.github}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-white text-xs font-semibold hover:bg-white/10 transition-all"
                >
                                <FaGithub size={13} /> Source Code
                            </a>
                            {p.demo && (
<a
                                href = { p.demo }
                    target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-black text-xs font-bold"
                            style={{ background: p.accent }}
                  >
                            <FaExternalLinkAlt size={11} /> Live Demo
                        </a>
                )}
                    </div>
            </div>

            {/* Page counter */}
            <div className="absolute bottom-5 right-5 text-white/20 text-xs font-mono">
                {p.num} / 0{PROJECTS.length}
            </div>
        </div>
    ))
}
      </div >

    {/* Dots */ }
    < div className = "flex items-center justify-center gap-2 py-4 bg-[#080810]" >
        <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-black/40 backdrop-blur border border-white/10">
            {PROJECTS.map((p, i) => (
                <div
                    key={i}
                    ref={el => dotsRef.current[i] = el}
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                        width: i === 0 ? "24px" : "8px",
                        background: i === 0 ? p.accent : "rgba(255,255,255,0.2)",
                        boxShadow: i === 0 ? `0 0 8px ${p.accent}` : "none",
                    }}
                />
            ))}
        </div>
      </div >

    </div >
  )
}

export default ProjectsMobile