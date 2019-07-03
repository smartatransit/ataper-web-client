import React, { Fragment, useState, useEffect } from "react";
import styled from 'styled-components';
import { Menu } from 'grommet';
import Fetcher from "../../components/Fetcher";
import api from '../../api';
import Stations from "../../constants/stations";
import StationHead from '../../components/StationHead';
import {getDay, sortByTime} from "../../utils/utils";
import {brand_lighter_grey} from "../../utils/colors";
import Tabs from '../../components/Tabs';

const List = styled.div`
  padding: 0 25px;
`;

const ListItem = styled.div`
    display: flex;
    padding: 30px 20px;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid ${brand_lighter_grey};
`

const renderDirectionMenu = (directions, setDirection, initialDirection) => {
    let items = [];
    for (let direction in directions) {
        items.push({ label: direction, onClick: () => setDirection(direction) });
    }
    return (
        <Menu
            label={initialDirection || "Direction"}
            items={items}
        />
    )
};
const renderAllLines = (data, direction) => {
    let allLines = [];
    for(let line in data) {
        if(data.hasOwnProperty(line) && line !== 'station-name')
            allLines = allLines.concat(data[line][direction]);
    }
    allLines = sortByTime(allLines);
    console.log(allLines);
    return (
        <List>
            {allLines.map((time) => (
                <ListItem key={time}>{time}</ListItem>
            ))}
        </List>
    );
}

const renderStaticSchedule = (data) => {
    console.log(data);
    return (
        <List>
            {data.map((time) => (
                <ListItem>{time}</ListItem>
            ))}
        </List>
    )
};


const StaticSchedule = (props) => {

    const {
        match,
        line
    } = props;

    const {station, direction} = match.params;
    const stationName = station.replace('-',' ');
    const stationKey = station.replace('-','');
    const directions = Stations[stationKey].directions;

    const [directionState, setDirection] = useState(direction || Object.keys(directions)[0]);
    const [lineState, setLine] = useState(line || 'All');
    const [lines, setLines] = useState([]);


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


    return (
        <Fragment>
            <StationHead
                station={Stations[stationKey].name.replace('Station', '').trim()}>
                {renderDirectionMenu(directions, setDirection, directionState)}
            </StationHead>

            <Fetcher action={api.fetchScheduleByStationAndDay(Stations[stationKey].name, getDay(new Date()))}>

                {data => {
                    if(lineState === 'All') {
                        return renderAllLines(data, directionKey);
                    }
                    return renderStaticSchedule(data[lineState][directionKey]);
                }}
            </Fetcher>
            {renderTabs()}

        </Fragment>

    );
};

export default StaticSchedule;