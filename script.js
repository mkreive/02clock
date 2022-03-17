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

// Variables
const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1;
const day = now.getDate();

const hours = now.getHours();
const minutes = now.getMinutes();
const seconds = now.getSeconds();

const options = { weekday: "long" };
const weekday = new Intl.DateTimeFormat("en-US", options).format(now);

// Helper functions

const twoDigitFormatter = function (field) {
    return field.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
    });
};

console.log(now);

// Time and Date

yearElement.innerText = year;
monthElement.innerText = twoDigitFormatter(month);
dayElement.innerText = twoDigitFormatter(day);
weekdayElement.innerText = weekday;
hoursElement.innerText = twoDigitFormatter(hours);
minutesElement.innerText = twoDigitFormatter(minutes);
secondsElement.innerText = twoDigitFormatter(seconds);

// Location

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        place.innerText = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    console.log(latitude, longitude);
    displayLocation(latitude, longitude);
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

function displayLocation(latitude, longitude) {
    let geocoder;
    geocoder = new google.maps.Geocoder();
    const latlng = new google.maps.LatLng(latitude, longitude);

    geocoder.geocode({ latLng: latlng }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {
                const add = results[0].formatted_address;
                const value = add.split(",");

                count = value.length;
                country = value[count - 1];
                state = value[count - 2];
                city = value[count - 3];
                place.innerText = "city name is: " + city;
            } else {
                place.innerText = "address not found";
            }
        } else {
            place.innerText = "Geocoder failed due to: " + status;
        }
    });
}

displayLocation();
