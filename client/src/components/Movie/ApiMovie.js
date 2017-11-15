import React, {Component} from 'react';
import styled from 'styled-components'
import axios from 'axios'
import {FlexRow} from '../StyledComponents/FlexContainers'

const Movie = FlexRow.extend`
border: 1px solid white;
margin: 10px 0;
h4, p {
    margin: 5px;
}
`
const Poster = styled.img`
    height: 80px;
    margin-right: 10px;
`
const ActivePoster = Poster.extend`
    height: 200px;
    margin-right: 15px;
`

const Icon = styled.img `
margin: 0 10px 0 40px;
height: 20px;
`

class ApiMovie extends Component {
    state = {
        toggleMore: false,
        movie: {},
        toggleRedirect: false
    }

    handleMoreInfo = async() => {
        const api_id = this.props.movieId
        const res = await axios.get(`/api/tmdb_movies/${api_id}`)
        this.setState({movie: res.data, toggleMore: !this.state.toggleMore})
    }

    saveMovie = async(event) => {
        event.preventDefault()
        const payload = {
            title: this.state.movie.title,
            poster: this.state.movie.poster,
            plot: this.state.movie.plot,
            rating: this.state.movie.rating,
            api_id: this.state.movie.id,
            imdb_id: this.state.movie.imdb_id,
            tag_line: this.state.movie.tag_line,
            genre: this.state.movie.genre,
            likes: 0
        }
        await axios.post('/api/movies', payload)
        this.props.handleSearch()
    }

    render() {
        const poster = this.state.toggleMore ? 
        <ActivePoster src={this.props.poster} alt={this.props.title}/> :
        <Poster src={this.props.poster} alt={this.props.title}/>
        return (
                <Movie key={this.props.id} onClick={this.handleMoreInfo}>

                    {this.props.poster === "https://image.tmdb.org/t/p/original"
                        ? ''
                        : poster}
                    <div>
                        <h4>{this.props.title}</h4>
                        {this.state.toggleMore ? 
                        <div>
                        <h5>{this.state.movie.tag_line}</h5>
                        <h5>Rating: {this.state.movie.rating}/10</h5> 
                        <h5>Overview:</h5>
                        <p>{this.state.movie.plot}</p>
                        </div>
                        : ''}
                    </div>
                    {this.state.toggleMore && this.props.signedIn ?
                    <div>
                        <Icon onClick={this.saveMovie} src='../../../icons/SVG/plus.svg' alt='Add Movie' />
                    </div>
                    : ''}

                </Movie>
        );
    }
}

export default ApiMovie;