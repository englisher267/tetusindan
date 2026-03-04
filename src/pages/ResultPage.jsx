import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { getMoyamoyaTypeById } from '../data/moyamoyaTypes'

export default function ResultPage() {
  const { typeId } = useParams()
  const navigate = useNavigate()

  const type = getMoyamoyaTypeById(typeId)

  // phases: 'loading' → 'notify' → 'revealed'
  const [phase, setPhase] = useState('loading')
  const [showMosaicPopup, setShowMosaicPopup] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('notify'), 1400)
    const t2 = setTimeout(() => setPhase('revealed'), 3000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (!type) {
    return (
      <div className="min-h-dvh flex items-center justify-center" style={{ background: 'var(--color-bg)' }}>
        <div className="text-center px-6">
          <p className="font-jp mb-5" style={{ color: '#888' }}>診断結果が見つかりませんでした。</p>
          <button className="btn-primary" onClick={() => navigate('/')}>トップへ戻る</button>
        </div>
      </div>
    )
  }

  const shareText = `私のモヤモヤタイプは【${type.shortName}】でした${type.emoji}\n「${type.tagline}」\n哲学者からメッセージが届く診断、やってみて。\n#モヤモヤ診断 #なんかモヤモヤする展`

  const handleXShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent('https://tetusindan.vercel.app')}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="relative min-h-dvh" style={{ background: 'var(--color-bg)' }}>

      {/* ── Loading overlay ── */}
      <AnimatePresence>
        {phase === 'loading' && (
          <motion.div
            key="loading"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center"
            style={{ background: 'white' }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { delay: 0.2, duration: 0.5 } }}
              className="text-center"
            >
              <div className="text-5xl mb-6">{type.emoji}</div>
              <p className="font-jp text-sm mb-6" style={{ color: '#888' }}>診断中…</p>
              <div className="flex gap-3 justify-center">
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    className="loading-dot"
                    style={{
                      background: type.color,
                      animationDelay: `${i * 0.18}s`,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Type notification ── */}
      <AnimatePresence>
        {phase === 'notify' && (
          <motion.div
            key="notify"
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.95)' }}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { type: 'spring', damping: 16, stiffness: 240 } }}
              exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.4 } }}
              className="text-center px-8"
            >
              <motion.div
                animate={{ scale: [1, 1.08, 1], transition: { repeat: Infinity, duration: 1.5 } }}
                className="text-6xl mb-4"
              >
                {type.emoji}
              </motion.div>
              <p className="font-jp text-xs font-bold mb-2" style={{ color: '#bbb', letterSpacing: '0.1em' }}>
                診断結果
              </p>
              <p className="font-jp font-black text-2xl mb-1" style={{ color: type.color }}>
                {type.shortName}
              </p>
              <p className="font-jp text-sm" style={{ color: '#888' }}>
                {type.tagline}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main result content ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'revealed' ? 1 : 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-md mx-auto px-5 pt-8 pb-28"
      >

        {/* Header */}
        <div className="text-center mb-6">
          <span
            className="inline-block font-jp text-xs font-bold tracking-widest px-4 py-1.5 rounded-full mb-3"
            style={{ background: '#f5f5f5', color: '#aaa' }}
          >
            MOYAMOYA DIAGNOSIS
          </span>
          <p className="font-jp text-xs" style={{ color: '#bbb' }}>診断結果</p>
        </div>

        {/* Result hero card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: phase === 'revealed' ? 1 : 0, y: phase === 'revealed' ? 0 : 20 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="result-hero-card mb-5"
          style={{ borderColor: type.color + '60' }}
        >
          {/* Badge */}
          <div
            className="result-type-badge font-jp"
            style={{ background: type.colorLight, color: type.color }}
          >
            モヤモヤタイプ診断
          </div>

          {/* Character image — large and prominent */}
          <div className="mb-4">
            <img
              src={type.image}
              alt={type.name}
              className="result-character-img"
              style={{ border: `4px solid ${type.color}40` }}
            />
          </div>

          {/* Type name */}
          <h1
            className="font-jp font-black text-2xl mb-2 leading-tight"
            style={{ color: type.color }}
          >
            {type.name}
          </h1>

          {/* Tagline */}
          <p className="font-jp text-sm mb-4" style={{ color: '#888' }}>
            「{type.tagline}」
          </p>

          {/* Characteristics */}
          <div className="flex flex-wrap gap-2 justify-center">
            {type.characteristics.map(c => (
              <span
                key={c}
                className="tag-pill font-jp"
                style={{
                  background: type.colorLight,
                  color: type.color,
                }}
              >
                {c}
              </span>
            ))}
          </div>

          {/* Hashtag */}
          <p className="font-jp text-xs mt-4" style={{ color: '#ccc' }}>
            #モヤモヤ診断 #なんかモヤモヤする展
          </p>
        </motion.div>

        {/* 哲学的な病名 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: phase === 'revealed' ? 1 : 0, y: phase === 'revealed' ? 0 : 16 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="card mb-4 p-4 text-center"
          style={{ borderColor: type.color + '30' }}
        >
          <p className="font-jp text-xs mb-1" style={{ color: '#aaa', letterSpacing: '0.1em' }}>
            哲学的な病名
          </p>
          <p className="font-jp font-bold text-base" style={{ color: type.color }}>
            {type.diseaseName}
          </p>
        </motion.div>

        {/* Philosopher DM section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: phase === 'revealed' ? 1 : 0, y: phase === 'revealed' ? 0 : 20 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="mb-5"
        >
          <div className="ornament-line mb-4">
            <span className="font-jp text-xs" style={{ color: '#bbb', whiteSpace: 'nowrap' }}>
              哲学者からのメッセージ
            </span>
          </div>

          <div className="dm-card">
            {/* DM header */}
            <div className="dm-card-header">
              <div className="dm-avatar" style={{ background: type.colorDim, borderColor: type.color + '80' }}>
                <span>{type.emoji}</span>
              </div>
              <div>
                <p className="font-jp text-sm font-bold" style={{ color: 'white' }}>{type.dmFrom}</p>
                <p className="font-jp text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>哲学者 ✓ · 今</p>
              </div>
              <div
                className="dm-badge font-jp"
                style={{ color: type.color, borderColor: type.color + '60' }}
              >
                DM
              </div>
            </div>

            {/* DM body */}
            <div className="dm-card-body">
              <p className="font-jp text-sm leading-loose whitespace-pre-line" style={{ color: 'rgba(255,255,255,0.75)' }}>
                {type.teaser}
              </p>

              {/* Mosaic (locked content) */}
              <div className="mosaic-wrap mt-3" onClick={() => setShowMosaicPopup(true)}>
                <p className="mosaic-text">{type.teaserMasked}</p>
                <div className="mosaic-overlay">
                  <span className="mosaic-tap-hint font-jp">タップして確認</span>
                </div>
              </div>

              <p className="font-jp text-xs mt-3" style={{ color: 'rgba(255,255,255,0.2)' }}>
                パネル #{type.panelNumber} またはフルレポートで公開
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: phase === 'revealed' ? 1 : 0, y: phase === 'revealed' ? 0 : 20 }}
          transition={{ delay: 0.75, duration: 0.5 }}
          className="flex flex-col gap-3 mb-5"
        >
          <a
            href="https://example.com/event"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-center text-sm py-4 flex items-center justify-center gap-2"
            style={{ textDecoration: 'none' }}
          >
            <span>🏛️</span>
            <span>会場（マルイ）で答え合わせをする</span>
          </a>
          <a
            href="https://example.com/report"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-center text-sm py-3.5 flex items-center justify-center gap-2"
            style={{ textDecoration: 'none' }}
          >
            <span>📄</span>
            <span>フルレポート（PDF）で解消する</span>
          </a>
        </motion.div>

        {/* Share */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === 'revealed' ? 1 : 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mb-5"
        >
          <p className="font-jp text-xs text-center mb-3" style={{ color: '#bbb' }}>シェアする</p>
          <button
            onClick={handleXShare}
            className="w-full btn-outline text-sm py-3 flex items-center justify-center gap-2"
          >
            <span>𝕏</span>
            <span>結果をXでシェア</span>
          </button>
        </motion.div>

        {/* Retry */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === 'revealed' ? 1 : 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="text-center"
        >
          <button
            className="font-jp text-xs"
            style={{ color: '#ccc' }}
            onClick={() => navigate('/quiz')}
          >
            もう一度診断する
          </button>
        </motion.div>

      </motion.div>

      {/* ── Mosaic popup ── */}
      <AnimatePresence>
        {showMosaicPopup && (
          <motion.div
            key="mosaic-popup"
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMosaicPopup(false)}
          >
            <div className="fixed inset-0" style={{ background: 'rgba(0,0,0,0.5)' }} />
            <motion.div
              className="popup-card relative z-10"
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: 'spring', damping: 22, stiffness: 240 }}
              onClick={e => e.stopPropagation()}
            >
              <p className="font-jp font-bold text-base mb-2" style={{ color: '#2d2d2d' }}>この先は…</p>
              <p className="font-jp text-sm mb-5 leading-relaxed" style={{ color: '#888' }}>
                会場のパネル <strong style={{ color: type.color }}>#{type.panelNumber}</strong> または
                フルレポート（PDF）で確認できます。
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href="https://example.com/event"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-sm py-3 text-center"
                  style={{ textDecoration: 'none' }}
                  onClick={() => setShowMosaicPopup(false)}
                >
                  会場（マルイ）で確認する
                </a>
                <a
                  href="https://example.com/report"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-sm py-3 text-center"
                  style={{ textDecoration: 'none' }}
                  onClick={() => setShowMosaicPopup(false)}
                >
                  フルレポートで確認する
                </a>
                <button
                  className="font-jp text-xs mt-1"
                  style={{ color: '#ccc' }}
                  onClick={() => setShowMosaicPopup(false)}
                >
                  閉じる
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
