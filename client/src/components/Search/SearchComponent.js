import React, {Component} from 'react';
import styled from 'styled-components'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import {FlexRow, FlexRowCenter, FlexColumn, FlexRowBetween} from '../StyledComponents/FlexContainers'
import {Button} from '../StyledComponents/Button'
import ApiMovie from '../Movie/ApiMovie'

const SearchDiv = FlexRow.extend `
background-color: #fafafa;
border: 1px solid #dbdbdb;
height: 25px;
color: #999;
`

const ActiveSearchDiv = SearchDiv.extend `
    height: 50px;
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

const ActiveSearch = Search.extend `
    font-weight: 800;
    font-size: 1.6em;
    :focus{
    outline: none;
}
`
const Icon = styled.img `
margin: 0 10px 0 40px;
height: 20px;
`

const ActiveIcon = Icon.extend `
height: 25px;
`

const CancelIcon = Icon.extend `
height: 25px;
margin-right: 100px;
`

const FullScreen = styled.div `
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
overflow: auto;
z-index: 10;
background-color: rgba(254,254,254,0.7);
`

const SearchWrapper = styled.div`
    overflow: scroll;
`
const OptionButton = Button.extend`
`

const SearchResults = styled.div `
    display: flex;
    margin: 20px 40px;
    border: 3px solid #30415D;
    padding: 15px;
    min-height: 85vh;
`

const SearchOptions = FlexColumn.extend`
    background-color: rgba(3,20,36,0.95);
    color: white;
    padding: 10px;
    margin-right: 40px;
    height: 80vh;
    width: 20vw;
`

const ResultsContainer = styled.div`
    background-color: rgba(3,20,36,0.95);
    padding: 10px;
    min-height: 85vh;
    color: white;
    width: 75vw;
`
const Movie = FlexRowBetween.extend`
    border: 1px solid white;
    margin: 10px 0;
    img {
        height: 80px;
        margin-right: 10px;
    }
    h4, p {
        margin: 5px;
    }
`

const Review = styled.div`
    border: 1px solid white;
    margin: 10px 0;
    h4, p {
        margin: 5px;
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

    handleClick = () => {
        this.setState({
            toggleSearch: !this.state.toggleSearch
        })
    }

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


    handleChange = (event) => {
        this.setState({searchInput: event.target.value})
    }

    toggleMoviesSearch = () => {
        this.setState({toggleMovies: true, toggleReviews: false, toggleGenre: false})
    }

    toggleReviewsSearch = () => {
        this.setState({toggleMovies: false, toggleReviews: true, toggleGenre: false})
    }

    toggleGenreSearch = () => {
        this.setState({toggleMovies: false, toggleReviews: false, toggleGenre: true})
    }

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

    searchReviews = async () => {
        const searchInput = this.state.searchInput
        const res = await axios.get(`/api/reviews/search?title=${searchInput}`)
        if(res.data.movies === undefined) {
            this.setState({message: res.data.msg})
        } else {
            const results = {movies: res.data.movies, reviews: res.data.reviews}
            this.setState({results})
        }
    }

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

    handleKeyPress = (event) => {
    if (event.charCode === 13) {
        event.preventDefault()
        this.handleSearch()
    }
    }

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

    removeMovieFromFavorites = async(favoriteId, movieId, likes) => {
        await axios.delete(`/api/favorite_movies/${favoriteId}`)
        const moviePayload = {
            likes: (likes - 1)
        }
        await axios.put(`/api/movies/${movieId}`, moviePayload)
        this.handleSearch()
    }

    handleMovieWatchList = async (movieId) => {
        const payload = {
            movie_id: movieId
        }
        const res = await axios.post('/api/watch_list_movies', payload)
        this.handleSearch()
    }

    removeMovieFromWatchList = async(watchlistId) => {
        const res= await axios.delete(`/api/watch_list_movies/${watchlistId}`)
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
                .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
                .split(' ')
                .join('-')
                .toLowerCase()
                return (
                    <Movie key={movie.id}>
                    <MovieInfo>
                    <img src={movie.poster} alt={movie.title} />
                    <div>
                        <h4><Link to={`/movie/${movie.id}/${MovieUrl}`} onClick={this.handleCancel}>{movie.title}</Link></h4>
                        <p>{movie.tag_line}</p>
                    </div>
                    </MovieInfo>
                    {this.props.signedIn ?
                    <UserOptions>
                    {movie.favorite ? 
                        <Icon onClick={() => this.removeMovieFromFavorites(movie.favorite_id, movie.id, movie.likes)} src='../../../icons/SVG/star-full.svg' alt='In your Favorites' /> : 
                        <Icon onClick={() => this.handleMovieFavorite(movie.id, movie.likes)} src='../../../icons/SVG/star-empty.svg' alt='favorite' />}
                    {movie.in_watchlist ? 
                        <Icon onClick={() => this.removeMovieFromWatchList(movie.watchlist_movie_id)} src='../../../icons/SVG/clipboard.svg' alt='In your WatchList' /> : 
                        <Icon onClick={() => this.handleMovieWatchList(movie.id)} src='../../../icons/SVG/list.svg' alt='Add to WatchList' />}
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
                const MovieUrl = movie.title
                .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
                .split(' ')
                .join('-')
                .toLowerCase()
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
        

        const fullScreenSearch = <FullScreen onKeyPress={this.handleKeyPress}>
        <SearchWrapper>
            <ActiveSearchDiv>
                <ActiveIcon src='../../../icons/SVG/search.svg' alt="search"/>
                <ActiveSearch
                    autoFocus
                    type="text"
                    placeholder="Search for Movie and hit enter"
                    onChange={this.handleChange}
                    value={this.state.searchInput}/>
                <CancelIcon
                    src='../../../icons/SVG/cancel-circle.svg'
                    alt="Cancel Search"
                    onClick={this.handleCancel}/>
            </ActiveSearchDiv>
            <SearchResults>
                <SearchOptions>
                    <OptionButton onClick={this.toggleMoviesSearch}>Movies</OptionButton>
                    <OptionButton onClick={this.toggleReviewsSearch}>Reviews</OptionButton>
                    <OptionButton onClick={this.toggleGenreSearch}>Genres</OptionButton>
                </SearchOptions>
                <ResultsContainer>
                    {titleView}
                    {this.state.message !== '' ? message : ''}
                    {results}
                </ResultsContainer>
            </SearchResults>
        </SearchWrapper>
        </FullScreen>

        const searchBar = this.state.toggleSearch
            ? fullScreenSearch
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