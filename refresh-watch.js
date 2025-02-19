// ==UserScript==
// @name         Page Refresh Time Tracker
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Display last refresh time and a live counter on the bottom right of specific pages. Updates on actual page refresh.
// @author       RKeaves
// @match        https://yu-scene.net/*
// @match        https://privatesilverscreen.cc/*
// @match        https://capybarabr.com/*
// @match        https://locadora.cc/*
// @match        https://theldu.to/*
// @match        https://fearnopeer.com/*
// @match        https://seedpool.org/*
// @match        https://onlyencodes.cc/*
// @grant        none
// @license MIT
// ==/UserScript==
// https://github.com/RKeaves

(function () {
    'use strict';

    // Create a container for the refresh time and counter
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.bottom = '10px';
    container.style.right = '10px';
    container.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    container.style.color = '#fff';
    container.style.padding = '10px';
    container.style.borderRadius = '5px';
    container.style.fontFamily = 'Arial, sans-serif';
    container.style.fontSize = '14px';
    container.style.zIndex = '10000';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.alignItems = 'flex-end';

    // Add the container to the body
    document.body.appendChild(container);

    // Store the last refresh time and start time
    let lastRefreshTime = new Date();
    let startTime = new Date();

    // Function to format time difference
    function formatTimeDiff(timeDiff) {
        const minutes = Math.floor(timeDiff / 60);
        const seconds = Math.floor(timeDiff % 60);
        return `${minutes} minute${minutes !== 1 ? 's' : ''} ${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    }

    // Function to update the time display
    function updateTime() {
        const now = new Date();
        const hours = lastRefreshTime.getHours().toString().padStart(2, '0');
        const minutes = lastRefreshTime.getMinutes().toString().padStart(2, '0');
        const lastRefreshDisplay = `${hours}:${minutes}`;

        // Calculate time since last refresh
        const timeDiff = Math.floor((now - startTime) / 1000); // in seconds
        const timeAgo = timeDiff < 60 ? 'Just now' : formatTimeDiff(timeDiff);

        // Update the container content
        container.innerHTML = `
            <div>Last Refresh: ${lastRefreshDisplay}</div>
            <div>${timeAgo}</div>
        `;
    }

    // Update the time every second
    setInterval(updateTime, 1000);

    // Reset the timer and update last refresh time on page load/refresh
    function handlePageLoad() {
        lastRefreshTime = new Date(); // Update last refresh time
        startTime = new Date(); // Reset the counter
        updateTime(); // Immediately update the display
    }

    // Listen for page load/refresh events
    window.addEventListener('load', handlePageLoad);

    // Initial call to display the time immediately
    handlePageLoad();
})();