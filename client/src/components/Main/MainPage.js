import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import {FlexRowCenter, FlexRowBetween, FlexRow} from '../StyledComponents/FlexContainers'
import {Button} from '../StyledComponents/Button'
import {Icon} from '../StyledComponents/Icon'

import FavoriteMovies from './FavoriteMovies'
import WatchList from './WatchList'
import UserReviews from './UserReviews'
import TopMovie from './TopMovie'
import UserInfo from './UserInfo'
import RandomMovie from './RandomMovie.js'

const HeroUserContainer = FlexRowCenter.extend `
    padding-top:80px;
    width: 100%;
    height: 35vh;
    min-height: 350px;
    color: #cf6766;
    background: #30415D;
`
const WelcomeContainer = styled.div `
    text-align: center;
    margin: 20px;
    padding: 20px;
    p {
        font-size: 1.2em
    }
`
const MainContents = FlexRowCenter.extend `
    flex-wrap: wrap;
`

const TopMovies = styled.div `
    border: 3px solid #30415D;
    margin: 20px;
    padding: 20px;
    width: 40vw;
    h3 {
        text-align: center;
    }
    @media (max-width: 850px) {
        margin: 5px;
        padding: 5px;
        width: auto;
    }
`

const RecentPosts = styled.div `
    border: 3px solid #30415D;
    margin: 20px;
    padding: 20px;
    width: 40vw;
    h3 {
        text-align: center;
    }
    @media (max-width: 850px) {
        margin: 5px;
        padding: 5px;
        width: auto;
    }
`


const TopPost = styled.div `
    border: 3px solid #30415D;
    margin: 20px;
    padding: 20px;
    width: 40vw;
    h3 {
        text-align: center;
    }
    @media (max-width: 850px) {
        margin: 5px;
        padding: 5px;
        width: auto;
    }
`

const Movie = FlexRowBetween.extend `
    border: 1px solid #30415D;
    padding: 10px;
    font-size: 1.2em;
    a {
        font-size: 1.4em;
        color: #30415D;
        text-decoration: none;
    }
`

const Review = styled.div `
border: 1px solid #30415D;
padding: 10px;
font-size: 1.2em;
a {
        font-size: 1.4em;
        color: #30415D;
        text-decoration: none;
    }
`

const Cage = FlexRowCenter.extend `
    background: url('../../../trolls_two.png');
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    position: relative;
    font-size: 3em;
    color: white;
    img {
        height: 80%;
    }
`
const IconContainer = FlexRowCenter.extend `
`

const ContentsContainer = styled.div ``

class MainPage extends Component {
    state = {
        movies: [],
        reviews: [],
        TopReviews: [],
        favorites: [],
        watchList: [],
        userReviews: [],
        randomMovie: {
            title: ''
        },
        toggleUserFavorites: false,
        toggleUserWatchList: false,
        toggleUserReviews: false
    }

    componentWillMount() {
        this.getMovies()
        this.getReviews()
        this.getRandomMovie()
    }

    //will grab all movies from db comes in ordered by likes
    getMovies = async() => {
        const res = await axios.get('/api/movies/')
        this.setState({movies: res.data})
    }

    //will grab reviews from db comes in order by most recent
    getReviews = async() => {
        const res = await axios.get('/api/reviews')
        await this.setState({reviews: res.data})
        const TopReviews = [...this.state.reviews]
        TopReviews.sort((a, b) => a.likes < b.likes)
        this.setState({TopReviews})
    }

    //will grab a random movie from the db
    getRandomMovie = async() => {
        const res = await axios.get('api/random/movie')
        this.setState({randomMovie: res.data})
    }

    //allows user to favorite a movie and update likes for the movie
    handleMovieFavorite = async(movieId, likes) => {
        const payload = {
            movie_id: movieId
        }
        await axios.post('/api/favorite_movies', payload)
        const moviePayload = {
            likes: (likes + 1)
        }
        await axios.put(`/api/movies/${movieId}`, moviePayload)
        this.getMovies()
    }

    //allows user to remove movie from favorites and updates movie to remove one like
    removeMovieFromFavorites = async(favoriteId, movieId, likes) => {
        await axios.delete(`/api/favorite_movies/${favoriteId}`)
        const moviePayload = {
            likes: (likes - 1)
        }
        await axios.put(`/api/movies/${movieId}`, moviePayload)
        this.getMovies()
    }

    //allows user to add movie to watchlist
    handleMovieWatchList = async(movieId) => {
        const payload = {
            movie_id: movieId
        }
        const res = await axios.post('/api/watch_list_movies', payload)
        this.getMovies()
    }

    //allows user to remove movie from watchlist
    removeMovieFromWatchList = async(watchlistId) => {
        const res = await axios.delete(`/api/watch_list_movies/${watchlistId}`)
        this.getMovies()
    }

