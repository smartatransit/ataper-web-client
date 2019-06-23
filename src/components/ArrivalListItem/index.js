import React, { useState } from 'react';
import styled from "styled-components";
import { colorCodeArrivalTime, prettyTime } from "../../utils/utils";
import {
    brand_blue,
    brand_darkest_grey, brand_gold, brand_green,
    brand_lighter_grey, brand_lightest_grey, brand_red
} from "../../utils/colors";

const Arrival = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid ${brand_lighter_grey};
    cursor: pointer;
    padding: 0;
    position: relative;
    background: ${({isSelected}) => isSelected ? brand_lightest_grey : null};
    transition: background 0.25s ease;
    
`;

const Line = styled.div`
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column nowrap;
    font-size: 24px;
    color: ${brand_darkest_grey};
    border-right: 15px solid;
    border-radius: 15px;
    border-color: ${({line}) => {
        switch(line) {
            case 'Blue':
                return brand_blue;
            case 'Red':
                return brand_red;
            case 'Gold':
                return brand_gold;
            case 'Green':
                return brand_green;
        }    
    }};
`;

const ArrivalHead = styled.div`
    display: flex;
    flex-flow: row wrap;
    text-align: end;
    justify-self: flex-end;
    padding: 30px 20px;
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
    transition: all 0.25s ease;
    max-height: ${({isSelected}) => isSelected ? '2000px' : '0'};
    overflow: hidden;
    
    > div:first-of-type {
        padding: 20px 15px 10px;
    }
    > div:last-of-type {
        padding: 10px 15px 20px;
    }
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
        <Arrival isSelected={isSelected} onClick={handleClick}>
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

