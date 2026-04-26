import { FaGithub, FaExternalLinkAlt } from "react-icons/fa"
import ProjectImageSlider from "./ProjectImageSlider"

const ProjectPanel = ({ project}) => (
    <div
        className="relative shrink-0 w-screen h-screen flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-6 sm:gap-10 lg:gap-20 px-6 md:px-16 lg:px-24 xl:px-32 pt-28 sm:pt-20  pb-24 lg:py-0 overflow-hidden"
        style={{
            background: `radial-gradient(ellipse at 50% 50%, ${project.accent}15 0%, transparent 70%), #080810`,
        }}
    >
        {/* Glow blobs */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute top-[-10%] right-[-10%] w-[300px] lg:w-[600px] h-[300px] lg:h-[600px] blur-[120px] rounded-full opacity-30" style={{ backgroundColor: project.accent }} />
            <div className="absolute bottom-[-10%] left-[-10%] w-[300px] lg:w-[600px] h-[300px] lg:h-[600px] blur-[120px] rounded-full opacity-20" style={{ backgroundColor: project.accent }} />
        </div>

       
        <div className="text-col relative z-20 w-full lg:w-[45%] max-w-[600px] flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1 mt-2 lg:mt-0">
           
            <span
                className="text-8xl sm:text-[100px] md:text-[120px] lg:text-[160px] font-black leading-none absolute -top-10 sm:-top-16 lg:-top-24 left-1/2 lg:-left-8 -translate-x-1/2 lg:translate-x-0 opacity-[0.08] select-none pointer-events-none"
                style={{ color: project.accent }}
            >
                {project.num}
            </span>

            <h3 className="text-3xl sm:text-4xl lg:text-6xl font-black text-white mb-2 lg:mb-5 z-10 tracking-tight drop-shadow-md">
                {project.title}
            </h3>

            <p className="text-white/70 text-xs sm:text-sm lg:text-lg leading-relaxed mb-5 lg:mb-8 max-w-xl z-10 font-light line-clamp-4 sm:line-clamp-none">
                {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6 lg:mb-10 z-10">
                {project.tags.map((tag) => (
                    <span
                        key={tag}
                        className="px-3 py-1.5 lg:px-4 lg:py-2 text-[10px] sm:text-xs lg:text-sm font-semibold rounded-full border bg-black/20 backdrop-blur-md"
                        style={{
                            color: project.accent,
                            borderColor: `${project.accent}40`,
                        }}
                    >
                        {tag}
                    </span>
                ))}
            </div>


            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 z-10 w-full">
                <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 rounded-full border border-white/20 text-white text-xs sm:text-sm lg:text-base font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
                >
                    <FaGithub size={18} />
                    Source Code
                </a>
                {project.demo && (
                    <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 rounded-full text-slate-900 text-xs sm:text-sm lg:text-base font-bold hover:scale-105 transition-all duration-300 shadow-xl"
                        style={{ background: project.accent, boxShadow: `0 10px 30px -10px ${project.accent}80` }}
                    >
                        Live Demo
                        <FaExternalLinkAlt size={14} />
                    </a>
                )}
            </div>
        </div>
        <ProjectImageSlider
            images={project.images}
            accent={project.accent}
            title={project.title}
        />
    </div>
)
export default ProjectPanel