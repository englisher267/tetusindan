import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { questions } from '../data/questions'

const slideVariants = {
  enter: (dir) => ({
    x: dir > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
  exit: (dir) => ({
    x: dir > 0 ? -60 : 60,
    opacity: 0,
    transition: { duration: 0.25, ease: 'easeIn' },
  }),
}

const choiceLabels = ['A', 'B', 'C', 'D']

function calculateResult(answers) {
  const scores = {}
  answers.forEach((answerIndex, qIndex) => {
    const question = questions[qIndex]
    const choice = question.choices[answerIndex]
    Object.entries(choice.scores).forEach(([type, score]) => {
      scores[type] = (scores[type] || 0) + score
    })
  })
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])
  return {
    primary: sorted[0]?.[0] || 'approval',
    scores,
  }
}

export default function QuestionPage() {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [selectedChoice, setSelectedChoice] = useState(null)
  const [direction, setDirection] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const question = questions[currentIndex]
  const progress = ((currentIndex) / questions.length) * 100
  const isLast = currentIndex === questions.length - 1

  const handleSelect = useCallback((choiceIndex) => {
    if (isTransitioning) return
    setSelectedChoice(choiceIndex)

    setTimeout(() => {
      setIsTransitioning(true)
      const newAnswers = [...answers, choiceIndex]

      if (isLast) {
        const result = calculateResult(newAnswers)
        navigate(`/result/${result.primary}`, {
          state: { scores: result.scores },
        })
        return
      }

      setDirection(1)
      setTimeout(() => {
        setAnswers(newAnswers)
        setCurrentIndex(prev => prev + 1)
        setSelectedChoice(null)
        setIsTransitioning(false)
      }, 280)
    }, 350)
  }, [isTransitioning, isLast, answers, navigate])

  return (
    <div className="min-h-dvh flex flex-col" style={{ background: 'var(--color-bg)' }}>

      {/* Header */}
      <div className="px-5 pt-7 pb-4 max-w-md mx-auto w-full">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate('/')}
            className="font-jp text-sm"
            style={{ color: '#aaa' }}
          >
            ← 戻る
          </button>
          <span
            className="font-jp text-sm font-bold px-3 py-1 rounded-full"
            style={{ background: '#fff0f5', color: '#ff7eb3' }}
          >
            {currentIndex + 1} / {questions.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="progress-bar-track">
          <motion.div
            className="progress-bar-fill"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Question area */}
      <div className="flex-1 flex items-center justify-center px-5 py-4">
        <div className="max-w-md w-full mx-auto">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {/* Q label */}
              <div className="text-center mb-5">
                <span
                  className="inline-block font-jp font-black text-sm px-4 py-1.5 rounded-full"
                  style={{ background: '#fff0f5', color: '#ff7eb3' }}
                >
                  Q{currentIndex + 1}
                </span>
              </div>

              {/* Question text */}
              <h2
                className="font-jp font-bold text-center mb-7 leading-relaxed"
                style={{ fontSize: 'clamp(1.05rem, 5vw, 1.3rem)', color: '#2d2d2d' }}
              >
                {question.text}
              </h2>

              {/* Choices */}
              <div className="flex flex-col gap-3">
                {question.choices.map((choice, index) => (
                  <motion.button
                    key={index}
                    className={`choice-btn ${selectedChoice === index ? 'selected' : ''}`}
                    onClick={() => handleSelect(index)}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: index * 0.07, duration: 0.35 },
                    }}
                  >
                    <span className="choice-label">{choiceLabels[index]}</span>
                    <span className="font-jp text-sm leading-relaxed" style={{ color: '#2d2d2d' }}>
                      {choice.text}
                    </span>
                  </motion.button>
                ))}
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer hint */}
      <div className="pb-10 px-5 text-center">
        <p className="font-jp text-xs" style={{ color: '#ccc' }}>
          正解はありません。直感で選んでね。
        </p>
      </div>

    </div>
  )
}
