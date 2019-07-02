import React, { Fragment, useState, useEffect } from "react";
import Fetcher from "../../components/Fetcher";
import api from '../../api';
import ArrivalListItem from '../../components/ArrivalListItem'
import Stations from "../../constants/stations";
import Modal from "../../components/Modal";
import StationHead from '../../components/StationHead';


const renderArrivalList = (data, minTime, setInfoSelected) => {
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
                        isDefaultSelected={arrival.schedule["waiting-seconds"] === minTime}
                        onInfoClick={() => setInfoSelected(true)}
                    />
                );
            })}
        </Fragment>
    );
};

const getMin = (data) => {
    if(data.length === 0) {
        console.error('No Trains');
        return;
    }
    return data.reduce((min, p) => p.schedule["waiting-seconds"] < min ? p.schedule["waiting-seconds"] : min, data[0].schedule["waiting-seconds"]);
};


const ArrivalList = (props) => {

    const {
        match,
    } = props;

    const {direction, station} = match.params;
    const stationKey = station.replace('-','');
    const [time, setTime] = useState(0);
    const [infoSelected, setInfoSelected] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), 60000);
        return () => clearInterval(interval);
    }, [time]);

    const closeModal = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setInfoSelected(false);
    }

    return (
        <Fragment>
            <StationHead
                station={Stations[stationKey].name.replace('Station', '').trim()}
                direction={direction}
            />
            <Fetcher action={api.fetchArrivalsByStationAndDirection(stationKey, direction)}>

                {data => renderArrivalList(data, getMin(data), setInfoSelected)}

            </Fetcher>
            {infoSelected && (
                <Modal
                    close={closeModal}
                    message="Honestly, we have no idea what the 'Wait Seconds' metric is. The Marta API returns this value in addition to a pretty-printed time of arrival. These values often vary by more than a minute, and we are not sure which one is the more accurate measure of when a train will show. We chose to include 'Wait Seconds' to give riders another metric to use in case arrival times on station monitors or in other transit apps are inaccurate."
                />
            )}
        </Fragment>

    );
};

export default ArrivalList;