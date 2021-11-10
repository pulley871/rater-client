import React, {useState, useEffect} from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { getSelectedGame, createRating, updateRating } from "./Gamemanager";
import { ReviewFormAndList } from "./GameReview";

export const GameDetail = () => {
    const {gameId} = useParams()
    const [game, setGame] = useState({})
    const [rating, setRating] = useState(5)
    const history = useHistory()
    const slider = () => {
        if (game.rated){
            setRating(game.rated.rating)
        }
    }
    const render = () => {
        getSelectedGame(gameId).then((data)=> setGame(data))
    }
    useEffect(() => {
        render()
        
    },[])
    useEffect(() => {
        slider()
    },[game])
    return(<>
                <button className="btn btn-1" onClick={()=> history.push("/games")}>Go Back</button>
                <section key={`game--${game.id}`} className="game">
                        <div className="game__title"><h2>{game.title} by {game.designer}</h2></div>
                        <div className="game__year"><h4>Released Date: {game.year_released}</h4></div>
                        <div className="game__players"><h4>Number of Players:{game.number_of_players} </h4></div>
                        <div className="game__duration"><h4>Estimated Time Per Game: {game.game_duration}</h4></div>
                        <div className="game__age"><h4>Age Reccommendation: {game.age_reccommendation}+</h4></div>
                        <div className="game__rating"><h4>User Rating: {game.rating}</h4></div>
                        <div><h4>Game Categories</h4>
                            <ul>
                        {game.category?.map((cat)=><li>{cat.label}</li>)}
                        </ul>
                        </div>
                        
                        
                        {game.rated ? 
                        <div>
                        <h4>Your Rating: {game.rated.rating}</h4>
                        
                        <input type="range" min="1" max="10" value={rating}  class="slider" onChange={
                            (event)=> setRating(event.target.value)
                        }/>
                        <br/>
                        <h4>New Rating: {rating} </h4>
                        <button className="btn btn-1 rate" onClick={() =>{
                            let object = {
                                game_id : parseInt(game.id),
                                rating : parseInt(rating)
                            }
                            updateRating(object, game.rated.id).then(() => render())
                        }}>Update Rating</button>
                        </div>
                        :
                        <div>
                        <h4>Your Rating: {rating}</h4>
                        <input type="range" min="1" max="10" value={rating} class="slider" onChange={
                            (event)=> setRating(event.target.value)
                        }/>
                        <br/>
                        <button className="btn btn-2 rate" onClick={() =>{
                            let object = {
                                game_id : parseInt(game.id),
                                rating : parseInt(rating)
                            }
                            createRating(object).then(() => render())
                        }}>Rate</button>
                        </div>}
                </section>
                        <ReviewFormAndList game={game} render={render}/>
    
    </>)
}