import React, { Component } from 'react';
import styled from 'styled-components'
import axios from 'axios'
import { Link } from 'react-router-dom'

import { FlexRow, FlexRowBetween } from '../StyledComponents/FlexContainers'
import MovieComments from '../Comments/MovieComments'
import MovieReviews from '../Review/MovieReviews'


const MovieInfo = FlexRow.extend `
padding-top: 80px;
width: 100%;
height:50vh;
min-height: 275px;
color: white;
background: #30415D;

@media (max-width: 500px) {
    flex-direction: column;
    height: auto;
}
`
const Poster = styled.img`
    height: 90%;
    margin: 10px 40px;
@media (max-width: 500px) {
    height: 200px;
}
`

const Info = styled.div`
    width: 75%;
    font-size: 1.2em;
    div {
        margin: 5px;
    }
    p {
        font-size: .8em;
    }
`
const ReviewList = styled.div`
    margin: 20px;
    @media (max-width: 500px) {
        margin: 5px
    }
`




const AddIcon = styled.img`
    margin: 20px;
@media (max-width: 500px) {
    height: 25px;   
}
`
const Icon = styled.img`
    margin: 20px;
@media (max-width: 500px) {
    height: 25px; 
    margin: 5px;  
}
`
const UserOptions = FlexRow.extend`
    h5 {
        margin: 10px 40px;
    }
    @media (max-width: 500px) {
       h5{ 
        margin: 5px;
       }
    }      
`

class MoviePage extends Component {
    state = {
        movie: {},
        reviews: [],
        favorite: {
            favorite: false,
        },
        comments: []
    }

    componentWillMount() {
        const { movieId } = this.props.match.params
        this.getMovie(movieId)
    }

    componentWillReceiveProps(newProps) {
        const { movieId } = newProps.match.params
        this.getMovie(movieId)
    }

    getMovie = async (movieId) => {
        try {
            const res = await axios.get(`/api/movies/${movieId}`)
            this.setState({movie: res.data.movie, reviews: res.data.reviews, favorite: res.data.favorite, comments: res.data.comments})
        } catch (err) {
            console.log(err)
        }
    }

    handleReviewDelete = async (reviewId) => {
        await axios.delete(`/api/reviews/${reviewId}`)
        const { movieId } = this.props.match.params
        this.getMovie(movieId)
    }

    handleMovieFavorite = async () => {
        const payload = {
            movie_id: this.state.movie.id
        }
        await axios.post('/api/favorite_movies', payload)
        const moviePayload = {
            likes: (this.state.movie.likes + 1)
        }
        const movieId = this.state.movie.id
        await axios.put(`/api/movies/${movieId}`, moviePayload)
        this.getMovie(movieId)
    }

    removeMovieFromFavorites = async() => {
        const favoriteId = this.state.favorite.favorite_id
        await axios.delete(`/api/favorite_movies/${favoriteId}`)
        const moviePayload = {
            likes: (this.state.movie.likes - 1)
        }
        const movieId = this.state.movie.id
        await axios.put(`/api/movies/${movieId}`, moviePayload)
        this.getMovie(movieId)
    }

    handleMovieWatchList = async () => {
        const payload = {
            movie_id: this.state.movie.id
        }
        const res = await axios.post('/api/watch_list_movies', payload)
        const favorite = {...this.state.favorite}
        favorite.in_watchlist = true
        favorite.watchlist_id = res.data.id
        this.setState({favorite: favorite})
    }

    removeMovieFromWatchList = async() => {
        const watchlistId = this.state.favorite.watchlist_id
        const res= await axios.delete(`/api/watch_list_movies/${watchlistId}`)
        const favorite = {...this.state.favorite}
        favorite.in_watchlist = false
        favorite.watchlist_id = null
        this.setState({favorite: favorite})
    }

    render() {
        let reviews = ''
        if(this.state.reviews.length === 0) {
            reviews = <h3>No Reviews Yet. Login to create Review</h3>
        } else {
            reviews =  this.state.reviews.map((review) => {
                return <MovieReviews review={review} 
                key={review.id}
                singedIn={this.props.signedIn}
                handleReviewDelete={this.handleReviewDelete} />
        })}
        return (
            <div>
                <MovieInfo>
                    <Poster src={this.state.movie.poster} alt={this.state.movie.title} />
                    <Info>
                        <div><h1>{this.state.movie.title}</h1></div>
                        <div><p>{this.state.movie.tag_line}</p></div>
                        <div>Rating: {this.state.movie.rating}/10</div>
                        <div><h5>Overview</h5><p>{this.state.movie.plot}</p></div>
                    </Info>
                    {this.props.signedIn ? 
                    <Link to={{ pathname: '/newReview', state:{id: this.state.movie.id}}}><AddIcon src='../../../icons/SVG/plus.svg' /></Link> : ''}
                </MovieInfo>
                {this.props.signedIn ?
                <UserOptions>
                        {this.state.favorite.favorite ? 
                        <Icon onClick={this.removeMovieFromFavorites} src='../../../icons/SVG/star-full.svg' alt='In your Favorites' /> : 
                        <Icon onClick={this.handleMovieFavorite} src='../../../icons/SVG/star-empty.svg' alt='favorite' />}
                        {this.state.favorite.in_watchlist ? 
                        <Icon onClick={this.removeMovieFromWatchList} src='../../../icons/SVG/clipboard.svg' alt='In your WatchList' /> : 
                        <Icon onClick={this.handleMovieWatchList} src='../../../icons/SVG/list.svg' alt='Add to WatchList' />}
                </UserOptions>
                : '' }
                <ReviewList>
                    <h2>Reviews:</h2>
                    {reviews}
                </ReviewList>
                    <MovieComments 
                    comments={this.state.comments} 
                    movieId={this.state.movie.id} 
                    signedIn={this.props.signedIn} 
                    getMovie={this.getMovie} />
            </div>
        );
    }
}

export default MoviePage