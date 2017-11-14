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

class MoviePage extends Component {
    state = {
        movie: {
            reviews: [],
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
        const res = await axios.get(`/api/movies/${movieId}`)
        this.setState({movie: res.data})
    }

    handleReviewDelete = async (event) => {
        const reviewId = event.target.id
        await axios.delete(`/api/reviews/${reviewId}`)
        this.getMovie()
    }

    render() {
        let reviews = ''
        if(this.state.movie.reviews.length === 0) {
            reviews = <h3>No Reviews Yet. Login to create Review</h3>
        } else {
            reviews =  this.state.movie.reviews.map((review) => {
                return <Review key={review.id}>
                <Link to={`/review/${review.id}`}>
                {review.title}</Link><div>
                {this.props.signedIn ? 
                <Link to={`/updatereview/${review.id}`} >
                <Icon id={review.id} src='../../../icons/SVG/pencil.svg' alt='update' /></Link> : ''} 
                {this.props.signedIn ? 
                <Icon id={review.id} src='../../../icons/SVG/bin.svg' alt='delete' onClick={this.handleReviewDelete}/> : ''}
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