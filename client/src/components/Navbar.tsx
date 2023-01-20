import React, { useState } from 'react'
import './Navbar.css'
import { Button, Header, Nav } from 'grommet'
import { grommet } from 'grommet/themes'
import { Grommet, Box, Text } from 'grommet'
import { useNavigate, useLocation } from 'react-router-dom'
import { Player } from '../types'


export const Navbar: React.FC<{players: Player[]}> = ({ players }) => {
  const [showFinishModal, setShowFinishModal] = useState(false)
  const [showHomeModal, setShowHomeModal] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const handleFinishRound = () => {
    setShowFinishModal(false)
    if(location.pathname === '/round1'){
      window.sessionStorage.removeItem('round1')
      navigate('/leaderboard1', {state: players})
    }
    else{
      window.sessionStorage.removeItem('round2')
      navigate('/leaderboard2', {state: players})
    }
  }

  const handleReturnHome = () => {
    setShowHomeModal(false)
    navigate('/')
  }

  return (
    <Grommet theme={grommet}>
      <Header background="blue" pad="small" style={{position: 'absolute', left: 0, right: 0, top: 0}}>
        <Nav direction="row" style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
          <Button primary label="Home" style={{backgroundColor: "yellow", color: 'black', border: 'none'}} onClick={() => setShowHomeModal(true)} />
          <Button primary label="Finish Round" style={{backgroundColor: "yellow", color: 'black', border: 'none'}} onClick={() => setShowFinishModal(true)} />
        </Nav>
      </Header>
      {showHomeModal && (
        <Box className="modal-alert" pad="small" style={{backgroundColor: 'white'}}>
          <Text className="message">Are you sure you want to abondon your game?</Text>
          <Button primary label="Yes" onClick={handleReturnHome}/>
          <Button primary label="No" onClick={() => setShowHomeModal(false)}/>
        </Box>
      )}
      {showFinishModal && (
        <Box className="modal-alert" pad="small" style={{backgroundColor: 'white'}}>
          <Text className="message">Are you finished with your round?</Text>
          <Button primary label="Yes" onClick={handleFinishRound}/>
          <Button primary label="No" onClick={() => setShowFinishModal(false)}/>
        </Box>
      )}
    </Grommet>
  )
}

