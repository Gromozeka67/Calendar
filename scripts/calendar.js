var month_arr = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]; //массив с набором месяцев
var holidays = new Array();

var MAX_MONTH_COUNT = 11;
var MIN_MONTH_COUNT = 0;
var cMonth = 0; //текущий месяц
var cYear = 0;	//текущий год
var cDay = 0;

var lAttribute = 0;

function main() {
	var cDate = new Date();
	cMonth = cDate.getMonth()		//получаем текущий месяц
	cYear = cDate.getFullYear();	//получаем текущий год
	cDay = cDate.getDate();			//получаем текущий день
	updateValues();					//обновляем значения даты и времени в документе
	setOnClickEvent(); 				//устанавливаем события на нажатие ячеек
}

function selectNextMonth() {
	if(cMonth < MAX_MONTH_COUNT){
		cMonth++;
	}
	else{
		cMonth = 0;
		cYear++;
	}
	updateValues();	//переходим к следующему месяцу
}

function selectPrevMonth() {
	if(cMonth > MIN_MONTH_COUNT){
		cMonth--;
	}
	else{
		cMonth = 11;
		cYear--;
	}
	updateValues();	//переходим к предыдущему месяцу
}

function updateValues() {		//функция обновляет месяц и год, а потом заполняет таблицу календаря
	setMonth(cMonth, cYear);	
	fillCalendar();				
}

function setMonth(month, full_year) {	//функция обновляет месяц и год
	document.getElementById("dateView").innerHTML = month_arr[month] + " " + full_year;
}

function fillCalendar() {		//заполняет таблицу календаря
	var daysInMonth = getDaysInMonth(cYear, cMonth);	//получаем колличество дней в месяце
	var dayOfWeek = new Date(cYear, cMonth, 1).getDay();	//какой день недели выпадает на это число
	var day = 1;
	clearCalendar();

	if(dayOfWeek==0){ //в других регионах начало недели приходится на ВС => ВС надо поменять с 1 на 7 день
		dayOfWeek=7;
	}

	while(day<=daysInMonth){	//заполняем таблицу календаря пока не достигнем последнего дня месяца
		document.getElementById("cell"+dayOfWeek).innerHTML = day;
		day++;
		dayOfWeek++;
	}
	setCurrentDay();	//выделяем текущее чилсло в календаре
}

function setCurrentDay() {	//функция выделения текущего дня
	var dayOfWeek = new Date(cYear, cMonth, 1).getDay();	
	var nowDate = new Date();
	if(cMonth == nowDate.getMonth() && cYear == nowDate.getFullYear()){	//если текущая дата равна настоящему времени, то выделяем ячейку
		lAttribute = cDay + dayOfWeek;
		document.getElementById("cell" + (lAttribute-1)).setAttribute("class", "currentDay");
	}
	else{	//иначе освобождаем стиль выделенной ячейки
		document.getElementById("cell" + (lAttribute-1)).removeAttribute("class");
	}
}

function clearCalendar() {	//функция очистки содержимого календаря
	for (var i = 1; i <= 35; i++) {
	 document.getElementById("cell"+i).innerHTML = "";
	}
}

function getDaysInMonth(year, month) {	//функция возвращает количество дней в определенном месяце, оперделенного года
	return 32 - (new Date(year, month, 32)).getDate();
}

function setOnClickEvent() {	//	ставим обработчики событий для ячеек календаря
	var table = document.getElementById("calendarTable");
	var cells = table.getElementsByTagName("td");

	for (var i = 0; i < cells.length; i++) {
		cells[i].onclick = function () {
			alert(this.innerHTML);
		};
	}
}

main();