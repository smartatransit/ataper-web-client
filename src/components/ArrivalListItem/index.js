import React, { useState } from 'react';
import styled from "styled-components";
import { colorCodeArrivalTime, prettyTime } from "../../utils/utils";
import {
    brand_darkest_grey,
    brand_lighter_grey
} from "../../utils/colors";

const Arrival = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid ${brand_lighter_grey};
    cursor: pointer;
    padding: 0 20px 0 0;
    position: relative;
    
`;

const Line = styled.div`
    width: 30%;
    border-radius: 5px;
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column nowrap;
    font-size: 24px;
    color: ${brand_darkest_grey};
`;

const ArrivalHead = styled.div`
    display: flex;
    flex-flow: row wrap;
    text-align: end;
    justify-self: flex-end;
    padding: 30px 0;
    border-left: 1px solid ${brand_lighter_grey};
    flex: 1 1;
`;

const ArrivalTime = styled.h2`
    font-size: 18px;
    width: 100%;
    margin-bottom: 7px;
    color: ${({color}) => (color)};
    
`;

const Direction = styled.div`
    font-size: 14px;
`;

const Details = styled.div`
    width: 100%;
    font-size: 14px;
    transition: max-height 0.25s ease;
    max-height: ${({isSelected}) => isSelected ? '2000px' : '0'};
    overflow: hidden;
    
`;

const DetailItem = styled.div`
    width: 100%;
    padding: 10px 15px;
    
`;

const ArrivalListItem = (props) => {
    const {
        line,
        direction,
        ETA,
        waitSeconds,
        nextStation,
        destination
    } = props;


    const [isSelected, setIsSelected] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        setIsSelected(! isSelected);
    };

    return (
        <Arrival onClick={handleClick}>
            <Line line={line}>
                <div>{line}</div>
            </Line>
            <ArrivalHead>
                <ArrivalTime color={colorCodeArrivalTime(ETA)}>{ETA}</ArrivalTime>
                <Direction>{direction}</Direction>
            </ArrivalHead>
            <Details isSelected={isSelected}>
                <DetailItem>Wait Seconds: <b>{prettyTime(waitSeconds)}</b></DetailItem>
                <DetailItem>Next Station: <b>{nextStation}</b></DetailItem>
                <DetailItem>Destination: <b>{destination}</b></DetailItem>
            </Details>
        </Arrival>
    );

};


export default ArrivalListItem;

