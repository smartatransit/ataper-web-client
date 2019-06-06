import React, { Fragment } from "react";
import styled from 'styled-components';
import Fetcher from "../../components/Fetcher";
import {brand_lighter_grey} from "../../utils/colors";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


const List = styled.div`
  padding: 0 25px;
`;

const ListItem = styled.div`
  width: 100%;
  border-bottom: 1px solid ${brand_lighter_grey};
  font-size: 4vh;
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(12.5vh - 8.75px);
  cursor: pointer;
`;

const StationList = (props) => {

    const {
        fetch
    } = props;
    function renderStationList(data) {
        
        return (
            <List>
                {data.stations.map((station) => {
                    let key = station["station-name"].replace(' ', "-");
                    console.log(station);
                    return (
                        <Link key={key} to={`/stations/${key}`} >
                            <ListItem>{station["station-name"].replace(/Station/gi, '')}</ListItem>
                        </Link>
                    );
                })}
            </List>
        );
    }
    
    return (
        <Fetcher action={fetch}>
            
                {data => renderStationList(data)}
            
        </Fetcher>
    );
}

export default StationList;