import React, {Component} from 'react';
import styled from 'styled-components'
import axios from 'axios'

import {FlexRowBetween, FlexRow} from '../StyledComponents/FlexContainers'
import {Button} from '../StyledComponents/Button'

const CommentList = styled.div `
margin: 20px;
`

const CommentHeader = FlexRow.extend `
`
const CommentInfo = FlexRow.extend ``

const Comment = FlexRowBetween.extend `
border: 1px solid #30415D;
margin: 20px;
font-size: 1.6em;
padding: 10px 30px;
p {
    margin: 0;
}
`

const Avatar = styled.img `
    height: 40px;
    border-radius: 20px;
    margin-right: 40px;
`
const BodyField = styled.textarea `
width: 93vw;
height: 12vh;
font-size: 1.4em;
border: 2px solid #30415D;
margin: 20px;
`
const BodyUpdateField = styled.textarea `
width: 70vw;
height: 12vh;
font-size: 1.2em;
border: 2px solid #30415D;
margin: 20px;
`
const Icon = styled.img `
margin: 0 20px;
`

class MovieComments extends Component {
    state = {
        toggleNew: false,
        toggleUpdate: false,
        body: '',
        updateCommentId: 0
    }

    showNewComment = async() => {
        this.setState({
            toggleNew: !this.state.toggleNew
        })
        if (this.state.toggleNew) {
            const payload = {
                movie_id: this.props.movieId,
                body: this.state.body
            }
            await axios.post('/api/movie_comments', payload)
            this
                .props
                .getMovie(this.props.movieId)
            this.setState({body: ''})
        }
    }

    updateComment = async (comment) => {
        this.setState({
            toggleUpdate: !this.state.toggleUpdate
        })
        if (this.state.toggleUpdate) {
            const payload = {
                body: this.state.body
            }
            await axios.put(`/api/movie_comments/${comment.id}`, payload)
            this.props.getMovie(this.props.movieId)
            this.setState({body: '', updateCommentId: 0})
        } else {
            this.setState({body: comment.body, updateCommentId: comment.id})
        }
    }

    deleteComment = async (id) => {
        await axios.delete(`/api/movie_comments/${id}`)
        this.props.getMovie(this.props.movieId)
    }

    handleChange = (event) => {
        const body = event.target.value
        this.setState({body})
    }

    render() {
        let comments = ''
        if (this.props.comments.length === 0) {
            comments = <h3>No Comments Yet. Login to add a comment</h3>
        } else {
            comments = this
                .props
                .comments
                .map((comment) => {
                    return <Comment key={comment.id}>
                        <CommentInfo>
                            <Avatar src={comment.author_image} alt={comment.author}/> 
                            {this.state.toggleUpdate && this.state.updateCommentId === comment.id
                                ? <BodyUpdateField
                                        autoFocus
                                        type="text"
                                        name="body"
                                        onChange={this.handleChange}
                                        value={this.state.body}/>
                                : <p>{comment.body}</p>}
                        </CommentInfo>
                        {this.props.signedIn && comment.belongs_to_user ?
                        <div>
                            <Icon
                                src='../../../icons/SVG/pencil.svg'
                                alt='update'
                                onClick={() => this.updateComment(comment)}/>
                            <Icon src='../../../icons/SVG/bin.svg' alt='delete' onClick={() => this.deleteComment(comment.id)}/>
                        </div>
                        : '' }
                    </Comment>
                })
        }
        return (
            <CommentList>
                <CommentHeader>
                    <h2>Comments:</h2>
                    {this.props.signedIn
                        ? <Button onClick={this.showNewComment}>{this.state.toggleNew
                                    ? 'Save'
                                    : 'Add Comment'}</Button>
                        : ''}
                </CommentHeader>
                {this.state.toggleNew
                    ? <BodyField
                            autoFocus
                            type="text"
                            name="body"
                            onChange={this.handleChange}
                            value={this.state.body}/>
                    : ''}
                {comments}
            </CommentList>
        );
    }
}

export default MovieComments;