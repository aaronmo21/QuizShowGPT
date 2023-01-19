import React from 'react';
import './Scoreboard.css'
import { Player } from '../types'

export const Scoreboard: React.FC<{players: Player[], onClickScoreboard: any, currentPlayer: Player | null}> = ({ players, onClickScoreboard, currentPlayer }) => {
  return (
    <div className="scoreboard-container">
      {players.map((player, index) => (
        <div key={index} className={`scoreboard ${currentPlayer && currentPlayer.name === player.name ? 'active' : ''}`} onClick={() => onClickScoreboard(player.name)}>
          <div className="score">{player.score}</div>
          <div className="player-banner">{player.name.toUpperCase()}</div>
        </div>
      ))}
    </div>
  )
}