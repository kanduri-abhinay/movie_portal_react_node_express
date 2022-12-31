import "./App.css";
import NavBar from "./components/NavBar";
import { Suspense, useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import React from "react";
const Movies = React.lazy(() => import("./pages/Movies"));
const Genres = React.lazy(() => import("./pages/Genres"));
const MovieDetails = React.lazy(() => import("./pages/MovieDetails"));
const UpdateDetails = React.lazy(() => import("./pages/UpdateDetails"));
export const fetchData = () => {
  const data = fetch("/getMovies", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "no-cors",
  });

  return data;
};
export const groupData = (data) => {
  let result = data.reduce((acc, item) => {
    item.genres.forEach((genre) => {
      if (!acc[genre]) {
        acc[genre] = [];
      }
      acc[genre].push(item);
    });
    return acc;
  }, {});
  return result;
};
function App() {
  const [moviesData, setData] = useState([]);
  const [grouped_data, setGroupedData] = useState({});
  useEffect(() => {
    fetchData()
      .then((response) => {
        return response.json();
      })
      .then((resp) => {
        setData(resp);
        setGroupedData(groupData(resp));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <NavBar />
      <Suspense fallback="<h1>loading...</h1>">
        <Switch>
          <Route path="/" exact>
            <Redirect to="/movies" />
          </Route>
          <Route path="/movies" exact>
            <Movies data={moviesData} />
          </Route>
          <Route path="/movies/update/:movieId">
            <UpdateDetails
              data={moviesData}
              setData={setData}
              setGroupedData={setGroupedData}
            />
          </Route>
          <Route path="/movies/:movieId">
            <MovieDetails data={moviesData} />
          </Route>
          <Route path="/Genres">
            <Genres data={grouped_data} />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
