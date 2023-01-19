import React, { useState } from 'react';
import './HomePage.css'
import { useNavigate } from 'react-router-dom';
import { Button, Main, Heading, TextInput, Text } from 'grommet';
import { Player } from '../types'

export const HomePage: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [categoryInput, setCategoryInput] = useState('');
  const [playerInput, setPlayerInput] = useState('');
  const navigate = useNavigate();

  const handleAddCategory = () => {
    if (categories.length < 5) {
      setCategories([...categories, categoryInput]);
      setCategoryInput('');
    }
  };

  const handleAddPlayer = () => {
    if (players.length < 4) {
      const p = {
        name: playerInput,
        score: 0
      }
      setPlayers([...players, p]);
      setPlayerInput('');
    }
  };

  const handleStartGame = () => {
    navigate('/round1', {state: {categories, players}})
  };

  return (
    <div>
      <Main pad="large">
        <Heading style={{color: 'grey'}}>Welcome to JeopardyGPT,</Heading>
        <Heading style={{margin: '0', color: 'grey'}}>The only quiz show generated completely by AI!</Heading>
        <div>
          <img className='rotate' style={{height: '200px'}} src='../../assets/openai-avatar png.png'></img>
        </div>
          <Text style={{color: 'grey', paddingBottom: '50px'}}>To get started, enter the names of up to 5 categories that you'd like to include in the game. If you don't want custom categories, we'll randomize them for you.</Text>
      <div style={{display: 'flex', margin: 'auto', alignItems: 'center'}}>
        <TextInput
          type="text"
          value={categoryInput}
          onChange={(event) => setCategoryInput(event.target.value)}
          placeholder="Category name"
          disabled={categories.length === 5 ? true : false}
          style={{border: '1px solid gray'}}
        />
        <Button primary margin="small" size="small" label="Add Category" style={ AppButton } onClick={handleAddCategory} />
      </div>
      <div>
        {categories.length > 0
          ? <Text>{`Categories: ${categories.join(', ')}`}</Text>
          : <Text style={{color: 'grey'}}>No categories added yet</Text>}
      </div>
      <div style={{display: 'flex', margin: 'auto', alignItems: 'center'}}>
        <TextInput
            type="text"
            value={playerInput}
            onChange={(event) => setPlayerInput(event.target.value)}
            placeholder="Player name"
            disabled={categories.length === 4 ? true : false}
            style={{border: '1px solid gray'}}
          />
          <Button primary margin="small" size="small" label="Add Player" style={ AppButton } onClick={handleAddPlayer} />
      </div>
        <div>
        {players.length > 0
          ? <Text>{`Players: ${players.map(p => p.name).join(', ')}`}</Text>
          : <Text style={{color: 'grey'}}>At least 1 player must be added, no duplicate names!</Text>}
      </div>
      <div>
        <Button primary margin="small" size="small" label="Start Game" style={ AppButton } disabled={players.length < 1} onClick={handleStartGame} />
      </div>
      </Main>
    </div>
  );
};

const AppButton =  {backgroundColor: "yellow", color: 'black', border: 'none', padding: '1rem' }