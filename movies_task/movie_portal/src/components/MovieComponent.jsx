import { Link } from 'react-router-dom';

import '../styles/MovieComponent.scss';

const MovieComponent = (props) => {
  return (
    <li>
      <Link to={"/movies/"+props.details.id} className="movie-item-btn">
        <div className='movie-item-container'>
          <img src={props.details.posterurl}/>
          <div className="movie-title">{props.details.title}</div>
          <div className='movie-genre'>{props.details.genres.join(" , ")}</div>
        </div>
      </Link>
    </li>
  );
};

export default MovieComponent;