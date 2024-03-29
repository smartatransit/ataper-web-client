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

export function sortByTime(data) {
    return data.sort(function(a,b){
        return new Date('1970/01/01 ' + a.time) - new Date('1970/01/01 ' + b.time);
    });
}

export function scrollDebounce(context, callback) {
    var latestKnownScrollY = 0,
        lastScroll = 0,
        ticking = false;

    function onScroll() {
        latestKnownScrollY = window.scrollY;
        requestTick();
    }

    function requestTick() {
        if(!ticking) {
            requestAnimationFrame(update);
        }
        ticking = true;
    }

    function update() {
        // reset the tick so we can
        // capture the next onScroll
        ticking = false;


        var currentScrollY = latestKnownScrollY;

        callback.apply(context, [lastScroll, currentScrollY]);

        lastScroll = currentScrollY;
    }


    window.addEventListener('scroll', onScroll);
}