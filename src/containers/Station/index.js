import React, { useState, Fragment } from 'react';
import { Route } from "react-router-dom";

import Stations from '../../constants/stations';
import ArrivalList from "../../containers/ArrivalsList";
import DirectionSelector from '../../components/DirectionSelector'



const Station = (props) => {
    const {
        match
    } = props;
    let {station} = match.params;
    const stationKey = station.replace(/Station/gi, '').trim().replace('-', '');
    const directions = Stations[stationKey].directions;

    return (
        <Fragment>
            <DirectionSelector directions={directions} url={match.url}/>
        </Fragment>
    );
};



export default Station;

