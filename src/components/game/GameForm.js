import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { createGame, getCategories } from "./Gamemanager"
import "./Game.css"
export const GameForm = () => {
    const history = useHistory()
    const [categories, setCat] = useState([])
    const category = []
    const [currentEvent, setEvent] = useState({
        title: "",
        designer: "",
        description: "",
        year_released: "",
        game_duration: "",
        number_of_players: 0,
        age_reccommendation: 0,
        category: []
    })
    const [games, setGames] = useState([])
    const catSelect = (item) =>{
        const newEventState = {...currentEvent}
        if (newEventState.category.length >= 0){
            let checker = newEventState.category.includes(item)
            if (checker){
                let index = newEventState.category.indexOf(item)
                newEventState.category.splice(index, 1)
                setEvent(newEventState)
            }else{
                newEventState.category.push(parseInt(item))
                setEvent(newEventState)
            }
        }
    }
    const changeEventState = (domEvent) => {
       const newEventState = {...currentEvent}
       newEventState[domEvent.target.name] = domEvent.target.value
       setEvent(newEventState) 
    }
    useEffect(() => {
        getCategories().then((data) => setCat(data))
    }, [])
    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" className="form-control"
                        value={ currentEvent.title }
                        onChange={ changeEventState }/>
                        
                        
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="designer">Manufactor: </label>
                    <input name="designer" className="form-control"
                        value={ currentEvent.designer }
                        onChange={ changeEventState } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Game Description: </label>
                    <input type="text" name="description" className="form-control"
                        value={ currentEvent.description }
                        onChange={ changeEventState } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="year_released">Year Released: </label>
                    <input type="date" name="year_released" className="form-control"
                        value={ currentEvent.year_released }
                        onChange={ changeEventState } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game_duration">Game Duration (Minutes): </label>
                    <input type="number" name="game_duration" className="form-control"
                        value={ currentEvent.game_duration }
                        onChange={ changeEventState } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="number_of_players">Number Of Players: </label>
                    <input type="number" name="number_of_players" className="form-control"
                        value={ currentEvent.number_of_players }
                        onChange={ changeEventState } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="age_reccommendation">Age Reccommendation: </label>
                    <input type="number" name="age_reccommendation" className="form-control"
                        value={ currentEvent.age_reccommendation }
                        onChange={ changeEventState } />
                </div>
            </fieldset>
            Select Categories:
            <fieldset>
                <div className="form-group categories">
                    
                    {categories?.map((cat)=> <div><label htmlFor={`Cat-${cat.id}`}>{cat.label}</label><input type="checkbox" name={`Cat-${cat.id}`}value={cat.id} onClick={
                        (event) => catSelect(event.target.value)
                    }/></div>)}
                </div>
            </fieldset>
            {/* TODO: Create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    createGame(currentEvent).then(()=> history.push("/games"))
                }}
                className="btn btn-2">Create Game</button>
        </form>
    )
}