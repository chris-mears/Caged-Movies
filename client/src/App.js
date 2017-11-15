import React, {Component} from 'react'
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import md5 from 'md5'
import {clearAuthTokens, saveAuthTokens, setAxiosDefaults, userIsLoggedIn} from "./util/SessionHeaderUtil"

import SignUpLogIn from './components/user/SignUpLogIn'
import Header from './components/Main/Header'
import MainPage from './components/Main/MainPage'
import MoviePage from './components/Movie/MoviePage'
import ReviewPage from './components/Review/ReviewPage'
import NewReview from './components/Review/NewReview'
import UpdateReview from './components/Review/UpdateReview'
import SearchComponent from './components/Search/SearchComponent'


const TopContents = styled.div`
    width: 100vw;
    position: fixed;
    z-index: 10;
`

class App extends Component {

    state = {
        signedIn: false,
        toggleRedirect: false,
        user: {}
    }

    async componentWillMount() {
      try {
          const signedIn = userIsLoggedIn()
  
          if (signedIn) {
              setAxiosDefaults()
              this.getUserInfo()
          }
  
          this.setState({
              signedIn
          })
      } catch(error) {
          console.log(error)
      }
  }

    signUp = async (email, password, password_confirmation, name, nickname) => {
        const emailhash = md5(email)
        try {
            const image = `https://www.gravatar.com/avatar/${emailhash}.jpg?s=300`
            console.log(image)
            const payload = {
                email: email,
                password: password,
                password_confirmation: password_confirmation,
                name: name,
                nickname: nickname,
                image: image
            }
            const response = await axios.post('/auth', payload)
            saveAuthTokens(response.headers)

            this.setState({signedIn: true, toggleRedirect: true})
        } catch (error) {
            console.log(error)
        }
    }

    getUserInfo = async() => {
        const res = await axios.get('/api/user')
        console.log(res.data)
    }

    signIn = async (email, password) => {
        try {
            const payload = {
                email,
                password
            }
            const response = await axios.post('/auth/sign_in', payload)
            saveAuthTokens(response.headers)

            this.setState({signedIn: true, toggleRedirect: true})
        } catch (error) {
            console.log(error)
        }
    }

    signOut = async (event) => {
      try {
          event.preventDefault()
          
          await axios.delete('/auth/sign_out')
  
          clearAuthTokens();
  
          this.setState({signedIn: false, toggleRedirect: false})
      } catch(error) {
          console.log(error)
      }
  }


    render() {
        const SignUpSignIn = () => (
            <SignUpLogIn
            signUp={this.signUp}
            signIn={this.signIn} 
            toggleRedirect={this.state.toggleRedirect}/>
        )

        const HomePageComponent = () => (
            <MainPage
            signedIn={this.state.signedIn} />
        )
        

        return (
            <Router>
                <div>
                <TopContents>
                <Header signOut={this.signOut} 
                signedIn={this.state.signedIn} 
                handleLogoClick={this.handleLogoClick}
                toggleSignIn={this.state.toggleSignIn} />
                <SearchComponent
                signedIn={this.state.signedIn} />
                </TopContents>
                    <Switch>
                        <Route exact path='/' render={HomePageComponent} />
                        <Route exact path='/signup' render={SignUpSignIn} />
                        <Route exact path='/movie/:movieId/:movieName' render={(props) => <MoviePage signedIn={this.state.signedIn} {...props} />} />
                        <Route exact path='/review/:reviewId' render={(props) => <ReviewPage signedIn={this.state.signedIn} {...props} />} />
                        <Route exact path='/newreview' component={NewReview} />
                        <Route exact path='/updatereview/:reviewId' component={UpdateReview} />
                    </Switch>

                </div>
            </Router>
        )
    }
}

export default App
