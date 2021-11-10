import React, {useEffect, useState} from "react";
import { createReview } from "./Gamemanager";
import "./Game.css"

export const ReviewFormAndList = ({game, render}) => {
    const [currentEvent, setEvent] = useState("")
    
    return(<section>
                <h2>Reviews</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="review_description">Write Your Review: </label>
                        <input type="textarea" name="review_description" className="form-control"
                            value={ currentEvent }
                            onChange={(event) => setEvent(event.target.value)  } />
                    </div>
                </fieldset>
                <button className="btn btn-2" onClick={()=>{
                    let object = {
                        game_id : game.id,
                        description : currentEvent
                    }
                    createReview(object).then(() => {
                        render()
                        setEvent("")})
                }}>Add Review</button>
                {game.reviews?.map(review =>{
                    return( <div key={`review-${review.id}`} className="reviews_container">
                                <h4 key={`review-${review.id}__user`}>{review.player.user.username} Says!</h4>
                                <h5 key={`review-${review.id}__description`}>{review.description}</h5>
                    </div>)
                })}
    </section>)
}