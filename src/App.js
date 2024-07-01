import React, {useState, useEffect}  from 'react';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);

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

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Rater</h1>
      </header>

      <div className='layout'> 
          <div>
            {
              movies.map(movie => {
                return <h5>{ movie.title }</h5>
              })}
          </div>


          
          <div>Movie Details</div>
        </div>


    </div>
  );
}

export default App;
