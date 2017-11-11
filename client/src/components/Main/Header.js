import React, {Component} from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FlexRowBetween } from '../StyledComponents/FlexContainers'


const HeaderContainer = FlexRowBetween.extend `
    height: 50px;
    width: 100%;
    background: grey;
    div {
        margin-right: 40px;
    }
`

const Logo = styled.div `
    color: red;
    margin-left: 40px;
    a {
        text-decoration: none;
    }
`

class Header extends Component {
    render() {
        const signIn = <button onClick={this.props.handleLogInClick}>LogIn</button>
        const signOut = <button onClick={this.props.signOut}>Sign Out</button>
        return (
            <div>
                <HeaderContainer>
                    <Logo onClick={this.props.handleLogoClick}><Link to="/">Logo</Link></Logo>
                    <div>
                    {this.props.signedIn ? signOut : signIn}
                    </div>
                </HeaderContainer>
            </div>
        );
    }
}

export default Header;