import React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom' 
import { FlexRow } from '../StyledComponents/FlexContainers'

const Movie = styled.div `
border: 3px solid #30415D;
margin: 20px;
padding: 20px;
width: 40vw;
color: white;
h3 {
    text-align: center;
    margin: 0px;
}
img {
    height: 200px;
    margin: 10px;
}
div {
    background: #30415D;
    padding: 5px;
    a {
        color: white;
        text-decoration: none;
    }
}
@media (max-width: 850px) {
    margin: 5px;
    padding: 5px;
    width: auto;
}
`
const RandomInfo = FlexRow.extend `
p {
    font-size: 1.2em;
}
`

const RandomMovie = (props) => {
    return (
        <Movie>
                <div>
                    <Link to={`/movie/${props.randomMovie.id}/${props.randomMovieUrl}`}>
                        <h3>{props.randomMovie.title}</h3>
                        <RandomInfo>
                            <img src={props.randomMovie.poster} alt={props.randomMovie.title}/>
                            <div>
                                <p>{props.randomMovie.tag_line}</p>
                                <p>Rating: {props.randomMovie.rating}/10</p>
                                <p>Plot: {props.randomMovie.plot}</p>
                            </div>
                        </RandomInfo>
                    </Link>
                </div>
        </Movie>
    );
};

export default RandomMovie;