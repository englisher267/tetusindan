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
    <div className="relative min-h-dvh flex flex-col items-center justify-center px-6 py-16 z-10">
      {/* Background ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '500px',
          background: 'radial-gradient(ellipse, rgba(201,168,76,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="max-w-xl w-full mx-auto text-center">
        {/* Event label */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-6"
        >
          <p className="font-sans-jp text-xs tracking-widest text-gold opacity-70 mb-3">
            なんかモヤモヤする展 — モヤモヤタイプ診断
          </p>
          <div className="ornament-line">
            <span className="text-gold text-xs tracking-widest font-sans-jp opacity-50">MOYAMOYA DIAGNOSIS</span>
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-4"
        >
          <h1
            className="text-4xl sm:text-5xl font-serif-jp font-medium leading-tight text-ivory mb-3"
            style={{ letterSpacing: '0.03em' }}
          >
            あなたの<br />
            <span className="text-gold-light">隠れモヤモヤ度</span><br />
            診断
          </h1>
        </motion.div>

        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-ivory-dim font-serif-jp text-sm sm:text-base leading-relaxed mb-3"
        >
          「なんか嫌な感じ」に、<strong className="text-ivory">名前</strong>をつけてみよう。
        </motion.p>

        <motion.p
          custom={2.5}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-ivory-dim font-sans-jp text-xs leading-relaxed mb-8 opacity-70"
        >
          診断後、あなたのタイプに合った哲学者からメッセージが届きます。
        </motion.p>

        {/* Mood tags */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {moodTags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full font-sans-jp text-xs border"
              style={{
                borderColor: 'rgba(201,168,76,0.2)',
                color: 'rgba(200,192,176,0.65)',
                background: 'rgba(201,168,76,0.04)',
              }}
            >
              #{tag}
            </span>
          ))}
        </motion.div>

        {/* CTA */}
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
            診断スタート
          </button>
        </motion.div>

        <motion.p
          custom={5}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-5 font-sans-jp text-xs text-ivory-dim opacity-40"
        >
          全10問 ／ 約2分
        </motion.p>

        {/* 4 types preview */}
        <motion.div
          custom={6}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-12 grid grid-cols-2 gap-3"
        >
          {[
            { emoji: '📱', name: '承認泥棒型', color: '#e87c7c' },
            { emoji: '🫥', name: 'イエスマン型', color: '#7cb8e8' },
            { emoji: '🌑', name: 'アウトサイダー型', color: '#a87ce8' },
            { emoji: '⚖️', name: 'ジャスティス型', color: '#7ce8b8' },
          ].map((t) => (
            <div
              key={t.name}
              className="card-glass p-3 text-center"
              style={{ borderColor: `${t.color}25` }}
            >
              <span className="text-2xl block mb-1">{t.emoji}</span>
              <p className="font-sans-jp text-xs" style={{ color: t.color }}>{t.name}</p>
            </div>
          ))}
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
          background: 'linear-gradient(to right, rgba(5,8,16,0.97), rgba(15,21,37,0.97), rgba(5,8,16,0.97))',
          borderTop: '1px solid rgba(201,168,76,0.15)',
          padding: '0.65rem 1.5rem',
        }}
      >
        <p className="text-center font-sans-jp text-xs text-ivory-dim">
          <span className="text-gold mr-2">▶</span>
          会場（マルイ）で「答え合わせ」ができます
          <a
            href="https://example.com/event"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 text-gold underline underline-offset-2"
          >
            イベント詳細 →
          </a>
        </p>
      </motion.div>
    </div>
  )
}
