import React from "react";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, filterByPokemonsType, filterCreated,resetPokemons, orderByName, orderByAttack,getTypes,setError} from '../actions';
import { Link } from 'react-router-dom';
import Card from "./Card";
import Paginado from "./Paginado";
import SerchBar from "./SearchBar";
import style from "../styles/Home.module.css"
import recargar from "../styles/img/flecha.png";
import logo from "../styles/img/pokedex1.png";
import Error from "./Error";

export default function Home() {
    const dispatch = useDispatch(); //esto es para dispatchar mis acciones.
    //traeme en allPokemons todo lo que esta en el estado de pokemons.
    const allPokemons = useSelector((state) => state.pokemons); //esto es lo mismo que hacer el mapStateToProps. y va a traer todos los personajes desde el reducer
    const allTypes = useSelector((state) => state.types);
    const error = useSelector((state) => state.error);

    //estados LOCALES: -.-
    const[orden,setOrden] = useState('');  //estado local vacio
    const [currentPage,setCurrentPage] = useState(1);  //guarda en un estado local la pagina actual y me la setea,lo pongo en 1 por que siempre se arranca desde la primera pagina.
    const [pokemonsPerPage] = useState(12);  //cuantos pokemones tengo por pagina.
    const indexOfLastPokemon = currentPage * pokemonsPerPage;    //indice del ultimo pokemon =>>>>> 12 que es mi pagina x mis personajes por pagina  esto da 12 1 pag por cant pokes osea 12 1x12=12
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;  //indice del primer pokemon //=>>>> 0
    const currentPokemons =  allPokemons.slice(indexOfFirstPokemon,indexOfLastPokemon); //allPokemons me trae del reducer el estado pokemons que me trae todos los pokemones ----- todos los pokemones que voy a tener en cada pagina. LO QUE HACE EL SLICE ES TOMAR UNA PORCION DEL ARREGLO DEPENDIENDO LO QUE LE ESTE PASANDO POR PARAMETRO.
    //porende lo que hace el allPokemons.slice es tomar un arreglo desde el indice 0 hasta el indice 12.
    //AHORA !! ATENTO A QUE COMO SON 2 POKEMONES,CON ESTA LOGICA EL INDICE 12 VA A QUEDAR VACIO AL SER UN ARRAY.POR QUE 11 POSICIONES SON 12 POKEMONES.
    //pagina 1------0--------12
    //pagina 2------12--------24  
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);  //setear la pagina en ese numero de pagina.
    }

    useEffect(() => {  //el useEffect me va llenando el estado cuando se monta el componente.
        dispatch(getPokemons())  //es lo mismo que el mapDispatchToProps.
        dispatch(getTypes());
    }, [dispatch])  //array vacio por que no depende nada y se monta tranquilamente.
    function handleClick(event) {       //tema botones,clicks o cosas que ejecuten cosas,siempre arriba.
        event.preventDefault();   // preventDefault para que no se me rompan las cosas y no se recargue la pagina.CADA VEZ QUE RECARGAMOS LOS ESTADOS DE REDUX VUELVEN A CARGARSE SI TENEMOS UN useEffect.
        dispatch(setError(false));
        dispatch(getPokemons());
    }
    
    function handleSort(event) {
        if (event.target.value === "asc" || event.target.value === "desc") {
            event.preventDefault();
            dispatch(orderByName(event.target.value));
            setCurrentPage(1);//seteamos el ordenamiento en la pag 1
            setOrden(`Ordenado ${event.target.value}`)  //cuando seteo la pagina me modifique el estado local y se renderize
        }
        if (event.target.value === "fue" || event.target.value === "deb") {
            event.preventDefault();
            dispatch(orderByAttack(event.target.value));
            setCurrentPage(1);//seteamos el ordenamiento en la pag 1
            setOrden(`Ordenado ${event.target.value}`) //setOrden es un estado local vacio y para lo unico que lo utilizo es cuando seteo la pagina me modifique el estado local y se renderize
        }
    }
    function handleFilterType(event) {
        if (event.target.value === "all") {
        event.preventDefault();
        dispatch(resetPokemons());
        } else {
        dispatch(filterByPokemonsType(event.target.value));
        }
        // dispatch(setCurrentPage(1)); esta es otra forma de solucionar lo del setcurrentpage
    }
    function handleFilterCreated(event) {
        dispatch(filterCreated(event.target.value));//la action es el target value es lo que viene en el select y como me llega de la action por el payload 
    }
    return (
        <div className={style.contHome}>
           <div className={style.navBar}>
            <div className={style.navIzq}>
                <Link to="/" >
                    <img src={logo} alt="logo" className={style.logo}></img>
                </Link>
            </div>
           <div className={style.navDer}>
          
            <Link to='/post' className={style.buttonCreate}>Create Pokemon</Link>

            <button onClick={event => { handleClick(event) }}  className={style.buttonRec}>
            <img
                src={recargar}
                alt="recargar"
                className={style.recargar}
            ></img>
            </button>
            </div>
            </div>     
           <div>
            <div className={style.filters}>
                <select onChange={(event) => handleSort(event)} className={style.order}>
                    <option value='asc'>Ascending</option> {/*lo que hace el value es permitirme acceder y preguntar si dentro del select si el value es asc o desc y hacer tal cosa.*/}
                    <option value='desc'>Descending</option>
                    <option value='fue'>Strong</option>
                    <option value='deb'>Weak</option>
                </select>
                <select onChange={(event) => handleFilterCreated(event)} className={style.created}>
                    <option value='All'>All</option>
                    <option value='Existing'>Existing</option>
                    <option value='Created'>Created</option>
                </select>
                <select onChange={(event) => handleFilterType(event)} className={style.types}>
                    <option value="All">All</option>  {/* el value tiene que coincidir con el value del back(de la api) */}
            
                    {allTypes.map((t) => {
                        return (
                            <option value={t.name} key={t.name}>
                                {t.name[0].toUpperCase() + t.name.slice(1)}
                            </option>
                        );
                    })}
                </select>
                </div>   
                <SerchBar></SerchBar>
                {error ? <Error></Error> : <Paginado
                    pokemonsPerPage = {pokemonsPerPage}
                    allPokemons = {allPokemons.length}
                    paginado = {paginado}
                />}
            <div className={style.containersCards}>
                {
                    //se pregunta si existe allPokemons y si existe se mapea.
                    currentPokemons?.map((el) => { //este componente ya se trajo al estado global, se mapea y le voy a pasar las props que necesita la Card.
                        //con currentPokemons tomamos los pokemones que me devuelva el paginado.
                        return (
                            /* es como un div, nada mas que no toma ningun espacio de la pagina. */
                                <Link className="" to={"/home/"}>
                                    <Card
                                        id={el?.id}
                                        key={el?.id}
                                        name={el?.name}
                                        image={el?.image ? el.image:el.image}
                                        types={el?.types.join(" ")}
                                    />
                                </Link>
                            
                        )
                    })
                }
               </div> 
            </div>
        </div>
    )
}

