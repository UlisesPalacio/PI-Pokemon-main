import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import Detail from "./components/Detail";
import PokemonCreate from "./components/PokemonCreate";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* el Switch va a envolver a cada ruta y va de ruta a ruta. Si el link no existe te toma el ultimo */}
        
          <Route exact path="/" component={LandingPage}></Route>
          <Route path="/home" component={Home}></Route>
          <Route path="/detail/:id" component={Detail}/>
          <Route path="/post" component={PokemonCreate}/>
        
      </div>
    </BrowserRouter>
  );
}

export default App;


