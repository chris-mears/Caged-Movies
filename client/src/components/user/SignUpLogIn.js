import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from '../StyledComponents/Button'
import { FlexRowCenter } from '../StyledComponents/FlexContainers'


const SignInButton = Button.extend `
    background: #CF6766;
    color: #031424;    
`

const UserPortal = styled.div`
    padding-top: 80px;
`

const NewUserContainer = FlexRowCenter.extend`
    form {
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 50%;
    }
    div{
        display: flex;
        justify-content: center;
        width: 50%;
    }
`
const ReturnUserContainer = FlexRowCenter.extend`
form {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 50%;
}
div{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
}
`

class SignUpLogIn extends Component {

    state = {
        email: '',
        password: '',
        password_confirmation: '',
        name: '',
        nickname: '',
        toggleUserType: false
    }

    signUp = (event) => {
        event.preventDefault()
        this.props.signUp(
            this.state.email,
            this.state.password,
            this.state.password_confirmation,
            this.state.name,
            this.state.nickname
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

    handleToggle = () => {
        this.setState({toggleUserType: !this.state.toggleUserType})
    }

    render() {
        if (this.props.toggleRedirect) {
            return <Redirect to='/' />
        } 

        const newUser = <NewUserContainer>
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
        <div>
            <label htmlFor="name">Name: </label>
            <input onChange={this.handleChange} type="text" name="name"
                   value={this.state.name}/>
        </div>
        <div>
            <label htmlFor="username">Username: </label>
            <input onChange={this.handleChange} type="text" name="nickname"
                   value={this.state.nickname}/>
        </div>

        <SignInButton onClick={this.signUp}>Sign Up</SignInButton>
    </form>
    <div><SignInButton onClick={this.handleToggle}>Login</SignInButton></div>
    </NewUserContainer>
    const returningUser = <ReturnUserContainer>
        <div><SignInButton onClick={this.handleToggle}>Sign Up</SignInButton> </div>
        <form>
    <div>
        <label htmlFor="email">E-mail: </label>
        <input onChange={this.handleChange} type="text" name="email" value={this.state.email}/>
    </div>
    <div>
        <label htmlFor="password">Password: </label>
        <input onChange={this.handleChange} type="password" name="password" value={this.state.password}/>
    </div>
    <SignInButton onClick={this.signIn}>Log In</SignInButton>
</form>
</ReturnUserContainer>


        return (
            <UserPortal>
                {this.state.toggleUserType ? newUser : returningUser}
            </UserPortal>
        )
    }
}

export default SignUpLogIn