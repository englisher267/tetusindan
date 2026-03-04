import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { moyamoyaTypes } from '../data/moyamoyaTypes'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: 'easeOut' },
  }),
}

const moodTags = [
  '既読スルーが怖い',
  'また断れなかった',
  'いいね数が気になる',
  '正論なのに伝わらない',
  'どうせわかってもらえない',
  '合わせすぎて疲れた',
]

export default function TopPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-dvh flex flex-col items-center px-5 py-10 pb-16" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-md w-full mx-auto">

        {/* Header label */}
        <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-6">
          <span
            className="inline-block text-xs font-jp font-bold tracking-widest px-4 py-1.5 rounded-full"
            style={{ background: '#fff0f5', color: '#ff7eb3' }}
          >
            なんかモヤモヤする展 — タイプ診断
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.div custom={1} initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-3">
          <h1 className="font-jp font-black leading-tight" style={{ fontSize: 'clamp(2rem, 8vw, 2.8rem)', color: '#2d2d2d' }}>
            あなたの<br />
            <span style={{ color: '#ff7eb3' }}>モヤモヤタイプ</span>は<br />
            どれ？
          </h1>
        </motion.div>

        <motion.p custom={2} initial="hidden" animate="visible" variants={fadeUp}
          className="text-center font-jp text-sm mb-2"
          style={{ color: '#888' }}
        >
          10問でわかる、あなたのモヤモヤの正体
        </motion.p>

        <motion.p custom={2.5} initial="hidden" animate="visible" variants={fadeUp}
          className="text-center font-jp text-xs mb-7"
          style={{ color: '#bbb' }}
        >
          診断後、あなたのタイプに合った哲学者からメッセージが届きます
        </motion.p>

        {/* Mood tags */}
        <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {moodTags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 rounded-full font-jp text-xs font-medium"
              style={{ background: 'white', color: '#aaa', border: '1.5px solid #f0ece8' }}
            >
              #{tag}
            </span>
          ))}
        </motion.div>

        {/* CTA button */}
        <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-10">
          <button
            className="btn-primary text-lg px-12 py-4"
            onClick={() => navigate('/quiz')}
          >
            🔍 診断スタート
          </button>
          <p className="mt-3 font-jp text-xs" style={{ color: '#bbb' }}>全10問 ／ 約2分</p>
        </motion.div>

        {/* 4 type preview */}
        <motion.div custom={5} initial="hidden" animate="visible" variants={fadeUp}>
          <p className="font-jp text-xs font-bold text-center mb-4" style={{ color: '#aaa', letterSpacing: '0.12em' }}>
            — 4つのタイプ —
          </p>
          <div className="grid grid-cols-2 gap-3">
            {moyamoyaTypes.map((t) => (
              <div
                key={t.id}
                className="type-card"
                style={{ borderColor: t.color + '50' }}
              >
                <img
                  src={t.image}
                  alt={t.shortName}
                  className="w-16 h-16 rounded-full mx-auto mb-2 object-cover"
                  style={{ border: `2.5px solid ${t.color}40` }}
                />
                <p className="font-jp text-xs font-bold" style={{ color: t.color }}>
                  {t.shortName}
                </p>
                <p className="font-jp text-xs mt-0.5" style={{ color: '#aaa', fontSize: '0.7rem' }}>
                  {t.tagline}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Event banner */}
        <motion.div custom={6} initial="hidden" animate="visible" variants={fadeUp}
          className="mt-10 text-center"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-jp"
            style={{ background: 'white', border: '1.5px solid #f0ece8', color: '#888' }}
          >
            <span>🏛️</span>
            <span>会場（マルイ）で「答え合わせ」ができます</span>
            <a
              href="https://example.com/event"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#ff7eb3', fontWeight: 700 }}
            >
              詳細→
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
