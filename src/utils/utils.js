import {brand_red, brand_green, brand_gold, brand_darkest_grey} from './colors'
export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function prettyTime(seconds) {
    if (seconds > 60) {
        return (Math.round(seconds / 60 * 4) / 4).toFixed(2);
    }
    return seconds;
}

export function colorCodeArrivalTime(time) {
    const rawTime = parseInt(time.replace('min', '').trim());
    console.log(rawTime > 5 && rawTime < 9);
    if(isNaN(rawTime)) {
        return brand_red;
    } else if (rawTime < 5) {
        return brand_red;
    } else if(rawTime > 5 && rawTime < 9) {
        return brand_gold;
    } else if (rawTime > 9) {
        return brand_green;
    }
    return brand_darkest_grey;
}