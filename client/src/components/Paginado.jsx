import React from "react";
import style from "../styles/paginado.module.css"

export default function Paginado({ pokemonsPerPage, allPokemons, paginado }) {   //destructuring del otro componente.(estados locales).
    const pageNumbers = [];
    //Recorro un array en donde voy a redondear para arriba la division entre todos los pokemones por los pokemones por pagina que yo quiero.
    //Y con lo que genero ahi se pushea en pageNumbers donde va a tener un array de numeros con los resultados.
    for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {  //Math.ceil redondea para arriba.
        pageNumbers.push(i);
    }

    return (
        <div className={style.contCards}>
            <ul className={style.paginado}>
                
                {pageNumbers && pageNumbers.map(number => (  //Si tengo este arreglo,mapealo y devolveme por ese arreglo cada uno de los numeros que te devuelva el paginado.
                    <li className='number' key={number}>           {/* key es para que no tire warning ----- buena practica */}
                        <button className={style.button} onClick={() => paginado(number)} >{number}</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}