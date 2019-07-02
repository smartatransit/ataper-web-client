import React from 'react';
import styled from "styled-components";
import {brand_darkest_grey, brand_lighter_grey} from "../../utils/colors";

const Head = styled.div`
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    font-size: 7vh;
    padding: 20px;
    border-bottom: 1px solid ${brand_lighter_grey};
    color: ${brand_darkest_grey};
`;

const Direction = styled.span`
    font-size: 2vh;
    margin-top: 20px;
    color: ${brand_lighter_grey};
    font-weight: bold;
    text-transform: uppercase;
    
`;

const StationHead = ({station, direction, children}) => (
    <Head>
        <span>{station}</span>
        <Direction>{direction}</Direction>
        {children}
    </Head>
);

export default StationHead;