"use strict";
var buttonTab = document.getElementById("mode-switcher-tab");
var buttonPopup = document.getElementById("mode-switcher-popup");
var labelTab = document.getElementById("tab");
var labelPopup = document.getElementById("popup");
var labelDisplay = document.getElementById("display");
var spacesToolbarOptions = document.getElementById("spaces-toolbar-options");
var buttonNo = document.getElementById("spaces-toolbar-switcher-no");
var buttonYes = document.getElementById("spaces-toolbar-switcher-yes");
var labelNo = document.getElementById("no");
var labelYes = document.getElementById("yes");
var labelShowSpacesToolbar = document.getElementById("show-spaces-toolbar");
var buttonGreen = document.getElementById("icon-switcher-green");
var buttonDark = document.getElementById("icon-switcher-dark");
var buttonLight = document.getElementById("icon-switcher-light");
var labelGreen = document.getElementById("green");
var labelDark = document.getElementById("dark");
var labelLight = document.getElementById("light");
var labelPreferredIcon = document.getElementById("preferred-icon");
//@ts-ignore
var browser = browser;
function initializeDisplayInputs() {
    var getWaInThMode = browser.storage.local.get("wa-in-th-mode");
    getWaInThMode.then(function (storedValue) {
        if (!(buttonTab instanceof HTMLElement && buttonPopup instanceof HTMLElement)) {
            return;
        }
        if (storedValue.hasOwnProperty("wa-in-th-mode")) {
            switch (storedValue["wa-in-th-mode"]) {
                case "tab":
                    buttonTab.setAttribute("checked", "true");
                    return;
                case "popup":
                    buttonPopup.setAttribute("checked", "true");
                    return;
            }
        }
        browser.storage.local.set({ "wa-in-th-mode": "tab" });
    });
}
function initializeIconInputs() {
    var getWaInThIcon = browser.storage.local.get("wa-in-th-icon");
    getWaInThIcon.then(function (storedValue) {
        if (!(buttonGreen instanceof HTMLElement && buttonDark instanceof HTMLElement && buttonLight instanceof HTMLElement)) {
            return;
        }
        if (storedValue.hasOwnProperty("wa-in-th-icon")) {
            switch (storedValue["wa-in-th-icon"]) {
                case "dark":
                    buttonDark.setAttribute("checked", "true");
                    return;
                case "light":
                    buttonLight.setAttribute("checked", "true");
                    return;
                default:
                    buttonGreen.setAttribute("checked", "true");
            }
        }
    });
}
function initializeSpacesToolbarInputs() {
    if (browser.spacesToolbar) {
        spacesToolbarOptions === null || spacesToolbarOptions === void 0 ? void 0 : spacesToolbarOptions.removeAttribute("style");
    }
    else {
        return;
    }
    var getWaInThSpacesToolbar = browser.storage.local.get("wa-in-th-spaces-toolbar");
    getWaInThSpacesToolbar.then(function (storedValue) {
        if (!(buttonNo instanceof HTMLElement && buttonYes instanceof HTMLElement)) {
            return;
        }
        if (storedValue.hasOwnProperty("wa-in-th-spaces-toolbar")) {
            switch (storedValue["wa-in-th-spaces-toolbar"]) {
                case "false":
                    buttonNo.setAttribute("checked", "true");
                    return;
                case "true":
                    buttonYes.setAttribute("checked", "true");
                    return;
            }
        }
        browser.storage.local.set({ "wa-in-th-mode": "true" });
    });
}
function internationalize() {
    if (labelTab instanceof HTMLElement) {
        labelTab.innerText = browser.i18n.getMessage("tab");
    }
    if (labelPopup instanceof HTMLElement) {
        labelPopup.innerText = browser.i18n.getMessage("popup");
    }
    if (labelDisplay instanceof HTMLElement) {
        labelDisplay.innerText = browser.i18n.getMessage("display");
    }
    if (labelNo instanceof HTMLElement) {
        labelNo.innerText = browser.i18n.getMessage("no");
    }
    if (labelYes instanceof HTMLElement) {
        labelYes.innerText = browser.i18n.getMessage("yes");
    }
    if (labelShowSpacesToolbar instanceof HTMLElement) {
        labelShowSpacesToolbar.innerText = browser.i18n.getMessage("show-spaces-toolbar");
    }
    if (labelPreferredIcon instanceof HTMLElement) {
        labelPreferredIcon.innerText = browser.i18n.getMessage("preferred-icon");
    }
    if (labelGreen instanceof HTMLElement) {
        labelGreen.innerText = browser.i18n.getMessage("green");
    }
    if (labelDark instanceof HTMLElement) {
        labelDark.innerText = browser.i18n.getMessage("dark");
    }
    if (labelLight instanceof HTMLElement) {
        labelLight.innerText = browser.i18n.getMessage("light");
    }
}
function onClickModeSwitcher(newValue) {
    browser.storage.local.set({ "wa-in-th-mode": newValue });
}
if (buttonTab instanceof HTMLElement && buttonPopup instanceof HTMLElement) {
    buttonTab.addEventListener("input", function () { return onClickModeSwitcher("tab"); });
    buttonPopup.addEventListener("input", function () { return onClickModeSwitcher("popup"); });
}
function onClickSpacesToolbarSwitcher(newValue) {
    browser.storage.local.set({ "wa-in-th-spaces-toolbar": newValue });
}
if (buttonNo instanceof HTMLElement && buttonYes instanceof HTMLElement) {
    buttonNo.addEventListener("input", function () { return onClickSpacesToolbarSwitcher("false"); });
    buttonYes.addEventListener("input", function () { return onClickSpacesToolbarSwitcher("true"); });
}
function onClickIcon(newValue) {
    browser.storage.local.set({ "wa-in-th-icon": newValue });
}
if (buttonGreen instanceof HTMLElement && buttonDark instanceof HTMLElement && buttonLight instanceof HTMLElement) {
    buttonGreen.addEventListener("input", function () { return onClickIcon("green"); });
    buttonDark.addEventListener("input", function () { return onClickIcon("dark"); });
    buttonLight.addEventListener("input", function () { return onClickIcon("light"); });
}
initializeDisplayInputs();
initializeIconInputs();
initializeSpacesToolbarInputs();
internationalize();
