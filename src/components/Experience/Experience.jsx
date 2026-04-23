import { useEffect, useRef } from "react";
import gsap from "gsap";

import { EXPERIENCES } from "../../data/data";

const Card = ({ exp }) => (
    <div className={`w-[45%] rounded-2xl border border-teal-500/20 bg-teal-950/30 p-6 backdrop-blur-sm
    ${exp.left ? "mr-auto" : "ml-auto"}`}
    >
        <div className="flex items-start justify-between gap-3 mb-3">
            <div>
                <h3 className="font-bold text-white">{exp.title}</h3>
                <p className="text-sm text-teal-400/70 mt-0.5">{exp.company}</p>
            </div>
            <span className="shrink-0 text-xs text-teal-400 border border-teal-500/30 bg-teal-500/10 rounded-full px-2 py-1">
                {exp.period}
            </span>
        </div>
        <p className="text-sm text-white/50 leading-relaxed">{exp.description}</p>
    </div>
);

const Experience = () => {
    const sectionRef = useRef(null);
    const lineRef    = useRef(null);
    const itemsRef   = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(lineRef.current,
                { scaleY: 0, transformOrigin: "top" },
                {
                    scaleY: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 60%",
                        end: "bottom 85%",
                        scrub: 1,
                    },
                }
            );

            itemsRef.current.forEach((el, i) => {
                if (!el) return;
                gsap.fromTo(el,
                    { x: EXPERIENCES[i].left ? -60 : 60, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 0.7,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 80%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="experience" className="relative w-full min-h-screen bg-black overflow-hidden py-20">
            <div className="absolute z-0 top-[-10%] left-[-10%] w-[500px] h-[500px] bg-linear-to-r from-[#135449b4] via-[#0c322b] to-[#101020] animate-pulse blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute z-0 bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-linear-to-r from-[#135449b4] via-[#0c322b] to-[#101020] animate-pulse blur-[120px] rounded-full pointer-events-none" />
            <div className="relative z-10 max-w-4xl mx-auto px-6">
                <h2 className="text-5xl font-bold w-fit mx-auto mb-10 pb-10 bg-linear-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] text-transparent bg-clip-text">
                    Experience
                </h2>
                <div className="relative">
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/10">
                        <div ref={lineRef} className="w-full h-full bg-linear-to-b from-[#1CD8D2] via-[#346D7A] to-[#302b63]" />
                    </div>
                    <div className="flex flex-col gap-16">
                        {EXPERIENCES.map((exp, i) => (
                            <div
                                key={i}
                                ref={(el) => (itemsRef.current[i] = el)}
                                className="relative flex items-center"
                            >
                                <Card exp={exp} />
                                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-linear-to-br from-teal-400 to-emerald-500 ring-4 ring-teal-500/20 shadow-[0_0_16px_rgba(20,184,166,0.5)] animate-pulse" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
