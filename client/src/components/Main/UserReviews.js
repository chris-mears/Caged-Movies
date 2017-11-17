import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {FlexColumnCenter, FlexRow} from '../StyledComponents/FlexContainers'

const ReviewsContainer = FlexColumnCenter.extend `
`
const Review = FlexRow.extend`
border: 3px solid #cf6766;
margin: 10px;
width: 95%;
background: #30415D;
color: white;
    a{
        margin: 5px;
        color: white;
    }
`
//componet to allow user to see a list of their review
class UserReviews extends Component {
    render() {
        return (
            <ReviewsContainer>
                <h2>User Reviews:</h2>
                {this
                    .props
                    .reviews
                    .map((review) => {
                        return (
                            <Review key={review.id}>
                                <Link to={`/review/${review.id}/`}>
                                <h4>{review.title}</h4>
                                </Link>
                            </Review>
                        )
                    })}
            </ReviewsContainer>
        );
    }
}

export default UserReviews;