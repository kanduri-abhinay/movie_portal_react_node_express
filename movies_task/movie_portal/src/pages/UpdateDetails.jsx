import { useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData, groupData } from "../App";
export default function UpdateDetails(props) {
  const params = useParams();
  const movieId = params.movieId;
  let data = props.data.filter((item) => item.id == movieId)[0];
  const [details, setDetails] = useState({
    title: data.title,
    storyline: data.storyline,
    imdbRating: data.imdbRating,
    year: data.year,
    genres: data.genres,
    actors: data.actors,
    releaseDate: data.releaseDate,
  });

  if (!data) return <h1>no data found</h1>;
  const onChangeHandler = (event, field) => {
    setDetails((state) => {
      return {
        ...state,
        [field]:
          field == "actors" || field == "genres"
            ? event.target.value.split(",")
            : event.target.value,
      };
    });
  };
  const submitHanlder = (event) => {
    event.preventDefault();
    fetch("/updateMovieDetails", {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      mode: "no-cors",
      body: JSON.stringify({
        id:movieId,
        title: details.title,
        storyline: details.storyline,
        imdbRating: details.imdbRating,
        year: details.year,
        genres: details.genres,
        actors: details.actors,
        releaseDate: details.releaseDate,
      }),
    }).then((response) => {
      if (response.status == 200) {
        fetchData()
          .then((response) => {
            return response.json();
          })
          .then((resp) => {
            props.setData(resp);
            props.setGroupedData(groupData(resp));
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
    setDetails({
      title: "",
      storyline: "",
      imdbRating: "",
      year: "",
      genres: [],
      actors: [],
      releaseDate: "",
    });
    window.location.href="/my-app";
  };

  return (
    <form style={{ width: "60%", marginLeft: "auto", marginRight: "auto" }}>
      <div className="form-group">
        <label htmlFor="formGroupExampleInput">Title</label>
        <input
          type="text"
          className="form-control"
          id="formGroupExampleInput"
          value={details.title}
          onChange={(event) => onChangeHandler(event, "title")}
        />
      </div>
      <div className="form-group">
        <label htmlFor="formGroupExampleInput2">Story line</label>
        <textarea
          type="text"
          className="form-control"
          id="formGroupExampleInput2"
          rows="5"
          value={details.storyline}
          onChange={(event) => onChangeHandler(event, "storyline")}
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="formGroupExampleInput">IMDB Rating</label>
        <input
          type="text"
          className="form-control"
          id="formGroupExampleInput"
          value={details.imdbRating}
          onChange={(event) => onChangeHandler(event, "imdbRating")}
        />
      </div>
      <div className="form-group">
        <label htmlFor="formGroupExampleInput">Year</label>
        <input
          type="text"
          className="form-control"
          id="formGroupExampleInput"
          value={details.year}
          onChange={(event) => onChangeHandler(event, "year")}
        />
      </div>
      <div className="form-group">
        <label htmlFor="formGroupExampleInput">Genres</label>
        <input
          type="text"
          className="form-control"
          id="formGroupExampleInput"
          value={details.genres.join(",")}
          onChange={(event) => onChangeHandler(event, "genres")}
        />
      </div>
      <div className="form-group">
        <label htmlFor="formGroupExampleInput">Actors</label>
        <input
          type="text"
          className="form-control"
          id="formGroupExampleInput"
          value={details.actors.join(",")}
          onChange={(event) => onChangeHandler(event, "actors")}
        />
      </div>
      <div className="form-group">
        <label htmlFor="formGroupExampleInput">Release Date</label>
        <input
          type="text"
          className="form-control"
          id="formGroupExampleInput"
          value={details.releaseDate}
          onChange={(event) => onChangeHandler(event, "releaseDate")}
        />
      </div>
      <button
        type="button"
        className="btn btn-success"
        style={{
          width: "50%",
          marginLeft: "auto",
          marginRight: "auto",
          display: "inherit",
        }}
        onClick={submitHanlder}
      >
        Submit
      </button>
    </form>
  );
}
