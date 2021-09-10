import './App.scss';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import SearchBox from './components/searchBox/searchBox';
import itemDetail from './components/itemDetail/itemDetail';
import itemsList from './components/itemsList/itemsList';

const App = () => {
  return (
      <div>
        <BrowserRouter>
          <SearchBox/>
          <div className="container-routes">
            <Switch>
              <Route exact path="/items" component={itemsList}/>
              <Route path="/items/:id" component={itemDetail}/>
            </Switch>
          </div>
        </BrowserRouter>
      </div>
  );
}

export default App;
