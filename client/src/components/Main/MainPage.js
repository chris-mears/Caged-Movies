import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { FlexRowCenter } from '../StyledComponents/FlexContainers'


const HeroUserContainer = FlexRowCenter.extend `
    width: 100%;
    height: 35vh;
    background: grey;
    margin-top: 15px;
`


class MainPage extends Component {
    render() {
        if (this.props.toggleSignIn) {
            return <Redirect to="/signup" />
        }
        return (
            <div>
                <HeroUserContainer>
                    {this.props.signedIn ? <h1>UserInfo</h1> : <h1>HeroBanner</h1>}
                </HeroUserContainer>
            </div>
        );
    }
}

export default MainPage;