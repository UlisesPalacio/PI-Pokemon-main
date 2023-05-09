import React from "react";
import { useState } from "react";
import {useDispatch} from "react-redux";
import {getNamePokemons} from "../actions/index";
import style from "../styles/SearchBar.module.css"
import buscar from "../styles/img/buscar.png"

export default function SerchBar(){
    const dispatch = useDispatch();
    const [name,setName] = useState("");

    function handleInputChange(event){
        event.preventDefault();
        setName(event.target.value);
        
    }

    function handleSubmit(event){
        event.preventDefault();
        dispatch(getNamePokemons(name));//name es mi estado local yo voy a ir guardando lo que esta tipeando el usuario
        setName("");                    // en mi estado local name enconces lo que yo tengo en mi estado local va  a llegarla a mi accion
                                    //que va a llamar al back y le va a pasar (name) que es lo que esta escribiendo el usuario
    }

    return(
        <div className={style.search}>
            <input type="text" 
            placeholder="Search poke..."
            onChange={(event) => handleInputChange(event)}  className={style.input} value={name}

            />

            <button type="submit" onClick={(event)=> handleSubmit(event)}  className={style.searchButton}>
            <img src={buscar} alt="buscar" className={style.buscar}></img>
            </button>
        </div>
        
    )


}