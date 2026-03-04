import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { getMoyamoyaTypeById } from '../data/moyamoyaTypes'

export default function ResultPage() {
  const { typeId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const type = getMoyamoyaTypeById(typeId)

  // DM animation states: 'darkening' → 'dm_arriving' → 'revealed'
  const [phase, setPhase] = useState('darkening')
  const [showMosaicPopup, setShowMosaicPopup] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('dm_arriving'), 1200)
    const t2 = setTimeout(() => setPhase('revealed'), 2800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (!type) {
    return (
      <div className="min-h-dvh flex items-center justify-center text-ivory">
        <div className="text-center">
          <p className="mb-4">診断結果が見つかりませんでした。</p>
          <button className="btn-primary" onClick={() => navigate('/')}>トップへ戻る</button>
        </div>
      </div>
    )
  }

  const shareText = `私のモヤモヤタイプは【${type.shortName}】でした${type.emoji}\n「${type.tagline}」\n哲学者からDMが届く診断、やってみて。\n#モヤモヤ診断 #なんかモヤモヤする展`

  const handleXShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent('https://tetusindan.vercel.app')}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="relative min-h-dvh z-10">
      {/* Darkening overlay during intro */}
      <AnimatePresence>
        {phase === 'darkening' && (
          <motion.div
            key="darken"
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
            animate={{ backgroundColor: 'rgba(0,0,0,0.92)' }}
            exit={{ backgroundColor: 'rgba(0,0,0,0)', transition: { duration: 1 } }}
            transition={{ duration: 1.2 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, transition: { delay: 0.5, duration: 0.6 } }}
              className="text-center"
            >
              <p className="font-sans-jp text-sm text-ivory-dim opacity-60 mb-2">診断中...</p>
              <div className="flex gap-2 justify-center">
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-gold"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3 }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DM notification */}
      <AnimatePresence>
        {phase === 'dm_arriving' && (
          <motion.div
            key="dm-notif"
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ backgroundColor: 'rgba(0,0,0,0.92)' }}
          >
            <motion.div
              initial={{ y: -80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.5 } }}
              transition={{ type: 'spring', damping: 18, stiffness: 200 }}
              className="dm-notification"
            >
              <div className="dm-notif-icon" style={{ background: type.colorDim, borderColor: type.color + '60' }}>
                <span style={{ fontSize: '1.5rem' }}>{type.emoji}</span>
              </div>
              <div>
                <p className="font-sans-jp text-xs text-ivory opacity-50 mb-0.5">ダイレクトメッセージ</p>
                <p className="font-sans-jp text-sm text-ivory font-medium">{type.dmFrom}</p>
                <p className="font-sans-jp text-xs text-ivory-dim opacity-60 mt-0.5">「診断結果をお伝えします」</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content (appears after animation) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'revealed' ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-xl mx-auto px-5 pt-10 pb-28"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <p className="font-sans-jp text-xs tracking-widest text-gold opacity-70 mb-2 uppercase">
            診断結果
          </p>
          <div className="ornament-line">
            <span className="text-gold text-xs opacity-40">RESULT</span>
          </div>
        </div>

        {/* Result card - shareable visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: phase === 'revealed' ? 1 : 0, y: phase === 'revealed' ? 0 : 20 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="result-hero-card mb-6"
          style={{ borderColor: type.color + '50' }}
        >
          {/* Background gradient */}
          <div
            className="result-hero-bg"
            style={{ background: `radial-gradient(ellipse at center, ${type.color}18 0%, transparent 65%)` }}
          />

          {/* Type badge */}
          <div className="result-type-badge mb-4" style={{ color: type.color, borderColor: type.color + '40', background: type.color + '12' }}>
            隠れモヤモヤ診断
          </div>

          {/* Large emoji illustration */}
          <div className="result-emoji-wrap mb-3" style={{ boxShadow: `0 0 40px ${type.color}30`, borderColor: type.color + '40' }}>
            <span className="result-emoji">{type.emoji}</span>
          </div>

          {/* Type name */}
          <h1 className="font-serif-jp text-2xl sm:text-3xl font-medium text-ivory mb-2 text-center leading-snug" style={{ letterSpacing: '0.03em' }}>
            {type.name}
          </h1>

          {/* Tagline */}
          <p className="font-serif-jp text-sm text-ivory-dim text-center leading-relaxed px-4 mb-3 italic">
            「{type.tagline}」
          </p>

          {/* Hashtag */}
          <p className="font-sans-jp text-xs text-ivory-dim opacity-30 text-center">
            #モヤモヤ診断 #なんかモヤモヤする展
          </p>
        </motion.div>

        {/* 哲学的病名 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: phase === 'revealed' ? 1 : 0, y: phase === 'revealed' ? 0 : 16 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="card-glass p-4 mb-4 text-center"
          style={{ borderColor: type.color + '30' }}
        >
          <p className="font-sans-jp text-xs text-ivory-dim opacity-50 mb-1 tracking-wider">哲学的な病名</p>
          <p className="font-serif-jp text-base text-ivory" style={{ color: type.color }}>
            {type.diseaseName}
          </p>
        </motion.div>

        {/* Characteristics */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: phase === 'revealed' ? 1 : 0, y: phase === 'revealed' ? 0 : 16 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mb-5"
        >
          <div className="flex flex-wrap gap-2">
            {type.characteristics.map(c => (
              <span
                key={c}
                className="px-3 py-1 rounded-full font-sans-jp text-xs border"
                style={{
                  borderColor: type.color + '40',
                  color: type.color,
                  background: type.color + '12',
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </motion.div>

        {/* DM診断書 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: phase === 'revealed' ? 1 : 0, y: phase === 'revealed' ? 0 : 20 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="dm-card mb-6"
        >
          {/* DM header */}
          <div className="dm-card-header" style={{ borderColor: type.color + '30' }}>
            <div className="dm-avatar" style={{ background: type.colorDim, borderColor: type.color + '60' }}>
              <span>{type.emoji}</span>
            </div>
            <div>
              <p className="font-sans-jp text-xs text-ivory font-medium">{type.dmFrom}</p>
              <p className="font-sans-jp text-xs text-ivory-dim opacity-40">カテゴリマスター ✓ · 今</p>
            </div>
            <div className="dm-badge" style={{ color: type.color, borderColor: type.color + '40' }}>DM</div>
          </div>

          {/* DM body */}
          <div className="dm-card-body">
            <p className="font-serif-jp text-sm text-ivory-dim leading-loose whitespace-pre-line">
              {type.teaser}
            </p>

            {/* Mosaic section */}
            <div className="mosaic-wrap mt-2" onClick={() => setShowMosaicPopup(true)}>
              <p className="font-serif-jp text-sm text-ivory-dim leading-loose mosaic-text">
                {type.teaserMasked}
              </p>
              <div className="mosaic-overlay">
                <span className="mosaic-tap-hint font-sans-jp text-xs">タップして確認</span>
              </div>
            </div>

            <p className="font-sans-jp text-xs text-ivory-dim opacity-30 mt-3">
              パネル #{type.panelNumber} またはフルレポートで公開
            </p>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: phase === 'revealed' ? 1 : 0, y: phase === 'revealed' ? 0 : 20 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex flex-col gap-3 mb-6"
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
            className="btn-outline text-center text-sm py-4 flex items-center justify-center gap-2"
            style={{ textDecoration: 'none' }}
          >
            <span>📄</span>
            <span>今すぐフルレポート（PDF）で解消する</span>
          </a>
        </motion.div>

        {/* Share */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === 'revealed' ? 1 : 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="mb-6"
        >
          <p className="font-sans-jp text-xs text-ivory-dim opacity-40 text-center mb-3">シェアする</p>
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
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-center"
        >
          <button
            className="font-sans-jp text-xs text-ivory-dim opacity-40 hover:opacity-70 transition-opacity"
            onClick={() => navigate('/quiz')}
          >
            もう一度診断する
          </button>
        </motion.div>
      </motion.div>

      {/* Mosaic popup */}
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
            <div className="fixed inset-0 bg-black/70" />
            <motion.div
              className="relative card-glass p-6 max-w-sm w-full text-center z-10"
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              onClick={e => e.stopPropagation()}
            >
              <p className="font-serif-jp text-base text-ivory mb-2">この先は…</p>
              <p className="font-sans-jp text-sm text-ivory-dim leading-relaxed mb-5">
                会場のパネル <strong className="text-gold">#{type.panelNumber}</strong> または
                フルレポート（PDF）で確認できます。
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href="https://example.com/event"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-sm py-3"
                  style={{ textDecoration: 'none' }}
                  onClick={() => setShowMosaicPopup(false)}
                >
                  会場（マルイ）で確認する
                </a>
                <a
                  href="https://example.com/report"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-sm py-3"
                  style={{ textDecoration: 'none' }}
                  onClick={() => setShowMosaicPopup(false)}
                >
                  フルレポートで確認する
                </a>
                <button
                  className="font-sans-jp text-xs text-ivory-dim opacity-40 mt-1"
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
