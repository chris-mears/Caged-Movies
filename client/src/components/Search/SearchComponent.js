import React, {Component} from 'react';
import styled from 'styled-components'
import {FlexRow, FlexRowCenter, FlexColumn} from '../StyledComponents/FlexContainers'
import {Button} from '../StyledComponents/Button'

const SearchDiv = FlexRow.extend `
background-color: #fafafa;
border: 1px solid #dbdbdb;
height: 25px;
color: #999;
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
}
`
const Icon = styled.img `
margin: 0 10px 0 40px;
height: 20px;
`

const ActiveIcon = Icon.extend `
height: 25px;
`

const CancelIcon = Icon.extend `
height: 25px;
margin-right: 100px;
`

const FullScreen = styled.div `
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
z-index: 10;
background-color: rgba(254,254,254,0.7);
`
const OptionButton = Button.extend`
`

const SearchResults = FlexRowCenter.extend `
    margin: 20px 40px;
    border: 3px solid #30415D;
    height: 85vh;
    padding: 15px;
`

const SearchOptions = FlexColumn.extend`
    background-color: rgba(3,20,36,0.95);
    color: white;
    padding: 10px;
    margin-right: 40px;
    height: 80vh;
    width: 20vw;
`

const ResultsContainer = styled.div`
    background-color: rgba(3,20,36,0.95);
    padding: 10px;
    color: white;
    height: 80vh;
    width: 75vw;

`

class SearchComponent extends Component {
    state = {
        toggleSearch: false,
        searchInput: '',
        toggleMovies: true,
        toggleReviews: false,
        toggleGenre: false,
    }

    handleClick = () => {
        this.setState({
            toggleSearch: !this.state.toggleSearch
        })
    }

    handleCancel = () => {
        this.setState({
            toggleSearch: !this.state.toggleSearch,
            searchInput: ''
        })
    }

    handleChange = (event) => {
        this.setState({searchInput: event.target.value})
    }

    toggleMoviesSearch = () => {
        this.setState({toggleMovies: true, toggleReviews: false, toggleGenre: false})
    }

    toggleReviewsSearch = () => {
        this.setState({toggleMovies: false, toggleReviews: true, toggleGenre: false})
    }

    toggleGenreSearch = () => {
        this.setState({toggleMovies: false, toggleReviews: false, toggleGenre: true})
    }

    render() {

        const fullScreenSearch = <FullScreen>
            <ActiveSearchDiv>
                <ActiveIcon src='../../../icons/SVG/search.svg' alt="search"/>
                <ActiveSearch
                    autoFocus
                    type="text"
                    placeholder="Search for Movie and hit enter"
                    onChange={this.handleChange}
                    value={this.state.searchInput}/>
                <CancelIcon
                    src='../../../icons/SVG/cancel-circle.svg'
                    alt="Cancel Search"
                    onClick={this.handleCancel}/>
            </ActiveSearchDiv>
            <SearchResults>
                <SearchOptions>
                    <OptionButton onClick={this.toggleMoviesSearch}>Movies</OptionButton>
                    <OptionButton onClick={this.toggleReviewsSearch}>Reviews</OptionButton>
                    <OptionButton onClick={this.toggleGenreSearch}>Genres</OptionButton>
                </SearchOptions>
                <ResultsContainer>Results</ResultsContainer>
            </SearchResults>
        </FullScreen>

        const searchBar = this.state.toggleSearch
            ? fullScreenSearch
            : <SearchDiv>
                <Icon src='../../../icons/SVG/search.svg' alt="search"/>
                <Search type="text" placeholder="Search" onClick={this.handleClick}/>
            </SearchDiv>

        return (
            <div>
                {searchBar}
            </div>
        );
    }
}

export default SearchComponent;