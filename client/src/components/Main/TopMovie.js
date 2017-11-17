import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Icon } from '../StyledComponents/Icon'
import {FlexRowCenter, FlexRowBetween} from '../StyledComponents/FlexContainers'

const Movie = FlexRowBetween.extend `
border: 1px solid #30415D;
padding: 10px;
font-size: 1.2em;
a {
    font-size: 1.4em;
    color: #30415D;
    text-decoration: none;
}
`
const IconContainer = FlexRowCenter.extend `
`
//component for the top movie list on the main page
class TopMovie extends Component {
    render() {
        return (
                <Movie key={this.props.movie.id}>
                    <Link to={`/movie/${this.props.movie.id}/${this.props.MovieUrl}`}>{this.props.movieIndex}. {this.props.movie.title}</Link>
                    {this.props.signedIn
                        ? <IconContainer>
                                {this.props.movie.favorite
                                    ? <Icon
                                            onClick={() => this.props.removeMovieFromFavorites(this.props.movie.favorite_id, this.props.movie.id, this.props.movie.likes)}
                                            src='../../../icons/SVG/star-full.svg'
                                            alt='In your Favorites'/>
                                    : <Icon
                                        onClick={() => this.props.handleMovieFavorite(this.props.movie.id, this.props.movie.likes)}
                                        src='../../../icons/SVG/star-empty.svg'
                                        alt='favorite'/>}
                                {this.props.movie.in_watchlist
                                    ? <Icon
                                            onClick={() => this.props.removeMovieFromWatchList(this.props.movie.watchlist_movie_id)}
                                            src='../../../icons/SVG/clipboard.svg'
                                            alt='In your WatchList'/>
                                    : <Icon
                                        onClick={() => this.props.handleMovieWatchList(this.props.movie.id)}
                                        src='../../../icons/SVG/list.svg'
                                        alt='Add to WatchList'/>}
                            </IconContainer>
                        : ''}
                </Movie>
        );
    }
}

export default TopMovie;