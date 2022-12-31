import MovieComponent from "../components/MovieComponent";
import "../styles/Movies.scss";
import { Fragment } from "react";
export default function Movies(props)
{
    let data=props.data;
    return (
    <div className="movies-container">
      <ul className="list">
        {data.map((movie) => (
          <MovieComponent
            key={movie.id}
            details={movie}
          />
        ))}
      </ul>
    </div>
    );
}