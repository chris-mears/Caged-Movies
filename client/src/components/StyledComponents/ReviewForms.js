import styled from 'styled-components'
import {FlexRow} from '../StyledComponents/FlexContainers'

export const ReviewForm = styled.form`
h3 {
    font-size: 2em;
    margin: 20px;
}
`
export const UpperForm = FlexRow.extend`
img {
    height: 30vh;
    margin-left: 15vw; 
}
@media (max-width: 600px) {
    flex-direction: column;
    width: auto;
    img {
        order: 1; 
    }
    div {
        order: 2
    }
}
`

export const TitleInput = styled.input`
width: 50vw;
line-height: 50px;
font-size: 2em;
border: none;
border-bottom: 2px solid #30415D;
margin: 20px;
@media (max-width: 600px) {
   width: 95vw;
   margin: 5px;
   font-size: 1em; 
}
`

export const BodyField = styled.textarea`
width: 95%;
height: 45vh;
font-size: 1.6em;
border: 2px solid #30415D;
margin: 20px 0 10px 20px;
@media (max-width: 600px) {
   margin: 5px; 
   font-size: 1em;
}
`

export const SubmitButton = styled.input`
background: #CF6766;
color: #031424;
font-weight: bolder;
text-decoration: none;
text-align: cneter;
letter-spacing: .1em;
font-size: 1rem;
border: none;
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
`