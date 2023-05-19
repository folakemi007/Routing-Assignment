import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import "../App.css"
import StarWarLogo from "../Images/StarWarLogo.png"
import  StarWarLoaderImg from "../Images/StarWars_loader.svg"
 
const MovieDetail = () => {
const [loading, setLoading] = useState(true)
const [movie, setMovie] = useState(null)
const [ error, setError] = useState(null)
const [characters, setCharacters] = useState([ ])
const [planets, setPlanets] =useState([])
const [species, setSpecies] =useState([])
const [starships, setStarships] =useState([])
const [vehicles, setVehicles] =useState([])

const {id} = useParams();

useEffect(() => {
    fetch(`https://swapi.dev/api/films/${id}`)
       .then((response) =>   {
            if (! response.ok ){
              throw new Error (`This is an HTTP Error: The status is ${response.status}`)
            }
               return  response.json()})
         .then((movieData) => {
                 setMovie(movieData)
            const allCharacter = [];
            const allPlanet = [];
            const allSpecies = [];
            const allStarship = [];
            const allVehicle= [];

                movieData.characters.forEach(character =>{
                    fetch(character)
                    .then(response =>{
                        return response.json()
                    })
                    .then(CharacterData =>{
                        allCharacter.push(CharacterData)
                    
                        setCharacters(allCharacter)
                        // console.log({allCharacter})
                    })
                })
                movieData.planets.forEach(planet=>{
                    fetch(planet)
                    .then (response =>{
                        return response.json()
                    })
                    .then(planetData =>{
                        // console.log({planetData})
                        allPlanet.push(planetData)
                        setPlanets(allPlanet)
                        // console.log({allPlanet})
                    })
                }) 
                movieData.species.forEach(specie=>{
                    fetch(specie)
                    .then (response =>{
                        return response.json()
                    })
                    .then(specieData =>{
                        console.log({specieData})
                        allSpecies.push(specieData)
                        setSpecies(allSpecies)
                        console.log({allSpecies})
                    })
                }) 
                movieData.starships.forEach(starship=>{
                    fetch(starship)
                    .then (response =>{
                        return response.json()
                    })
                    .then(starshipData =>{
                        console.log({starshipData})
                        allStarship.push(starshipData)
                        setStarships(allStarship)
                        console.log({allStarship})
                    })
                }) 
                movieData.vehicles.forEach(vehicle=>{
                    fetch(vehicle)
                    .then (response =>{
                        return response.json()
                    })
                    .then(vehicleData =>{
                        console.log({vehicleData})
                        allVehicle.push(vehicleData)
                        setVehicles(allVehicle)
                        console.log({allVehicle})
                    })
                }) 


          setError(null)
         }
             )
        .catch((error) =>  {
          console.log(error)
          setError(Error)
        })
        .finally(() =>{
          setLoading(false)
        })
}, [id])

   return (
    <div className='starWar_Wrapper'>
    <div className='Img_wrapper'>
    <img src = {StarWarLogo}  alt = "star war movies logo" className='StarWarImg' />
    </div>

    {loading && 
    (<div className='loader-container'>
      <img src = {StarWarLoaderImg} alt="loader img" className='StarWarLoader'/>
    </div> )} 
   
    {error && 
    <div>{`There is a problem fetching your data - ${error}`}</div>}

    {movie && (
        <div className='movie-detail_Container movieDetail'>
            <div className='list-link'>
                <Link to = "/">← Back to list</Link>
            </div>
            <header>
                <h2> {movie.title}</h2>
                <p>  Director : {movie.director}</p>
                <p>Producer : {movie.producer}</p>
            </header>
            <div className='content-container description'>
                <h4>Description</h4>
                <p>{movie.opening_crawl}</p>
            </div>
         
            <div className='content-container'>
                 <h4>Characters</h4>
               <ul className='content-wrapper'>
               {characters.map((character =>{
                    return (
                        <li key={character.name}>
                            {character.name}
                        </li>
                    )
                }))}

               </ul>
            </div>
           
            <div className='content-container'>
                 <h4>Planet</h4>
               <ul className='content-wrapper'>
               {planets.map((planet =>{
                    return (
                        <li key={planet.name}>
                            {planet.name}
                        </li>
                    )
                }))}

               </ul>
            </div>
         
            <div className='content-container'>
                 <h4>Species</h4>
               <ul className='content-wrapper'>
               {species.map((specie =>{
                    return (
                        <li key={species.name}>
                            {specie.name}
                        </li>
                    )
                }))}

               </ul>
            </div>
         
            <div className='content-container'>
                 <h4>StarShips</h4>
               <ul className='content-wrapper'>
               {starships.map((starship =>{
                    return (
                        <li key={starship.name}>
                            {starship.name}
                        </li>
                    )
                }))}

               </ul>
            </div>
            
            <div className='content-container'>
                 <h4>Vehicles</h4>
               <ul className='content-wrapper'>
               {vehicles.map((vehicle=>{
                    return (
                        <li key={vehicle.name}>
                            {vehicle.name}
                        </li>
                    )
                }))}

               </ul>
            </div>
        </div>
    )}
    </div>
   )
 }
 
 export default MovieDetail