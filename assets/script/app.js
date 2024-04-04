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
const prefButton = select('.save-settings');

const browserCheck = select('.browser-check');
const osCheck = select('.os-check');
const widthCheck = select('.width-check');
const heightCheck =select('.height-check');

const { log } = console;

const LIFETIME = 15;

function showCookieDialog() {
    blurCover.classList.add('isvisible');
    cookieDialog.classList.add('isvisible');
}

function hideCookieDialog() {
    blurCover.classList.remove('isvisible');
    cookieDialog.classList.remove('isvisible');
    settingsDialog.classList.remove('isvisible');
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
    return window.innerWidth;
}

function getScreenHeight() {
    return window.innerHeight;
}


function setCookie(name, value, maxAge) {
    const options = {
        path: '/',
        SameSite: 'Lax'
    }

    const encodedName = encodeURIComponent(name);
    const encodedValue = encodeURIComponent(value);

    document.cookie = `${encodedName}=${encodedValue}; max-age=${maxAge}; path=${options.path}; SameSite=${options.SameSite}`;
}


function getCookie(name) {
    // Split cookie string and get all individual name=value pairs in an array
    let cookieArray = document.cookie.split(";");
    
    // Loop through the array elements
    for(let i = 0; i < cookieArray.length; i++) {
        let cookiePair = cookieArray[i].split("=");
        
        if(name == cookiePair[0].trim()) {
            // Decode the cookie value and return
            return `${name} = ${decodeURIComponent(cookiePair[1])}`;
        }
    }
    return `${name} = rejected`;
}



function setBrowserCookie() {
    let browserName = getBrowser();
    setCookie('Browser', browserName, LIFETIME);
}

function setOSCookie() {
    let OSName = getOS();
    setCookie('OS', OSName, LIFETIME);
}

function setWidthCookie() {
    let widthLength = getScreenWidth();
    setCookie('screenWidth', widthLength, LIFETIME);
}

function setHeightCookie() {
    let widthHeight = getScreenHeight();
    setCookie('screenHeight', widthHeight, LIFETIME)
}

function acceptPreferences() {
    if (browserCheck.checked) {
        setBrowserCookie();
    }

    if (osCheck.checked) {
        setOSCookie();
    }

    if (widthCheck.checked) {
        setWidthCookie();
    }

    if (heightCheck.checked) {
        setHeightCookie();
    }
}

function checkCookies() {
    console.log(getCookie('Browser'))
    console.log(getCookie('OS'));
    console.log(getCookie('screenWidth'));
    console.log(getCookie('screenHeight'));
}



listen('load', window, function() {
    if (document.cookie.length > 0) {
        checkCookies()
    } else {
        showCookieDialog();
        checkCookies()
    }
});

listen('click', settingsButton, function() {
    hideCookieDialog();
    showSettingsDialog();
});

listen('click', acceptButton, function() {
    setBrowserCookie();
    setOSCookie();
    setWidthCookie();
    setHeightCookie();
    checkCookies();
    hideCookieDialog();
});

listen('click', prefButton, function() {
    acceptPreferences();
    checkCookies();
    hideCookieDialog();
});