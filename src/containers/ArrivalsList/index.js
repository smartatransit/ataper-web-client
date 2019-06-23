import React, { Fragment } from "react";
import { prettyTime } from '../../utils/utils';
import Fetcher from "../../components/Fetcher";
import api from '../../api';
import ArrivalListItem from '../../components/ArrivalListItem'


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
                    console.log(arrival);
                    return (
                        <ArrivalListItem
                            key={arrival.schedule["train-id"]}
                            line={arrival.station.line}
                            direction={arrival.direction}
                            ETA={arrival.schedule["waiting-time"]}
                            waitSeconds={prettyTime(arrival.schedule["wait-seconds"])}
                            destionation={arrival.schedule.destination}
                        />
                    );
                })}
            </Fragment>
        );
    }

    return (
        <Fetcher action={api.fetchArrivalsByStationAndDirection(station, direction)}>

            {data => renderArrivalList(data)}

        </Fetcher>
    );
};

export default ArrivalList;