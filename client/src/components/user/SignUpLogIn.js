import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import { Button } from '../StyledComponents/Button'

const SignInButton = Button.extend `
    background: #CF6766;
    color: #031424;    
`

class SignUpLogIn extends Component {

    state = {
        email: '',
        password: '',
        password_confirmation: ''
    }

    signUp = (event) => {
        event.preventDefault()
        this.props.signUp(
            this.state.email,
            this.state.password,
            this.state.password_confirmation
        )
    }

    signIn = (event) => {
        event.preventDefault()
        this.props.signIn(
            this.state.email,
            this.state.password
        )
    }

    handleChange = (event) => {
        const newState = {...this.state}
        newState[event.target.name] = event.target.value
        this.setState(newState)
    }

    render() {
        if (this.props.toggleRedirect) {
            return <Redirect to='/' />
        } 
        return (
            <div>
                <form>
                    <div>
                        <label htmlFor="email">E-mail: </label>
                        <input onChange={this.handleChange} type="text" name="email" value={this.state.email}/>
                    </div>
                    <div>
                        <label htmlFor="password">Password: </label>
                        <input onChange={this.handleChange} type="password" name="password" value={this.state.password}/>
                    </div>
                    <div>
                        <label htmlFor="password_confirmation">Confirm Password: </label>
                        <input onChange={this.handleChange} type="password" name="password_confirmation"
                               value={this.state.password_confirmation}/>
                    </div>

                    <SignInButton onClick={this.signUp}>Sign Up</SignInButton>
                    <SignInButton onClick={this.signIn}>Log In</SignInButton>
                </form>
            </div>
        )
    }
}

export default SignUpLogIn