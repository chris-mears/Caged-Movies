import React, {Component} from 'react';
import styled from 'styled-components'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {FlexRow, FlexRowBetween} from '../StyledComponents/FlexContainers'
import ApiMovie from '../Movie/ApiMovie'

import FullScreenSearch from './FullScreenSearch'

const SearchDiv = FlexRow.extend `
background-color: #fafafa;
border: 1px solid #dbdbdb;
height: 25px;
color: #999;
`



const Search = styled.input `
border: none;
font-weight: 400;
background: transparent;
overflow: visible;
font-family: sans-serif;
font-size: 1.2em;
line-height: 1.6em;
margin: 0;
padding: 1px;
text-indent: 0px;
text-shadow: none;
display: inline-block;
height: 100%;
width: 100%;
`


const Icon = styled.img `
margin: 0 10px 0 40px;
height: 20px;
@media (max-width: 600px) {
    margin: 5px;
}
`

const OptionIcon = styled.img `
margin: 20px;
height: 50px;
@media (max-width: 600px) {
    marign: 5px;
    height: 25px;
}
`

const Movie = FlexRowBetween.extend`
    border: 1px solid white;
    margin: 10px 0;
    h4, p {
        margin: 5px;
    }
    @media (max-width: 600px) {
        flex-direction: column;
    }
`
const Poster = styled.img `
    height: 80px;
    margin-right: 10px;
`
        

const Review = styled.div`
    border: 1px solid white;
    margin: 10px 0;
    h4, p {
        margin: 5px;
    }
    h4 {
        a {
            color: white;
        }
    }
`

const Title = styled.div`
    h2 {
        margin: 0;
        text-decoration: underline;
    }
    h5 {
        margin: 0;
    }
`

const MovieInfo = FlexRow.extend`
    div {
        p {
            max-width: 550px;
        }
        h4 {
            a {
                color: white;
            }
        }
    }
`

const UserOptions = styled.div`
`

class SearchComponent extends Component {
    state = {
        toggleSearch: false,
        searchInput: '',
        toggleMovies: true,
        toggleReviews: false,
        toggleGenre: false,
        results: {
            movies: [],
            reviews: []
        },
        message: '',
        apiResults: []
    }

    //toggles full screen search component when user click into search bar
    handleClick = () => {
        this.setState({
            toggleSearch: !this.state.toggleSearch
        })
    }

    //exits full screen when user clicks the exit icon
    handleCancel = () => {
        this.setState({
            toggleSearch: !this.state.toggleSearch,
            searchInput: '',
            message: '',
            toggleMovies: true,
            toggleReviews: false,
            toggleGenre: false,
            results: {
                movies: [],
                reviews: []
            },
            apiResults: []
        })
    }

    //allows user to update the search input
    handleChange = (event) => {
        this.setState({searchInput: event.target.value})
    }

    //allow user to search by movie
    toggleMoviesSearch = () => {
        this.setState({toggleMovies: true, toggleReviews: false, toggleGenre: false})
    }

    //allows user to search by reviews
    toggleReviewsSearch = () => {
        this.setState({toggleMovies: false, toggleReviews: true, toggleGenre: false})
    }

    //allows user to search by genre
    toggleGenreSearch = () => {
        this.setState({toggleMovies: false, toggleReviews: false, toggleGenre: true})
    }

    //function to search db for movies also the api
    searchMovies = async () => {
        const searchInput = this.state.searchInput
        const res = await axios.get(`/api/movies/search?title=${searchInput}`)
        if(res.data.movies === undefined) {
            this.setState({message: res.data.msg})
        } else {
            const results = {movies: res.data.movies, reviews: res.data.reviews}
            this.setState({results})
        }
        if(searchInput.length > 3) {
            const apiRes = await axios.get(`/api/tmdb_movies/?title=${searchInput}`)
            this.setState({apiResults: apiRes.data})
        }
    }

    //function to search db for reviews
    searchReviews = async () => {
        const searchInput = this.state.searchInput
        const res = await axios.get(`/api/reviews/search?title=${searchInput}`)
        if(res.data.movies === undefined) {
            this.setState({message: res.data.msg})
        } else {
            this.setState({results: {movies: res.data.movies, reviews: res.data.reviews}})
        }
    }

    //function to search db for movies and reviews based off of genre
    searchGenres = async () => {
        const searchInput = this.state.searchInput
        const res = await axios.get(`/api/movies/search?genre=${searchInput}`)
        if(res.data.movies === undefined) {
            this.setState({message: res.data.msg})
        } else {
            const results = {movies: res.data.movies, reviews: res.data.reviews}
            this.setState({results})
        }
    }

    //middleware function to contain logic for which search function to perform
    handleSearch = () => {
        if (this.state.toggleMovies) {
            this.searchMovies()
        } 
        else if (this.state.toggleReviews) {
            this.searchReviews()
        }
        else if (this.state.toggleGenre) {
            this.searchGenres()
        }
    }

    //handles the search when the user clicks enter
    handleKeyPress = (event) => {
    if (event.charCode === 13) {
        event.preventDefault()
        this.handleSearch()
    }
    }

    //allows user to add movie to favorites and updates likes
    handleMovieFavorite = async (movieId, likes) => {
        const payload = {
            movie_id: movieId
        }
        await axios.post('/api/favorite_movies', payload)
        const moviePayload = {
            likes: (likes + 1)
        }
        await axios.put(`/api/movies/${movieId}`, moviePayload)
        this.handleSearch()
    }

