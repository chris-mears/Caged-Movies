import React, {Component} from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FlexRowBetween, FlexRowCenter } from '../StyledComponents/FlexContainers'
import { Button } from '../StyledComponents/Button'


const HeaderContainer = FlexRowBetween.extend `
    height: 50px;
    width: 100%;
    background: #031424;
    div {
        margin-right: 40px;
    }
`
const HeaderButton = Button.extend `
    background: #CF6766;
    color: #031424;
    height: 24px;
    line-height: 24px;
    padding: 0 1rem;
`

const Username = styled.p`
    color: white;
    @media (max-width: 380px) {
        display: none;
    }
`

const Logo = styled.div `
    font-weight: bolder;
    margin-left: 40px;
    a {
        color: #8EAEBD;
        text-decoration: none;
        div {
            display: flex;
            justify-contents: center;
            align-items: center;
        }
        p {
            margin: 30px 0 10px 5px;
            font-size: 1.2em;
            color: white;
        }
        img {
        height: 50px;
    }
    }
    @media (max-width: 500px) {
        font-weight: bolder;
    margin-left: 10px;
    a {
        p {
            margin: 10px 0 2px 2px;
            font-size: .8em;
            color: white;
        }
        img {
        height: 25px;
    }
    }

`
const SignIn = FlexRowCenter.extend``

class Header extends Component {
    render() {
        const signIn = <Link to='/signup'><HeaderButton>LogIn</HeaderButton></Link>
        const signOut = <HeaderButton onClick={this.props.signOut}>Sign Out</HeaderButton>
        return (
                <HeaderContainer>
                    <Logo onClick={this.props.handleLogoClick}><Link to="/"><div>
                    <img src="../../../Logo.png" alt="caged Movies" />
                    <p>Caged Movies</p>
                    </div>
                    </Link></Logo>
                    <SignIn>
                    {this.props.signedIn ? 
                            <Username>{this.props.nickname}</Username>
                        : ''}
                    {this.props.signedIn ? signOut : signIn}
                    </SignIn>
                </HeaderContainer>
        );
    }
}

export default Header;