import styled from 'styled-components'

export const Button = styled.button `
    font-weight: bolder;
    text-decoration: none;
    text-align: cneter;
    letter-spacing: .1em;
    font-size: 1rem;
    border: none;
    margin: 5px;
    border-radius: 2px;
    height: 36px;
    line-height: 36px;
    padding: 0 2rem;
    text-transform: uppercase;
    box-shadow: 0 2px 2px 0 rgba(24,18,30, .14),
    0 1px 5px 0 rgba(24,18,30, .12),
    0 3px 1px -2px rgba(24,18,30, .12);
    &:hover {
        background: rgb(198, 165, 103);
    }
    @media (max-width: 850px) {
        letter-spacing: .1em;
        font-size: .5rem;
        border: none;
        margin: 2px;
        border-radius: 2px;
        height: 26px;
        line-height: 26px;
        padding: 0 .2rem;
        min-width: 60px;
    }
`