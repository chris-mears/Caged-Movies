import React, {Component} from 'react'
import {Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom'
import axios from 'axios'
import {clearAuthTokens, saveAuthTokens, setAxiosDefaults, userIsLoggedIn} from "./util/SessionHeaderUtil"

import SignUpLogIn from './components/user/SignUpLogIn'
import Header from './components/Main/Header'
import MainPage from './components/Main/MainPage'


class App extends Component {

    state = {
        signedIn: false,
        toggleSignIn: false,
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

            this.setState({signedIn: true, toggleRedirect: true, toggleSignIn: false})
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

            this.setState({signedIn: true, toggleRedirect: true, toggleSignIn: false})
        } catch (error) {
            console.log(error)
        }
    }

    signOut = async (event) => {
      try {
          event.preventDefault()
          
          await axios.delete('/auth/sign_out')
  
          clearAuthTokens();
  
          this.setState({signedIn: false, toggleRedirect: false, toggleSignIn: false})
      } catch(error) {
          console.log(error)
      }
  }

  handleLogInClick = () => {
      this.setState({toggleSignIn: true})
  }

  handleLogoClick = () => {
      this.setState({toggleSignIn: false})
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
            signedIn={this.state.signedIn}
            toggleSignIn={this.state.toggleSignIn} />
        )

        return (
            <Router>
                <div>
                <Header signOut={this.signOut} 
                signedIn={this.state.signedIn} 
                handleLogInClick={this.handleLogInClick}
                handleLogoClick={this.handleLogoClick} />
                 
                    <Switch>
                        <Route exact path='/' render={HomePageComponent} />
                        <Route exact path='/signup' render={SignUpSignIn} />
                    </Switch>

                </div>
            </Router>
        )
    }
}

export default App
