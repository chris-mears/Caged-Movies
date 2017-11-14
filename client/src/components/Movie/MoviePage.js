import React, { Component } from 'react';
import styled from 'styled-components'
import axios from 'axios'
import { Link } from 'react-router-dom'

import { FlexRow, FlexRowBetween } from '../StyledComponents/FlexContainers'


const MovieInfo = FlexRow.extend `
padding-top: 80px;
width: 100%;
height:50vh;
color: white;
background: #30415D;
img {
    height: 90%;
    margin: 10px 40px;
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
`

const Review = FlexRowBetween.extend`
    border: 1px solid #30415D;
    margin: 20px;
    font-size: 1.6em;
    padding: 20px 60px;
`

const AddReview = styled.div`
    font-size: 2em;
`
const Icon = styled.img`
    margin: 0 20px;
`
const UserOptions = FlexRow.extend`
    h5 {
        margin: 10px 40px;
    }
`

class MoviePage extends Component {
    state = {
        movie: {},
        reviews: [],
        favorite: {
            favorite: false,
        }
    }

    componentWillMount() {
        const { movieId } = this.props.match.params
        this.getMovie(movieId)
    }

    componentWillReceiveProps(newProps) {
        const { movieId } = newProps.match.params
        console.log(movieId)
        this.getMovie(movieId)
    }

    getMovie = async (movieId) => {
        try {
            const res = await axios.get(`/api/movies/${movieId}`)
            this.setState({movie: res.data.movie, reviews: res.data.reviews, favorite: res.data.favorite})
        } catch (err) {
            console.log(err)
        }
    }

    handleReviewDelete = async (event) => {
        const reviewId = event.target.id
        await axios.delete(`/api/reviews/${reviewId}`)
        this.getMovie()
    }

    handleMovieFavorite = async () => {
        const payload = {
            movie_id: this.state.movie.id
        }
        const res = await axios.post('/api/favorite_movies', payload)
        const favorite = {
            favorite: true,
            favorite_id: res.data.id
        }
        this.setState({favorite: favorite})
    }

    removeMovieFromFavorites = async() => {
        const favoriteId = this.state.favorite.favorite_id
        const res= await axios.delete(`/api/favorite_movies/${favoriteId}`)
        const favorite = {favorite: false}
        this.setState({favorite: favorite})
    }

    render() {
        let reviews = ''
        if(this.state.reviews.length === 0) {
            reviews = <h3>No Reviews Yet. Login to create Review</h3>
        } else {
            reviews =  this.state.reviews.map((review) => {
                return <Review key={review.id}>
                <Link to={`/review/${review.id}`}>
                {review.title}</Link><div>
                {this.props.signedIn && review.belongs_to_user ? 
                <div>
                <Link to={`/updatereview/${review.id}`} >
                <Icon id={review.id} src='../../../icons/SVG/pencil.svg' alt='update' /></Link> 
                <Icon id={review.id} src='../../../icons/SVG/bin.svg' alt='delete' onClick={this.handleReviewDelete}/> 
                </div> : ''}
                </div></Review>
        })}
        return (
            <div>
                <MovieInfo>
                    <img src={this.state.movie.poster} alt={this.state.movie.title} />
                    <Info>
                        <div>{this.state.movie.title}</div>
                        <div><p>{this.state.movie.tag_line}</p></div>
                        <div>Rating: {this.state.movie.rating}/10</div>
                        <div><h5>Overview</h5><p>{this.state.movie.plot}</p></div>
                    </Info>
                    {this.props.signedIn ? 
                    <Link to={{ pathname: '/newReview', state:{id: this.state.movie.id}}}><AddReview>AddReview</AddReview></Link> : ''}
                </MovieInfo>
                <UserOptions>
                        {this.state.favorite.favorite ? 
                        <Icon onClick={this.removeMovieFromFavorites} src='../../../icons/SVG/star-full.svg' alt='In your Favorites' /> : 
                        <Icon onClick={this.handleMovieFavorite} src='../../../icons/SVG/star-empty.svg' alt='favorite' />}
                        <h5>Watch List</h5>
                </UserOptions>
                <ReviewList>
                    <h2>Reviews:</h2>
                    {reviews}
                </ReviewList>
            </div>
        );
    }
}

export default MoviePage
;