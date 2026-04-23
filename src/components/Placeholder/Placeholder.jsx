import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const STEPS = [
  { type: 'cmd', text: 'git init && git add .' },
  { type: 'cmd', text: 'git commit -m "chore: tailwindcss"' },
  { type: 'cmd', text: 'npm i && npm run dev' },
  { type: 'status', text: 'compiling...' },
  { type: 'check', text: 'types ok · ✓ lint ok · ✓ built in 1.23s' },
  { type: 'ready', text: 'localhost:5173 — ready' },
]

const CODE_LINE = 'const app = init(skills)=>{ return skills.map(s) && deploy(s) }'

export default function Placeholder({ onComplete }) {
  const wrapRef   = useRef(null)
  const canvasRef = useRef(null)
  const rowRefs   = useRef([])
  const codeRef   = useRef(null)
  const tlRef     = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')

    let resizeTimer = null
    const resize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        canvas.width  = window.innerWidth
        canvas.height = window.innerHeight
      }, 150)
    }
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight
    window.addEventListener('resize', resize)

    const cols  = Math.floor(canvas.width / 18)
    const drops = Array.from({ length: cols }, () => Math.random() * -canvas.height / 3)

    let frame = 0
    const draw = () => {
      frame++
      if (frame % 2 !== 0) return  

      ctx.fillStyle = 'rgba(8,8,16,0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.font = '14px monospace'

      for (let i = 0; i < drops.length; i++) {
        const bright = Math.random() > 0.95
        ctx.fillStyle = bright ? '#4ade80' : '#1c3a28'
        ctx.fillText(Math.random() > 0.5 ? '1' : '0', i * 18, drops[i] * 18)
        if (drops[i] * 18 > canvas.height && Math.random() > 0.97) drops[i] = 0
        drops[i] += 0.3
      }
    }

    const rafId = { id: null }
    const loop  = () => { draw(); rafId.id = requestAnimationFrame(loop) }
    loop()

    return () => {
      cancelAnimationFrame(rafId.id)
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', resize)
    }
  }, [])


  useEffect(() => {
    rowRefs.current.forEach(el => el && gsap.set(el, { opacity: 0 }))
    gsap.set(codeRef.current, { opacity: 0, y: 16 })

    const tl = gsap.timeline()
    tlRef.current = tl

    STEPS.forEach((step, i) => {
      const el = rowRefs.current[i]
      if (!el) return

      tl.to(el, { opacity: 1, duration: 0.08 }, '+=0.22')

      if (step.type === 'cmd') {
        const textEl = el.querySelector('.t-txt')
        tl.to(textEl, {
          duration: step.text.length * 0.024,
          text: { value: step.text, delimiter: '' },
          ease: 'none',
        })
      }
    })

    tl.to(codeRef.current, {
      opacity: 1, y: 0,
      duration: 0.5,
      ease: 'power2.out',
    }, '+=0.4')

    tl.to(wrapRef.current, {
      clipPath: 'ellipse(70% 0% at 50% 0%)',
      duration: 0.9,
      ease: 'expo.inOut',
      onComplete,
    }, '+=0.6')

    return () => tl.kill()
  }, [onComplete])

  return (
    <div
      ref={wrapRef}
      style={{ clipPath: 'ellipse(70% 150% at 50% 0%)' }}
      className="fixed inset-0 z-9999 bg-[#080810] overflow-hidden flex flex-col items-center justify-center"
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      <div className="relative z-10 bg-[rgba(8,8,20,0.80)] border border-[rgba(80,220,160,0.13)] rounded-lg px-8 py-5 w-[480px]">
        <p className="text-[#4af] text-[13px] font-mono mb-2 tracking-wide">~/workspace</p>

        {[0, 1, 2].map(i => (
          <div
            key={i}
            ref={el => (rowRefs.current[i] = el)}
            className="font-mono text-[13px] leading-[1.9]"
          >
            <span className="text-emerald-400 select-none">$ </span>
            <span className="t-txt text-[#dde0e8]" />
          </div>
        ))}

        <div
          ref={el => (rowRefs.current[3] = el)}
          className="font-mono text-[13px] leading-[1.9] text-[#6b7280] flex items-center gap-2"
        >
          <span
            className="inline-block"
            style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}
          >
            ⏳
          </span>
          compiling...
        </div>

        <div
          ref={el => (rowRefs.current[4] = el)}
          className="font-mono text-[13px] leading-[1.9] text-emerald-400"
        >
          ✓ types ok · ✓ lint ok · ✓ built in 1.23s
        </div>

        <div
          ref={el => (rowRefs.current[5] = el)}
          className="font-mono text-[13px] leading-[1.9]"
        >
          <span className="text-[#475569]">localhost:5173</span>
          <span className="text-[#38bdf8]"> — ready</span>
        </div>
      </div>

      <div
        ref={codeRef}
        className="relative z-10 mt-5 font-mono text-[13px] text-sky-300 px-4"
      >
        {CODE_LINE}
      </div>
    </div>
  )
}
