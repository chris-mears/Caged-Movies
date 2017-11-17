import React, { Component } from 'react';
import styled from 'styled-components'
import { Button } from '../StyledComponents/Button'
import {FlexRow, FlexColumn} from '../StyledComponents/FlexContainers'


const SearchDiv = FlexRow.extend `
background-color: #fafafa;
border: 1px solid #dbdbdb;
height: 25px;
color: #999;
`

const FullScreen = styled.div `
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
overflow: auto;
z-index: 10;
background-color: rgba(254,254,254,0.7);
`
const SearchWrapper = styled.div`
overflow: scroll;
`
const ActiveSearchDiv = SearchDiv.extend `
height: 50px;
`

const Search = styled.input `
border: none;
font-weight: 400;
background: transparent;
overflow: visible;
font-family: sans-serif;
font-size: 1.2em;
line-height: 1.6em;
margin: 0;
padding: 1px;
text-indent: 0px;
text-shadow: none;
display: inline-block;
height: 100%;
width: 100%;
`

const ActiveSearch = Search.extend `
font-weight: 800;
font-size: 1.6em;
:focus{
outline: none;
@media (max-width: 600px) {
    font-size: .8em
}
`

const Icon = styled.img `
margin: 0 10px 0 40px;
height: 20px;
@media (max-width: 600px) {
    margin: 5px;
}
`

const ActiveIcon = Icon.extend `
height: 25px;
`

const CancelIcon = Icon.extend `
height: 25px;
margin-right: 100px;
@media (max-width: 600px) {
    margin-right: 10px;
}
`
const SearchResults = styled.div `
display: flex;
margin: 20px 40px;
border: 3px solid #30415D;
padding: 15px;
min-height: 85vh;
@media (max-width: 600px) {
flex-direction: column;
width: auto;
height: auto;
margin: 5px;
padding: 5px;
}
`

const SearchOptions = FlexColumn.extend`
background-color: rgba(3,20,36,0.95);
color: white;
padding: 10px;
margin-right: 40px;
height: 80vh;
width: 20vw;
@media (max-width: 600px) {
    flex-direction: row;
    width: auto;
    height: auto;
    align-items: center;
    justify-content: center;
    margin: 10px 5px;
}
`

const OptionButton = Button.extend`
background: #CF6766;
color: #031424;
`

const ResultsContainer = styled.div`
background-color: rgba(3,20,36,0.95);
padding: 10px;
min-height: 85vh;
color: white;
width: 75vw;
@media (max-width: 600px) {
    width: auto;
    margin: 5px;
}
`

//component to dsiplay full screen search 
class FullScreenSearch extends Component {
    //handles enter for search and pass it to the searchcomponent
    handleEnter = (event) => {
        this.props.handleKeyPress(event)
    }

    //handles input change for search and pass it to the searchcomponent
    handleChange = (event) => {
        this.props.handleChange(event)
    }
    render() {
        return (
            <FullScreen onKeyPress={this.handleEnter}>
        <SearchWrapper>
            <ActiveSearchDiv>
                <ActiveIcon src='../../../icons/SVG/search.svg' alt="search"/>
                <ActiveSearch
                    autoFocus
                    type="text"
                    placeholder="Search for Movie and hit enter"
                    onChange={this.handleChange}
                    value={this.props.searchInput}/>
                <CancelIcon
                    src='../../../icons/SVG/cancel-circle.svg'
                    alt="Cancel Search"
                    onClick={this.props.handleCancel}/>
            </ActiveSearchDiv>
            <SearchResults>
                <SearchOptions>
                    <OptionButton onClick={this.props.toggleMoviesSearch}>Movies</OptionButton>
                    <OptionButton onClick={this.props.toggleReviewsSearch}>Reviews</OptionButton>
                    <OptionButton onClick={this.props.toggleGenreSearch}>Genres</OptionButton>
                </SearchOptions>
                <ResultsContainer>
                    {this.props.titleView}
                    {this.props.stateMessage !== '' ? this.props.message : ''}
                    {this.props.results}
                </ResultsContainer>
            </SearchResults>
        </SearchWrapper>
        </FullScreen>
        );
    }
}

export default FullScreenSearch;