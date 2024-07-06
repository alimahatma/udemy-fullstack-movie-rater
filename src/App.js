import React, {useState, useEffect}  from 'react';
import './App.css';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form';

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editMovie, setEditMovie] = useState(null);

  useEffect(()=> {
    fetch("http://127.0.0.1:8000/api/movies/", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token 4e10a5822145ebc55cdf800741f0479b10a16d1c'
      }
    })
    .then(resp => resp.json())
    .then(resp => setMovies(resp))
    .catch(error => console.log(error))
  }, [])

  // const movieClicked = movie => {
  //   setSelectedMovie(movie);
  // }

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

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Rater</h1>
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
