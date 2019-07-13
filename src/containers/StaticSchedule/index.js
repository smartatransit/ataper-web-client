import React, { Fragment, useState, useEffect } from "react";
import styled from 'styled-components';
import { Menu } from 'grommet';
import {flatten, zip, } from "lodash-es";
import Fetcher from "../../components/Fetcher";
import api from '../../api';
import Stations from "../../constants/stations";
import StationHead from '../../components/StationHead';
import {brand_lighter_grey, brand_gold, brand_green, brand_red, brand_blue} from "../../utils/colors";
import Tabs from '../../components/Tabs';

const List = styled.div`
  padding: 0 25px 50px;
`;

const ListItem = styled.div`
    position: relative;
    display: flex;
    padding: 30px 20px;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid ${brand_lighter_grey};
    
    &:before {
        content: '';
        position: absolute;
        top: 25px;
        left: 0;
        height: 24px;
        width: 24px;
        border-radius: 50%;
        background-color: ${({line}) => {
            switch(line) {
                case 'blue':
                    return brand_blue;
                case 'red':
                    return brand_red;
                case 'gold':
                    return brand_gold;
                case 'green':
                    return brand_green;
                default:
                    return 'transparent';
            }
        }};
    }
`;

const renderMenu = (items, action, initialValue) => {
    let menuItems = [];
    if(Array.isArray(items)) {
        menuItems = items.map((item) => {
            return { label: item, onClick: () => action(item) };
        });
    } else {
        for (let item in items) {
            if(items.hasOwnProperty(item))
                menuItems.push({ label: item, onClick: () => action(item) });
        }
    }

    return (
        <Menu
            label={initialValue}
            items={menuItems}
        />
    )
};
const renderAllLines = (data, direction) => {
    let allLines = [];

    for(let line in data) {
        if(data.hasOwnProperty(line) && line !== 'station-name' && !! data[line][direction]) {
            allLines = flatten(zip(data[line][direction].map((item) => ({line:line, time:item})), allLines)).filter(element => element);
        }
    }

    return (
        <List>
            {allLines.map((item, index) => (
                <ListItem line={item.line} key={index}>{item.time}</ListItem>
            ))}
        </List>
    );
}

const renderStaticSchedule = (data, line) => {
    return (
        <List>
            {data.map((time, index) => (
                <ListItem key={index} line={line}>{time}</ListItem>
            ))}
        </List>
    )
};


const StaticSchedule = (props) => {

    const {
        match,
        line,
        day
    } = props;

    const {station, direction} = match.params;
    const stationKey = station.replace('-','');
    const directions = Stations[stationKey].directions;
    const [directionState, setDirection] = useState(direction || Object.keys(directions)[0]);
    const [lineState, setLine] = useState(line || 'All');
    const [schedule, setSchedule] = useState(day || 'weekday');
    const directionKey = `${directionState}bound`;

    const renderTabs = () => {
        const data = Stations[stationKey].directions[directionState];
        const lines = data.map((line) => ({name: line, onClick: setLine}));
        return (
            <Tabs
                items={lines}
                selected={lineState}
            />
        )
    };

    useEffect(() => {

    })

    return (
        <Fragment>
            <StationHead
                station={Stations[stationKey].name.replace('Station', '').trim()}>
                {renderMenu(directions, setDirection, directionState)}
                {renderMenu(['weekday', 'weekend'], setSchedule, schedule)}
            </StationHead>

            <Fetcher action={api.fetchScheduleByStationAndDay(Stations[stationKey].name, schedule)}>

                {data => {
                    if(lineState === 'All') {
                        return renderAllLines(data, directionKey);
                    }
                    return renderStaticSchedule(data[lineState][directionKey], lineState);
                }}
            </Fetcher>
            {renderTabs()}

        </Fragment>

    );
};

export default StaticSchedule;