import {brand_red, brand_green, brand_gold, brand_darkest_grey} from './colors'
export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function prettyTime(time) {
    var sec_num = parseInt(time, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return minutes+':'+seconds;
}

export function colorCodeArrivalTime(time) {
    const rawTime = parseInt(time.replace('min', '').trim());
    if(isNaN(rawTime)) {
        return brand_red;
    } else if (rawTime <= 5) {
        return brand_red;
    } else if(rawTime > 5 && rawTime <= 9) {
        return brand_gold;
    } else if (rawTime > 9) {
        return brand_green;
    }
    return brand_darkest_grey;
}

export function getDay(date) {
    var day = date.getDay();
    if (day === 6 || day === 0) {
        return 'weekend';
    }
    return 'weekday';
}