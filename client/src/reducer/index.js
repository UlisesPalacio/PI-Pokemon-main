import { GET_POKEMONS,
        GET_NAME_POKEMONS,
        GET_TYPES,
        POKE_DETAIL,CLEAN_DETAIL,
        FILTER_BY_TYPE,
        FILTER_CREATED,
        ORDER_BY_NAME,
        ORDER_BY_ATTACK,
        RESET_POKEMONS,
        POST_POKEMON,
        SET_ERROR,
        DELETE_POKEMON,
      RESET_POKEDETAIL } from "../actions/action-types";

const initialState = {
  pokemons: [],
  allPokemons: [], //copia del estado que siempre tenga todos los pokemones.
  types: [],
  error: false,
  pokeDetail:{},
  currentPage:1
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload, //en mi estado pokemons que en un principio es un array vacio manda todo lo que te mande la accion GET_POKEMONS.
        allPokemons: action.payload, //meteme todos los pokemones en allPokemons.
      };
  case POKE_DETAIL:
      return {
        ...state,
        pokeDetail:action.payload
        };
  case CLEAN_DETAIL:  //el caso de que sea clean detail le voy a retornar una copia de todo lo que habia en el estado y pokeDetail le pisa el valor con un objeto vacio
      return { //(4) //el reducer empieza a evaluar, te doy una copia del estado para no perder el anterior 
                ...state,
                pokeDetail:{} //y pokeDetail ahora va  a estar vacio 
            };
  case FILTER_BY_TYPE:
                                                    //la logica va antes del return,si va adentro se rompe.
      const allPokemons = state.allPokemons; //cuando se filtre primero todos los pokemons siempre van a ser el array que tiene todo => allPokemons.
      const typeFiltered =
        action.payload === "All"
          ? allPokemons //si mi payload es todo,me devuelve todo.
          : allPokemons.filter((e) => e.types.includes(action.payload)); //sino entra en allPokemons,filtra por el payload que llega.
      return {
        ...state,
        pokemons: typeFiltered, //en mi estado filteredPokemons suceda todo lo de arriba,ya que no se puede hacer logica adentro del return.
        currentPage: 1,
        error: false,
      };
  case RESET_POKEMONS:
        const allPokemonsTotal = [...state.allPokemons];
        return {
        ...state,
        pokemons: allPokemonsTotal,
        currentPage: 1,
        error: false,
      };
      case RESET_POKEDETAIL:
        return {
        ...state,
        
      };
  case SET_ERROR:
        return {
          ...state,
          error: action.payload,
        };    
  case GET_TYPES:
      return {
          ...state,
          types: action.payload,
        };
  case GET_NAME_POKEMONS:
    return{
      ...state,
      pokemons: action.payload
    };
  case POST_POKEMON:
    return{
        ...state                        //el post lo unico que hace es devolverme el estado como esta por que yo voy a crearlo en una ruta nueva 
      }
  case DELETE_POKEMON:
    return {
        ...state,
      };    
  case FILTER_CREATED:
      const createdFilter =
        action.payload === "Created"
          ? state.allPokemons.filter((el) => el.createdInDb)
          : state.allPokemons.filter((el) => !el.createdInDb);
      return {
        ...state,
        pokemons:
          action.payload === "All" ? state.allPokemons : createdFilter,
      };
      //createdFilter
  case ORDER_BY_NAME:
      const allPokes = [...state.pokemons]; //basicamente lo que esta haciendo el sort es comparando 2 valores que en este caso queremos acceder 
                                            //al name y los va a poner a la derecha o a la izquierda  antes o despues en el array dependiendo si son mas grandes o mas chicos 
      const sortedPokemon =
        action.payload === "asc"
          ? allPokes.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : allPokes.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        pokemons: sortedPokemon,
      };
  case ORDER_BY_ATTACK:
      const allPoke = [...state.pokemons];
      const sortedPokemonAttack =
        action.payload === "fue"
          ? allPoke.sort(function (a, b) {
              if (a.attack > b.attack) {
                return -1;
              }
              if (b.attack > a.attack) {
                return 1;
              }
              return 0;
            })
          : allPoke.sort(function (a, b) {
              if (a.attack > b.attack) {
                return 1;
              }
              if (b.attack > a.attack) {
                return -1;
              }
              return 0;
            });
      return {
        ...state,
        pokemons: sortedPokemonAttack,
      };
    default:
      return state;
  }
}

export default rootReducer;
