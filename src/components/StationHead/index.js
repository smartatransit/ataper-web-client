import React, {useState, useRef, useEffect} from 'react';
import styled, {css} from "styled-components";
import {brand_darkest_grey, brand_lighter_grey} from "../../utils/colors";
import useScrollDebouncer from '../../hooks/useScrollDebouncer';


const Container = styled.div`
    position: relative;
    height: 150px;
    width: 100%;
`;

const Head = styled.div`
    position:${({fixed}) => fixed ? 'fixed' : 'absolute'};
    width: 100%;
    height: auto;
    top: 0;
    left: 0;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 6vh;
    z-index: 10;
    border-bottom: 1px solid ${brand_lighter_grey};
    color: ${brand_darkest_grey};
    background-color: #FFF;
`;

const Direction = styled.span`
    font-size: 2vh;
    margin-top: 20px;
    color: ${brand_lighter_grey};
    font-weight: bold;
    text-transform: uppercase;
    
`;

const MenuContainer = styled.div`
    display: flex;
    justify-content: center;
    transition: all 0.25s ease;
    max-height: ${(collapsed) => collapsed ? '2px' : '100px'};
    overflow: hidden;
    
    > button {
        margin-right: 20px;
        
        &:last-of-type {
            margin-right: 0;
        }
    }
    
    ${(collapsed) =>  collapsed && css`
        &:after {
            content: '';
            height: 2px;
            width: 24px;
            background-color: ${brand_darkest_grey};
            position: absolute;
            bottom: 10px;
            left: calc(50% - 12px);
        }
    `}
`;


const StationHead = ({station, direction, children}) => {
    const [fixed, setFixed] = useState(false);
    const header = useRef(null);

    const setFixedHeader = (lastScroll, currentScroll) => {
        const scrollTrigger = header.current.offsetTop;

        if(!fixed && lastScroll < currentScroll && currentScroll > scrollTrigger) {
            setFixed(true);
        } else if (fixed && lastScroll > currentScroll && currentScroll < scrollTrigger){
            setFixed(false);
        }
    };

    useScrollDebouncer(this, setFixedHeader);

    return (
        <Container ref={header}>
            <Head fixed={fixed}>
                <span>{station}</span>
                <Direction>{direction}</Direction>
                <MenuContainer collapsed={fixed}>
                    {children}
                </MenuContainer>
            </Head>
        </Container>
    );

}

export default StationHead;