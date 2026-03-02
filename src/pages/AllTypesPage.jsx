import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { philosophers } from '../data/philosophers'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' },
  }),
}

export default function AllTypesPage() {
  const navigate = useNavigate()

  return (
    <div className="relative min-h-dvh z-10 pb-16">
      <div className="max-w-2xl mx-auto px-6 pt-10">
        {/* Header */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center mb-10"
        >
          <button
            onClick={() => navigate(-1)}
            className="font-sans-jp text-xs text-ivory-dim opacity-60 hover:opacity-100 transition-opacity mb-6 block mx-auto"
          >
            ← 戻る
          </button>
          <p className="font-sans-jp text-xs tracking-widest text-gold opacity-70 mb-3 uppercase">
            All Types
          </p>
          <h1 className="text-2xl sm:text-3xl font-serif-jp text-ivory mb-3" style={{ letterSpacing: '0.05em' }}>
            8つの哲学者タイプ
          </h1>
          <div className="ornament-line">
            <span className="font-sans-jp text-xs text-ivory-dim opacity-40">
              あなたはどのタイプ？
            </span>
          </div>
        </motion.div>

        {/* Philosopher grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {philosophers.map((philosopher, index) => (
            <motion.button
              key={philosopher.id}
              custom={index + 1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              onClick={() => navigate(`/result/${philosopher.id}`)}
              className="card-glass text-left p-5 w-full cursor-pointer group"
              style={{ transition: 'all 0.25s ease' }}
              whileHover={{
                borderColor: `${philosopher.color}60`,
                boxShadow: `0 0 20px ${philosopher.color}18`,
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
                  style={{
                    background: `${philosopher.color}18`,
                    border: `1px solid ${philosopher.color}40`,
                  }}
                >
                  {philosopher.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="font-sans-jp text-xs tracking-wider mb-1"
                    style={{ color: philosopher.color }}
                  >
                    {philosopher.type}
                  </p>
                  <h2 className="font-serif-jp text-base text-ivory mb-1">
                    {philosopher.name}
                  </h2>
                  <p className="font-sans-jp text-xs text-ivory-dim opacity-50 mb-2">
                    {philosopher.nameEn}
                  </p>
                  <p className="font-serif-jp text-xs text-ivory-dim opacity-70 leading-relaxed line-clamp-2">
                    {philosopher.happiness}
                  </p>
                </div>
              </div>

              {/* Characteristics preview */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {philosopher.characteristics.slice(0, 2).map(c => (
                  <span
                    key={c}
                    className="px-2 py-0.5 rounded-full font-sans-jp text-xs"
                    style={{
                      borderColor: `${philosopher.color}40`,
                      border: `1px solid ${philosopher.color}40`,
                      color: `${philosopher.color}cc`,
                      background: `${philosopher.color}10`,
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>

              <p
                className="mt-3 font-sans-jp text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: philosopher.color }}
              >
                詳しく見る →
              </p>
            </motion.button>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          custom={philosophers.length + 1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center"
        >
          <p className="font-serif-jp text-sm text-ivory-dim opacity-60 mb-5">
            あなたはどのタイプでしょうか？
          </p>
          <button
            className="btn-primary"
            onClick={() => navigate('/quiz')}
          >
            診断を始める
          </button>
        </motion.div>
      </div>
    </div>
  )
}
