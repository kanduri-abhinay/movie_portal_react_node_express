import  '../styles/NavBar.scss';
import { NavLink } from 'react-router-dom';
export default function NavBar(props)
{
return (
    <nav className='nav'>
        <ul>
            <li><NavLink activeClassName="active" to="/movies">All Movies</NavLink></li>
            <li><NavLink activeClassName="active" to="/Genres">Genres</NavLink></li>
        </ul>
       <button className='user-info-btn'>
        <span className='user-info-icon'></span>
       </button>
    </nav>
);
}