import React, { Component } from 'react';
import axios from 'axios'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'
import { FlexRowCenter } from '../StyledComponents/FlexContainers'
import { ReviewForm, UpperForm, TitleInput, BodyField, SubmitButton} from '../StyledComponents/ReviewForms.js'


const NewContainer= styled.div`
    padding-top: 80px;
`

const ButtonContainer = FlexRowCenter.extend`
`

class NewReview extends Component {
    state = {
        movie: {},
        newReview: {
            title: '',
            body: '',
            likes: 0
        },
        toggleRedirect: false,
        reviewId: '',
    }

    componentWillMount() {
        this.getMovieIfProvided()
    }
    //grabs movie info for the review
    getMovieIfProvided = async () => {
        if (this.props.location.state !== undefined) {
            const movieId = this.props.location.state.id
            console.log(movieId)
            const res = await axios.get(`/api/movies/${movieId}`)
            this.setState({movie: res.data.movie})
        }
            
    }
    //allow user to update the form inputs
    handleChange = (event) => {
        const attribute = event.target.name
        const newReview = {...this.state.newReview}
        newReview[attribute] = event.target.value
        this.setState({newReview})
    }

    //saves the review to the db
    handleSubmit = async (event) => {
        event.preventDefault()
        const payload = {
            title: this.state.newReview.title,
            body:  this.state.newReview.body,
            likes: this.state.newReview.likes,
            genre: this.state.movie.genre,
            movie_id: this.state.movie.id
        }
        try {
            const res = await axios.post('/api/reviews', payload)
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
            <NewContainer>
                <h1>New Review</h1>
                <ReviewForm onSubmit={this.handleSubmit}>
                <UpperForm>
                <div>
                <TitleInput name='title' placeholder="Title" value={this.state.newReview.title} onChange={this.handleChange} required />
                <h3>Movie: {this.state.movie.title}</h3>
                </div>
                <img src={this.state.movie.poster} alt={this.state.movie.title} />
                </UpperForm>
                <BodyField name='body' placeholder='Your Review' value={this.state.newReview.body} onChange={this.handleChange} required />
                <ButtonContainer>
                <SubmitButton type='submit' />
                </ButtonContainer>
                </ReviewForm>
            </NewContainer>
        );
    }
}

export default NewReview;