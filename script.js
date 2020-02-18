"use strict";

const apiKey = '6eYZPs94F6KWLduRtpotawcPxPyKjYnhAgSowzsU';
const searchURL = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
    console.log("formtQueryParams function working");
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
        return queryItems.join('&');
}


function getNationalParks(query, limit = 10) {
    console.log("getnationalPark function working");
    const params = {
        stateCode: query,
        limit,
        api_key: apiKey
    };
    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString;

    console.log(url);

    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`)
    });
}

function displayResults(responseJson) {
    console.log("displayResults function working");
    $('#results-list').empty();

    for (let i = 0; i < responseJson.data.length; i++){
        $('#results-list').append(
            `<li><h3>${responseJson.data[i].fullName}</h3>
            <p>${responseJson.data[i].description}</p>
            <a href="${responseJson.data[i].url}" target="_blank">Go To Park's Website</a>
            </li>`
        );
    }
    $('#results').removeClass('hidden');
}

function watchForm () {
    console.log("watchForm function working");
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        const maxResults = $('#js-limit').val();
        getNationalParks(searchTerm, maxResults);
    });
}

$(watchForm);