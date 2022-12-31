import { Fragment } from "react";
import '../styles/Genres.scss';
import Movies from "./Movies";

export default function Genres(props)
{
    let data=props.data;

    return(
        <div className="genres-container">
            {Object.keys(data).map((genre)=>
            {
            return (
            <Fragment key={genre}>
                <div className="genre-title">{genre}</div>
                <Movies data={data[genre]}/>
            </Fragment>);
            })}
        </div>
    );
}