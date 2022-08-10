import Header from "./Header";
import styled from "styled-components";
import Posts from "./Posts";
import TrendingSidebar from "./TrendingSidebar";

const TimelineSection = styled.section`
    
    display: flex;
    border-radius: 16px;
    color: #fff;
    width: 80%;
    margin: 0 auto;
    margin-top: 140px;
    justify-content: center;

`;

export default function Timeline(){

    return (
        <TimelineSection>
            <Posts />
            <TrendingSidebar />
        </TimelineSection>
    )
};