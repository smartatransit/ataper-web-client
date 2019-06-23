import React, { Fragment } from "react";
import styled from 'styled-components';
import Fetcher from "../../components/Fetcher";
import api from '../../api';
import ArrivalListItem from '../../components/ArrivalListItem'
import {brand_darkest_grey, brand_lighter_grey} from "../../utils/colors";
import Stations from "../../constants/stations";
const StationHead = styled.div`
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    font-size: 7vh;
    padding: 20px;
    border-bottom: 1px solid ${brand_lighter_grey};
    color: ${brand_darkest_grey};
`

const Direction = styled.span`
    font-size: 2vh;
    margin-top: 20px;
    color: ${brand_lighter_grey};
    font-weight: bold;
    text-transform: uppercase;
    
`

const ArrivalList = (props) => {

    const {
        match,
        station,
    } = props;

    const {direction} = match.params;
    function renderArrivalList(data) {
        return (
            <Fragment>
                {data.map((arrival) => {
                    return (
                        <ArrivalListItem
                            key={arrival.schedule["train-id"]}
                            line={arrival.station.line}
                            direction={arrival.direction}
                            ETA={arrival.schedule["waiting-time"]}
                            waitSeconds={arrival.schedule["waiting-seconds"]}
                            destination={arrival.schedule.destination}
                            nextStation={arrival.schedule.next}
                        />
                    );
                })}
            </Fragment>
        );
    }

    return (
        <Fragment>
            <StationHead>
                <span>{Stations[station].name.replace('Station', '').trim()}</span>
                <Direction>{direction}</Direction>
            </StationHead>
            <Fetcher action={api.fetchArrivalsByStationAndDirection(station, direction)}>

                {data => renderArrivalList(data)}

            </Fetcher>
        </Fragment>

    );
};

export default ArrivalList;