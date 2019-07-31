import React, { useState, Fragment } from 'react';
import { Route } from "react-router-dom";

import Stations from '../../constants/stations';
import DirectionSelector from '../../components/DirectionSelector'



const Direction = (props) => {
    const {
        match
    } = props;
    let {station} = match.params;
    const stationKey = station.replace(/-/gm, '');
    console.log(stationKey)
    const directions = Stations[stationKey].directions;

    return (
        <Fragment>
            <DirectionSelector directions={directions} url={match.url}/>
        </Fragment>
    );
};



export default Direction;

