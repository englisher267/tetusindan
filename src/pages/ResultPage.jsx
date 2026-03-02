import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useRef, useCallback } from 'react'
import html2canvas from 'html2canvas'
import { philosophers, getPhilosopherById } from '../data/philosophers'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: 'easeOut' },
  }),
}

export default function ResultPage() {
  const { philosopherId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const cardRef = useRef(null)

  const philosopher = getPhilosopherById(philosopherId)
  const secondary = location.state?.secondary
  const secondaryPhilosopher = secondary ? getPhilosopherById(secondary) : null
  const compatible = getPhilosopherById(philosopher?.compatible)
  const opposite = getPhilosopherById(philosopher?.opposite)

  if (!philosopher) {
    return (
      <div className="min-h-dvh flex items-center justify-center text-ivory">
        <div className="text-center">
          <p className="mb-4">診断結果が見つかりませんでした。</p>
          <button className="btn-primary" onClick={() => navigate('/')}>トップへ戻る</button>
        </div>
      </div>
    )
  }

  const shareText = `私の幸福観は【${philosopher.name}型】でした${philosopher.emoji}\n「${philosopher.tagline}」\nあなたも哲学してみない？\n#例えば哲学 #幸せ観診断 #哲学者マッチング`

  const handleXShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent('https://philosophy-matching.vercel.app')}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#050810',
        scale: 2,
        useCORS: true,
        logging: false,
      })
      const link = document.createElement('a')
      link.download = `philosophy-${philosopher.id}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (e) {
      console.error('Screenshot failed', e)
    }
  }, [philosopher.id])

  return (
    <div className="relative min-h-dvh z-10 pb-24">
      <div className="max-w-xl mx-auto px-6 pt-10">
        {/* Header */}
        <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-8">
          <p className="font-sans-jp text-xs tracking-widest text-gold opacity-70 mb-2 uppercase">
            診断結果
          </p>
          <div className="ornament-line">
            <span className="text-gold text-xs opacity-50">RESULT</span>
          </div>
        </motion.div>

        {/* Share card (ref for html2canvas) */}
        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          ref={cardRef}
          className="share-card mb-8"
        >
          {/* Philosopher icon */}
          <div className="philosopher-icon mb-4" style={{ borderColor: `${philosopher.color}60` }}>
            <span>{philosopher.emoji}</span>
          </div>

          {/* Type label */}
          <p className="font-sans-jp text-xs tracking-widest mb-2" style={{ color: philosopher.color }}>
            あなたは
          </p>
          <h1 className="text-3xl sm:text-4xl font-serif-jp font-medium text-ivory mb-1" style={{ letterSpacing: '0.05em' }}>
            {philosopher.name}
          </h1>
          <p className="font-sans-jp text-sm text-ivory-dim opacity-60 mb-3">
            {philosopher.nameEn} / {philosopher.era}
          </p>

          <div className="ornament-line mb-4">
            <span className="font-serif-jp text-xs" style={{ color: philosopher.color }}>
              {philosopher.type}
            </span>
          </div>

          <p className="font-serif-jp text-sm text-gold-light italic leading-relaxed px-4">
            {philosopher.tagline}
          </p>

          {/* Branding */}
          <p className="mt-4 font-sans-jp text-xs text-ivory-dim opacity-30">
            #例えば哲学 #幸せ観診断
          </p>
        </motion.div>

        {/* Quote */}
        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="card-glass p-5 mb-6"
        >
          <p className="font-serif-jp text-sm text-gold-light italic leading-relaxed text-center">
            {philosopher.quote}
          </p>
        </motion.div>

        {/* Description */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-6"
        >
          <h2 className="font-serif-jp text-base text-gold mb-3">
            あなたの幸福観
          </h2>
          <p className="font-serif-jp text-sm text-ivory-dim leading-loose whitespace-pre-line">
            {philosopher.description}
          </p>
        </motion.div>

        {/* Characteristics */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-6"
        >
          <h2 className="font-serif-jp text-base text-gold mb-3">キーワード</h2>
          <div className="flex flex-wrap gap-2">
            {philosopher.characteristics.map(c => (
              <span
                key={c}
                className="px-3 py-1 rounded-full font-sans-jp text-xs border"
                style={{
                  borderColor: `${philosopher.color}50`,
                  color: philosopher.color,
                  background: `${philosopher.color}12`,
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Secondary type */}
        {secondaryPhilosopher && (
          <motion.div
            custom={5}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="card-glass p-4 mb-6"
          >
            <p className="font-sans-jp text-xs text-ivory-dim opacity-60 mb-2">サブタイプ</p>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{secondaryPhilosopher.emoji}</span>
              <div>
                <p className="font-serif-jp text-sm text-ivory">{secondaryPhilosopher.name}型の側面も</p>
                <p className="font-sans-jp text-xs text-ivory-dim opacity-50">{secondaryPhilosopher.type}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Compatible / Opposite */}
        <motion.div
          custom={6}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="grid grid-cols-2 gap-4 mb-8"
        >
          {compatible && (
            <div className="card-glass p-4 text-center">
              <p className="font-sans-jp text-xs text-gold opacity-60 mb-2">相性の良いタイプ</p>
              <span className="text-2xl block mb-1">{compatible.emoji}</span>
              <p className="font-serif-jp text-sm text-ivory">{compatible.name}</p>
            </div>
          )}
          {opposite && (
            <div className="card-glass p-4 text-center">
              <p className="font-sans-jp text-xs text-ivory-dim opacity-50 mb-2">対極のタイプ</p>
              <span className="text-2xl block mb-1">{opposite.emoji}</span>
              <p className="font-serif-jp text-sm text-ivory">{opposite.name}</p>
            </div>
          )}
        </motion.div>

        {/* Links */}
        <motion.div
          custom={7}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-col gap-3 mb-8"
        >
          <a
            href={philosopher.podcastUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="card-glass flex items-center gap-3 px-5 py-4 hover:border-gold transition-colors"
            style={{ borderColor: 'rgba(201,168,76,0.25)', textDecoration: 'none' }}
          >
            <span className="text-xl">🎙️</span>
            <div>
              <p className="font-serif-jp text-sm text-ivory">この哲学者の回を聴く</p>
              <p className="font-sans-jp text-xs text-gold opacity-70">{philosopher.podcastEpisode}</p>
            </div>
            <span className="ml-auto text-gold opacity-50">→</span>
          </a>

          <a
            href="https://example.com/event"
            target="_blank"
            rel="noopener noreferrer"
            className="card-glass flex items-center gap-3 px-5 py-4 hover:border-gold transition-colors"
            style={{ borderColor: 'rgba(201,168,76,0.25)', textDecoration: 'none' }}
          >
            <span className="text-xl">🏛️</span>
            <div>
              <p className="font-serif-jp text-sm text-ivory">この哲学者に会いに行く</p>
              <p className="font-sans-jp text-xs text-gold opacity-70">マルイ開催リアルイベント</p>
            </div>
            <span className="ml-auto text-gold opacity-50">→</span>
          </a>
        </motion.div>

        {/* Share buttons */}
        <motion.div
          custom={8}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-10"
        >
          <h2 className="font-serif-jp text-base text-gold mb-4 text-center">結果をシェアする</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleXShare}
              className="btn-primary flex-1 text-sm py-3 flex items-center justify-center gap-2"
            >
              <span>𝕏</span>
              <span>Xでシェア</span>
            </button>
            <button
              onClick={handleDownload}
              className="btn-outline flex-1 text-sm py-3 flex items-center justify-center gap-2"
            >
              <span>⬇</span>
              <span>画像を保存</span>
            </button>
          </div>
          <p className="font-sans-jp text-xs text-ivory-dim opacity-40 text-center mt-3">
            #例えば哲学 #幸せ観診断
          </p>
        </motion.div>

        {/* Navigation */}
        <motion.div
          custom={9}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-col sm:flex-row gap-3"
        >
          <button
            className="btn-outline flex-1 text-sm"
            onClick={() => navigate('/quiz')}
          >
            もう一度診断する
          </button>
          <button
            className="btn-outline flex-1 text-sm"
            onClick={() => navigate('/types')}
          >
            全タイプを見る
          </button>
        </motion.div>
      </div>
    </div>
  )
}
