import React, { Component } from 'react';
import styled from 'styled-components'
import { FlexRow } from '../StyledComponents/FlexContainers'

const SearchDiv = styled.div `
background-color: #fafafa;
border: 1px solid #dbdbdb;
width: 100%;
height: 5vh;
padding: 7px;
border-radius: 3px;
color: #999;
`;

const Search = styled.input `
border: none;
font-weight: bold;
background: transparent;
overflow: visible;
font-family: sans-serif;
font-size: 100%;
line-height: 1.15;
margin: 0;
padding: 1px;
text-indent: 0px;
text-shadow: none;
display: inline-block;
height: 100%;
width: 90%;
`;

const Icon = styled.img`
margin: 0 20px;
`

class SearchComponent extends Component {
    render() {
        return (
            <div>
                <SearchDiv>
                    <Icon src='../../../icons/SVG/search.svg' alt="search" />
                    <Search type="text" placeholder="Search" />
                </SearchDiv>
            </div>
        );
    }
}

export default SearchComponent;