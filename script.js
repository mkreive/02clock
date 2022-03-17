"use strict";

// Selecting elements
const yearElement = document.getElementById("year");
const monthElement = document.getElementById("month");
const dayElement = document.getElementById("day");
const weekdayElement = document.getElementById("weekday");

const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const place = document.getElementById("place");

const twoDigitFormatter = function (field) {
    return field.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
    });
};

const showTime = function () {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const options = { weekday: "long" };
    const weekday = new Intl.DateTimeFormat("en-US", options).format(now);

    yearElement.innerText = year;
    monthElement.innerText = twoDigitFormatter(month);
    dayElement.innerText = twoDigitFormatter(day);
    weekdayElement.innerText = weekday;
    hoursElement.innerText = twoDigitFormatter(hours);
    minutesElement.innerText = twoDigitFormatter(minutes);
    secondsElement.innerText = twoDigitFormatter(seconds);

    setInterval(showTime, 1000);
};

showTime();

function showPosition(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    place.innerText = `Longitude: ${longitude}, Latitude: ${latitude}`;
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            place.innerText = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            place.innerText = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            place.innerText = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            place.innerText = "An unknown error occurred.";
            break;
    }
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        place.innerText = "Geolocation is not supported by this browser.";
    }
}
getLocation();
