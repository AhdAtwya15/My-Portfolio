import { memo, useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

const ScrollToTop = memo(function ScrollToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 400);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className={`fixed bottom-25 right-6 z-50 w-11 h-11 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/10 text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-500 ease-out shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] ${
                visible 
                    ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" 
                    : "opacity-0 scale-50 translate-y-10 pointer-events-none"
            }`}
        >
            <FiArrowUp className="w-5 h-5" aria-hidden="true" focusable="false" />
        </button>
    );
});

export default ScrollToTop;
