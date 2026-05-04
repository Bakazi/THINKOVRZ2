'use client'

import { useScroll, useTransform, motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { SmokeCanvas } from './smoke-canvas'

// ─── GIANT INTERACTIVE HOURGLASS ───
function Hourglass({ tilt = 0, side = 'left' }) {
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const glow = hovered ? '#e5c968' : '#c9a84c'

  return (
    <motion.div
      animate={{
        x: side === 'left' ? [0, -22, 8, -14, 0] : [0, 22, -8, 14, 0],
        y: [0, -12, 5, -8, 0],
        rotate: hovered
          ? tilt + (side === 'left' ? -10 : 10)
          : [tilt - 3, tilt + 3, tilt - 3],
      }}
      transition={{
        x: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
        y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
        rotate: hovered ? { duration: 0.3 } : { duration: 6, repeat: Infinity, ease: 'easeInOut' },
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => { setHovered(false); setClicked(false) }}
      onTap={() => { setClicked(true); setTimeout(() => setClicked(false), 600) }}
      className="cursor-pointer select-none flex-shrink-0"
      style={{ width: 'min(20vw, 180px)', height: 'min(34vw, 300px)' }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
    >
      <svg viewBox="0 0 100 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id={`hg-g-${side}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={glow} stopOpacity="1"/>
            <stop offset="40%" stopColor={glow} stopOpacity="0.4"/>
            <stop offset="100%" stopColor={glow} stopOpacity="0.9"/>
          </linearGradient>
          <filter id={`hg-glow-${side}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={hovered ? "7" : "3.5"} result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id={`hg-outer-${side}`} x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation={hovered ? "14" : "7"}/>
          </filter>
        </defs>
        <ellipse cx="50" cy="80" rx="48" ry="78" fill={glow} opacity={hovered ? "0.15" : "0.06"} filter={`url(#hg-outer-${side})`}/>
        <rect x="8" y="4" width="84" height="8" rx="4" fill={glow} opacity="0.95" filter={`url(#hg-glow-${side})`}/>
        <rect x="8" y="148" width="84" height="8" rx="4" fill={glow} opacity="0.95" filter={`url(#hg-glow-${side})`}/>
        <line x1="14" y1="12" x2="50" y2="72" stroke={glow} strokeWidth="2" strokeOpacity="0.8"/>
        <line x1="86" y1="12" x2="50" y2="72" stroke={glow} strokeWidth="2" strokeOpacity="0.8"/>
        <line x1="14" y1="148" x2="50" y2="88" stroke={glow} strokeWidth="2" strokeOpacity="0.8"/>
        <line x1="86" y1="148" x2="50" y2="88" stroke={glow} strokeWidth="2" strokeOpacity="0.8"/>
        <motion.g animate={{ opacity: clicked ? [1, 0.3, 1] : 1 }} transition={{ duration: 0.6 }}>
          <path d="M18 12 Q50 68 50 68 Q50 68 82 12 Z" fill={`url(#hg-g-${side})`} opacity="0.3"/>
          <path d="M18 12 Q50 50 50 50 Q50 50 82 12 Z" fill={glow} opacity="0.18"/>
        </motion.g>
        <path d="M16 148 Q50 92 50 92 Q50 92 84 148 Z" fill={glow} opacity={hovered ? "0.55" : "0.4"}/>
        <path d="M22 148 Q50 105 50 105 Q50 105 78 148 Z" fill={glow} opacity="0.25"/>
        <motion.line x1="50" y1="72" x2="50" y2="88" stroke={glow} strokeWidth="2.5" strokeLinecap="round"
          animate={{ opacity: [1, 0.1, 1] }} transition={{ duration: 1.2, repeat: Infinity }}/>
        <motion.circle cx="50" cy="80" r="3.5" fill={glow} filter={`url(#hg-glow-${side})`}
          animate={{ opacity: [0.8, 1, 0.8], r: [3.5, 4.5, 3.5] }} transition={{ duration: 2, repeat: Infinity }}/>
        {clicked && (
          <motion.circle cx="50" cy="80" r="10" stroke={glow} strokeWidth="1.5" fill="none"
            initial={{ r: 10, opacity: 0.9 }} animate={{ r: 55, opacity: 0 }} transition={{ duration: 0.6 }}/>
        )}
        <rect x="6" y="2" width="88" height="156" rx="5" stroke={glow} strokeWidth="1" strokeOpacity={hovered ? "0.6" : "0.3"} fill="none"/>
      </svg>
    </motion.div>
  )
}

// ─── ELECTRIC SCROLL ARROW ───
function ScrollArrow() {
  return (
    <motion.div
      className="flex flex-col items-center gap-0 mt-14 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
    >
      <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-[#e5c968] mb-4"
        style={{ textShadow: '0 0 20px rgba(229,201,104,0.9), 0 0 40px rgba(201,168,76,0.6)' }}>
        Continue
      </span>
      {[0, 1, 2].map(i => (
        <motion.svg key={i} width="40" height="22" viewBox="0 0 40 22"
          animate={{ opacity: [0.4, 1, 0.4], y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.28, ease: 'easeInOut' }}
        >
          <defs>
            <filter id={`cglow-${i}`}>
              <feGaussianBlur stdDeviation="3" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          <polyline points="4,4 20,18 36,4" fill="none" stroke="#e5c968" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round" filter={`url(#cglow-${i})`}
            style={{ filter: 'drop-shadow(0 0 6px #e5c968) drop-shadow(0 0 12px #c9a84c)' }}
          />
        </motion.svg>
      ))}
      <span className="font-serif italic text-[12px] text-[#e5c968]/70 mt-3"
        style={{ textShadow: '0 0 15px rgba(229,201,104,0.5)' }}>
        Keep going — the engine stirs below.
      </span>
    </motion.div>
  )
}

// ─── ABSTRACT TILE ───
function AbstractTile({ index, scale, style }) {
  const patterns = [
    <svg key="dots" viewBox="0 0 200 200" className="w-full h-full">
      <rect width="200" height="200" fill="#0a0a0b"/>
      {Array.from({ length: 8 }).map((_, r) => Array.from({ length: 8 }).map((_, c) => (
        <circle key={`${r}-${c}`} cx={12 + c * 26} cy={12 + r * 26} r={2 + Math.sin(r + c) * 1.5}
          fill="#c9a84c" opacity={0.3 + Math.abs(Math.sin(r * c)) * 0.6}/>
      )))}
    </svg>,
    <svg key="diamonds" viewBox="0 0 200 200" className="w-full h-full">
      <rect width="200" height="200" fill="#080808"/>
      {[80, 60, 40, 22].map((r, i) => (
        <polygon key={i} points={`100,${100-r} ${100+r},100 100,${100+r} ${100-r},100`}
          fill="none" stroke="#c9a84c" strokeWidth="1" opacity={0.15 + i * 0.18}/>
      ))}
      <polygon points="100,40 160,100 100,160 40,100" fill="#c9a84c" opacity="0.06"/>
      <text x="100" y="107" textAnchor="middle" fontFamily="serif" fontSize="22" fill="#c9a84c" opacity="0.5">◆</text>
    </svg>,
    <svg key="grid" viewBox="0 0 200 200" className="w-full h-full">
      <rect width="200" height="200" fill="#070709"/>
      {Array.from({ length: 14 }).map((_, i) => (
        <line key={`h${i}`} x1="0" y1={7 + i * 14} x2="200" y2={7 + i * 14} stroke="#c9a84c" strokeWidth="0.4" opacity="0.3"/>
      ))}
      {Array.from({ length: 14 }).map((_, i) => (
        <line key={`v${i}`} x1={7 + i * 14} y1="0" x2={7 + i * 14} y2="200" stroke="#c9a84c" strokeWidth="0.4" opacity="0.3"/>
      ))}
      <circle cx="100" cy="100" r="50" fill="none" stroke="#c9a84c" strokeWidth="1" opacity="0.35"/>
      <circle cx="100" cy="100" r="25" fill="#c9a84c" opacity="0.07"/>
    </svg>,
    <svg key="hex" viewBox="0 0 200 200" className="w-full h-full">
      <rect width="200" height="200" fill="#090909"/>
      {[[100,70],[100,130],[70,100],[130,100]].map(([cx,cy],i) => (
        <polygon key={i} points={`${cx},${cy-28} ${cx+24},${cy-14} ${cx+24},${cy+14} ${cx},${cy+28} ${cx-24},${cy+14} ${cx-24},${cy-14}`}
          fill="none" stroke="#c9a84c" strokeWidth="0.8" opacity={0.15 + i * 0.1}/>
      ))}
      <text x="100" y="107" textAnchor="middle" fontFamily="serif" fontSize="24" fill="#c9a84c" opacity="0.4">⬡</text>
    </svg>,
    <svg key="clock" viewBox="0 0 200 200" className="w-full h-full">
      <rect width="200" height="200" fill="#080810"/>
      <circle cx="100" cy="100" r="82" fill="none" stroke="#c9a84c" strokeWidth="0.7" opacity="0.35"/>
      <circle cx="100" cy="100" r="72" fill="none" stroke="#c9a84c" strokeWidth="0.3" opacity="0.15"/>
      {['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'].map((n, i) => {
        const a = (i * 30 - 90) * Math.PI / 180
        return <text key={n} x={100 + 62*Math.cos(a)} y={104 + 62*Math.sin(a)} textAnchor="middle" fontFamily="serif" fontSize="9" fill="#c9a84c" opacity="0.6">{n}</text>
      })}
      <line x1="100" y1="100" x2="100" y2="36" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" opacity="0.75"/>
      <line x1="100" y1="100" x2="146" y2="100" stroke="#c9a84c" strokeWidth="1" strokeLinecap="round" opacity="0.55"/>
      <circle cx="100" cy="100" r="3.5" fill="#c9a84c"/>
    </svg>,
    <svg key="spiral" viewBox="0 0 200 200" className="w-full h-full">
      <rect width="200" height="200" fill="#060608"/>
      <path d={Array.from({length: 220}, (_,i) => {
        const a = i * 0.2, r = i * 0.36
        const x = 100 + r * Math.cos(a), y = 100 + r * Math.sin(a)
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
      }).join(' ')} fill="none" stroke="#c9a84c" strokeWidth="0.9" opacity="0.4"/>
      <circle cx="100" cy="100" r="3.5" fill="#c9a84c" opacity="0.8"/>
    </svg>,
    <svg key="constellation" viewBox="0 0 200 200" className="w-full h-full">
      <rect width="200" height="200" fill="#050508"/>
      {[[40,60],[80,30],[130,50],[160,90],[140,140],[90,160],[50,130],[20,100],[100,100],[70,80],[110,70],[130,110]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r={i === 8 ? 3.5 : 1.8} fill="#c9a84c" opacity={i === 8 ? 0.9 : 0.5}/>
      ))}
      {[[40,60,80,30],[80,30,130,50],[130,50,160,90],[160,90,140,140],[140,140,90,160],[90,160,50,130],[50,130,20,100],[20,100,40,60],[80,30,100,100],[130,50,100,100],[100,100,70,80],[100,100,130,110]].map(([x1,y1,x2,y2],i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#c9a84c" strokeWidth="0.5" opacity="0.25"/>
      ))}
    </svg>,
  ]

  return (
    <motion.div style={{ scale, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 20 }}>
      <motion.div
        className="relative overflow-hidden"
        style={{
          ...style,
          boxShadow: '0 0 60px -15px rgba(201,168,76,0.45), 0 0 120px -30px rgba(201,168,76,0.2)',
          border: '1px solid rgba(201,168,76,0.35)',
        }}
        whileHover={{ boxShadow: '0 0 80px -8px rgba(201,168,76,0.8), 0 0 160px -20px rgba(201,168,76,0.4)' }}
      >
        {patterns[index % patterns.length]}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b]/50 via-transparent to-[#0a0a0b]/20 pointer-events-none"/>
      </motion.div>
    </motion.div>
  )
}

export function ZoomParallax({ images }) {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  })

  const scales = [
    useTransform(scrollYProgress, [0, 1], [1, 4]),
    useTransform(scrollYProgress, [0, 1], [1, 5.5]),
    useTransform(scrollYProgress, [0, 1], [1, 6]),
    useTransform(scrollYProgress, [0, 1], [1, 5]),
    useTransform(scrollYProgress, [0, 1], [1, 7]),
    useTransform(scrollYProgress, [0, 1], [1, 8]),
    useTransform(scrollYProgress, [0, 1], [1, 6.5]),
  ]

  const opacityCaption = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const smokeOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.2])
  const bridgeOpacity = useTransform(scrollYProgress, [0.55, 0.8], [0, 1])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  useEffect(() => {
    const handle = (e) => {
      mouseX.set((e.clientX - window.innerWidth / 2) / (window.innerWidth / 2) * 14)
      mouseY.set((e.clientY - window.innerHeight / 2) / (window.innerHeight / 2) * 10)
    }
    window.addEventListener('mousemove', handle)
    return () => window.removeEventListener('mousemove', handle)
  }, [mouseX, mouseY])

  // Tile layout — spread more toward bottom half, wider spread
  const tileStyles = [
    { width: '22vw', height: '28vh', top: '8vh',  left: '-28vw' },  // top-left
    { width: '26vw', height: '22vh', top: '5vh',  left: '10vw'  },  // top-center
    { width: '20vw', height: '26vh', top: '10vh', left: '30vw'  },  // top-right
    { width: '24vw', height: '30vh', top: '45vh', left: '-30vw' },  // bottom-left — pushed way down
    { width: '22vw', height: '28vh', top: '50vh', left: '-5vw'  },  // bottom-center-left
    { width: '26vw', height: '24vh', top: '48vh', left: '18vw'  },  // bottom-center-right
    { width: '20vw', height: '30vh', top: '44vh', left: '34vw'  },  // bottom-right
  ]

  return (
    <div ref={container} className="relative h-[300vh] bg-[#0a0a0b]">
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* SMOKE */}
        <motion.div style={{ opacity: smokeOpacity }} className="absolute inset-0 z-10">
          <SmokeCanvas />
        </motion.div>

        {/* ABSTRACT TILES — spread top and bottom */}
        {tileStyles.map((style, i) => (
          <AbstractTile key={i} index={i} scale={scales[i]} style={style} />
        ))}

        {/* BRIDGE — fades to black to eliminate dead dark space */}
        <motion.div
          className="absolute inset-0 z-40 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, #0a0a0b 55%, #0a0a0b 100%)',
            opacity: bridgeOpacity,
          }}
        />

        {/* CAPTION + HOURGLASSES */}
        <motion.div
          style={{ opacity: opacityCaption, x: springX, y: springY }}
          className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
        >
          <div className="text-center px-4 w-full max-w-6xl mx-auto">
            <div className="font-mono text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-[#c9a84c] mb-8"
              style={{ textShadow: '0 0 20px rgba(201,168,76,0.5)' }}>
              ⬡ The Parameters We Respect
            </div>

            <div className="flex items-center justify-center gap-6 md:gap-12 pointer-events-auto">
              <Hourglass tilt={-18} side="left" />

              <div className="flex-shrink-0 max-w-lg">
                <h2 className="font-display font-light text-3xl md:text-5xl lg:text-6xl leading-[1.0] text-[#f0e8d4]"
                  style={{ textShadow: '0 0 60px rgba(201,168,76,0.2)' }}>
                  Capital. Time. Skill.
                </h2>
                <motion.em
                  className="block font-serif text-xl md:text-3xl lg:text-4xl mt-3"
                  animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  style={{
                    background: 'linear-gradient(90deg, #e5c968, #c9a84c, #b87333, #c9a84c, #e5c968)',
                    backgroundSize: '200% 100%',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Geography. Fear.
                </motion.em>
                <p className="font-serif italic text-sm md:text-base text-[#f0e8d4]/60 mt-4">
                  Your five real constraints. Our single deliverable.
                </p>
                <ScrollArrow />
              </div>

              <Hourglass tilt={18} side="right" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ZoomParallax
