import React ,{useState,useEffect} from "react";
import {Link,useHistory} from "react-router-dom"
import {postPokemon,getTypes} from "../actions/index"
import {useDispatch,useSelector} from "react-redux"
import style from "../styles/PokemonCreate.module.css"
import oak from "../styles/img/oak2.png"
import miniPoke from "../styles/img/minipoke.png"

function validate(input){//input es mi estado local
    let errors={};
    if(!input.name){//si en mi estado local .name no hay nada 
        errors.name="requires name";//entonces en mi objeto .name pone un string que diga se requiere un nombre
    }
    if (!input.hp || input.hp < 0 || input.hp > 150) {
        errors.hp = "Must have hp between 1 - 150";
    }
    
    if (!input.attack || input.attack < 0 || input.attack > 150) {
        errors.attack = "Must have attack between 1 - 150";
    }
    
    if (!input.defense || input.defense < 0 || input.defense > 150) {
        errors.defense = "Must have defense between 1 - 150";
    }
    
    if (!input.speed || input.speed < 0 || input.speed > 150) {
        errors.speed = "Must have speed between 1 - 150"
    }
    
    if (input.types.length === 0) {
        errors.types = "Must have at least one type";
    }
    return errors;
}




export default function PokemonCreate(){
    const dispatch = useDispatch();
    const history = useHistory();// es un metodo del router lo que hace es redirigirme ala ruta que yo le diga 
    const types = useSelector((state)=>state.types)           //me voy a traer los tipos (que es un estado )
    const [errors,setErrors]=useState({})  //me genero un estado local que va a ser un objeto vacio                                                           
    const [input,setInput] = useState({//para crear mi pokemon debe haber un formulario y lo guardo en un estado
        name:"",                         //me voy a crear el estado con input y set input y hago un objeto que le voy a pasar todo lo que necesita el post
        image:"",
        hp:"",
        attack:"",   //aca se va llenando  mi estado 
        defense:"",
        speed:"", 
        height:"",
        weight:"",
        types:[]//va en un array sino no vay a poder poner mas de uno
    })              

    function handleChange(event){ //estp se va a ir manejando cada ves que cambien o se modifiquen mis inputs  lo que queremos es ir guardando las cosas que el usuario va escribiendo en el input en mi estado input
        setInput({ //seteame ese estado   
            ...input, //y traete todo lo que ya tenias
            [event.target.name]: event.target.value //el event.target.name seteamelo en event.target.value 
        })                           //cada ves que ejecutes esta funcion a mi estado input ademas de lo que tiene agregale el target value de lo que este modificando
        
        setErrors(validate({
            ...input,
            [event.target.name]: event.target.value
        }));
        console.log(input);
    
    }//osea va a setearse dependiendo de que input yo esta

    function handleSelect(event){
        setInput({//que es el estado donde yo voy a guardar todo y le voy a decir 
            ...input,
            types:[...input.types,event.target.value] //cuando le mandamos los types traeme lo que ya habia (...input) concatenale el target value y lo que hace es ir agregando en un arreglo todo lo que yo guarde en el select
        
        })
        console.log(input);
    }

    function handleSubmit(event){
        event.preventDefault()
        dispatch(postPokemon(input)); //despachamos la accion
        alert("Successfully created pokemon");
        setInput({//de esta forma seteamos el input a 0 una ves creado el nuevo pokemon
        name:"",
        image:"",
        hp:"",
        attack:"",   
        defense:"",
        speed:"", 
        height:"",
        weight:"",
        types:[]

        })
        history.push("/home");//cuando termines de crear el personaje agarra y llevame al home
    }

    function handleDelete(event){//seteo el input
    setInput({
        ...input,
        types: input.types.filter(typ => typ !== event)//filtramelo por todo lo que no sea ese elemento 
    })}//y de devuelve el estado nuevo sin ese elemento que yo clickie 

    useEffect(()=>{ //con esto vamos a hacer el dispatch de los types por que vamos a tener que renderizarlas
        dispatch(getTypes())
    },[])

    return( //aca viene el renderizado metemos todo en un div
        <div className={style.Create}>
                <div className={style.navBar}>
                    <Link to="/home"><button  className={style.buttonHome}>Back to home</button></Link>
                </div>  
            <div className={style.contGral}>
                <div className={style.cardCreate}>
                    <img src={oak} alt="oak" className={style.oak} /> 
                    <div className={style.redTitle}>
                        <img src={miniPoke} alt="miniPoke" className={style.poke}></img>
                        <div className={style.title}> Create your pokemon</div>
                    </div>
                    <form onSubmit={(event)=>handleSubmit(event)}>
                        <div className={style.form}>
                            <div  className={style.izq}>
                                <div>Name:</div>
                                <div>
                    
                                    <input
                                    type="text"
                                    value={input.name}
                                    name="name"
                                    className={style.inputs}
                                    onChange={(event)=>handleChange(event)}
                                    />
                                    {errors.name &&(//si esta mi estado errors.name entonces renderizame un p con ese error y me va a renderizar el texto que le pase a la funcion 
                                    <p className="error">{errors.name}</p>
                                    )}
                                </div>
                                <label>Image:</label>
                                <div>
                                    <input
                                        type="text"
                                        value={input.image}
                                        name="image"
                                        className={style.inputs}
                                        onChange={(event)=>handleChange(event)}
                                    />
                                </div>
                                <div>hp:</div>
                                <div>
                                    <input
                                        type="number"
                                        value={input.hp}
                                        name="hp"
                                        className={style.inputs}
                                        onChange={(event)=>handleChange(event)}
                                        />
                                </div>
                                <div>attack:</div>
                                <div>
                                    <input
                                        type="number"
                                        value={input.attack}
                                        name="attack"
                                        className={style.inputs}
                                        onChange={(event)=>handleChange(event)}
                                        />
                                </div>
                                <div>defense:</div>
                                <div>
                                    <input
                                        type="number"
                                        value={input.defense}
                                        name="defense"
                                        className={style.inputs}
                                        onChange={(event)=>handleChange(event)}
                                    />
                                    {errors.defense && (
                                        <div className={style.error}>{errors.defense}</div>
                                    )}
                                </div>
                                <div>Types:</div>
                                <div>
                                    <select onChange={(event=>handleSelect(event))} 
                                        className={style.select}
                                        disabled={input.types.length >= 2}
                                        defaultValue="title"
                                    >
                                        <option value="title" disabled name="types"></option>   
                                            {types.map((typ)=>(
                                                <option value={typ.name} 
                                                    key={typ.name}
                                                    className={style.options}
                                                    >
                                                    {typ.name[0].toUpperCase() + typ.name.slice(1)}
                                        </option>
                                        ))}         
                                    </select>

                                    <ul className={style.types}>
                                            {input.types.map(event=>// (siempre que hacemos un map hay que hacer un div )esto es el estado local y este estado local va a tener todas las ocupaciones que yo valla guaardando enconces mapeamelo
                                                <div className="divTyp">
                                                    <li key={event} className={style.types}>
                                                        {event[0].toUpperCase() + event.slice(1)}
                                                        <button  onClick={()=>handleDelete(event)} className={style.deleteButton} >X</button>
                                                    </li>
                                                </div> 
                                            )}
                                    </ul>
                                    {errors.types && (
                                        <div className={style.error}>{errors.types}</div>
                                    )}
                                </div>     
                            </div>
                            <div>
                                <div className={style.der}>     
                                        <div>height:</div>
                                        <input
                                            type="number"
                                            value={input.height}
                                            name="height"
                                            className={style.inputs}
                                            onChange={(event)=>handleChange(event)}
                                        />
                                        <div>weight:</div>
                                        <div>
                                            <input
                                            type="number"
                                            value={input.weight}
                                            name="weight"
                                            className={style.inputs}
                                            onChange={(event)=>handleChange(event)}
                                            />
                                        </div>
                                        <div>speed:</div>
                                        <div>
                                            <input
                                                type="number"
                                                value={input.speed}
                                                name="speed"
                                                className={style.inputs}
                                                onChange={(event)=>handleChange(event)}
                                            />
                                        </div>    
                                        <button type="submit" className={style.button}>Create</button>
                                </div> 
                            </div>     
                        </div>  
                    </form>
                </div> 
            </div> 
        </div>
    )

}           //rendirizame un parrafo con el elemento y ademas un boton que cuando yo le haga un click me ejecute esta funcion handleDelete

//nos agarramos el estado que nos trajimos con el useSelector