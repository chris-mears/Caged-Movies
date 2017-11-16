import React, { Component } from 'react';
import axios from 'axios'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'

import { FlexRow } from '../StyledComponents/FlexContainers'
import { Link } from 'react-router-dom';
import ReviewComments from '../Comments/ReviewComments'


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
const ReviewOptions = FlexRow.extend`
    margin: 30px 0 0 80px;
`

class ReviewPage extends Component {
    state = {
        review: {
            movie: {
                title: ''
            }
        },
        comments: [],
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
        this.setState({review: res.data.review, comments: res.data.comments})
    }

    handleReviewDelete = async (event) => {
        const reviewId = event.target.id
        await axios.delete(`/api/reviews/${reviewId}`)
        this.setState({toggleRedirect: true})
    }

    handleReviewLike = async () => {
        const payload = {
            review_id: this.state.review.id
        }
        await axios.post('/api/review_likes', payload)
        const reviewPayload = {
            likes: (this.state.review.likes + 1)
        }
        const reviewId = this.state.review.id
        await axios.put(`/api/reviews/${reviewId}`, reviewPayload)
        this.getReview(reviewId)
    }

    removeLikeFromReview = async() => {
        const likeId = this.state.review.review_like_id
        await axios.delete(`/api/review_likes/${likeId}`)
        const reviewPayload = {
            likes: (this.state.review.likes - 1)
        }
        const reviewId = this.state.review.id
        await axios.put(`/api/reviews/${reviewId}`, reviewPayload)
        this.getReview(reviewId)
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
            
            {this.props.signedIn ?
            <ReviewOptions>
            {this.state.review.review_liked ?
            <Icon onClick={this.removeLikeFromReview} src='../../../icons/SVG/heart.svg' alt="liked" /> :
            <Icon onClick={this.handleReviewLike} src='../../../icons/SVG/heart-o.svg' alt="Click to Like" /> }
            {this.state.review.belongs_to_user ?
            <div>
            <Link to={`/updatereview/${this.state.review.id}`} >
            <Icon id={this.state.review.id} src='../../../icons/SVG/pencil.svg' alt='update' /></Link> 
            <Icon id={this.state.review.id} src='../../../icons/SVG/bin.svg' alt='delete' onClick={this.handleReviewDelete}/>
             </div> : ''}
             </ReviewOptions> : ''}
               
                <ReviewBody>
                    <p>{this.state.review.body}</p>
                </ReviewBody>
                <ReviewComments 
                comments={this.state.comments} 
                reviewId={this.state.review.id}
                signedIn={this.props.signedIn}
                getReview={this.getReview} />
            </div>
        );
    }
}

export default ReviewPage;