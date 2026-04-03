/**
 * JavaScript References VS Copying - Script
 * @author Damian Szczypka <info@damianszczypka.com>
 */

// Constant(s) -------------------------------------------------------------------------------------

const GITHUB = 'sthiepaan';
const YEAR = 2026;
const IS_EVEN = true;
const PLAYERS = ['Wes', 'Sarah', 'Ryan', 'Poppy'];
const PERSON = {
	username: GITHUB,
	registrationDate: YEAR,
	urls: {
		github: `https://github.com/sample-account`,
	},
};

// Function(s) -------------------------------------------------------------------------------------

// 1. String
let githubCopy = GITHUB;

githubCopy = 'Sthiepaan';

console.table({ GITHUB, githubCopy });

// 2. Number
let yearCopy = YEAR;

yearCopy = 2027;

console.table({ YEAR, yearCopy });

// 3. Boolean
let isEvenCopy = IS_EVEN;

isEvenCopy = false;

console.table({ IS_EVEN, isEvenCopy });

// 4. Array
const team1 = PLAYERS;

team1[0] = 'Lux';

const team2 = PLAYERS.slice();

team2[1] = 'Joe';

const team3 = [].concat(PLAYERS);

team3[2] = 'Bob';

const team4 = [...PLAYERS];

team4[3] = 'Tom';

const team5 = Array.from(PLAYERS);

team5[4] = 'Kim';

console.table({ PLAYERS, team1, team2, team3, team4, team5 });

// 5. Object
const user1 = PERSON;

user1.registrationDate = 2025;

const user2 = Object.assign({}, PERSON, { registrationDate: 2024, isEven: IS_EVEN });
const user3 = JSON.parse(JSON.stringify(PERSON));

user3.urls.github = '';

const user4 = { ...PERSON, registrationDate: 2023 };

user4.urls.github = null;

const user5 = structuredClone(PERSON);

user5.registrationDate = 2017;
user5.urls.github = `https://github.com/${GITHUB}`;

console.table({ PERSON, user1, user2, user3, user4, user5 });
