var sortAndFilterJson = (data) => {
    let sortArr = [];
    for (let key of Object.keys(data)) {
        let record = data[key];

        sortArr.push(record);
    }
    sortArr.sort((a, b) => {
        return a.score < b.score;
    });

    return sortArr.slice(0, 50);
};

var updateTable = (data) => {
    var table = document.querySelector('#high-score-table>tbody');
    table.innerHTML = "";
    let dataArray = sortAndFilterJson(data);
    let rank = 1;

    for (let key of dataArray) {
        let record = key;

        let row = table.insertRow();

        let cell = row.insertCell();
        let text = document.createTextNode(rank);
        cell.appendChild(text);

        cell = row.insertCell();
        text = document.createTextNode(record.name);
        cell.appendChild(text);

        cell = row.insertCell();
        text = document.createTextNode(record.score);
        cell.appendChild(text);

        rank++;
    }
};

document.addEventListener("DOMContentLoaded", () => {
    getHighscore();
});

document.querySelector('#refresh').addEventListener('click', event => {
    getHighscore();
});

var getHighscore = () => {
    fetch("https://wiener-dog-game.firebaseio.com/Highscores.json")
        .then(response => response.json())
        .then(json => updateTable(json));
};