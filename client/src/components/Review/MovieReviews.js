import React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { FlexRowBetween } from '../StyledComponents/FlexContainers'

const Review = FlexRowBetween.extend`
border: 1px solid #30415D;
margin: 20px;
font-size: 1.6em;
padding: 20px 60px;
a {
    color: black;
}
@media (max-width: 500px) {
    font-size: 1em;
    margin: 5px;
}
`

const Icon = styled.img`
margin: 20px;
@media (max-width: 500px) {
height: 25px; 
margin: 5px;  
}
`

const MovieReviews = (props) => {
    return (
            <Review>
                <Link to={`/review/${props.review.id}`}>
                {props.review.title}</Link><div>
                {props.review.belongs_to_user ? 
                <div>
                <Link to={`/updatereview/${props.review.id}`} >
                <Icon src='../../../icons/SVG/pencil.svg' alt='update' /></Link> 
                <Icon src='../../../icons/SVG/bin.svg' alt='delete' onClick={() => props.handleReviewDelete(props.review.id)}/> 
                </div> : ''}
                </div></Review>
    );
};

export default MovieReviews;
