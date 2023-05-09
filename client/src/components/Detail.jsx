import {  getPokeDetail,cleanDetail } from "../actions/index.js";        //me traigo al action     
import { useDispatch,useSelector } from "react-redux";// use dispatch para hacer el dispatch de esa action  con use selector me traigo la info del estado global
import { useEffect } from "react";
import { useParams,Link } from "react-router-dom";
import style from "../styles/Detail.module.css"
import loading from "../styles/img/pokebola3.png";



const PokeDetail =()=>{
    const dispatch = useDispatch();
    const {id}=useParams(); //use params me retorna un objeto por eso podemos hacer distractori
    
    const pokeDetail = useSelector((state)=>state.pokeDetail)
    //dodmount unmount update siclos de vida en el useEffect
    useEffect(()=>{ //cuando se retorna una funcion el useEffect  lo que hace es ejecutar el return cuando se desmonta el componente 
        dispatch(getPokeDetail(id)); //(didmount)//el id lo sacamos de use params  cuando estemos en el componente de detalles queremos que
            //queremos que se cargue la info del personaje para poder visualizarla 
        return ()=> dispatch(cleanDetail()) //(unmount)//cuando yo no este en estoy en este componente y no estoy viendo el detalle de ningun videojuego quiero que
        //se me limpie el estado por que sino se me muestra unos milisegundos la info del personaje anterior y eso no debe pasar entonces
        //creamos una action que se llame cleandetail que se va a ejecutar cuando se desmonta el componente y cuando pase eso se va a 
        //despachar la action cleandetail que lo que hace es limpiarme el estado (1)
    },[dispatch]);//(update)
    return (
        <div className={style.allDetail}>
            <div className={style.navBar}>
                <Link to="/home">
                    <button className={style.buttonHome}>Return to home</button>
                </Link>
            </div>
            {pokeDetail.length ? (  
            <div className={style.contGral}>
                <div className={style.contRed}>
                    <div className={style.contGris}>
                        <div className={style.contIzq}>
                            <div className={style.circulo}>
                                <img src={pokeDetail[0]?.image}
                                alt="imagen-del-pokemon"
                                className={style.image}  ></img>
                            </div>   
                            <div className={style.infoBasica}>
                                <div className={style.name}>
                                    <h1>{pokeDetail[0]?.name}</h1>
                                </div>     
                                <div className={style.number}>Types:</div>
                                <p className={style.types}>{pokeDetail[0]?.types.join(" ")}</p>
                                <div className={style.id}>ID #{pokeDetail[0]?.id}</div>
                            </div> 
                        </div> 
                            <div className={style.contDer}>
                                <div className={style.stats}>
                                    <div className={style.number}>hp</div>
                                    <p>{pokeDetail[0]?.hp}</p>
                                    <div className={style.number}>attack</div>
                                    <p>{pokeDetail[0]?.attack}</p>
                                    <div className={style.number}>defense</div>
                                    <p>{pokeDetail[0]?.defense}</p>
                                    <div className={style.number}>speed</div>
                                    <p>{pokeDetail[0]?.speed}</p>
                                </div>    
                                <div className={style.alturaPeso}>
                                    <div className={style.medidas}>
                                        <div className={style.title}>height:</div>
                                        <p>{pokeDetail[0]?.height}</p>
                                </div>
                                    <div className={style.medidas}>  
                                        <div className={style.title} >weight:</div>
                                        <p>{pokeDetail[0]?.weight}</p>
                                    </div>    
                                </div>
                            </div>    
                    </div>       
                </div>   
            </div>
         ) : (
            <div className={style.poke}>
              <img src={loading} alt="loading" className={style.pokeball} />
            </div>
          )}   
        </div>  
    )
}

export default PokeDetail;
