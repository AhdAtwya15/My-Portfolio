import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FiMail, FiCopy, FiArrowUpRight, FiCheck, FiGithub } from "react-icons/fi";
import { FaWhatsapp, FaLinkedinIn } from "react-icons/fa";

const Contacts = () => {
    const sectionRef  = useRef(null);
    const leftRef     = useRef(null);
    const rightRef    = useRef(null);
    const copyTimerRef = useRef(null);          
    const [copied, setCopied] = useState(false);


    const email        = "ahdatwya@gmail.com";
    const whatsappLink = "https://wa.me/201287677534";
    const githubLink   = "https://github.com/AhdAtwya15";
    const linkedinLink = "https://www.linkedin.com/in/ahd-atwya-a46766228/";
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(leftRef.current, { x: -50, opacity: 0 }, {
                x: 0, opacity: 1, duration: 1, ease: "power3.out",
                scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none reverse" }
            });
            gsap.fromTo(rightRef.current, { x: 50, opacity: 0 }, {
                x: 0, opacity: 1, duration: 1, ease: "power3.out",
                scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none reverse" }
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        return () => { if (copyTimerRef.current) clearTimeout(copyTimerRef.current) }
    }, []);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
        copyTimerRef.current = setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section ref={sectionRef} id="contact" className="relative w-full min-h-screen bg-[#080810] py-20 px-6 flex items-center justify-center overflow-hidden">
            <div className="absolute z-0 top-[-10%] left-[-10%] w-[500px] h-[500px] bg-linear-to-r from-[#135449b4] via-[#0c322b] to-[#101020] animate-pulse blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute z-0 bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-linear-to-r from-[#135449b4] via-[#0c322b] to-[#101020] animate-pulse blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-6xl w-full grid lg:grid-cols-2 gap-16 items-center">
                <div ref={leftRef} className="flex flex-col items-start gap-8">
                    

                    <h2 className="text-6xl sm:text-7xl md:text-8xl font-black text-white leading-[1.1] tracking-tighter">
                        Let’s build   <br />
                        something <span className="bg-linear-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] text-transparent bg-clip-text underline decoration-teal-500/30 underline-offset-8">together</span><br />
                       
                    </h2>
                    <div className="flex items-center gap-4 w-full">
                        <div className="h-px flex-1 bg-linear-to-r from-teal-500/40 to-transparent" />
                        <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Find me on</span>
                        <div className="h-px flex-1 bg-linear-to-l from-teal-500/40 to-transparent" />
                    </div>
                </div>

                <div ref={rightRef} className="flex flex-col gap-6 lg:pl-10">
                    <div className="group relative flex flex-col sm:flex-row items-center justify-between p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-500">
                        <a href={`mailto:${email}`} className="flex items-center gap-5 w-full hover:opacity-80 transition-opacity">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/50 group-hover:text-white group-hover:bg-teal-500/20 transition-all duration-500">
                                <FiMail size={24} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Email Me</span>
                                <span className="text-sm sm:text-base md:text-lg font-medium text-white/90 break-all">{email}</span>
                            </div>
                        </a>
                        <div className="flex items-center gap-2 mt-4 sm:mt-0 w-full sm:w-auto">
                            <button
                                onClick={copyToClipboard}
                                className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all duration-300 relative group/tooltip"
                            >
                                {copied ? <FiCheck className="text-teal-400" size={18} /> : <FiCopy size={18} />}
                                <span className={`absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-white text-black text-[10px] font-bold rounded-md transition-opacity duration-300 pointer-events-none whitespace-nowrap ${copied ? 'opacity-100' : 'opacity-0'}`}>
                                    Copied!
                                </span>
                            </button>
                            <a
                                href={gmailLink}
                                target="_blank"
                                rel="noreferrer"
                                className="p-3 rounded-2xl bg-white text-black hover:bg-teal-400 transition-all duration-300 flex items-center justify-center"
                            >
                                <FiArrowUpRight size={20} />
                            </a>
                        </div>
                    </div>

                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center justify-between p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-teal-500/30 transition-all duration-500"
                    >
                        <div className="flex items-center gap-5">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/50 group-hover:text-emerald-400 group-hover:bg-emerald-400/10 transition-all duration-500">
                                <FaWhatsapp size={24} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Chat on WhatsApp</span>
                            </div>
                        </div>
                        <div className="p-3 rounded-2xl bg-white/5 text-white/50 group-hover:bg-white group-hover:text-black transition-all duration-500">
                            <FiArrowUpRight size={20} />
                        </div>
                    </a>

                    <div className="grid grid-cols-2 gap-4">
                        <a
                            href={githubLink}
                            target="_blank"
                            rel="noreferrer"
                            className="group flex flex-col gap-4 p-5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-purple-400/10 hover:border-white/20 transition-all duration-500"
                        >
                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-white group-hover:bg-white/10 transition-all duration-500">
                                <FiGithub size={20} />
                            </div>
                            <div>
                                <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest block mb-1">GitHub</span>
                                <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors duration-300">@AhdAtwya15</span>
                            </div>
                            <FiArrowUpRight size={16} className="text-white/20 group-hover:text-purple-400 transition-colors duration-300 self-end" />
                        </a>

                        <a
                            href={linkedinLink}
                            target="_blank"
                            rel="noreferrer"
                            className="group flex flex-col gap-4 p-5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/5 transition-all duration-500"
                        >
                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-[#0A66C2] group-hover:bg-[#0A66C2]/10 transition-all duration-500">
                                <FaLinkedinIn size={20} />
                            </div>
                            <div>
                                <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest block mb-1">LinkedIn</span>
                                <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors duration-300">Ahd Atwya</span>
                            </div>
                            <FiArrowUpRight size={16} className="text-white/20 group-hover:text-[#0A66C2] transition-colors duration-300 self-end" />
                        </a>
                    </div>
                </div>
            </div>

            
        </section>
    );
};

export default Contacts;
