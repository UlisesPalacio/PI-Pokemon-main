import React from "react";
import {Link} from 'react-router-dom'
import style from "../styles/Card.module.css"

// Como vamos a pasar las propiedades por props no hace falta traer ningun estado por que tenemos la logica en el Home.
export default function Card ({image,name,types,id}) {  //aca me traigo las propiedades
    return (
        
            <Link to={`/detail/${id}`}  className={style.contCard}>
                <div className={style.name}>{name[0].toUpperCase() + name.slice(1)}</div>
                <img src={image} alt="img card" className={style.img}></img>
                <div className={style.types}>
                <h5>{types}</h5>
                </div>
            </Link>
    )
}

// export default function Card({ name, image, types, id }) {
//   return (
//     <Link to={`/pokemons/${id}`}>
//       <div>{name[0].toUpperCase() + name.slice(1)}</div>
//       <img src={image} alt="imagen card"/>
//       <div>
//         {types.map((type) => (
//           <div key={id + type}>
//             {type.toUpperCase()}
//           </div>
//         ))}
//       </div>
//     </Link>
//   );
// }