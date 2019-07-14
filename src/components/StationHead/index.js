import React, {useState, useRef, useEffect} from 'react';
import styled, {css} from "styled-components";
import {brand_darkest_grey, brand_lighter_grey} from "../../utils/colors";
import useScrollDebouncer from '../../hooks/useScrollDebouncer';

const dimensions = {
    large: {
        collapsed: '120px',
        expanded: '155px'
    },
    small: {
        collapsed: '80px',
        expanded: '115px;'
    },
    default: '110px'
};

const getHeight = (collapsed, size, isCollapsable) => {
    if (! isCollapsable) {
        return dimensions.default;
    }
    if (collapsed) {
        return dimensions[size].collapsed;
    }
    return dimensions[size].expanded;
};


const Container = styled.div`
    position: relative;
    width: 100%;
    height: ${({collapsed, size, isCollapsable}) => (getHeight(collapsed, size, isCollapsable))}
    max-height: ${({collapsed, size, isCollapsable}) => (getHeight(collapsed, size, isCollapsable))}
    transition: max-height 0.25s ease;
    overflow: hidden;
`;

const Head = styled.div`
    position:${({fixed}) => fixed ? 'fixed' : 'relative'};
    max-height: ${({collapsed, size, isCollapsable}) => (getHeight(collapsed, size, isCollapsable))}
    transition: max-height 0.25s ease;
    overflow: hidden;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    padding: 16px;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    font-size: 44px;
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
    margin-top: 8px;
    justify-content: center;
    left: 0;
    width: 100%;
    
    > button {
        margin-right: 20px;
        
        &:last-of-type {
            margin-right: 0;
        }
    }
`;


const StationHead = ({station, direction, isCollapsable, children}) => {
    const [fixed, setFixed] = useState(false);
    const [collapsed, setCollapsed] = useState(! isCollapsable);
    const header = useRef(null);
    const size = station.length > 16 ? 'large' : 'small';

    const setFixedHeader = (lastScroll, currentScroll) => {
        const scrollTrigger = header.current.offsetTop;

        if(!fixed && lastScroll < currentScroll && currentScroll > scrollTrigger) {
            setFixed(true);
            setCollapsed(true);
        } else if (fixed && lastScroll > currentScroll && currentScroll < scrollTrigger){
            setFixed(false);
            setCollapsed(false);
        }
    };

    useScrollDebouncer(this, setFixedHeader);

    const expand = (e) => {
        e.preventDefault();
        if(isCollapsable) {
            setCollapsed(! collapsed)
        }
    };

    return (
        <Container ref={header} collapsed={collapsed} size={size} isCollapsable={isCollapsable}>
            <Head fixed={fixed} collapsed={collapsed} size={size} onClick={expand} onDrag={expand} isCollapsable={isCollapsable}>
                <span>{station}</span>
                {direction && <Direction>{direction}</Direction>}
                <MenuContainer collapsed={collapsed} onClick={(e) => {e.stopPropagation()}}>
                    {children}
                </MenuContainer>
            </Head>
        </Container>
    );

};

export default StationHead;