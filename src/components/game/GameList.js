import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { getGames, getSearchedGames, getFilteredGames } from "./Gamemanager.js"
import "./Game.css"
import { Link } from "react-router-dom"
export const GameList = (props) => {
    const [ games, setGames ] = useState([])
    const history = useHistory()
    const [searchTerm, setTerm] = useState("")
    const [filter, setFilter] = useState("")
    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])
    useEffect(() => {
        if (searchTerm != ""){

            getSearchedGames(searchTerm).then((data)=> setGames(data))
        }else{
            getGames().then(data => setGames(data))
        }
    }, [searchTerm])
    useEffect(() => {
        if (filter != ""){

            getFilteredGames(filter).then((data) => setGames(data))
        }else{
            getGames().then(data => setGames(data))
        }
    }, [filter])
    return (
        <article className="games">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                history.push({ pathname: "/games/new" })
            }}
            >Register New Game</button>
            <input type='text' placeholder="Search By Category" onChange={(event)=>setTerm(event.target.value)}/>
            <label htmlFor="filter_by">Filter By:</label>
            <select name='filter_by' onChange={(event) => {
                setFilter(event.target.value)
            }}>
                <option value="title">Title</option>
                <option value="designer">Designer</option>
                <option value="release_date">Release Date</option>
            </select>
            <button onClick={() => {
                setFilter("")
                setTerm("")
            }}>Reset Filters</button>
            {
                games?.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title"><Link to={`/games/${game.id}`}>{game.title} by {game.designer}</Link></div>
                        <div className="game__year">{game.year_released}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__duration">Estimated Time Per Game: {game.game_duration}</div>
                        <div className="game__age">Age Reccommendation: {game.age_reccommendation}+</div>
                        <div>Game Categories
                            <ul>
                        {game.category.map((cat)=><li>{cat.label}</li>)}
                        </ul>
                        {game.is_host ? <button className="edit-btn btn-1" onClick={()=>history.push(`/games/${game.id}/edit`)}>Edit</button>: ""}
                        </div>
                    </section>
                })
            }
        </article>
    )
}