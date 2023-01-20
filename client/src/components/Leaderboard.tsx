import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button, Heading, TextInput, Text } from 'grommet'
import { Player } from '../types'
import './Leaderboard.css'


export const Leaderboard: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const players: Player[] = location.state
  const [showContinueModal, setShowContinueModal] = useState(false)
  const [categoryInput, setCategoryInput] = useState('')
  const [categories, setCategories] = useState<string[]>([])

  const handleContinue = () => {
    navigate('/round2', {state: {players, categories}})
  }

  const handleFinishGame = () => {
    window.sessionStorage.removeItem('scores')
    navigate('/')
  }

  const handleClickNextRound = () => {
    setShowContinueModal(true)
  }

  const handleAddCategory = () => {
    if (categories.length < 5) {
      setCategories([...categories, categoryInput]);
      setCategoryInput('');
    }
  }

  return (
    <>
      <div className="leaderboard-container">
        <Heading style={{paddingTop: '10%', color: 'gray'}}>Leaderboard</Heading>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          {players.map((player, index) => (
            <div key={index} style={ PlayerAndScore }>
              <div>
                {player.name}
              </div>
              <div>
                {player.score}
              </div>
            </div>
          ))}
        </div>
        <div style={{position: 'absolute', bottom: '10%', right: '20%'}}>
          {location.pathname === '/leaderboard1' ? 
            <Button primary label="Next Round" style={ AppButton } onClick={handleClickNextRound} /> :
            <Button primary label="Finish Game" style={ AppButton } onClick={handleFinishGame} />
          }
        </div>
      </div>
      {showContinueModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Would you like to choose any more categories?</h2>
            <div>
              <TextInput
              type="text"
              value={categoryInput}
              onChange={(event) => setCategoryInput(event.target.value)}
              placeholder="Category name"
              disabled={categories.length === 5 ? true : false}
              />
              <Button primary margin="small" size="small" label="Add Category" style={ AppButton } onClick={handleAddCategory} />
            </div>
            <div>
              {categories.length > 0
              ? <Text>{`Categories: ${categories.join(', ')}`}</Text>
              : <Text>No categories added yet</Text>}
            </div>
            <Button primary margin="small" size="small" label="Continue" style={ AppButton } onClick={handleContinue} />
          </div>
        </div>
      )}
    </>
  )
}

const AppButton =  {backgroundColor: "yellow", color: 'black', border: 'none', padding: '1rem' }
const PlayerAndScore = { display: 'flex', width: '100%', fontSize: '50px', padding: '3rem', justifyContent: 'space-between', color: 'gray' }
