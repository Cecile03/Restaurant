import { SnackbarBuilder } from './utils/snackbar.js';
import { getCookie } from './utils/cookie.js';


let selectedDay;
let selectedTable;

const service = document.querySelector('#service-picker');
const tables = await getTables();

const monthName = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet',
	'Août', 'Septembtre', 'Octobre', 'Novembre', 'Décembre'];

let currentDate = new Date();
let currentMonth = { value: currentDate.getMonth() };
let currentYear = { value: currentDate.getFullYear() };

generateCalendar(currentMonth.value, currentYear.value);
generateTables(tables);
bookedTables(tables);












function generateCalendar(month, year) {
	let calendarDays = document.querySelector('.calendar-days');
	let calendarYear = document.querySelector('#year');
	let calendarMonth = document.querySelector('#month');
	let daysOfMonth = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	let currentDate = new Date();
	let firstDay = new Date(year, month);

	calendarDays.innerHTML = '';
	calendarMonth.textContent = monthName[month];
	calendarYear.textContent = year;

	for (let i = 0; i <= daysOfMonth[month] + firstDay.getDay() - 1; i++) {

		let day = document.createElement('div');

		if (i >= firstDay.getDay()) {
			const dayNumber = i - firstDay.getDay() + 1;
			day.textContent = i - firstDay.getDay() + 1;
			day.classList.add('calendar-day');

			const currentDay = new Date(year, month, dayNumber);
			if (currentDay < currentDate) {
				day.classList.add('past-date');
			}
			if (dayNumber === currentDate.getDate() && year === currentDate.getFullYear() && month === currentDate.getMonth()) {
				day.classList.remove('past-date');
				setCurrentDay(day, i - 1);
			}
		}
		calendarDays.appendChild(day);
	}
	const days = document.querySelectorAll('.calendar-day');

	days.forEach((element, index) => {
		element.addEventListener('click', () => {
			if (element.classList.contains('past-date')) return;
			setCurrentDay(element, index);
		});
	});
}










document.querySelector('#pre-month').addEventListener('click', () => {
	currentYear.value = currentMonth.value === 0 ? currentYear.value - 1 : currentYear.value;
	currentMonth.value = currentMonth.value === 0 ? 11 : currentMonth.value - 1;
	generateCalendar(currentMonth.value, currentYear.value);
});

document.querySelector('#next-month').addEventListener('click', () => {
	currentYear.value = currentMonth.value === 11 ? currentYear.value + 1 : currentYear.value;
	currentMonth.value = currentMonth.value === 11 ? 0 : currentMonth.value + 1;
	generateCalendar(currentMonth.value, currentYear.value);
});

document.querySelector('.booking-btn').addEventListener('click', async () => {
	if (!selectedDay || !selectedTable) {
		new SnackbarBuilder('Veuillez sélectionner une table et une date').buildWarning().render(document.querySelector('.snackbar-container'));
		return;
	}

	if (!getCookie('token')) {
		new SnackbarBuilder('veuillez vous connecter').buildError().render(document.querySelector('.snackbar-container'));
		return;
	}

	console.log('date avant requete: ', selectedDay.toString());
	const date = `${selectedDay.getFullYear()}-${(selectedDay.getMonth() + 1).toString().padStart(2, '0')}-${selectedDay.getDate()}`;

	bookingTable({
		idUser: getCookie('userId'),
		idTable: selectedTable.id,
		date: date,
		service: service.value,
		stateBooking: 'A confirmer',
		nbPeople: selectedTable.capacity,
		nameUser: getCookie('username')
	})
		.then(() => {
			generateTables(tables);
			bookedTables(tables);
			selectedTable = null;
			new SnackbarBuilder('Votre réservation a bien été prise en compte').buildSuccess().render(document.querySelector('.snackbar-container'));
		})
		.catch((error) => {
			console.log(error);
			new SnackbarBuilder('Une erreur est survenue lors de la réservation').buildError().render(document.querySelector('.snackbar-container'));
		});
});

service.addEventListener('change', () => {
	generateTables(tables);
	bookedTables(tables);
});































function setCurrentDay(newDay) {
	const currentDate = document.querySelector('.current-date');
	if (currentDate) { currentDate.classList.remove('current-date'); }
	newDay.classList.add('current-date');

	const day = newDay.textContent;
	const year = parseInt(document.querySelector('#year').textContent);
	const month = monthName.indexOf(document.querySelector('#month').textContent);

	selectedDay = new Date(year, month, day);
	console.log(selectedDay);


	generateTables(tables);
	bookedTables(tables);

	document.querySelector('.table-day').textContent = day + ' ' + document.querySelector('#month').textContent;
}

