import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useLottie } from 'lottie-react'
import Stars from '../stars'

const LottiePlayer = ({ animationData }) => {
    const { View } = useLottie({ animationData, loop: true, autoplay: true })
    return View
}


const LazyLottie = () => {
    const [animData, setAnimData] = useState(null)

    useEffect(() => {
        let cancelled = false
        import('../../assets/space_boy_developer.json').then(mod => {
            if (!cancelled) setAnimData(mod.default)
        })
        return () => { cancelled = true }
    }, [])

    if (!animData) return null
    return <LottiePlayer animationData={animData} />
}

const Heros = ({ isReady }) => {
    const headingRef = useRef(null)
    const subRef     = useRef(null)
    const labelRef   = useRef(null)

    const tlRef      = useRef(null)
    const typeRef    = useRef(null)

    useEffect(() => {
        const label = "Frontend Developer"
        const chars = label.split("")
        let current = ""

        if (labelRef.current) labelRef.current.textContent = ""

        const ctx = gsap.context(() => {
            const split = new SplitText(headingRef.current, { type: "words,chars" })
            
            const typewriter = gsap.timeline({ delay: 0.2, paused: true })
            chars.forEach((char) => {
                typewriter
                    .call(() => {
                        current += char
                        if (labelRef.current) labelRef.current.textContent = current
                    })
                    .to({}, { duration: 0.07 })
            })
            typeRef.current = typewriter

            const ti = gsap.timeline({ delay: 0.2, paused: true })
            
          
            ti.from([".hello-word", split.words], {
                y: -100,
                opacity: 0,
                rotation: "random(-80,80)",
                stagger: 0.15,
                duration: 0.7,
                ease: "back",
            })
                .from(subRef.current, {
                    opacity: 0,
                    y: 30,
                    duration: 0.2,
                    ease: "power3.out",
                }, "-=0.3")
                .from(".hero-cta", {
                    opacity: 0,
                    y: 20,
                    scale: 0.8,
                    duration: 0.3,
                    stagger: 0.1,
                    ease: "back.out(1.7)",
                    clearProps: "all",
                }, "<")

            tlRef.current = ti
        })

        return () => ctx.revert()
    }, [])

    useEffect(() => {
        if (isReady) {
            if (tlRef.current) tlRef.current.play()
            if (typeRef.current) typeRef.current.play()
        }
    }, [isReady])

    return (
        <section
            id="home"
            className="relative min-h-screen overflow-hidden pt-40 md:pt-30 lg:pt-20"
            style={{
                background: `
                    radial-gradient(ellipse at 75% 50%, #135449b4 0%, transparent 60%),
                    black
                `,
            }}
        >
            <Stars />

            <div
                className="absolute z-0 top-[-10%] left-[-10%] w-[500px] h-[500px] bg-linear-to-r from-[#135449b4] via-[#0c322b] to-[#101020] animate-pulse blur-[120px] rounded-full pointer-events-none"
                style={{ willChange: 'transform' }}
            />

            <div className='relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-[1310px] mx-auto px-8 sm:px-10 lg:px-13'>

                <div className="flex flex-col gap-5 lg:gap-4 mx-auto md:mx-0 text-center md:text-left pt-15">
                    <p className="text-white text-xl tracking-widest uppercase flex items-center gap-0 justify-center md:justify-start">
                        <span ref={labelRef} className='font-bold'></span>
                        <span className="border-r-2 border-white animate-pulse">&nbsp;</span>
                    </p>

                    <h1 className="font-mono text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight">
                        <span className="inline-flex gap-2">
                            <span className="hello-word bg-linear-to-r from-teal-400/90 via-teal-400/90 to-teal-400/80 bg-clip-text text-transparent">Hey</span>
                            <span className="hello-word bg-linear-to-r from-teal-300/90 via-teal-300/90 to-teal-300/80 bg-clip-text text-transparent">,</span>
                            <span className="hello-word bg-linear-to-r from-teal-300/90 via-teal-300/80 to-teal-300/70 bg-clip-text text-transparent">I'm</span>
                        </span>
                        <br />
                        <span ref={headingRef} className="text-white inline-block">Ahd Atwya</span>
                    </h1>

                    <p ref={subRef} className="text-gray-300 text-base sm:text-lg max-w-md -tracking-tight">
                        Crafting modern interfaces with smooth interactions and clean code.
                    </p>

                    <div className="flex gap-4 flex-wrap mt-3 justify-center md:justify-start">
                        <a
                            href="#projects"
                            className="hero-cta inline-block bg-linear-to-r  from-[#1CD8D2] via-[#00bf8f] to-[#302b63] hover:from-[#2DA696] hover:via-[#1FAF98] hover:to-[#1FAF98] hover:scale-105 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 cursor-pointer"
                        >
                            View My Work
                        </a>
                        <a
                            href="https://drive.google.com/file/d/1H-A_up-SokLHs_ROo_QylK1lMyvxo3zt/view?usp=drive_link"
                            target="_blank"
                            className="hero-cta inline-block border border-white/30 text-white px-6 py-3 rounded-full hover:border-white hover:scale-105 transition-all duration-300 cursor-pointer"
                        >
                            My Resume
                        </a>
                    </div>
                </div>

                <div className="hidden md:flex mb-10 items-center justify-center h-full w-full max-w-[600px]">
                    <LazyLottie />
                </div>
            </div>
        </section>
    )
}

export default Heros