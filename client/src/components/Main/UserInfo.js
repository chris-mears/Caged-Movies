import React from 'react';
import styled from 'styled-components'
import {FlexRowCenter} from '../StyledComponents/FlexContainers'
import {Button} from '../StyledComponents/Button'

const UserContainer = FlexRowCenter.extend `
img{
    height: 200px;
    border-radius: 100px;
}
div{
    width: 70vw;
    margin-left: 10px;
}
@media (max-width: 750px) {
    flex-direction: column;
    width: auto;
    img{
        height: 150px;
        border-radius: 75px;
    }
    div{
        width: auto;
        margin-left: 5px;
    }
}
`
const UserContent = FlexRowCenter.extend `
`
const ContentButton = Button.extend `
background: #CF6766;
color: #031424; 
`

const UserInfo = (props) => {
    return (
        <UserContainer>
            <img src={props.userInfo.image} alt={props.userInfo.name}/>
            <div>
                <h2>{props.userInfo.name}</h2>
                <hr/>
                <h4>{props.userInfo.nickname}</h4>
                <UserContent>
                    <ContentButton onClick={props.showFavoriteMovies}>
                        {props.toggleUserFavorites
                            ? "Return"
                            : "Favorites"}
                    </ContentButton>
                    <ContentButton onClick={props.showWatchList}>
                        {props.toggleUserWatchList
                            ? "Return"
                            : "Watch List"}</ContentButton>
                    <ContentButton onClick={props.showReviews}>
                        {props.toggleUserReviews
                            ? "Return"
                            : "Reviews"}</ContentButton>
                </UserContent>
            </div>
        </UserContainer>
    );
};

export default UserInfo;