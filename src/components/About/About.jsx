import { useEffect, useRef } from "react"
import gsap from "gsap"

const About = () => {
    const sectionRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(".about-btn", { opacity: 0, y: 20 })

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                }
            })

            tl.from(".about-img", {
                x: -80,
                opacity: 0,
                duration: 0.9,
                ease: "power3.out",
            })
                .from(".about-name", {
                    y: 40,
                    opacity: 0,
                    duration: 0.9,
                    ease: "power3.out",
                }, "-=0.2")
                .from(".about-role", {
                    y: 20,
                    opacity: 0,
                    duration: 0.9,
                    ease: "power2.out",
                }, "<")
                .from(".about-bio", {
                    y: 30,
                    opacity: 0,
                    duration: 0.9,
                    ease: "power2.out",
                }, "<")
                .from(".stat-card", {
                    y: 40,
                    opacity: 0,
                    stagger: 0.19,
                    duration: 0.9,
                    ease: "back.out(1.5)",
                }, "<")
                .to(".about-btn", {
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    duration: 0.9,
                    ease: "power2.out",
                }, "<")
                .from(".about-line", {
                    width: 0,
                    duration: 0.99,
                    ease: "power2.out",
                }, "-=0.9")
                .from(".about-text", {
                    y: 20,
                    opacity: 0,
                    duration: 0.9,
                    ease: "power2.out",
                }, "<")
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} id="about" className="relative min-h-screen py-20 px-6 sm:px-10 lg:px-13 overflow-hidden">

            <div className="absolute z-0 top-[-10%] left-[-10%] w-[500px] h-[500px] bg-linear-to-r from-[#135449b4] via-[#0c322b] to-[#101020] animate-pulse blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute z-0 bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-linear-to-r from-[#135449b4] via-[#0c322b] to-[#101020] animate-pulse blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto p-10 shadow-[0_20px_40px_rgba(0,0,0,0.8)]">

                <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 items-center">

                    <div className="about-img relative w-40 h-40 sm:w-50 sm:h-50 md:w-70 md:h-70 rounded-full mx-auto overflow-hidden ring-2 ring-[#2CC7CC]/30 bg-[#0f1f1e]">
                        <img
                            src="https://res.cloudinary.com/df2nbeovz/image/upload/v1776969756/Me_v3uhwn.png"
                            alt="Ahd Atwya"
                            className="w-full h-auto object-cover"
                            loading="lazy"
                        />
                    </div>

                    <div className="flex flex-col space-y-4 items-center md:items-start">
                        <h2 className="about-name pb-1 pl-1 italic text-3xl md:text-4xl font-bold bg-linear-to-r from-[#1CD8D2] via-[#00bf8f] to-[#419c9d] bg-clip-text text-transparent">
                            Ahd Atwya
                        </h2>
                        <p className="about-role text-slate-400 font-medium tracking-wide">
                            Frontend Developer
                        </p>
                        <p className="about-bio text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl text-center md:text-left">
                            Computer Science graduate (2025) with a strong passion for frontend development.
                            I focus on building clean, responsive, and visually engaging web interfaces
                            that turn complex ideas into simple user experiences.
                        </p>

                        <div className="grid grid-cols-3 gap-3 max-w-xl">
                            {[
                                { label: "Graduation", value: "2025" },
                                { label: "GPA",        value: "3.4 / 4.0" },
                                { label: "Focus",      value: "Frontend" },
                            ].map((s) => (
                                <div key={s.label} className="stat-card bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                                    <p className="text-xs text-slate-400 mb-1">{s.label}</p>
                                    <p className="text-sm font-bold text-white">{s.value}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-row gap-4 flex-wrap pt-2 items-center justify-center md:justify-start">
                            <a href="#projects"
                                className="about-btn bg-[#3ac3a7] hover:bg-[#3f9b89] text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 whitespace-nowrap cursor-pointer">
                                View Projects
                            </a>
                            <a href="#contact"
                                className="about-btn border border-white/20 text-white px-6 py-3 rounded-full hover:border-[#3ac3a7] transition-colors duration-300 whitespace-nowrap cursor-pointer">
                                Get in Touch
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-10 max-w-6xl mx-auto">
                    <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                        <span className="about-line block h-0.5 w-8 bg-[#3ac3a7]"></span>
                        <span className="italic font-bold text-white">About Me</span>
                    </h3>
                    <p className="about-text max-w-2xl text-gray-300 text-base leading-relaxed tracking-wider">
                        I'm a frontend developer based in Egypt, passionate about creating modern
                        and interactive web applications. I specialize in React and enjoy bringing
                        interfaces to life with smooth animations and thoughtful user experiences.
                        I'm always learning, building, and looking for opportunities to grow and
                        create impactful digital products.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default About
