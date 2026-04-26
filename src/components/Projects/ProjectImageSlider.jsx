import { useState } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

const ProjectImageSlider = ({ images, accent, title }) => {
    const [current, setCurrent] = useState(0)
    const next = (e) => {
        e.stopPropagation();
        setCurrent((prev) => (prev + 1) % images.length)
    }
    const prev = (e) => {
        e.stopPropagation();
        setCurrent((prev) => (prev - 1 + images.length) % images.length)
    }

    return (
        <div className="img-col relative z-20 w-full lg:w-[48%] max-w-[750px] flex flex-col items-center group order-1 lg:order-2">
            <div className="relative w-full aspect-21/10.5 bg-[#0a0a0a] rounded-t-3xl p-[1.5%] shadow-2xl border-x border-t border-white/10">
                <div className="relative w-full h-full bg-[#080810] rounded-lg overflow-hidden border border-white/5">
                    <div className="absolute top-[2%] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/10 z-30"></div>
                    <div className=" absolute inset-0 z-10">
                        {images.map((img, idx) => (
                            <div
                                key={idx}
                                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${idx === current ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"}`}
                            >
                                <img
                                    src={img}
                                    alt={`${title} screenshot ${idx + 1}`}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                    decoding="async"
                                />
                               
                                <div className="absolute inset-0 bg-linear-to-tr from-white/5 via-transparent to-transparent pointer-events-none z-20"></div>
                            </div>
                        ))}
                    </div>             
                    <button
                        onClick={prev}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/60"
                        aria-label="Previous image"
                    >
                        <FaChevronLeft size={14} />
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/60"
                        aria-label="Next image"
                    >
                        <FaChevronRight size={14} />
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none drop-shadow-lg">
                        <span className="text-[10px] lg:text-xs font-bold tracking-[0.4em] text-white/40 uppercase">
                            {title}
                        </span>
                    </div>
                </div>
            </div>
            <div className="relative w-[108%] h-3 lg:h-4 bg-linear-to-b from-[#e5e7eb] to-[#9ca3af] rounded-b-2xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] flex justify-center">
                <div className="w-[15%] h-[40%] bg-black/10 rounded-b-lg border-x border-b border-black/5"></div>
            </div>
            <div className="mt-6 flex gap-2">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${idx === current ? "w-6" : "w-1.5 bg-white/20"}`}
                        style={{ backgroundColor: idx === current ? accent : undefined }}
                    />
                ))}
            </div>
        </div>
    )
}
export default ProjectImageSlider

