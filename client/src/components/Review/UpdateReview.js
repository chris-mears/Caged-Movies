import React, { Component } from 'react';
import axios from 'axios'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'
import { FlexRow, FlexRowCenter } from '../StyledComponents/FlexContainers'

const ReviewForm = styled.form`
    h3 {
        font-size: 2em;
        margin: 20px;
    }
`
const UpperForm = FlexRow.extend`
    img {
        height: 30vh;
        margin-left: 15vw; 
    }
`

const TitleInput = styled.input`
    width: 50vw;
    line-height: 50px;
    font-size: 2em;
    border: none;
    border-bottom: 2px solid #30415D;
    margin: 20px
`

const BodyField = styled.textarea`
    width: 95%;
    height: 45vh;
    font-size: 1.6em;
    border: 2px solid #30415D;
    margin: 20px 0 10px 20px
`

const ButtonContainer = FlexRowCenter.extend`
`

const SubmitButton = styled.input`
    background: #CF6766;
    color: #031424;
    font-weight: bolder;
    text-decoration: none;
    text-align: cneter;
    letter-spacing: .1em;
    font-size: 1rem;
    border: none;
    border-radius: 2px;
    height: 36px;
    line-height: 36px;
    padding: 0 2rem;
    text-transform: uppercase;
    box-shadow: 0 2px 2px 0 rgba(24,18,30, .14),
    0 1px 5px 0 rgba(24,18,30, .12),
    0 3px 1px -2px rgba(24,18,30, .12);
    &:hover {
        background: rgb(198, 165, 103);
    }
`
const UpdateContainer = styled.div`
    padding-top: 80px;
`

class UpdateReview extends Component {
    state = {
        review: {
            title: '',
            body: '',
            movie: {
                title: ''
            }
        },
        toggleRedirect: false,
        reviewId: '',
    }

    componentWillMount() {
        this.getReview()
    }

    getReview= async () => {
            const reviewId = this.props.match.params.reviewId
            console.log(reviewId)
            const res = await axios.get(`/api/reviews/${reviewId}`)
            this.setState({review: res.data.review})
        }

    handleChange = (event) => {
        const attribute = event.target.name
        const updatedReview = {...this.state.review}
        updatedReview[attribute] = event.target.value
        this.setState({review: updatedReview})
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        const reviewId = this.props.match.params.reviewId
        const payload = this.state.review
        try {
            const res = await axios.put(`/api/reviews/${reviewId}`, payload)
            console.log(res)
            this.setState({reviewId: res.data.id, toggleRedirect: true})
        } catch(err) {
            console.log(err)
        }
        
    }

    render() {
        if (this.state.toggleRedirect) {
            return <Redirect to={`/review/${this.state.reviewId}`} />
        }
        return (
            <UpdateContainer>
                <ReviewForm onSubmit={this.handleSubmit}>
                <UpperForm>
                <div>
                <TitleInput name='title' value={this.state.review.title} onChange={this.handleChange} />
                <h3>Movie: {this.state.review.movie.title}</h3>
                </div>
                <img src={this.state.review.movie.poster} alt={this.state.review.movie.title} />
                </UpperForm>
                <BodyField name='body' value={this.state.review.body} onChange={this.handleChange} />
                <ButtonContainer>
                <SubmitButton type='submit' />
                </ButtonContainer>
                </ReviewForm>
            </UpdateContainer>
        )
    }
}

export default UpdateReview;