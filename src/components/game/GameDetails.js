import React, {useState, useEffect} from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { getSelectedGame, createRating, updateRating, createGameImage } from "./Gamemanager";
import { ReviewFormAndList } from "./GameReview";

export const GameDetail = () => {
    const {gameId} = useParams()
    const [game, setGame] = useState({})
    const [rating, setRating] = useState(5)
    const history = useHistory()
    const [imageString, setImageString] = useState("")
    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }
    
    const createGameImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is", base64ImageString);
            
            setImageString(base64ImageString)
        });
    }
    
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
                        {game.pictures?.length > 0 ? 
                        <div className="game-image">
                        <div id="carouselExampleControls" class=" carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner">
                            {game.pictures.map((pic)=>{
                                return(<div class="carousel-item active ">
                                <img src={pic.action_pic} class="d-block w-100 " alt="none"/>
                              </div>)
                            })}
                          
                          
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                          <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                          <span class="carousel-control-next-icon" aria-hidden="true"></span>
                          <span class="visually-hidden">Next</span>
                        </button>
                      </div></div>
                        :""}
                        {game.is_host ? 
                        <> {game.pictures?.length > 0 ?
                                <button>Remove Image</button>
                                :
                                <>Upload Game Image<br></br><input type="file" id="pictures" onChange={ createGameImageString} />
                                <input type="hidden" name="game_id" value={game.id} />
                                <button onClick={() => {
                                    createGameImage({"game_id": game.id, "pictures": imageString})
                                }}>Upload</button></>}
                        </> :""}
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


{/* <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="..." class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="..." class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="..." class="d-block w-100" alt="...">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div> */}


{/* <div className="game-image">
                            {game.pictures?.map(pic => <img src={pic?.action_pic}/>)}
                            
                        </div> */}