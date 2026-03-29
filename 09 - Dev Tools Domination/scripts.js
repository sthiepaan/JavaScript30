/**
 * Dev Tools Domination - Script
 * @author Damian Szczypka <info@damianszczypka.com>
 */

// Constant(s) -------------------------------------------------------------------------------------

const DOGS = [
	{ name: 'Snickers', age: 2 },
	{ name: 'hugo', age: 8 },
];
const P = document.querySelector('p');

// Function(s) -------------------------------------------------------------------------------------

function makeGreen() {
	P.style.color = '#BADA55';
	P.style.fontSize = '50px';
}

// 1. Regular
console.log('Regular log message');

// 2. Interpolated
console.log('Interpolated %s message', 'log');
console.log(`Interpolated ${'l' + 'o' + 'g'} message`);

// 3. Styled
console.log('%cStyled log message', 'color: #BADA55; font-size: 50px;');

// 4. Warning
console.warn('Warning log message');

// 5. Error
console.error('Error log message');

// 6. Info
console.info('Info log message');

// 7. Testing
console.assert(1 === 1, 'Testing log message (true)');
console.assert(1 === 2, 'Testing log message (false)');

// 8. Clearing
console.clear();

// 9. Viewing DOM Elements
console.log(P);
console.dir(P);

// 10. Grouping together
DOGS.forEach((dog) => {
	console.groupCollapsed(dog.name);
	Object.entries(dog).forEach(([key, value]) => console.log(`${key.toUpperCase()}: ${value}`));
	console.log(dog);
	console.groupEnd(dog.name);
});

// 11. Counting
console.count('First Counter');
console.count('First Counter');
console.count('First Counter');
console.count('Second Counter');
console.count('First Counter');
console.count('Second Counter');
console.count('Second Counter');
console.count('First Counter');
console.count('First Counter');
console.count('Second Counter');
console.count('Second Counter');
console.count('Second Counter');

// 12. Timing
console.time();
fetch('https://api.github.com/users/sthiepaan')
	.then((res) => res.json())
	.then((data) => {
		console.table(data);
		console.timeEnd();
	});
