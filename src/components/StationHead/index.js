import React, {useState, useRef} from 'react';
import styled from "styled-components";
import {MdFilterList} from "react-icons/md";
import {brand_blue, brand_darkest_grey, brand_lighter_grey} from "../../utils/colors";
import useScrollDebouncer from '../../hooks/useScrollDebouncer';
import {IconContext} from "react-icons";

const dimensions = {
    large: {
        collapsed: '120px',
        expanded: '155px'
    },
    small: {
        collapsed: '78px',
        expanded: '115px;'
    },
    default: 'auto'
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
`;

const Wrap = styled.div`
    position:${({fixed}) => fixed ? 'fixed' : 'relative'};
    height: ${({collapsed, size, isCollapsable}) => (getHeight(collapsed, size, isCollapsable))}
    max-height: ${({collapsed, size, isCollapsable}) => (getHeight(collapsed, size, isCollapsable))}
    transition: max-height 0.25s ease;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 10;
`

const Head = styled.div`
    overflow: hidden;
    position: ${({isCollapsable}) => isCollapsable ? 'absolute' : 'relative'};
    left: 0;
    top: 0;
    width: 100%;
    height: ${({isCollapsable}) => isCollapsable ? '100%' : null};
    padding: 16px;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${brand_lighter_grey};
    color: ${brand_darkest_grey};
    background-color: #FFF;
`;

const Name = styled.h1`
    text-align: center;
    font-size: calc(35px + 2vw);
    line-height: calc(35px + 2vw);
    font-weight: normal;
`

const Direction = styled.span`
    font-size: 2vh;
    margin-top: 15px;
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

const MenuButton = styled.button`
    position: absolute;
    bottom: -40px;
    right: 10px;
    background: transparent;
    width: 40px;
    height: 40px;
    border: none;
    
    &:focus {
        outline: none;
    }
    
    svg {
        width: 100%;
        height: 100%;
    }
`

const renderMenuButton = (onClick) => (
    <MenuButton onClick={onClick}>
        <IconContext.Provider value={{ color: brand_blue}}>
            <MdFilterList/>
        </IconContext.Provider>
    </MenuButton>
);


const StationHead = ({station, direction, isCollapsable, children}) => {
    const [fixed, setFixed] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const header = useRef(null);
    const size = station.length > 16 ? 'large' : 'small';

    const setFixedHeader = (lastScroll, currentScroll) => {
        const scrollTrigger = header.current.offsetTop;

        if(! isCollapsable) {
            return;
        }

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
            <Wrap onClick={expand} onDrag={expand} fixed={fixed} collapsed={collapsed} size={size} isCollapsable={isCollapsable}>
                <Head isCollapsable={isCollapsable}>
                    <Name>{station}</Name>
                    {direction && <Direction>{direction}</Direction>}
                    <MenuContainer collapsed={collapsed} onClick={(e) => {e.stopPropagation()}}>
                        {children}
                    </MenuContainer>
                </Head>
                {isCollapsable && renderMenuButton(expand)}
            </Wrap>
        </Container>
    );

};

export default StationHead;