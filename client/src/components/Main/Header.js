import React, {Component} from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FlexRowBetween } from '../StyledComponents/FlexContainers'
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
            margin-left: 5px;
            font-size: 1.2em;
            color: white;
        }
        img {
        height: 6vh;
    }
    }
`

class Header extends Component {
    render() {
        const signIn = <HeaderButton onClick={this.props.handleLogInClick}>LogIn</HeaderButton>
        const signOut = <HeaderButton onClick={this.props.signOut}>Sign Out</HeaderButton>
        return (
            <div>
                <HeaderContainer>
                    <Logo onClick={this.props.handleLogoClick}><Link to="/"><div>
                    <img src="../../../Logo_white.png" alt="caged Movies" />
                    <p>Caged Movies</p>
                    </div>
                    </Link></Logo>
                    <div>
                    {this.props.signedIn ? signOut : signIn}
                    </div>
                </HeaderContainer>
            </div>
        );
    }
}

export default Header;