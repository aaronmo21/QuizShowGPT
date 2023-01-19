import './App.css'
import { HomePage }  from './components/HomePage'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { JeopardyBoard } from './components/JeopardyBoard';
import { Leaderboard } from './components/Leaderboard';

function App() {

  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/round1" element={<JeopardyBoard />} />
            <Route path="/round2" element={<JeopardyBoard />} />
            <Route path="/leaderboard1" element={<Leaderboard />} />
            <Route path="/leaderboard2" element={<Leaderboard />} />
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
