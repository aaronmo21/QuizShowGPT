import React, { useState } from 'react'
import './JeopardyBoard.css'
import { useLocation } from 'react-router-dom'
import { Scoreboard } from './Scoreboard'
import { LoadingPage } from './LoadingPage'
import { Button } from 'grommet'
import { Navbar } from './Navbar'
import { Player, Question } from '../types'

export const JeopardyBoard: React.FC = () => {
  const location = useLocation()
  const roundName: string = location.pathname
  const roundKey = roundName.replace('/', '')
  const [players, setPlayers] = useState<Player[]>(location.state.players)
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(players[0])
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true)
  const userCategories = location.state.categories

  //ignore a refresh if a round is currently in progress by caching the questions in the user browser session
  React.useEffect(() => {
    if(window.sessionStorage.getItem(roundKey)){
      const q = window.sessionStorage.getItem(roundKey)
      if(q){
        setQuestions(JSON.parse(q))
      }
      setIsLoadingQuestions(false)
    }
    else{
      fetchQuestions(userCategories, roundKey)
    }
    const scores = window.sessionStorage.getItem('scores')
    if(scores){
      setPlayers(JSON.parse(scores))
    }
  }, [])

  // Fetch questions from API
  const fetchQuestions = async (userCategories: string[] | [], roundName: string) => {
    const requestOptions = {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userCategories: userCategories })
    }
    const response = await fetch('http://localhost:5000/game', requestOptions)
    const data = await response.json()
    window.sessionStorage.setItem(roundName, JSON.stringify(data))
    setIsLoadingQuestions(false)
    setQuestions(data)
  }

  //gets list of categories to display on top of board
  const uniqueCategories = questions.reduce((acc, obj) => {
    const category: string = obj.category;
    if (!acc.includes(category)) {
      acc.push(category);
    }
    return acc;
  }, [] as string[])

  // Open modal with answer when a question is clicked
  const handleClick = (question: Question) => {
    setCurrentQuestion(question);
    setShowModal(true);
  }

  // Close modal when close button is clicked
  const handleClose = () => {
    setShowModal(false);
    setShowAnswer(false)
  }

  //disable question and show modal
  const handleShowAnswer = () => {
    setShowAnswer(true);
    if(questions && currentQuestion){
      questions.forEach(q => {
        if(q.question === currentQuestion.question) {
          q.answered = true
        }
      })
      setQuestions(questions)
      window.sessionStorage.setItem(roundKey, JSON.stringify(questions))
    }
  }

  //update user's score and cache in browser window
  const handleSubmitAnswer = (e: any) => {
    if(currentQuestion && currentPlayer && players){
      e.target.value === 'correct' ? setCurrentPlayer({...currentPlayer, score: currentPlayer.score + currentQuestion.value}) :
      setCurrentPlayer({...currentPlayer, score: currentPlayer.score - currentQuestion.value})
      players.forEach(p => {
        if(p.name === currentPlayer.name) {
          e.target.value === 'correct' ? p.score = currentPlayer.score + currentQuestion.value :
          p.score = currentPlayer.score - currentQuestion.value
        }
      })
      window.sessionStorage.setItem('scores', JSON.stringify(players))
    }
    setShowModal(false)
    setShowAnswer(false)
  }

  //set current player
  const handleClickScoreboard = (name: string) => {
    if(players){
      const player = players.find(p => p.name === name)
      if(player){
        setCurrentPlayer(player)
        console.log(currentPlayer)
      }
    }
  }

  return (
    <>
      <Navbar players={players}/>
      <div className="game-screen">
        <div className="jeopardy-board">
        {questions.length > 0 ? (
          <table>
          <tbody>
              <tr>
              {uniqueCategories.map((c, index) => (
                <td key={index}>{c}</td>
              ))}
              </tr>
              <tr>
              {questions.map((question, index) => (
                  question.value === 200 && (
                  <td key={index} onClick={!question.answered ? () => handleClick(question) : () => {return}}>
                    {question.answered ? '' : '200'}
                  </td>
                  )
              ))}
              </tr>
              <tr>
              {questions.map((question, index) => (
                  question.value === 400 &&  (
                  <td key={index} onClick={!question.answered ? () => handleClick(question) : () => {return}}>
                    {question.answered ? '' : '400'}
                  </td>
                  )
              ))}
              </tr>
              <tr>
              {questions.map((question, index) => (
                  question.value === 600 &&  (
                  <td key={index} onClick={!question.answered ? () => handleClick(question) : () => {return}}>
                    {question.answered ? '' : '600'}
                  </td>
                  )
              ))}
              </tr>
              <tr>
              {questions.map((question, index) => (
                question.value === 800 &&  (
                  <td key={index} onClick={!question.answered ? () => handleClick(question) : () => {return}}>
                    {question.answered ? '' : '800'}
                  </td>
                )
              ))}
              </tr>
              <tr>
              {questions.map((question, index) => (
                  question.value === 1000 &&  (
                  <td key={index} onClick={!question.answered ? () => handleClick(question) : () => {return}}>
                    {question.answered ? '' : '1000'}
                  </td>
                  )
              ))}
              </tr>
          </tbody>
          </table>
        ) : 
          <div>
            {isLoadingQuestions && ( 
              <LoadingPage />
            )}
          </div>
        }
        {showModal && (
          <div className="modal">
          <div className="modal-content">
            <h2>{currentQuestion?.category}</h2>
            <p>{currentQuestion?.question}</p>
            {showAnswer && (
              <p>{currentQuestion?.answer}</p>
            )}
            <Button primary label="Reveal Answer" style={ AppButton } onClick={handleShowAnswer} />
            <Button primary label="Close" style={ AppButton } onClick={handleClose} />
            {showAnswer && (
              <>
                <p>Did you get this one correct?</p>
                <Button primary label="Yes" value="correct" style={ AppButton } onClick={(e) => handleSubmitAnswer(e)} />
                <Button primary label="No" value="incorrect" style={ AppButton } onClick={(e) => handleSubmitAnswer(e)} />
              </>
            )}
          </div>
          </div>
        )}
        </div>
        <Scoreboard 
          players={ players } 
          onClickScoreboard={handleClickScoreboard}
          currentPlayer={currentPlayer}
        />
      </div>
    </>
  )
}

const AppButton =  {backgroundColor: "yellow", color: 'black', border: 'none', marginRight: '10px' }