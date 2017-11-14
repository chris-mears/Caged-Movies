import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import {FlexRowCenter, FlexRowBetween} from '../StyledComponents/FlexContainers'

const HeroUserContainer = FlexRowCenter.extend `
    padding-top:80px;
    width: 100%;
    height: 35vh;
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
    
`

const RecentPosts = styled.div `
    border: 3px solid #30415D;
    margin: 20px;
    padding: 20px;
    width: 40vw;
    h3 {
        text-align: center;
    }
`
const RandomMovie = styled.div `
    border: 3px solid #30415D;
    margin: 20px;
    padding: 20px;
    width: 40vw;
    h3 {
        text-align: center;
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

const Cage = FlexRowCenter.extend`
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
const IconContainer = FlexRowCenter.extend`
`

const Icon = styled.img`
margin: 0 20px;
`

class MainPage extends Component {
    state = {
        movies: [],
        reviews: []
    }

    componentWillMount() {
        this.getMovies()
        this.getReviews()
    }

    getMovies = async() => {
        const res = await axios.get('/api/movies/')
        this.setState({movies: res.data})
    }

    getReviews = async() => {
        const res = await axios.get('/api/reviews')
        this.setState({reviews: res.data})
    }

    handleMovieFavorite = async (movieId) => {
        const payload = {
            movie_id: movieId
        }
        const res = await axios.post('/api/favorite_movies', payload)
        this.getMovies()
    }

    removeMovieFromFavorites = async(favoriteId) => {
        const res= await axios.delete(`/api/favorite_movies/${favoriteId}`)
        this.getMovies()
    }

    render() {

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
                    .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
                    .split(' ')
                    .join('-')
                    .toLowerCase()
                const movieIndex = String(index + 1)
                return <Movie key={movie.id}>
                    <Link to={`/movie/${movie.id}/${MovieUrl}`}>{movieIndex}. {movie.title}</Link>
                    <IconContainer>
                    {movie.favorite ? 
                        <Icon onClick={() => this.removeMovieFromFavorites(movie.favorite_id)} src='../../../icons/SVG/star-full.svg' alt='In your Favorites' /> : 
                        <Icon onClick={() => this.handleMovieFavorite(movie.id)} src='../../../icons/SVG/star-empty.svg' alt='favorite' />}
                    </IconContainer>
                </Movie>
            })

        const recentReviews = this
            .state
            .reviews
            .map((review) => {
                return <Review key={review.id}>
                    <Link to={`/review/${review.id}`}>{review.title}</Link>
                </Review>
            })

        const HeroBanner = <Cage>
            {/* <img src='../../../Logo_white.png' alt='caged movies' /> */}
            For those movies, so bad you hate to love them!
        </Cage>
        return (
            <div>
                <HeroUserContainer>
                    {this.props.signedIn
                        ? <h1>UserInfo</h1>
                        : HeroBanner}
                </HeroUserContainer>

                {this.props.signedIn
                    ? ''
                    : welcome}

                <MainContents>
                    <TopMovies>
                        <h3>Top Movies:</h3>
                        {topMovies}
                    </TopMovies>
                    <RecentPosts>
                        <h3>Recent Posts:</h3>
                        {recentReviews}
                    </RecentPosts>
                    <RandomMovie>
                        <h3>Random Movie</h3>
                    </RandomMovie>
                    <TopPost>
                        <h3>Top Posts</h3>
                    </TopPost>

                </MainContents>
            </div>
        );
    }
}

export default MainPage;