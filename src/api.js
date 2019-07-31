import {getScheduleType} from "./utils";
import Stations from './constants/stations';
import Directions from './constants/directionKey'
import {capitalizeFirstLetter} from "./utils/utils";
import { BASE_URL } from './env';

const fetchScheduleByStationAndDay = (station, day) => async () => {
    
    const response = await fetch(`https://staging.api.ataper.com/api/static/schedule/station?schedule=${day}&station-name=${station}`, {mode: 'same-origin'});
    const jsonData = response.json();
    if (!response.ok) {
        throw new Error(jsonData, response.statusCode);
        // this is a custom exception class that stores JSON data
    }
    return jsonData;
}

const fetchArrivalsByLineAndStation = (line, station) => async () => {
    console.log(line, station, 'second')
    const response = await fetch(`https://staging.api.ataper.com/api/live/schedule/line?line=${line}`, {mode: 'same-origin'});
    let jsonData = response.json();
    const ArrivalPromise = new Promise((resolve, reject) => {
        if (!response.ok) {
            reject(jsonData, response);
            throw new Error(jsonData, response.statusCode);
        }

        jsonData = jsonData.filter((arrival) => {
            return arrival.station === station.toUpperCase();
        })
        resolve(jsonData)
    });

    return ArrivalPromise;
}

const fetchlines = async () => {
    const response = await fetch(`https://staging.api.ataper.com/api/static/lines`, {mode: 'same-origin'});
    const jsonData = response.json();

    if (!response.ok) {
        throw new Error(jsonData, response.statusCode);
        // this is a custom exception class that stores JSON data
    }
    return jsonData;
}

const fetchDirections = async () => {
    
    const response = await fetch(`https://staging.api.ataper.com/api/static/directions`, {mode: 'same-origin'});
    const jsonData = response.json();

    if (!response.ok) {
        throw new Error(jsonData, response.statusCode);
    }
    return jsonData;
}

const fetchStationsByLineAndDirection = (line, direction) => async () => {
    const schedule = getScheduleType(new Date());
    const response = await fetch(`https://staging.api.ataper.com/api/static/stations?line=${line}&direction=${direction}&schedule=${schedule}`, {mode: 'same-origin'});
    const jsonData = response.json();

    if (!response.ok) {
        throw new Error(jsonData, response.statusCode);
    }
    return jsonData;
};

const fetchStationsByLocation = () => async () => {
     const location = new Promise((resolve, reject) => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                resolve(position.coords);
            });
        } else {
            throw new Error("geolocation services are disabled");
        }
    });
    const position = await location;
    const response = await fetch(`https://staging.api.ataper.com/api/static/stations/location?latitude=${position.latitude}&longitude=${position.longitude}`, {mode: 'same-origin'});
    const jsonData = response.json();

    if (!response.ok) {
        throw new Error(jsonData, response.statusCode);
    }
    return jsonData;
};

const fetchArrivalsByStationAndDirection = (station, direction) => async () => {
    const lines = Stations[station].directions[direction];
    let responsePromises = [];

    console.log(lines);
    for(const line of lines) {
        const response = fetch(`https://staging.api.ataper.com/api/live/schedule/line/${capitalizeFirstLetter(line)}`, {mode: 'same-origin'});
        responsePromises.push(response)
    }

    const responses = await Promise.all(responsePromises);
    let extractedData = [];


    for (let i=0; i<responses.length;i++) {

        if (!responses[i].ok) {
            throw new Error(responses[i].body, responses[i].statusCode);
        }
        const response = await responses[i].json();

        let arrivals = response.filter((arrival) => {
            return arrival.station.name === Stations[station].name && arrival.station.direction === Directions[direction];
        });

        arrivals.forEach((train) => {
            train.schedule.next = response.filter((arrival) => {
                return arrival.schedule['train-id'] === train.schedule['train-id'];
            })[0].schedule['next-station'];
        });
        extractedData = [...extractedData, ...arrivals];
    }

    return extractedData;




};

export default {
    fetchStationsByLineAndDirection,
    fetchArrivalsByLineAndStation,
    fetchDirections,
    fetchlines,
    fetchScheduleByStationAndDay,
    fetchStationsByLocation,
    fetchArrivalsByStationAndDirection
};





