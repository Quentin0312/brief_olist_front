import { Switch, Match, onMount } from 'solid-js';
import Dashboard from './pages/dashboard';
import { request } from './request';
import {map} from './signals'

import Navbar from './components/Navbar';

function App() {

  const updateTitle = () => {
    map().update({
      title: {
        text: 'test'
      }
    })
  }
  // Récuperer le dernier elt de l'url
  const page = window.location.pathname


  return (<>
    <Navbar />
    <Switch fallback={<div>Page not found</div>}>
      <Match when={ page == "/" }> <Dashboard/></Match>
    </Switch>
  </>
  );
}

export default App;
