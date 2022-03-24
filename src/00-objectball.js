function gameObject() {
    return {
        "home": {
            "teamName": "Brooklyn Nets",
            "colors": ["Black", "White"],
            "players": {
                "Alan Anderson": {
                    "number": 0,
                    "shoe": 16,
                    "points": 22,
                    "rebounds": 12,
                    "assists": 12,
                    "steals": 3,
                    "blocks": 1,
                    "slamDunks": 1
                },
                "Reggie Evans": {
                    "number": 30,
                    "shoe": 14,
                    "points": 12,
                    "rebounds": 12,
                    "assists": 12,
                    "steals": 12,
                    "blocks": 7,
                    "slamDunks": 12
                },
                "Brook Lopez": {
                    "number": 11,
                    "shoe": 17,
                    "points": 17,
                    "rebounds": 19,
                    "assists": 10,
                    "steals": 3,
                    "blocks": 1,
                    "slamDunks": 15
                },
                "Mason Plumlee": {
                    "number": 1,
                    "shoe": 19,
                    "points": 26,
                    "rebounds": 12,
                    "assists": 6,
                    "steals": 3,
                    "blocks": 8,
                    "slamDunks": 5
                },
                "Jason Terry": {
                    "number": 31,
                    "shoe": 15,
                    "points": 19,
                    "rebounds": 2,
                    "assists": 2,
                    "steals": 4,
                    "blocks": 11,
                    "slamDunks": 1
                }
            }
        },
        "away": {
            "teamName": "Charlotte Hornets",
            "colors": ["Turquoise", "Purple"],
            "players": {
                "Jeff Adrien": {
                    "number": 4,
                    "shoe": 18,
                    "points": 10,
                    "rebounds": 1,
                    "assists": 1,
                    "steals": 2,
                    "blocks": 7,
                    "slamDunks": 2
                },
                "Bismak Biyombo": {
                    "number": 0,
                    "shoe": 16,
                    "points": 12,
                    "rebounds": 4,
                    "assists": 7,
                    "steals": 7,
                    "blocks": 15,
                    "slamDunks": 10
                },
                "DeSagna Diop": {
                    "number": 2,
                    "shoe": 14,
                    "points": 24,
                    "rebounds": 12,
                    "assists": 12,
                    "steals": 4,
                    "blocks": 5,
                    "slamDunks": 5
                },
                "Ben Gordon": {
                    "number": 8,
                    "shoe": 15,
                    "points": 33,
                    "rebounds": 3,
                    "assists": 2,
                    "steals": 1,
                    "blocks": 1,
                    "slamDunks": 0
                },
                "Brendan Haywood": {
                    "number": 33,
                    "shoe": 15,
                    "points": 6,
                    "rebounds": 12,
                    "assists": 12,
                    "steals": 22,
                    "blocks": 5,
                    "slamDunks": 12
                }
            }
        }
    }
}

const logEntries = [];

logEntries.push(['teamNames()', teamNames()]);
logEntries.push(['playerWithLongestName()', playerWithLongestName()]);
logEntries.push(['winningTeam()', winningTeam()]);
logEntries.push(['mostPoints()', mostPoints()]);

logEntries.push(['playerStats("Mason Plumlee")', playerStats("Mason Plumlee")]);
logEntries.push(['numPointsScored("Mason Plumlee")', numPointsScored("Mason Plumlee")]);
logEntries.push(['shoeSize("Mason Plumlee")', shoeSize("Mason Plumlee")]);

logEntries.push(['playerStats("Bismak Biyombo")', playerStats("Bismak Biyombo")]);
logEntries.push(['numPointsScored("Bismak Biyombo")', numPointsScored("Bismak Biyombo")]);
logEntries.push(['shoeSize("Bismak Biyombo")', shoeSize("Bismak Biyombo")]);

logEntries.push(['teamColors("Charlotte Hornets")', teamColors("Charlotte Hornets")]);
logEntries.push(['teamColors("Brooklyn Nets")', teamColors("Brooklyn Nets")]);

const logElement = document.createElement('div');
logElement.classList.add('log');

logEntries.forEach(entry => {
    console.log(entry[0] + '\n' + JSON.stringify(entry[1]));
    let logEntry = document.createElement('div');
    logEntry.classList.add('log-entry');
    logEntry.innerHTML = `<strong>${entry[0]}</strong><pre>${JSON.stringify(entry[1], null, 2)}</pre>`;
    logElement.appendChild(logEntry);
});

document.body.appendChild(logElement);

function numPointsScored(playerName) {
    let player = findPlayer(playerName);
    return player.points;
}

function shoeSize(playerName) {
    let player = findPlayer(playerName);
    return player.shoe;
}

function teamColors(teamName) {
    let team = findTeam(teamName);
    return team.colors;
}

function teamNames() {
    let teams = ['home', 'away'];
    return teams.map(team => {
        return gameObject()[team].teamName;
    });
}

function playerNumbers(teamName) {
    let team = findTeam(teamName);
    let players = team.players;
    let playerNumbers = [];
    for (let player in players) {
        playerNumbers.push(players[player].number);
    }
    return playerNumbers;
}

function playerStats(playerName) {
    let player = findPlayer(playerName);
    return player;
}

function mostPoints() {
    let players = { ...gameObject().home.players, ...gameObject().away.players };
    let mostPoints = {
        player: '',
        points: 0
    };
    Object.entries(players).forEach(([key, value]) => {
        if (value.points > mostPoints.points) {
            mostPoints.points = value.points;
            mostPoints.player = key;
        }
    });
    return mostPoints;
}

function winningTeam() {
    let homePoints = Object.values(gameObject().home.players).reduce((prev, curr) => {
        return prev + curr.points;
    }, 0);
    let awayPoints = Object.values(gameObject().away.players).reduce((prev, curr) => {
        return prev + curr.points;
    }, 0);
    return homePoints > awayPoints ? 'home' : 'away';
}

function playerWithLongestName() {
    let players = { ...gameObject().home.players, ...gameObject().away.players };
    let longestName = Object.entries(players).reduce((prev, curr) => {
        return prev[0].length > curr[0].length ? prev : curr;
    });
    return longestName[0];
}


// Helper Functions
function findTeam(teamName) {
    let team = gameObject().home.teamName === teamName ? gameObject().home : gameObject().away.teamName === teamName ? gameObject().away : undefined;
    return team;
}

function findPlayer(playerName) {
    let player = gameObject().home.players?.[playerName] || gameObject().away.players?.[playerName];
    return player;
}