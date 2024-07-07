import React, {useState, useEffect}  from 'react';
import './App.css';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form';
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editMovie, setEditMovie] = useState(null);

  //!Refatoring dynamic token
  const [token, , removeToken] = useCookies(['mr-token']);


  useEffect(()=> {
    fetch("http://127.0.0.1:8000/api/movies/", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token['mr-token']}`
      }
    })
    .then(resp => resp.json())
    .then(resp => setMovies(resp))
    .catch(error => console.log(error))
  }, [token])

  useEffect( () => {
    if(!token['mr-token'] || token['mr-token'] === 'undefined' ){
      window.location.href = '/';
    } 
      
  }, [token])

  const loadMovie = movie => {
    setSelectedMovie(movie);
    setEditMovie(null);
  }

  const editClicked = movie => {
    setEditMovie(movie);
    setSelectedMovie(null);
  }

  const updateMovie = movie => {
    const newMovies = movies.map( mov => {
      if (mov.id === movie.id) {
        return movie;
      }
      return mov;
    })
    setMovies(newMovies);
  }

  const newMovie = () => {
    setEditMovie({title: '', description: ''});
    setSelectedMovie(null);
  }

  const movieCreated = movie => {
    const newMovies =[...movies, movie];
    setMovies(newMovies);
  }

  const removeClicked = movie => {
    const newMovies = movies.filter(mov => mov.id !== movie.id);
    setMovies(newMovies);
  }

  const handleLogout = () => {
    removeToken('mr-token'); // Menghapus token dari cookies
    window.location.href = '/'; // Mengarahkan ke halaman login
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1><FontAwesomeIcon icon={faFilm} /> Movie Rater</h1>
        <FontAwesomeIcon icon={faSignOutAlt} onClick={handleLogout} />
      </header>

      <div className='layout'> 
        <div> 
          <MovieList 
            movies={movies} 
            movieClicked={loadMovie} 
            editClicked={editClicked}
            removeClicked={removeClicked} 
          />
          <button onClick={ newMovie }>Creat New movie</button>
        </div>

        <MovieDetails movie={selectedMovie} updateMovie={loadMovie} />
        { editMovie  ? 
          <MovieForm movie={editMovie} updateMovie={updateMovie} movieCreated={movieCreated} /> : null }
       
      </div>


    </div>
  );
}

export default App;
