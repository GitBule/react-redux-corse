import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import axios from 'axios'
import heroService from './service/heroService';

const App = () => {

  useEffect(() => {
    console.log('effect')
    heroService.getAll()
      .then(initialHeroes => {
        setHeroes(initialHeroes)
      })
  }, [])
  const [heroes, setHeroes] = useState([])
  const [newHero, setNewHero] = useState('')
  const [showAll, setShowAll] = useState(true)

  const toggleImportanceOf = id => {
    const url = `http://localhost:3001/heroes/${id} `
    const hero = heroes.find(n => n.id === id)
    const changedHero = { ...hero, important: !hero.important }
    heroService.update(id, changedHero)
      .then(returnedHero => {
        setHeroes(heroes.map(hero => hero.id !== id ? hero : returnedHero))
      })
  }
  // eslint-disable-next-line no-unused-vars
  const heroesToShow = showAll ? heroes : heroes.filter(hero => hero.important === true)
  const rows = () => heroesToShow.map(hero =>
    <Hero
      key={hero.id}
      hero={hero}
      toggleImportance={() => toggleImportanceOf(hero.id)}
    >
    </Hero>)

  const addHero = e => {
    e.preventDefault();
    const heroObject = {
      name: newHero,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: heroes.lenght + 1
    }
    heroService.create(heroObject)
      .then(returnedHero => {
        setHeroes(heroes.concat(returnedHero))
        setNewHero('')
      })

  }
  const handleHeroChange = e => {
    console.log(e.target.value)
    setNewHero(e.target.value)
  }
  return (

    <div className="App">
      <h1>Heroes</h1>
      <button onClick={() => setShowAll(!showAll)}>
        show{showAll ? 'important' : 'all'}
      </button>
      <ul>
        {rows()}
      </ul>
      <form onSubmit={addHero}>
        <input
          type="text"
          value={newHero}
          onChange={handleHeroChange}
        />
        <button type='submit'>Add</button>
      </form>
    </div>
  );
}

export default App;
