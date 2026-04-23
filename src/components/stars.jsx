import gsap from 'gsap'
import { useMemo, useEffect } from 'react'

const Stars = () => {
  const stars = useMemo(
    () =>
      Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 4 + 3,
        opacity: Math.random() * 0.3 + 0.3,
      })),
    []
  )

  useEffect(() => {
    const ctx = gsap.context(() => {
      stars.forEach((_, i) => {
        gsap.to(`.star-${i}`, {
          x: `random(-60, 60)`,
          y: `random(-60, 60)`,
          duration: `random(1.5, 3)`,
          delay: `random(0, 2)`,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        })
      })
    })
    return () => ctx.revert()
  }, [stars])

  return (
    <div className='absolute inset-0 overflow-hidden pointer-events-none z-0'>
      {stars.map((star) => (
        <div
          key={star.id}
          className={`star-${star.id} absolute bg-white rounded-full`}
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  )
}

export default Stars