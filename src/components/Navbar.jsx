import gsap from "gsap";
import { FiMenu } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";


const NAV_LINKS = ["Home", "About", "Skills", "Projects", "Experience", "Contact"]


const Navbar = () => {
  const [isOpen, setIsOPen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const overlayRef = useRef(null)
  const linksRef = useRef(null)

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const openMenu = () => {
    setIsOPen(true)
    gsap.set(".nav-link", { y: 40, opacity: 0 })

    const tl = gsap.timeline()

    tl.to(overlayRef.current, {
      clipPath: "circle(150% at 50% 40px)",
      duration: 0.4,
      ease: "expo.inOut"
    })
      .to(".nav-link", {
        y: 0,
        opacity: 1,
        stagger: 0.07,
        duration: 0.3,
        ease: "power2.out",
      }, "-=0.3")
  }
  const closeMenu = () => {

    const tl = gsap.timeline(
      {
        onComplete: () => setIsOPen(false)
      }
    )

    tl.to(".nav-link", {
      y: -20,
      opacity: 0,
      stagger: 0.04,
      duration: 0.18,
      ease: "power2.in"
    })
      .to(overlayRef.current, {
        clipPath: "circle(0% at 50% 40px)",
        duration: 0.4,
        ease: "expo.inOut"
      }, "-=0.1")
  }

  return (
    <>
      <nav className={`max-w-7xl mx-auto w-full py-1.5 px-6 sm:px-10 flex justify-between items-center fixed left-0 right-0 z-50 transition-all duration-300 mt-2 ${isVisible ? "top-0 translate-y-0  bg-black/5 backdrop-blur-xs rounded-full" : "top-0 -translate-y-[150%]"}`}>

      <a
        href="/"
        className="group relative flex items-center gap-3 transition-transform duration-300 hover:scale-105"
      >

        <div className="flex flex-col justify-center">
          <span className="font-extrabold text-2xl tracking-tight text-transparent bg-clip-text bg-linear-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
            Ahd
            <span className="text-teal-500">.</span>
          </span>
          <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 tracking-[0.2em] uppercase -mt-1 opacity-80 group-hover:opacity-100 transition-opacity">
            Atwya
          </span>
        </div>
      </a>


      <button onClick={isOpen ? closeMenu : openMenu} className="cursor-pointer">
        <FiMenu className='w-7 h-7 text-white hover:text-slate-400 transition-colors duration-300' />
      </button>
      <a href="#contact" className='inline-block bg-linear-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63]  hover:from-[#2DA696] hover:via-[#1FAF98] hover:to-[#1FAF98] hover:scale-105  text-white px-5 py-2 rounded-full transition-all duration-300'>
        Hire Me
      </a>
    </nav>

      <div
        ref={overlayRef}
        style={{ clipPath: "circle(0% at 50% 40px)" }}
        className="fixed inset-0 bg-black/90 z-9998 flex items-center justify-center text-white"
      >
        <div ref={linksRef} className="flex flex-col space-y-5">
          {NAV_LINKS.map((link, i) => (
            <div key={i} className="nav-link flex flex-col gap-1.5 w-fit mx-auto group">
              <a
                href={`#${link.toLowerCase()}`}
                onClick={closeMenu}
                className="text-white text-3xl font-bold group-hover:text-teal-500 transition-colors duration-200"
              >
                {link}
              </a>
              <span className="w-full h-1 bg-teal-500 scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
            </div>
          ))}
        </div>
        <button onClick={closeMenu} className="cursor-pointer absolute top-8 right-10 z-[9999]">
          <IoCloseOutline className="w-7 h-7 text-white hover:text-slate-400 transition-colors duration-300" />
        </button>
      </div>


    </>
  )
}

export default Navbar