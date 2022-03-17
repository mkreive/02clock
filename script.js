"use strict";

// Selecting elements
const yearElement = document.getElementById("year");
const monthElement = document.getElementById("month");
const dayElement = document.getElementById("day");
const weekdayElement = document.getElementById("weekday");

const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const jokeElement = document.getElementById("joke");

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

    // setTimeout(showTime, 1000);
};
showTime();
setInterval(showTime, 1000);

async function getJoke() {
    try {
        const jokeData = await fetch("https://icanhazdadjoke.com/", {
            headers: {
                Accept: "application/json",
            },
        });
        const jokeObj = await jokeData.json();
        jokeElement.innerText = jokeObj.joke;
    } catch (err) {
        console.err(`Error: ${err}`);
    }
}

getJoke();
