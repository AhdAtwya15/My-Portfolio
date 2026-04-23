import { useEffect, useRef, useState } from "react"
import Matter from "matter-js"
import { FaReact, FaGitAlt, FaGithub, FaHtml5, FaCss3Alt, FaFigma } from "react-icons/fa"
import { SiTypescript, SiJavascript, SiTailwindcss, SiMui, SiAxios, SiReactquery, SiNextdotjs, SiGsap } from "react-icons/si"

const SKILLS = [
  { name: "React",        bg: "#21A0C4", Icon: FaReact },
  { name: "TypeScript",   bg: "#3178C6", Icon: SiTypescript },
  { name: "JavaScript",   bg: "#D4A017", Icon: SiJavascript },
  { name: "HTML",         bg: "#E34F26", Icon: FaHtml5 },
  { name: "CSS",          bg: "#1572B6", Icon: FaCss3Alt },
  { name: "Tailwind",     bg: "#0D9488", Icon: SiTailwindcss },
  { name: "MUI",          bg: "#007FFF", Icon: SiMui },
  { name: "Figma",        bg: "#7C3AED", Icon: FaFigma },
  { name: "Git",          bg: "#F05032", Icon: FaGitAlt },
  { name: "GitHub",       bg: "#333",    Icon: FaGithub },
  { name: "Axios",        bg: "#5A29E4", Icon: SiAxios },
  { name: "React Query",  bg: "#FF4154", Icon: SiReactquery },
  { name: "Next.js",      bg: "#111",    Icon: SiNextdotjs },
  { name: "GSAP",         bg: "#88CE02", Icon: SiGsap },
]

const getCardSize = () => {
  if (typeof window === "undefined") return 90
  if (window.innerWidth < 480) return 55
  if (window.innerWidth < 768) return 72
  return 90
}

