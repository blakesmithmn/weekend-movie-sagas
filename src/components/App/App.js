import { HashRouter as Router, Route } from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList'
import MovieDetails from '../MovieDetails/MovieDetails';
import Header from '../Header/Header';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Route exact path="/">
          <MovieList />
        </Route>
        <Route exact path='/details/:id' >
          <MovieDetails />
        </Route>
        {/* Add Movie page */}
      </Router>
    </div>
  );
}


export default App;
