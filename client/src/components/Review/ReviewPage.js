import React, { Component } from 'react';
import axios from 'axios'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'

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

const Icon = styled.img`
margin: 0 20px;
`

const Title = styled.div`
    padding-top: 80px;
    text-align: center;
`

const ReviewBody = styled.div`
    margin: 40px;
    border: 1px solid #30415D;
    padding: 20px;
    p {
        font-size: 1.4em;
    }
`
const ReviewOptions = styled.div`
    margin: 30px 0 0 80px;
`

class ReviewPage extends Component {
    state = {
        review: {
            movie: {
                title: ''
            }
        },
        toggleRedirect: false
    }

    componentWillMount() {
        const { reviewId } = this.props.match.params
        this.getReview(reviewId)
    }

    componentWillReceiveProps(newProps) {
        const { reviewId } = newProps.match.params
        this.getReview(reviewId)
    }

    getReview = async (reviewId) => {
        const res = await axios.get(`/api/reviews/${reviewId}`)
        this.setState({review: res.data})
    }

    handleReviewDelete = async (event) => {
        const reviewId = event.target.id
        await axios.delete(`/api/reviews/${reviewId}`)
        this.setState({toggleRedirect: true})
    }

    render() {
        if(this.state.toggleRedirect) {
            return <Redirect to='/' />
        }
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
                        <div><Link to={`/movie/${this.state.review.movie.id}/${movieUrl}`}>
                        {this.state.review.movie.title}</Link></div>
                        <div><p>{this.state.review.movie.tag_line}...</p></div>
                        <div>Rating: {this.state.review.movie.rating}/10</div>
                    </Info>
                </MovieInfo> 
            <ReviewOptions>
            {this.props.signedIn ?
            <Link to={`/updatereview/${this.state.review.id}`} >
            <Icon id={this.state.review.id} src='../../../icons/SVG/pencil.svg' alt='update' /></Link> : ''} 
            {this.props.signedIn ? 
            <Icon id={this.state.review.id} src='../../../icons/SVG/bin.svg' alt='delete' onClick={this.handleReviewDelete}/> : ''}
            </ReviewOptions>   
                <ReviewBody>
                    <p>{this.state.review.body}</p>
                </ReviewBody>
            </div>
        );
    }
}

export default ReviewPage;