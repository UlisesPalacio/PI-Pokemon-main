import {createStore,applyMiddleware,compose} from 'redux'
import reducer from '../reducer'
import thunkMiddleware from 'redux-thunk'               //le paso por parametro esto al applyMiddleware para traducir (nos permite hacer peticiones a la api)
                                                            //En resumen, "Thunk middleware" es una herramienta que permite manejar acciones asíncronas en aplicaciones de React y Redux.
const composeEnhancer =window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__|| compose; //esta linea nos sirve para conectarnos con la extension del navegador redux_devtools
const store = createStore(
    reducer,
    composeEnhancer(applyMiddleware(thunkMiddleware))//esta linea me sirve para poder hacer peticiones a la api
)

export default store;

                                                                                //Representa el estado de la aplicación, es conocido dentro de Redux como 
                                                                                //“la única fuente de la verdad”. Reducers: Son funciones JavaScript puras que
                                                                                //determinan como deberá ser actualizado el store en función de las acciones (actions).