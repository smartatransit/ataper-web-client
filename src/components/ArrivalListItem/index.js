import React, { useState } from 'react';
import styled from "styled-components";

const Arrival = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid var(--brand-lighter-grey);
    cursor: pointer;
    position: relative;
    
`;

const ArrivalTime = styled.div`
    width: 54px;
    height: 54px;
    border: 1px solid var(--brand-light-grey);
    border-radius: 5px;
    background-color: #FFFFFF;
    box-shadow: 0 2px 1px 0 rgba(0,0,0,0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column nowrap;
    font-size: 24px;
    
`;

const ETAMinLabel = styled.div`
    font-size: 12px;
    font-weight: 600;
`;

const ArrivalHead = styled.div`
    display: flex;
    flex-flow: row wrap;
    width: calc(100% - 74px);
`;

const Line = styled.h2`
    font-size: 18px;
    width: 100%;
    margin-bottom: 7px;
`;

const Direction = styled.div`
    font-size: 14px;
`;

const Details = styled.div`
    width: 100%;
    font-size: 12px;
    transition: max-height 0.25s ease;
    max-height: ${({isSelected}) => isSelected ? '2000px' : '0'};
    
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
        destination
    } = props;

    console.log('arrival list item');

    const [isSelected, setIsSelected] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        setIsSelected(! isSelected);
    };

    return (
        <Arrival onClick={handleClick}>
            <ArrivalTime>
                <div>{ETA}</div>
                <ETAMinLabel>min</ETAMinLabel>
            </ArrivalTime>
            <ArrivalHead>
                <Line>{line}</Line>
                <Direction>{direction}</Direction>
            </ArrivalHead>
            <Details isSelected={isSelected}>
                <DetailItem>Wait Seconds: {waitSeconds}</DetailItem>
                <DetailItem>Destination: {destination}</DetailItem>
            </Details>
        </Arrival>
    );

};


export default ArrivalListItem;

