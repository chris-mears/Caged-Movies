import React, { Component } from 'react';
import styled from 'styled-components'
import axios from 'axios'
import { Link } from 'react-router-dom'

import { FlexRow } from '../StyledComponents/FlexContainers'


const MovieInfo = FlexRow.extend `
width: 100%;
height:50vh;
color: white;
background: #30415D;
margin-top: 15px;
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

const Review = styled.div`
    border: 1px solid #30415D;
    margin: 20px;
    font-size: 1.6em;
    padding: 20px 60px;
`

class MoviePage extends Component {
    state = {
        movie: {
            reviews: [],
        }
    }

    componentWillMount() {
        this.getMovie()
    }

    getMovie = async () => {
        const movieId = this.props.history.location.state.id
        const res = await axios.get(`/api/movies/${movieId}`)
        this.setState({movie: res.data})
    }
    render() {
        const reviews = this.state.movie.reviews.map((review) => {
            return <Review><Link to={`/review/${review.id}`}>{review.title}</Link></Review>
        })
        return (
            <div>
                <MovieInfo>
                    <img src={this.state.movie.poster} alt={this.state.movie.title} />
                    <Info>
                        <div>{this.state.movie.title}</div>
                        <div><p>{this.state.movie.tag_line}...</p></div>
                        <div>Rating: {this.state.movie.rating}/10</div>
                        <div><h5>Overview</h5><p>{this.state.movie.plot}</p></div>
                        </Info>
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