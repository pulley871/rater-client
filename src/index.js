
  
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { Rater } from "./components/Rater.js"
import "./index.css"

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Rater />
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
)