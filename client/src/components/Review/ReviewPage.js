import React, { Component } from 'react';
import axios from 'axios'
import styled from 'styled-components'

import { FlexRow } from '../StyledComponents/FlexContainers'
import { Link } from 'react-router-dom';


const MovieInfo = FlexRow.extend `
width: 100%;
height: 35vh;
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

const Title = styled.div`
    text-align: center;
`

const ReviewBody = styled.div`
    margin: 60px;
    border: 1px solid #30415D;
    padding: 20px;
    p {
        font-size: 1.4em;
    }
`

class ReviewPage extends Component {
    state = {
        review: {
            movie: {
                title: ''
            }
        }
    }

    componentWillMount() {
        this.getReview()
    }

    getReview = async () => {
        const { reviewId } = this.props.match.params
        const res = await axios.get(`/api/reviews/${reviewId}`)
        this.setState({review: res.data})
    }
    render() {
        const movieUrl = this.state.review.movie.title
        .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
        .split(' ')
        .join('-')
        .toLowerCase()
        return (
            <div>
                <Title><h1>{this.state.review.title}</h1></Title>
                <MovieInfo>
                    <img src={this.state.review.movie.poster} alt={this.state.review.movie.title} />
                    <Info>
                        <div><Link to={{pathname: `/movie/${movieUrl}`, state:{
                            id: this.state.review.movie.id,
                            signedIn: this.props.location.state.signedIn} }}>
                        {this.state.review.movie.title}</Link></div>
                        <div><p>{this.state.review.movie.tag_line}...</p></div>
                        <div>Rating: {this.state.review.movie.rating}/10</div>
                    </Info>
                </MovieInfo>
                <ReviewBody>
                    <p>{this.state.review.body}</p>
                </ReviewBody>
            </div>
        );
    }
}

export default ReviewPage;