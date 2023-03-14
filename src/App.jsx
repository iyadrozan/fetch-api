import "./App.css";
import { getMovieList, searchMovie } from "./api";
import { useEffect, useState } from "react";

const App = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result);
    });
  }, []);

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <div key={i} className="Movie-wrapper">
          <div className="Movie-title">{movie.title}</div>
          <img
            alt=""
            src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
            className="Movie-image"
          />
          <div className="Movie-date">{movie.release_date}</div>
          <div className="Movie-rate">{movie.vote_average}</div>
        </div>
      );
    });
  };

  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchMovie(q);
      setPopularMovies(query.results);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Dunia Film</h1>
        <input
          className="Movie-search"
          type="text"
          placeholder="Cari judul film"
          onChange={({ target }) => search(target.value)}
        />
        <div className="Movie-container">
          <PopularMovieList />
        </div>
      </header>
    </div>
  );
};

export default App;
