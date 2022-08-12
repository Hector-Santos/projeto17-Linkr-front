import styledComponents from "styled-components";

const Title = styledComponents.h1`
    font-family: 'Oswald', sans-serif;
    font-size: 34px;
    font-weight: bolder;
    margin-bottom: 35px;
`;

export default function PageTitle({ text }){

    return(
        <Title>
            {text}
        </Title>
    );

};