/**
 * Array Cardio Day 2 - Script
 * @author Damian Szczypka <info@damianszczypka.com>
 */

// Constant(s) -------------------------------------------------------------------------------------

const PEOPLE = [
	{ name: 'Wes', year: 1988 },
	{ name: 'Kait', year: 1986 },
	{ name: 'Irv', year: 1970 },
	{ name: 'Lux', year: 2015 },
];
const COMMENTS = [
	{ text: 'Love this!', id: 523423 },
	{ text: 'Super good', id: 823423 },
	{ text: 'You are the best', id: 2039842 },
	{ text: 'Ramen is my fav food ever', id: 123523 },
	{ text: 'Nice Nice Nice!', id: 542328 },
];

// Function(s) -------------------------------------------------------------------------------------

// 1. Check list of poeple whether there is at least one adult
const hasAdultPerson = PEOPLE.some(({ year }) => new Date().getFullYear() - year >= 18);

console.log(hasAdultPerson);

// 2. Check list of people whether everyone is adult
const isEveryPersonAdult = PEOPLE.every(({ year }) => new Date().getFullYear() - year >= 18);

console.log(isEveryPersonAdult);

// 3. Find a comment with ID of 823423
const commentWithId = COMMENTS.find(({ id }) => id === 823423);

console.log(commentWithId);

// 4. Find and delete a comment with ID of 823423
// Original list must stay untouched
const commentIndex = COMMENTS.findIndex(({ id }) => id === 823423);
const slicedComments = [...COMMENTS.slice(0, commentIndex), ...COMMENTS.slice(commentIndex + 1)];

console.log(COMMENTS, slicedComments);
