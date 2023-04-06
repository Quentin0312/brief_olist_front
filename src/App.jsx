import logo from './logo.svg';
import { Switch, Match } from 'solid-js';
import Dashboard from './pages/dashboard';
import Login from './pages/login';

function App() {

  // Récuperer le dernier elt de l'url
  const page = window.location.pathname

  return (<>
    <Switch fallback={<div>Page not found</div>}>
      <Match when={ page == "/" }> <Dashboard/></Match>
      <Match when={ page == "/login" }> <Login/></Match>
    </Switch>
  </>
  );
}

export default App;
