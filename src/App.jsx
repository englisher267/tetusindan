import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TopPage from './pages/TopPage'
import QuestionPage from './pages/QuestionPage'
import ResultPage from './pages/ResultPage'
import StarsBackground from './components/StarsBackground'

export default function App() {
  return (
    <BrowserRouter>
      <StarsBackground />
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="/quiz" element={<QuestionPage />} />
        <Route path="/result/:typeId" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  )
}
