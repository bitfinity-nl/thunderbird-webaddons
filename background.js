"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
//@ts-ignore
var browser = browser;
var label = browser.i18n.getMessage("context");
var urlWhatsAppWeb = "https://messages.google.com/web/authentication";
var spacesToolbarButtonId = "wa_in_th_" + (Math.floor(Math.random() * 99999999)).toString();
var isSpacesToolbarButtonOn = false;
var iconPath = "icons/icon.svg";
// Modify User Agent
// This is necessary as WhatsApp Web only accept few web browsers.
var ua = navigator.userAgent.includes("Firefox") ?
    navigator.userAgent.slice(0, navigator.userAgent.lastIndexOf("Thunderbird")) :
    navigator.userAgent.replace("Thunderbird", "Firefox");
function initialize() {
    setWaInThMode();
    setIcon();
    createContextMenu();
    setSpacesToolbarButton();
}
function setWaInThMode() {
    var getWaInThMode = browser.storage.local.get("wa-in-th-mode");
    getWaInThMode.then(function (storedValue) {
        if (storedValue["wa-in-th-mode"] === "popup") {
            browser.browserAction.setPopup({ popup: urlWhatsAppWeb });
        }
        else {
            browser.browserAction.setPopup({ popup: "" });
            browser.storage.local.set({ "wa-in-th-mode": "tab" });
        }
    });
}
function setIcon() {
    if (browser.browserAction.setIcon) {
        var getWaInThIcon = browser.storage.local.get("wa-in-th-icon");
        getWaInThIcon.then(function (storedValue) {
            var preferredIcon = storedValue["wa-in-th-icon"];
            if (preferredIcon) {
                iconPath = "icons/icon-".concat(storedValue["wa-in-th-icon"], ".svg");
                browser.browserAction.setIcon({ path: iconPath });
                refreshSpacesToolbar();
            }
            else {
                browser.storage.local.set({ "wa-in-th-icon": "green" });
            }
        });
    }
}
function createContextMenu() {
    browser.menus.create({
        id: "contextMenuEntry",
        title: browser.i18n.getMessage("context"),
        type: "normal",
        contexts: ["browser_action"],
        onclick: createOrActivateTab
    }, console.log("WhatsApp Web context menu created."));
}
function setSpacesToolbarButton() {
    var getWaInThMode = browser.storage.local.get("wa-in-th-spaces-toolbar");
    getWaInThMode.then(function (storedValue) {
        if (storedValue["wa-in-th-spaces-toolbar"] === "true") {
            if (isSpacesToolbarButtonOn) {
                refreshSpacesToolbar();
            }
            else {
                addSpacesToolbarButton();
            }
            return;
        }
        if (storedValue["wa-in-th-spaces-toolbar"] === "false") {
            if (isSpacesToolbarButtonOn) {
                removeSpacesToolbarButton();
            }
            return;
        }
        browser.storage.local.set({ "wa-in-th-spaces-toolbar": "true" });
        addSpacesToolbarButton();
    });
}
function getButtonProperties() {
    return {
        defaultIcons: {
            16: iconPath,
            32: iconPath
        },
        title: label,
        url: urlWhatsAppWeb
    };
}
function addSpacesToolbarButton() {
    try {
        browser.spacesToolbar.addButton(spacesToolbarButtonId, getButtonProperties());
        isSpacesToolbarButtonOn = true;
        console.log("WhatsApp Web s.paces toolbar menu created.");
    }
    catch (e) {
        console.log("spacesToolbar is not defined...\n", e);
    }
}
function removeSpacesToolbarButton() {
    try {
        browser.spacesToolbar.removeButton(spacesToolbarButtonId);
        isSpacesToolbarButtonOn = false;
        console.log("WhatsApp Web spaces toolbar menu removed.");
    }
    catch (e) {
        console.log("spacesToolbar is not defined...\n", e);
    }
}
function refreshSpacesToolbar() {
    try {
        if (isSpacesToolbarButtonOn) {
            browser.spacesToolbar.updateButton(spacesToolbarButtonId, getButtonProperties());
        }
        console.log("WhatsApp Web spaces toolbar menu refreshed.");
    }
    catch (e) {
        console.log("spacesToolbar is not defined...\n", e);
    }
}
function createOrActivateTab() {
    return __awaiter(this, void 0, void 0, function () {
        var tabId, tabProperties, queryTabs, _i, queryTabs_1, tab;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tabId = NaN;
                    tabProperties = {
                        active: true,
                        url: urlWhatsAppWeb,
                    };
                    return [4 /*yield*/, browser.tabs.query({})];
                case 1:
                    queryTabs = _a.sent();
                    if (queryTabs.length >= 1) {
                        for (_i = 0, queryTabs_1 = queryTabs; _i < queryTabs_1.length; _i++) {
                            tab = queryTabs_1[_i];
                            if (tab.hasOwnProperty("url")) {
                                if (tab.url.includes(urlWhatsAppWeb)) {
                                    tabId = tab.id;
                                    break;
                                }
                            }
                        }
                    }
                    if (isNaN(tabId)) {
                        browser.tabs.create(tabProperties);
                    }
                    else {
                        browser.tabs.update(tabId, tabProperties);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function onStorageChange(item) {
    if (item.hasOwnProperty("wa-in-th-mode")) {
        item["wa-in-th-mode"].newValue === "popup" ?
            browser.browserAction.setPopup({ popup: urlWhatsAppWeb }) :
            browser.browserAction.setPopup({ popup: "" });
    }
    if (item.hasOwnProperty("wa-in-th-spaces-toolbar")) {
        setSpacesToolbarButton();
    }
    if (item.hasOwnProperty("wa-in-th-icon")) {
        setIcon();
    }
}
/**
 * Modify user agent
 * Source : https://github.com/mdn/webextensions-examples/tree/master/user-agent-rewriter
 */
function rewriteUserAgentHeader(e) {
    for (var _i = 0, _a = e.requestHeaders; _i < _a.length; _i++) {
        var header = _a[_i];
        if (header.name.toLowerCase() === "user-agent") {
            header.value = ua;
        }
    }
    return { requestHeaders: e.requestHeaders };
}
/* Initialization sequence */
initialize();
browser.storage.onChanged.addListener(onStorageChange);
browser.browserAction.onClicked.addListener(createOrActivateTab);
browser.webRequest.onBeforeSendHeaders.addListener(rewriteUserAgentHeader, { urls: [urlWhatsAppWeb] }, ["blocking", "requestHeaders"]);
