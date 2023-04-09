import { Switch, Match, onMount } from 'solid-js';
import Dashboard from './pages/dashboard';
import {map} from './signals'

import Navbar from './components/Navbar';

function App() {
  // Récuperer le dernier elt de l'url
  const page = window.location.pathname

  /** Exemple de comment utiliser le signal map() qui contient l'objet highcharts.chartMap() */
  const updateTitle = () => {
    map().update({ title: { text: 'test' } })
  }



  return (<>
    <Navbar />
    <Switch fallback={<div>Page not found</div>}>
      <Match when={ page == "/" }> <Dashboard/></Match>
    </Switch>
  </>
  );
}

export default App;
