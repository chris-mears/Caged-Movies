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
        favoriteType: {}
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
            this.setState({movie: res.data.movie, reviews: res.data.reviews})
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
            movie_id: this.state.movie.id,
            type: 1
        }
        console.log('started')
        const res = await axios.post('/api/favorite_movies', payload)
        console.log('working')
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
                        <button onClick={this.handleMovieFavorite}>Favorite</button>
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