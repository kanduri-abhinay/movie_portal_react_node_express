import { Link, useParams } from 'react-router-dom';
import '../styles/MovieDetails.scss';

export default function MovieDetails(props)
{
    const params=useParams();
    const movieId=params.movieId;
    let data=props.data.filter(item=>item.id==movieId)[0];
    if(!data)
    return <h1>no data found</h1>
   return( 
    <div className="card" style={{flexDirection:"row"}}>
    <img className="card-img-top" src={data.posterurl} alt="Card image cap" style={{height:"500px",width:"500px"}}/>
    <div className="card-body">
      <h5 className="card-title">{data.title}</h5>
      <p className="card-text">{data.storyline}</p>
      <p className='key-details'>IMDB Rating : </p>
      <p className="card-text key-details">{data.imdbRating}</p>
      <br/>
      <p className='key-details'>Year : </p>
      <p className="card-text key-details">{data.year}</p>
      <br/>
      <p className='key-details'>Genres : </p>
      <p className="card-text key-details">{data.genres.join(',')}</p>
      <br/>
      <p className='key-details'>Actors : </p>
      <p className="card-text key-details">{data.actors.join(',')}</p>
      <br/>
      <p className='key-details'>Release Date : </p>
      <p className="card-text key-details">{data.releaseDate}</p>
      <br/>
      <Link to={"/movies/update/"+data.id} className="btn btn-primary" style={{marginBottom:"30px"}}>Edit</Link>
    </div>
  </div>
  ); 
}