import Dsll from './components/Navbar'
import MintToken from './components/MintSection/MintToken'
import MarketPlace from './components/MarketPlaceSection/MarketPlace'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// Routing and Link, Home is the Minting process
// Lay down IPFS in the context + IPFS calls with HTPP 
// ya
function App() {
  return (
    <Router>
       <Switch>
          <Route exact path="/">
            <Dsll/> 
            <MintToken />
          </Route>
          <Route path="/about">
            <Dsll/> 
          </Route>
          <Route path="/dashboard">
            <MarketPlace />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