const MySkills = () => {
  const containerRef = useRef(null)
  const cardRefs     = useRef([])
  const matterRefs   = useRef({})
  const [cardSize, setCardSize]     = useState(getCardSize)
  const [hasStarted, setHasStarted] = useState(false)

  // ─── Resize listener (dep array is [] — uses ref to avoid stale closure) ──
  useEffect(() => {
    const handleWindowResize = () => {
      const newSize = getCardSize()
      setCardSize(prev => (newSize !== prev ? newSize : prev))
    }
    window.addEventListener("resize", handleWindowResize)
    return () => window.removeEventListener("resize", handleWindowResize)
  }, [])  // ← fixed: was [cardSize] causing listener re-registration on every resize

  // ─── IntersectionObserver — only start physics when section is visible ─────
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHasStarted(true) },
      { threshold: 0.2 }
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  // ─── Physics engine ───────────────────────────────────────────────────────
  useEffect(() => {
    let mounted = true
    if (!hasStarted) return

    const timer = setTimeout(() => {
      if (!mounted || !containerRef.current) return
      initMatter()
    }, 120)

    return () => {
      mounted = false
      clearTimeout(timer)
      cleanup()
    }
  }, [cardSize, hasStarted])

  const cleanup = () => {
    const { runner, engine, onResize } = matterRefs.current
    if (onResize) window.removeEventListener("resize", onResize)
    if (!engine) return
    const { Runner, World, Engine } = Matter
    // ✅ No Render to stop — we removed the hidden canvas entirely
    if (runner) Runner.stop(runner)
    World.clear(engine.world)
    Engine.clear(engine)
    matterRefs.current = {}
  }

  const initMatter = () => {
    const { Engine, Runner, Bodies, Body, World, Mouse, MouseConstraint, Events } = Matter

    const el = containerRef.current
    const W  = el.offsetWidth
    const H  = el.offsetHeight
    const S  = getCardSize()

    // ✅ Engine only — NO Render.create(). The hidden opacity:0 canvas was
    //    burning GPU draw calls for zero visual output. Removed entirely.
    const engine = Engine.create({ gravity: { y: 1.2 } })
    matterRefs.current.engine = engine

    const wall = (x, y, w, h) =>
      Bodies.rectangle(x, y, w, h, {
        isStatic: true,
        render: { fillStyle: "transparent" },
        friction: 0.5,
      })

    const floor = wall(W / 2, H + 25, 4000, 50)
    const wallL = wall(-25, H / 2, 50, 4000)
    const wallR = wall(W + 25, H / 2, 50, 4000)
    World.add(engine.world, [floor, wallL, wallR])
    matterRefs.current.walls = { floor, wallL, wallR }

    const bodies = SKILLS.map((_, i) => {
      const spreadX = W < 480 ? 60 : 120
      const startX  = W / 2 + (Math.random() - 0.5) * spreadX
      const startY  = -S - (Math.random() * 200) - (i * S * 0.9)

      return Bodies.rectangle(startX, startY, S, S, {
        restitution: 0.55,
        friction:    0.35,
        frictionAir: 0.018,
        angle:       (Math.random() - 0.5) * Math.PI,
        chamfer:     { radius: Math.round(S * 0.15) },
        render:      { fillStyle: "transparent" },
      })
    })
    World.add(engine.world, bodies)
    matterRefs.current.bodies = bodies

    const mouse = Mouse.create(el)
    ;["mousewheel", "DOMMouseScroll"].forEach(e =>
      mouse.element.removeEventListener(e, mouse.mousewheel)
    )
    const mc = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.16, render: { visible: false } },
    })
    World.add(engine.world, mc)

    el.style.cursor = "grab"
    el.addEventListener("mousedown", () => { el.style.cursor = "grabbing" })
    el.addEventListener("mouseup",   () => { el.style.cursor = "grab" })

    // Sync DOM card positions from physics bodies on every engine step
    Events.on(engine, "afterUpdate", () => {
      bodies.forEach((body, i) => {
        const div = cardRefs.current[i]
        if (!div) return
        const { x, y } = body.position
        div.style.transform =
          `translate(-50%,-50%) translate(${x}px,${y}px) rotate(${body.angle}rad)`
      })
    })

    // Runner drives the engine (replaces Render.run which we removed)
    const runner = Runner.create()
    Runner.run(runner, engine)
    matterRefs.current.runner = runner

    // Resize: update wall positions without re-creating the engine
    const onResize = () => {
      if (!containerRef.current) return
      const nW = containerRef.current.offsetWidth
      const nH = containerRef.current.offsetHeight
      const { floor, wallL, wallR } = matterRefs.current.walls || {}
      if (floor) Body.setPosition(floor, { x: nW / 2, y: nH + 25 })
      if (wallL) Body.setPosition(wallL, { x: -25,   y: nH / 2 })
      if (wallR) Body.setPosition(wallR, { x: nW + 25, y: nH / 2 })
    }
    window.addEventListener("resize", onResize)
    matterRefs.current.onResize = onResize
  }

  return (
    <section id="skills" className="relative bg-black overflow-hidden py-20">
      <div className="absolute z-0 top-[-10%] left-[-10%] w-[500px] h-[500px]
                      bg-linear-to-r from-[#135449b4] via-[#0c322b] to-[#101020]
                      animate-pulse blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute z-0 bottom-[-10%] right-[-10%] w-[500px] h-[500px]
                      bg-linear-to-r from-[#135449b4] via-[#0c322b] to-[#101020]
                      animate-pulse blur-[120px] rounded-full pointer-events-none" />

      <div className="px-6 sm:px-10 mx-auto flex flex-col gap-3 items-center justify-center relative z-10">
        <h2 className="text-5xl pb-4 font-bold bg-linear-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] text-transparent bg-clip-text">
          My Skills
        </h2>
        <p className="text-gray-400 text-center">Drag, throw, and watch them bounce. Nothing escapes!</p>
      </div>

      <div
        ref={containerRef}
        className="relative z-10 w-full overflow-hidden max-w-3xl sm:max-w-4xl lg:max-w-6xl mx-auto border-b border-[#43b1b4]"
        style={{ height: "50vh", minHeight: 400 }}
      >
        {/* ✅ canvasWrapRef div removed — hidden Matter Render canvas is gone */}

        {SKILLS.map((skill, i) => {
          const { Icon } = skill
          const isLight = ["#D4A017", "#88CE02"].includes(skill.bg)
          return (
            <div
              key={skill.name}
              ref={el => (cardRefs.current[i] = el)}
              className="absolute top-0 left-0 pointer-events-none select-none
                         flex flex-col items-center justify-center gap-1
                         rounded-2xl shadow-2xl"
              style={{
                width:      cardSize,
                height:     cardSize,
                background: skill.bg,
                color:      isLight ? "#111" : "#fff",
                willChange: "transform",
                transform:  "translate(-50%,-50%) translate(-9999px,-9999px)",
                border:     "1.5px solid rgba(255,255,255,0.15)",
              }}
            >
              <Icon size={cardSize * 0.36} />
              <span
                className="font-bold leading-tight px-1 truncate w-full text-center"
                style={{ fontSize: Math.max(cardSize * 0.115, 9) }}
              >
                {skill.name}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default MySkills
