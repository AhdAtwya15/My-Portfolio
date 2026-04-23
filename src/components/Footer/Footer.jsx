import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { FiMail } from "react-icons/fi";

const CURRENT_YEAR = new Date().getFullYear();
const email = "ahdatwya@gmail.com";
const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;

const SOCIAL_LINKS = [
    { icon: <FaGithub />, href: "https://github.com/AhdAtwya15", label: "GitHub" },
    { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/ahd-atwya-a46766228/", label: "LinkedIn" },
    { icon: <FaWhatsapp />, href: "https://wa.me/201287677534", label: "WhatsApp" },
    { icon: <FiMail />, href: gmailLink, label: "Email" },
];

const Footer = () => (
    <footer className="w-full bg-[#080810] border-t border-white/5 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">

            <div className="flex flex-col items-center md:items-start gap-2">
                <h3 className="text-xl font-black text-white tracking-tighter">
                    Ahd<span className="text-teal-400">.</span>
                </h3>
                <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">
                    © {CURRENT_YEAR} Ahd Atwya. All rights reserved.
                </p>
            </div>

            <div className="hidden lg:block text-center whitespace-nowrap">
                <p className="text-white/20 text-xs font-medium tracking-wide uppercase">
                    Built with <span className="text-teal-500 mx-1 animate-pulse italic">passion</span> and a lot of <span className="text-white/40 italic">coffee</span>
                </p>
            </div>

            <div className="flex items-center gap-4">
                {SOCIAL_LINKS.map((link, idx) => (
                    <a
                        key={idx}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={link.label}
                        className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/50 hover:bg-white hover:text-black hover:scale-110 transition-all duration-300"
                    >
                        <span className="text-lg">{link.icon}</span>
                    </a>
                ))}
            </div>
        </div>
    </footer>
);

export default Footer;
