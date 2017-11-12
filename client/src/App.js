import React, {Component} from 'react'
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import axios from 'axios'
import {clearAuthTokens, saveAuthTokens, setAxiosDefaults, userIsLoggedIn} from "./util/SessionHeaderUtil"

import SignUpLogIn from './components/user/SignUpLogIn'
import Header from './components/Main/Header'
import MainPage from './components/Main/MainPage'
import MoviePage from './components/Movie/MoviePage'
import ReviewPage from './components/Review/ReviewPage'
import NewReview from './components/Review/NewReview'
import UpdateReview from './components/Review/UpdateReview'

class App extends Component {

    state = {
        signedIn: false,
        toggleRedirect: false,
    }

    async componentWillMount() {
      try {
          const signedIn = userIsLoggedIn()
  
          if (signedIn) {
              setAxiosDefaults()
          }
  
          this.setState({
              signedIn
          })
      } catch(error) {
          console.log(error)
      }
  }

    signUp = async (email, password, password_confirmation) => {
        try {
            const payload = {
                email: email,
                password: password,
                password_confirmation: password_confirmation
            }
            const response = await axios.post('/auth', payload)
            saveAuthTokens(response.headers)

            this.setState({signedIn: true, toggleRedirect: true})
        } catch (error) {
            console.log(error)
        }
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
                <Header signOut={this.signOut} 
                signedIn={this.state.signedIn} 
                handleLogoClick={this.handleLogoClick}
                toggleSignIn={this.state.toggleSignIn} />
                    <Switch>
                        <Route exact path='/' render={HomePageComponent} />
                        <Route exact path='/signup' render={SignUpSignIn} />
                        <Route exact path='/movie/:movieName' component={MoviePage} />
                        <Route exact path='/review/:reviewId' component={ReviewPage} />
                        <Route exact path='/newreview' component={NewReview} />
                        <Route exact path='/updatereview/:reviewId' component={UpdateReview} />
                    </Switch>

                </div>
            </Router>
        )
    }
}

export default App
