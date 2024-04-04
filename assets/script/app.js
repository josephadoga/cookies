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