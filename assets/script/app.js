'use strict';

function listen(event, selector, callback) {
    return selector.addEventListener(event, callback);
}
  
function select(selector) {
    return document.querySelector(selector);
}

const cookieDialog = select('.one');
const settingsDialog = select('.two');
const blurCover = select('.cover');
const acceptButton = select('.accept');
const settingsButton = select('.settings');

const { log } = console;

function showCookieDialog() {
    blurCover.classList.add('isvisible');
    cookieDialog.classList.add('isvisible');
}

function hideCookieDialog() {
    blurCover.classList.remove('isvisible');
    cookieDialog.classList.remove('isvisible');
}

function showSettingsDialog() {
    blurCover.classList.add('isvisible');
    settingsDialog.classList.add('isvisible');
}

function getBrowser() {
    const userAgent = window.navigator.userAgent.toLowerCase();
    
    const browserMap = {
        "edg": "Microsoft Edge",
        "opr": "Opera",
        "chrome": "Chrome",
        "firefox": "Firefox",
        "safari": "Safari",
        "msie": "Internet Explorer",
        "trident": "Internet Explorer"
    };

    const browser = Object.keys(browserMap).find(key => userAgent.includes(key));
    return browser ? browserMap[browser] : "Null";
}

function getOS() {
    if (window.navigator.userAgent.indexOf("Windows") != -1) {
        return "Windows";
    } else if (window.navigator.userAgent.indexOf("Mac OS") != -1) {
        return "Mac OS";
    } else if (window.navigator.userAgent.indexOf("Linux") != -1) {
        return "Linux";
    } else {
        return "Null";
    }
}

function getScreenWidth() {
    return window.screen.width;
}

function getScreenHeight() {
    return window.screen.height;
}

listen('load', window, function() {
    showCookieDialog();
});

listen('click', settingsButton, function() {
    hideCookieDialog();
    showSettingsDialog();
});

listen('click', acceptButton, function() {
    hideCookieDialog();
});