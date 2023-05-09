import React from 'react';
import {Link} from 'react-router-dom';
import style from "../styles/LandingPage.module.css"

export default function LandingPage() {
    return (
        <div className={style.landing}>
            <h1>Welcome to my Poke Api</h1>
            <Link to='/home'>
                <button  className={style.button}></button>
            </Link>
        </div>
    )
}