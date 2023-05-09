import {createStore,applyMiddleware,compose} from 'redux'
import reducer from '../reducer'
import thunkMiddleware from 'redux-thunk'//le paso por parametro esto al applyMiddleware para traducir (nos permite hacer peticiones a la api)

const composeEnhancer =window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__|| compose; //esta linea nos sirve para conectarnos con la extension del navegador redux_devtools
const store = createStore(
    reducer,
    composeEnhancer(applyMiddleware(thunkMiddleware))//esta linea me sirve para poder hacer peticiones a la api
)

export default store;