/**
 * Array Cardio Day 1 - Script
 * @author Damian Szczypka <info@damianszczypka.com>
 */

// Constant(s) -------------------------------------------------------------------------------------

const INVENTORS = [
	{ first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
	{ first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
	{ first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
	{ first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
	{ first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
	{ first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
	{ first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
	{ first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
	{ first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
	{ first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
	{ first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
	{ first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 },
];
const PEOPLE = [
	'Bernhard, Sandra',
	'Bethea, Erin',
	'Becker, Carl',
	'Bentsen, Lloyd',
	'Beckett, Samuel',
	'Blake, William',
	'Berger, Ric',
	'Beddoes, Mick',
	'Beethoven, Ludwig',
	'Belloc, Hilaire',
	'Begin, Menachem',
	'Bellow, Saul',
	'Benchley, Robert',
	'Blair, Robert',
	'Benenson, Peter',
	'Benjamin, Walter',
	'Berlin, Irving',
	'Benn, Tony',
	'Benson, Leana',
	'Bent, Silas',
	'Berle, Milton',
	'Berry, Halle',
	'Biko, Steve',
	'Beck, Glenn',
	'Bergman, Ingmar',
	'Black, Elk',
	'Berio, Luciano',
	'Berne, Eric',
	'Berra, Yogi',
	'Berry, Wendell',
	'Bevan, Aneurin',
	'Ben-Gurion, David',
	'Bevel, Ken',
	'Biden, Joseph',
	'Bennington, Chester',
	'Bierce, Ambrose',
	'Billings, Josh',
	'Birrell, Augustine',
	'Blair, Tony',
	'Beecher, Henry',
	'Biondo, Frank',
];
const CONVEYANCE = [
	'car',
	'car',
	'truck',
	'truck',
	'bike',
	'walk',
	'car',
	'van',
	'bike',
	'walk',
	'car',
	'van',
	'car',
	'truck',
];

// Function(s) -------------------------------------------------------------------------------------

// 1. Get list of inventors for those who were born in the 1500's
const inventorsXVI = INVENTORS.filter(({ year }) => year >= 1500 && year < 1600);

console.table(inventorsXVI);

// 2. Get list of inventors first and last names
const inventorsName = INVENTORS.map(({ first, last }) => `${first} ${last}`);

console.log(inventorsName);

// 3. Get list of inventors sorted by birthdate (from oldest to youngest)
const inventorsSortedByBirthdate = [...INVENTORS].sort((prev, next) =>
	prev.year > next.year ? 1 : -1,
);

console.table(inventorsSortedByBirthdate);

// 4. Get sum of inventors age
const inventorsAgeSum = INVENTORS.reduce((acc, curr) => acc + (curr.passed - curr.year), 0);

console.log(inventorsAgeSum);

// 5. Get list of inventors sorted by age
const inventorsSortedByAge = INVENTORS.toSorted((prev, next) => {
	const prevAge = prev.passed - prev.year;
	const nextAge = next.passed - next.year;

	return nextAge - prevAge;
});

console.table(inventorsSortedByAge);

// 6. Get list of boulevards in Paris that contain 'de' in the name
// https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris
const url = new URL('https://en.wikipedia.org/w/api.php');

url.search = new URLSearchParams({
	origin: '*',
	action: 'query',
	format: 'json',
	list: 'categorymembers',
	cmtitle: 'Category:Boulevards_in_Paris',
	cmlimit: 'max',
});

fetch(url.href)
	.then((response) => response.json())
	.then((data) => {
		const boulevardsWithDe = data.query.categorymembers
			.map(({ title }) => title)
			.filter((item) => item.includes('de'));

		console.log(boulevardsWithDe);
	});

// 7. Get list of people sorted by last name
const peopleSortedByLastname = PEOPLE.toSorted((prev, next) => {
	const prevLast = prev.slice(0, prev.indexOf(','));
	const nextLast = next.slice(0, next.indexOf(','));

	return prevLast.localeCompare(nextLast);
});

console.log(peopleSortedByLastname);

// 8. Get sum of each transportation methods
const transportationMethod = CONVEYANCE.reduce((acc, curr) => {
	if (!acc[curr]) {
		acc[curr] = 0;
	}

	acc[curr] += 1;

	return acc;
}, {});

console.table(transportationMethod);
