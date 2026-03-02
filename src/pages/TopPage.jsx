import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: 'easeOut' },
  }),
}

const philosophers = ['エピクロス', 'アリストテレス', 'ニーチェ', 'ブッダ', 'セネカ', 'フランクル', '孔子', 'ミル']

export default function TopPage() {
  const navigate = useNavigate()

  return (
    <div className="relative min-h-dvh flex flex-col items-center justify-center px-6 py-16 z-10">
      {/* Subtle background glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="max-w-xl w-full mx-auto text-center">
        {/* Logo / tagline */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-8"
        >
          <p className="font-sans-jp text-xs tracking-widest text-gold mb-4 uppercase opacity-80">
            ポッドキャスト『例えば哲学』プレゼンツ
          </p>
          <div className="ornament-line mb-4">
            <span className="text-gold text-xs tracking-widest font-sans-jp opacity-60">PHILOSOPHY MATCHING</span>
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-3xl sm:text-4xl font-serif-jp font-light leading-relaxed text-ivory mb-3 text-shadow-gold"
          style={{ letterSpacing: '0.05em' }}
        >
          あなたの幸せの前提を、
          <br />
          <span className="text-gold-light font-medium">哲学してみよう。</span>
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-ivory-dim font-serif-jp text-sm sm:text-base leading-relaxed mb-10"
        >
          10の問いに答えると、あなたの幸福観に最も近い
          <br className="hidden sm:block" />
          哲学者タイプが診断されます。
        </motion.p>

        {/* Philosopher badges */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {philosophers.map((name) => (
            <span
              key={name}
              className="px-3 py-1 rounded-full font-sans-jp text-xs border"
              style={{
                borderColor: 'rgba(201,168,76,0.25)',
                color: 'rgba(200,192,176,0.7)',
                background: 'rgba(201,168,76,0.05)',
              }}
            >
              {name}
            </span>
          ))}
        </motion.div>

        {/* CTA button */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <button
            className="btn-primary text-base sm:text-lg px-10 py-4"
            onClick={() => navigate('/quiz')}
          >
            診断を始める
          </button>
        </motion.div>

        <motion.p
          custom={5}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-6 font-sans-jp text-xs text-ivory-dim opacity-50"
        >
          所要時間：約3分 ／ 全10問
        </motion.p>

        {/* Bottom nav */}
        <motion.div
          custom={6}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-16 flex justify-center gap-8"
        >
          <a
            href="/types"
            className="font-sans-jp text-xs text-gold opacity-70 hover:opacity-100 transition-opacity tracking-wider"
            onClick={(e) => { e.preventDefault(); navigate('/types') }}
          >
            すべての哲学者タイプ
          </a>
          <span className="text-gold opacity-20">|</span>
          <a
            href="https://open.spotify.com/show/example"
            className="font-sans-jp text-xs text-gold opacity-70 hover:opacity-100 transition-opacity tracking-wider"
            target="_blank"
            rel="noopener noreferrer"
          >
            ポッドキャストを聴く
          </a>
        </motion.div>
      </div>

      {/* Event banner */}
      <motion.div
        custom={7}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="fixed bottom-0 left-0 right-0 z-20"
        style={{
          background: 'linear-gradient(to right, rgba(5,8,16,0.95), rgba(15,21,37,0.95), rgba(5,8,16,0.95))',
          borderTop: '1px solid rgba(201,168,76,0.2)',
          padding: '0.75rem 1.5rem',
        }}
      >
        <p className="text-center font-sans-jp text-xs text-ivory-dim">
          <span className="text-gold mr-2">▶</span>
          リアルイベント開催中！　マルイにて哲学者たちに「会いに行こう」
          <a
            href="https://example.com/event"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 text-gold underline underline-offset-2"
          >
            詳しくはこちら →
          </a>
        </p>
      </motion.div>
    </div>
  )
}
