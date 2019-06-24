import React, { useState } from 'react';
import styled from "styled-components";
import { colorCodeArrivalTime, prettyTime } from "../../utils/utils";
import {IconContext} from "react-icons";
import {IoIosInformationCircleOutline} from "react-icons/io";
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
    position: relative;
    width: 30%;
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    font-size: 24px;
    padding-left: 15px;
    color: ${brand_darkest_grey};
    
    &:after {
        content: '';
        position: absolute;
        top: 0;
        right: 12px;
        height: 24px;
        width: 24px;
        border-radius: 50%;
        background-color: ${({line}) => {
            switch(line) {
                case 'Blue':
                    return brand_blue;
                case 'Red':
                    return brand_red;
                case 'Gold':
                    return brand_gold;
                case 'Green':
                    return brand_green;
                default:
                    return 'transparent';
            }
        }};
    }
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
    position: relative;
    width: 100%;
    padding: 10px 15px;
    
`;

const InfoButton = styled.div`
    width: 30px;
    height: 30px;
    position: absolute;
    right: 20px;
    top: 10px;
`;

const ArrivalListItem = (props) => {
    const {
        line,
        direction,
        ETA,
        waitSeconds,
        nextStation,
        isDefaultSelected,
        onInfoClick,
        destination
    } = props;


    const [isSelected, setIsSelected] = useState(isDefaultSelected);

    const handleArrivalClick = (e) => {
        e.preventDefault();
        setIsSelected(! isSelected);
    };

    return (
        <Arrival isSelected={isSelected} onClick={handleArrivalClick}>
            <Line line={line}>
                <div>{line}</div>
            </Line>
            <ArrivalHead>
                <ArrivalTime color={colorCodeArrivalTime(ETA)}>{ETA}</ArrivalTime>
                <Direction>{direction}</Direction>
            </ArrivalHead>
            <Details isSelected={isSelected}>
                <DetailItem>
                    <span>Wait Seconds: <b>{prettyTime(waitSeconds)}</b></span>
                    <InfoButton onClick={onInfoClick}>
                        <IconContext.Provider value={{color: brand_blue, size:'30px'}}>
                            <IoIosInformationCircleOutline/>
                        </IconContext.Provider>
                    </InfoButton>
                </DetailItem>
                <DetailItem>Current Location: <b>{nextStation}</b></DetailItem>
                <DetailItem>Destination: <b>{destination}</b></DetailItem>
            </Details>
        </Arrival>
    );

};


export default ArrivalListItem;