    //allows user to remove movie to favorites and updates likes
    removeMovieFromFavorites = async(favoriteId, movieId, likes) => {
        await axios.delete(`/api/favorite_movies/${favoriteId}`)
        const moviePayload = {
            likes: (likes - 1)
        }
        await axios.put(`/api/movies/${movieId}`, moviePayload)
        this.handleSearch()
    }

    //allows user to add movie to watchlist
    handleMovieWatchList = async (movieId) => {
        const payload = {
            movie_id: movieId
        }
        await axios.post('/api/watch_list_movies', payload)
        this.handleSearch()
    }

    //allows user to remove movie from watchlist
    removeMovieFromWatchList = async(watchlistId) => {
        await axios.delete(`/api/watch_list_movies/${watchlistId}`)
        this.handleSearch()
    }

    render() {
        const titleView = <Title>
            <h2>
                {this.state.toggleMovies ? 'Movies Search:' : ''}
                {this.state.toggleReviews ? 'Reviews Search:' : ''}
                {this.state.toggleGenre ? 'Genre Search:' : ''}
            </h2>
            <h5>{this.state.toggleGenre ? 'Type in a Genre and hit enter to search.' : ''}</h5>
        </Title>
        const message = <div><h3>{this.state.message}</h3></div>
        let movies = ''
        if (this.state.results.movies.length !==0) {
            movies = <div><h3>Movies:</h3>
            <div>{this.state.results.movies.map((movie)=> {
                const MovieUrl = movie.title
                .replace(/[&/\\#,+()$~%.'":*?<>{}]/g, '')
                .split(' ')
                .join('-')
                .toLowerCase()
                return (
                    <Movie key={movie.id}>
                    <MovieInfo>
                    <Poster src={movie.poster} alt={movie.title} />
                    <div>
                        <h4><Link to={`/movie/${movie.id}/${MovieUrl}`} onClick={this.handleCancel}>{movie.title}</Link></h4>
                        <p>{movie.tag_line}</p>
                    </div>
                    </MovieInfo>
                    {this.props.signedIn ?
                    <UserOptions>
                    {movie.favorite ? 
                        <OptionIcon onClick={() => this.removeMovieFromFavorites(movie.favorite_id, movie.id, movie.likes)} src='../../../icons/SVG/star-full-white.svg' alt='In your Favorites' /> : 
                        <OptionIcon onClick={() => this.handleMovieFavorite(movie.id, movie.likes)} src='../../../icons/SVG/star-empty-white.svg' alt='favorite' />}
                    {movie.in_watchlist ? 
                        <OptionIcon onClick={() => this.removeMovieFromWatchList(movie.watchlist_movie_id)} src='../../../icons/SVG/clipboard-white.svg' alt='In your WatchList' /> : 
                        <OptionIcon onClick={() => this.handleMovieWatchList(movie.id)} src='../../../icons/SVG/list-white.svg' alt='Add to WatchList' />}
                    </UserOptions>
                    : ''}
                    </Movie>
                )
            })}</div>
            </div>
        }
        let apiMovies = ''
        if (this.state.apiResults.length !== 0) {
            apiMovies = <div><h3>TMDB Movies:</h3>
            <div>{this.state.apiResults.map((movie)=> {
                return (
                    <ApiMovie key={movie.id} title={movie.title}
                    movieId={movie.id}
                    poster={movie.poster}
                    signedIn={this.props.signedIn}
                    handleSearch={this.handleSearch}
                    />
                )
            })}</div>
            </div>
        }
        let reviews = ''
        if (this.state.results.reviews.length !== 0) {
            reviews = <div><h3>Reviews:</h3>
            {this.state.results.reviews.map((review)=> {
                const summary = review.body.substring(0, 200) + '...'
                return (
                    <Review key={review.id}>
                    <h4><Link to={`/review/${review.id}`} onClick={this.handleCancel}>{review.title}</Link></h4>
                    <p>{summary}</p>
                    </Review>
                )
            })}</div>
        }
        let results = ''
        if(this.state.toggleMovies) {
            results = <div>{movies}{apiMovies}</div>
        } 
        else if (this.state.toggleReviews) {
            results = <div>{reviews}{movies}</div>
        }
        else if (this.state.toggleGenre) {
            results = <div><div>{movies}</div><div>{reviews}</div></div>
        }
        


        const searchBar = this.state.toggleSearch
            ? <FullScreenSearch 
            titleView={titleView}
            message={message}
            results={results}
            stateMessage={this.state.message}
            handleKeyPress={this.handleKeyPress}
            handleChange={this.handleChange}
            searchInput={this.state.searchInput}
            handleCancel={this.handleCancel}
            toggleMoviesSearch={this.toggleMoviesSearch}
            toggleReviewsSearch={this.toggleReviewsSearch}
            toggleGenreSearch={this.toggleGenreSearch}
            />
            : <SearchDiv>
                <Icon src='../../../icons/SVG/search.svg' alt="search"/>
                <Search type="text" placeholder="Search" onClick={this.handleClick}/>
            </SearchDiv>

        return (
            <div>
                {searchBar}
            </div>
        );
    }
}

export default SearchComponent;