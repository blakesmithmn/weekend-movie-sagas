import { HashRouter as Router, Route } from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList'
import MovieDetails from '../MovieDetails/MovieDetails';
import Header from '../Header/Header';
import MovieSearch from '../MovieSearch/MovieSearch';

// MUI IMPORTS
import { createTheme, ThemeProvider } from '@mui/material/styles';


function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#1B2021',
        contrastText: '#DAF5FF',
      },
      secondary: {
        main: '#028090',
        contrastText: '#FFFFFF',
      },
      background: {
        paper: 'rgba(244,245,245,0.7)',
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