function setCurrentTable(newTable) {
	const currentTable = document.querySelector('.current-table');

	if (currentTable === newTable || newTable.classList.contains('booked') || newTable.classList.contains('your-booking')) {
		currentTable.classList.remove('current-table');
		selectedTable = null;
		return;
	}

	if (currentTable) {
		currentTable.classList.remove('current-table');
	}
	newTable.classList.add('current-table');

	selectedTable = {
		id: newTable.id,
		capacity: parseInt(newTable.querySelector('.table-seats').textContent)
	};

	console.log(currentTable);
}









function generateTables(tables) {
	console.log('generate Tables');
	const reservationTables = document.querySelector('.reservation-tables');
	reservationTables.innerHTML = '';
	if (!tables) return;
	tables.forEach(table => {
		const container = document.createElement('div');
		const tableElement = document.createElement('div');
		tableElement.classList.add('table');
		tableElement.id = table.idTable;

		const tableCircle = document.createElement('div');
		tableCircle.classList.add('table-seats-circle');
		tableCircle.innerHTML += `<span class="table-seats">${table.idTable}</span>`;

		tableElement.innerHTML = tableCircle.outerHTML;
		tableElement.innerHTML += '<span class="material-symbols-outlined table-icon">table_restaurant</span>';
		tableElement.innerHTML += `<span class="table-id">Places : ${table.capacity}</span>`;

		tableElement.addEventListener('click', () => {
			setCurrentTable(tableElement);
		});

		container.appendChild(tableElement);
		reservationTables.appendChild(container);
	});
}

async function bookedTables(tables) {
	console.log('isTableBooked');

	const bookings = await getBookings();

	if (!tables) return;
	if (!bookings || bookings.size < 1) return;

	tables.forEach(table => {
		let tableBooking = [...bookings].filter(booking => booking.idTable === table.idTable);
		tableBooking = tableBooking.filter(booking => {
			const bookingDate = new Date(booking.date);
			const selectedDate = new Date(selectedDay);

			console.log('bookingDate: ', bookingDate);
			console.log('selectedDate: ', selectedDate);

			return (
				bookingDate.getFullYear() === selectedDate.getFullYear() &&
				bookingDate.getMonth() === selectedDate.getMonth() &&
				bookingDate.getDate() === selectedDate.getDate() &&
				booking.service === service.value
			);
		});



		if (tableBooking.length > 0) {

			const htmlTable = document.getElementById(table.idTable);

			console.log('la table numero ' + table.idTable + ' est deja reservée');
			const userId = tableBooking[0].idUser;
			if (userId === parseInt(getCookie('userId'))) {
				console.log('c\'est votre reservation');
				htmlTable.classList.add('your-booking');
			} else {
				console.log('ce n\'est pas votre reservation');
				htmlTable.classList.add('booked');
			}
		}

	});
}




async function getTables() {
	try {
		const response = await fetch('/api/table/');
		const tables = await response.json();
		console.log(tables);
		return tables;
	} catch (error) {
		console.log(error);
		return null;
	}
}

async function getBookings() {
	try {
		const response = await fetch('/api/booking/');
		const bookings = await response.json();
		console.log('booking: ', bookings);

		// bookings.forEach(booking => {console.log(booking.date);});
		// bookings.map(booking => {booking.date = new Date(`${booking.date}`);});

		return bookings;
	} catch (error) {
		console.log(error);
		return null;
	}
}

async function bookingTable(bookingReq) {
	console.log(bookingReq);
	try {
		console.log('debut booking');

		const response = await fetch('/api/booking', {
			method: 'POST',
			headers: {
				'Authorization': 'Bearer ' + getCookie('token'),
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(bookingReq),
		});

		if (response.ok) {
			const data = await response.json();
			console.log('Booking created:', data.message);
		} else {
			console.error('Booking creation failed:', await response.json());
		}
	} catch (error) {
		console.error('An error occurred during booking creation:', error);
	}
}


function isLeapYear(year) {
	return (
		(year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
		(year % 100 === 0 && year % 400 === 0)
	);
}

function getFebDays(year) {
	return isLeapYear(year) ? 29 : 28;
}
