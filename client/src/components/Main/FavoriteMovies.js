import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {FlexColumnCenter, FlexRow} from '../StyledComponents/FlexContainers'

const FavoritesContainer = FlexColumnCenter.extend `
`
const Movie = FlexRow.extend`
border: 3px solid #cf6766;
margin: 10px;
width: 95%;
background: #30415D;
color: white
`
const Poster = styled.img`
    height: 60px;
    margin: 5px;
`
const MovieInfo = styled.div`
    a{
        color: white;
    }
`
//component to dsiplay user favorite movies list
class FavoriteMovies extends Component {
    render() {
        return (
            <FavoritesContainer>
                <h2>Favorite Movies:</h2>
                {this
                    .props
                    .movies
                    .map((movie) => {
                        const MovieUrl = movie
                        .title
                        .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
                        .split(' ')
                        .join('-')
                        .toLowerCase()
                        return (
                            <Movie key={movie.id}>
                                <Poster src={movie.poster} alt={movie.title} />
                                <MovieInfo>
                                <Link to={`/movie/${movie.id}/${MovieUrl}`}>
                                <h4>{movie.title}</h4>
                                </Link>
                                {/* <h5>{movie.tag_line}</h5> */}
                                </MovieInfo>
                            </Movie>
                        )
                    })}
            </FavoritesContainer>
        );
    }
}

export default FavoriteMovies;