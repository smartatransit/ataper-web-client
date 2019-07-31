import React, {useState} from 'react';
import styled from 'styled-components';
import {brand_lighter_grey, brand_lightest_grey} from "../../utils/colors";


const TabsContainer = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    z-index: 3;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    
    
    > button:last-of-type {
        border-right: none;
    }
`;

const Tab = styled.button`
    flex: 1 1;
    border-right: 1px solid ${brand_lighter_grey};
    background: ${({isSelected}) => isSelected ? brand_lighter_grey : '#FFF'};
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 4vh;
    text-transform: capitalize;
    transition: all 0.25s ease;
    
    
    &:focus {
        outline: none;
    }
`;

const Tabs = ({items, selected}) => {

    const [selectedIndex, setSelectedIndex] = useState(selected || -1);

    return (
        <TabsContainer>{items.map((item, index) => (
            <Tab key={item.name}
                 onClick={() => {
                     if(index === selectedIndex) {
                         setSelectedIndex(-1);
                         item.onClick("All");
                         return;
                     }
                     setSelectedIndex(index);
                     item.onClick(item.name);
                 }}
                 isSelected={index === selectedIndex}>{item.name}</Tab>
        ))}</TabsContainer>
    );

};

export default Tabs;


