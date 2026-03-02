import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { questions } from '../data/questions'

const LABELS = ['a', 'b', 'c', 'd']

const slideVariants = {
  enter: (dir) => ({
    x: dir > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  exit: (dir) => ({
    x: dir > 0 ? -60 : 60,
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeIn' },
  }),
}

function calculateResult(answers) {
  const scores = {}
  answers.forEach((answerIndex, qIndex) => {
    const question = questions[qIndex]
    const choice = question.choices[answerIndex]
    Object.entries(choice.scores).forEach(([philosopher, score]) => {
      scores[philosopher] = (scores[philosopher] || 0) + score
    })
  })
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])
  return {
    primary: sorted[0]?.[0] || 'epicurus',
    secondary: sorted[1]?.[0] || 'aristotle',
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
          state: { secondary: result.secondary, scores: result.scores },
        })
        return
      }

      setDirection(1)
      setTimeout(() => {
        setAnswers(newAnswers)
        setCurrentIndex(prev => prev + 1)
        setSelectedChoice(null)
        setIsTransitioning(false)
      }, 300)
    }, 400)
  }, [isTransitioning, isLast, answers, navigate])

  return (
    <div className="relative min-h-dvh flex flex-col z-10">
      {/* Header */}
      <div className="px-6 pt-8 pb-4 max-w-xl mx-auto w-full">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate('/')}
            className="font-sans-jp text-xs text-ivory-dim opacity-60 hover:opacity-100 transition-opacity"
          >
            ← 戻る
          </button>
          <span className="font-sans-jp text-xs text-gold opacity-70">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>
        <div className="progress-bar-track">
          <motion.div
            className="progress-bar-fill"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Question area */}
      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="max-w-xl w-full mx-auto">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {/* Question number ornament */}
              <div className="text-center mb-6">
                <div className="ornament-line mb-3">
                  <span className="text-gold font-sans-jp text-xs tracking-widest opacity-70">
                    Q{currentIndex + 1}
                  </span>
                </div>
              </div>

              {/* Question text */}
              <h2
                className="text-xl sm:text-2xl font-serif-jp text-ivory text-center mb-8 leading-relaxed"
                style={{ letterSpacing: '0.04em' }}
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
                    initial={{ opacity: 0, x: 20 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: { delay: index * 0.08, duration: 0.4 },
                    }}
                  >
                    <span className="choice-label">{LABELS[index].toUpperCase()}</span>
                    <span>{choice.text}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Atmospheric quote */}
      <div className="pb-20 px-6 text-center">
        <p className="font-sans-jp text-xs text-ivory-dim opacity-30 italic">
          「正解はありません。直感で選んでください。」
        </p>
      </div>
    </div>
  )
}
