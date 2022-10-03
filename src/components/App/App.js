import { HashRouter as Router, Route } from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList'
import MovieDetails from '../MovieDetails/MovieDetails';
import Header from '../Header/Header';
import MovieSearch from '../MovieSearch/MovieSearch';

// MUI IMPORTS
import { createTheme, ThemeProvider } from '@mui/material/styles';


function App() {
  // CREATE THEME FOR CONSISTENT COLORS!
  const theme = createTheme({
    palette: {
      primary: {
        main: '#333533',
        contrastText: '#574AE2',
      },
      secondary: {
        main: '#202020',
        contrastText: '#FFD100',
      },
      background: {
        paper: 'rgba(244,245,245,0.5)',
      }
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Header />
          <Route exact path="/">
            <MovieList />
          </Route>
          <Route exact path='/details/:id' >
            <MovieDetails />
          </Route>
          <Route exact path='/search'>
            <MovieSearch />
          </Route>
        </Router>
      </ThemeProvider>
    </div>
  );
}


export default App;
