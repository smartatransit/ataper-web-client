export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function prettyTime(seconds) {
    console.log(seconds);
    if (seconds > 60) {
        return (Math.round(seconds / 60 * 4) / 4).toFixed(2);
    }
    return seconds;
}