    //allows user to see favorite movies and grabs them from db
    showFavoriteMovies = async() => {
        await this.setState({
            toggleUserFavorites: !this.state.toggleUserFavorites,
            toggleUserWatchList: false,
            toggleUserReviews: false
        })
        if (this.state.toggleUserFavorites) {
            const res = await axios.get('/api/favorite_movies')
            this.setState({favorites: res.data})
        }
    }

    //allows user to see watch list and grabs them from db
    showWatchList = async() => {
        await this.setState({
            toggleUserFavorites: false,
            toggleUserWatchList: !this.state.toggleUserWatchList,
            toggleUserReviews: false
        })
        if (this.state.toggleUserWatchList) {
            const res = await axios.get('/api/watch_list_movies')
            this.setState({watchList: res.data})
        }
    }

    //allows user to see their reviews and grabs them from the db
    showReviews = async() => {
        await this.setState({
            toggleUserFavorites: false,
            toggleUserWatchList: false,
            toggleUserReviews: !this.state.toggleUserReviews
        })
        if (this.state.toggleUserReviews) {
            const res = await axios.get('/api/user_reviews')
            this.setState({userReviews: res.data})
        }
    }

    render() {
        const randomMovieUrl = this
            .state
            .randomMovie
            .title
            .toString()
            .replace(/[&/\\#,+()$~%.'":*?<>{}]/g, '')
            .split(' ')
            .join('-')
            .toLowerCase()

        const welcome = <WelcomeContainer>
            <h1>Welcome to Caged Movies</h1>
            <p>The site for finding those movies that are so bad their good. This site is a
                community driven site, so we reli on you the user to recommend terrible movies
                for other. The Site use The Movie DB to find any movie you might set your heart
                on from there you can create your very own review for the movie. On Top of
                recommending movies if you create an account you can also find movies you would
                like to watch as well as add favorites.</p>
        </WelcomeContainer>

        const topMovies = this
            .state
            .movies
            .map((movie, index) => {
                const MovieUrl = movie
                    .title
                    .replace(/[&/\\#,+()$~%.'":*?<>{}]/g, '')
                    .split(' ')
                    .join('-')
                    .toLowerCase()
                const movieIndex = String(index + 1)
                return <TopMovie
                key={movie.id} 
                movie={movie} 
                movieIndex={movieIndex} 
                MovieUrl={MovieUrl}
                handleMovieFavorite={this.handleMovieFavorite}
                handleMovieWatchList={this.handleMovieWatchList}
                removeMovieFromFavorites={this.removeMovieFromFavorites}
                removeMovieFromWatchList={this.removeMovieFromWatchList}
                signedIn={this.props.signedIn} />
            })

        const recentReviews = this
            .state
            .reviews
            .map((review) => {
                return <Review key={review.id}>
                    <Link to={`/review/${review.id}`}>{review.title}</Link>
                </Review>
            })

        const TopReviews = this
            .state
            .TopReviews
            .map((review) => {
                return <Review key={review.id}>
                    <Link to={`/review/${review.id}`}>{review.title}</Link>
                </Review>
            })

        const HeroBanner = <Cage>
            For those movies, so bad you hate to love them!
        </Cage>

        const mainContents = <MainContents>
            <TopMovies>
                <h3>Top Movies:</h3>
                {topMovies}
            </TopMovies>
            <RecentPosts>
                <h3>Recent Reviews:</h3>
                {recentReviews}
            </RecentPosts>

            <RandomMovie 
            randomMovie={this.state.randomMovie} 
            randomMovieUrl={randomMovieUrl} />

            <TopPost>
                <h3>Top Reviews:</h3>
                {TopReviews}
            </TopPost>
        </MainContents>
        return (
            <div>
                <HeroUserContainer>
                    {this.props.signedIn
                        ? <UserInfo userInfo={this.props.userInfo}
                        showFavoriteMovies={this.showFavoriteMovies}
                        toggleUserFavorites={this.state.toggleUserFavorites}
                        showWatchList={this.showWatchList}
                        toggleUserWatchList={this.state.toggleUserWatchList}
                        showReviews={this.showReviews}
                        toggleUserReviews={this.state.toggleUserReviews}/>
                        : HeroBanner}
                </HeroUserContainer>

                {this.props.signedIn
                    ? ''
                    : welcome}

                <ContentsContainer>
                    {(this.state.toggleUserFavorites || this.state.toggleUserWatchList || this.state.toggleUserReviews) && this.props.signedIn
                        ? ""
                        : mainContents}
                    {this.state.toggleUserFavorites && this.props.signedIn
                        ? <FavoriteMovies movies={this.state.favorites}/>
                        : ''}
                    {this.state.toggleUserWatchList && this.props.signedIn
                        ? <WatchList watchlist={this.state.watchList}/>
                        : ''}
                    {this.state.toggleUserReviews && this.props.signedIn
                        ? <UserReviews reviews={this.state.userReviews}/>
                        : ''}
                </ContentsContainer>
            </div>
        );
    }
}

export default MainPage;