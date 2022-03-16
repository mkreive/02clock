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
const weekday = now.getDay();
const hours = now.getHours();
const minutes = now.getMinutes();
const seconds = now.getSeconds();

// Helper functions

const twoDigitFormatter = function (field) {
    return field.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
    });
};

console.log(now);
console.log(day);

// Code

yearElement.innerText = year;
monthElement.innerText = twoDigitFormatter(month);
dayElement.innerText = twoDigitFormatter(day);
