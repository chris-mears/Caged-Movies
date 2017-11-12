import React, { Component } from 'react';
import axios from 'axios'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'
import { FlexRow } from '../StyledComponents/FlexContainers'

const ReviewForm = styled.form`
    width: 100vw;
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
    width: 95vw;
    height: 50vh;
    font-size: 1.6em;
    border: 2px solid #30415D;
    margin: 20px
`

const SubmitButton = styled.input`
    margin: 0 50vw;
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

class NewReview extends Component {
    state = {
        movie: {},
        newReview: {
            title: '',
            body: ''
        },
        toggleRedirect: false,
        reviewId: '',
    }

    componentWillMount() {
        this.getMovieIfProvided()
    }

    getMovieIfProvided = async () => {
        if (this.props.location.state !== undefined) {
            const movieId = this.props.location.state.id
            console.log(movieId)
            const res = await axios.get(`/api/movies/${movieId}`)
            this.setState({movie: res.data})
        }
            
    }

    handleChange = (event) => {
        const attribute = event.target.name
        const newReview = {...this.state.newReview}
        newReview[attribute] = event.target.value
        this.setState({newReview})
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        const payload = {
            title: this.state.newReview.title,
            body:  this.state.newReview.body,
            movie_id: this.state.movie.id
        }
        try {
            const res = await axios.post('/api/reviews', payload)
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
            <div>
                <h1>New Review</h1>
                <ReviewForm onSubmit={this.handleSubmit}>
                <UpperForm>
                <div>
                <TitleInput name='title' placeholder="Title" value={this.state.newReview.title} onChange={this.handleChange} />
                <h3>Movie: {this.state.movie.title}</h3>
                </div>
                <img src={this.state.movie.poster} alt={this.state.movie.title} />
                </UpperForm>
                <BodyField name='body' placeholder='Your Review' value={this.state.newReview.body} onChange={this.handleChange} />
                <SubmitButton type='submit' />
                </ReviewForm>
            </div>
        );
    }
}

export default NewReview;