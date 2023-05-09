import axios from "axios";
import { GET_POKEMONS, GET_TYPES,POKE_DETAIL, CLEAN_DETAIL,FILTER_BY_TYPE,FILTER_CREATED,RESET_POKEMONS,ORDER_BY_NAME, ORDER_BY_ATTACK,GET_NAME_POKEMONS,SET_ERROR } from "./action-types";
//import { bindActionCreators } from "redux";

export function getPokemons() {
  return async function (dispatch) {
    try{
      var json = await axios.get("http://localhost:3001/pokemons", {}); //Conexion entre el back y el front. 3 lineas de codigo!!! por default hace axios.get
      return dispatch({
        type: GET_POKEMONS,
        payload: json.data,
      });
    }catch (error) {
      return dispatch({
        type: SET_ERROR,
        payload: true,
      });
    }
  };
}

export const getPokeDetail =(id)=>{

  return function(dispatch){
      fetch(`http://localhost:3001/pokemons/${id}`)
      .then(response => response.json())
      .then(data => dispatch({type:POKE_DETAIL, payload:data}))
  }
}

export const cleanDetail =()=>{ //cliandetail no es mas que una funcion que retorna un objeto (3)
  return {type:CLEAN_DETAIL}
}


//TENER EN CUENTA QUE LA LOGICA HAY QUE TRATAR DE HACERLO EN EL REDUCER Y EN LOS COMPONENTES. LA ACTION ES PARA DESPACHAR UN TIPO.

export function filterByPokemonsType(payload) {
  //payload = value que me va a llegar del select en Home.
  return {
    type: FILTER_BY_TYPE,
    payload,
  };
}


export function resetPokemons() {
  return {
    type: RESET_POKEMONS,
  };
}

export function setError(payload) {
  return {
    type: SET_ERROR,
    payload,
  };
}

export function getNamePokemons(payload){//se puede llamar name o payload
  return async function(dispatch){
    try {
      var json= await axios.get("/pokemons?name=" + payload)
      return dispatch({
        type: GET_NAME_POKEMONS,
        payload:json.data//esto me devuelve la accion y json.data lo que va a hacer es que cuando busquemos por name en la barra
                            //de busqueda devuelva lo que devuelva la ruta por name una ves asignado 
      })
    } catch(error){
      return dispatch({
        type: SET_ERROR,
        payload: true,
      });
    }
  }

}

export function getTypes() {
  return async function (dispatch) {
    const json = await axios.get("/Types");
    return dispatch({
      type: GET_TYPES,
      payload: json.data,
    });
  };
}

export function postPokemon(payload){
  return async function (dispatch) {
    const response = await axios.post("/post",payload);
    return response;
  }
  
}

export function filterCreated(payload) {
  return {
    type: FILTER_CREATED,
    payload,
  };
}


export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

export function orderByAttack(payload) {
  return {
    type: ORDER_BY_ATTACK,
    payload,
  };
}