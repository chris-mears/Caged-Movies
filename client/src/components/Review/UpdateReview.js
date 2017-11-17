import React, { Component } from 'react';
import axios from 'axios'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'
import { FlexRow, FlexRowCenter } from '../StyledComponents/FlexContainers'
import { ReviewForm, UpperForm, TitleInput, BodyField, SubmitButton} from '../StyledComponents/ReviewForms.js'



const ButtonContainer = FlexRowCenter.extend`
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