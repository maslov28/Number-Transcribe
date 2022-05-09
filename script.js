function run(number) {

	const ten = {
		'1': 'один',
		'2': 'два',
		'3': 'три',
		'4': 'четыре',
		'5': 'пять',
		'6': 'шесть',
		'7': 'семь',
		'8': 'восемь',
		'9': 'девять'
	};

	const twenty = {
		'10': 'десять',
		'11': 'одиннадцать',
		'12': 'двенадцать',
		'13': 'тринадцать',
		'14': 'четырнадцать',
		'15': 'пятнадцать',
		'16': 'шестнадцать',
		'17': 'семнадцать',
		'18': 'восемнадцать',
		'19': 'девятнадцать'
	}

	const hundred = {
		'1': 'десять',
		'2': 'двадцать',
		'3': 'тридцать',
		'4': 'сорок',
		'5': 'пятьдесят',
		'6': 'шестьдесят',
		'7': 'семьдесят',
		'8': 'восемьдесят',
		'9': 'девяносто'
	};

	const thousand = {
		'1': 'сто',
		'2': 'двести',
		'3': 'триста',
		'4': 'четыреста',
		'5': 'пятьсот',
		'6': 'шестьсот',
		'7': 'семьсот',
		'8': 'восемьсот',
		'9': 'девятьсот'
	};

	const tenThousands = {
		'0': 'тысяч',
		'1': 'одна тысяча',
		'2': 'две тысячи',
		'3': 'три тысячи',
		'4': 'четыре тысячи',
		'5': 'пять тысяч',
		'6': 'шесть тысяч',
		'7': 'семь тысяч',
		'8': 'восемь тысяч',
		'9': 'девять тысяч'
	};


	let numWord = '';

	// Проверка на млн

	if (number == '000000') return '';


	// От 1 до 100

	function toHundred(num) {
		if (num == '00' || num == '0') return '';
		if (num < 10) numWord = ten[num.toString()];
		else if (num < 20) numWord = twenty[num.toString()];
		else if (num < 100) {
			let firstChar = num.toString().substring(0, 1);
			let secondChar = num.toString().substring(1);
			if (secondChar !== '0') numWord = `${hundred[firstChar]} ${ten[secondChar]}`;
			else numWord = hundred[firstChar];
		}
		return numWord;
	}

	// От 100 до 1000

	function toThousand(num) {
		if (num == '0') return '';
		if (num < 100) return toHundred(num);
		let hundredChar = num.toString().substring(0, 1);
		let tensChar = Number(num.toString().substring(1)).toString(); // убираем лишние нули перед числом
		numWord = `${thousand[hundredChar]} ${toHundred(tensChar)}`;
		return numWord;
	}

	// От 1 000 до 10 000

	function toTenThousands(num) {
		if (num == '0') return '';
		if (num < 1000) return toThousand(num);
		else {
			let thousandChar = num.toString().substring(0, 1);
			let otherChar = Number(num.toString().substring(1)).toString(); // убираем лишние нули перед числом
			numWord = `${tenThousands[thousandChar]} ${toThousand (otherChar)}`;
			return numWord;
		}
	}

	// От 10 000 до 100 000

	function toHndThousands(num) {
		if (num == '00000') return '';
		if (num < 10000) return toThousand(num);
		if (num >= 10000) {
			let firstTwoChar = num.toString().substring(0, 2);
			let firstChar = num.toString().substring(0, 1);
			let secondChar = num.toString().substring(1, 2);
			let otherChar = Number(num.toString().substring(2)).toString(); // убираем лишние нули перед числом
			if (firstTwoChar < 20) {
				numWord = `${twenty[firstTwoChar]} тысяч ${toThousand(otherChar)}`;
				return numWord;
			} else {
				numWord = `${toHundred(firstChar * 10)} ${tenThousands[secondChar]} ${toThousand(otherChar)}`;
				return numWord;
			}
		}
	}

	// От 100 000 до миллиона

	function toMillion(num) {
		let firstChar = num.toString().substring(0, 1);
		let otherChar = Number(num.toString().substring(1)).toString(); // убираем лишние нули перед числом
		if (num.toString().substring(1, 3) == '00') {
			numWord = `${thousand[firstChar]} тысяч ${toThousand(otherChar)}`;
			return numWord;
		}
		if (num.toString().substring(1, 2) == '0') {
			otherChar = num.toString().substring(2);
			numWord = `${thousand[firstChar]} ${toTenThousands(otherChar)}`;
			return numWord;
		}

		numWord = `${thousand[firstChar]} ${toHndThousands(otherChar)}`;
		return numWord;
	}


	// От 1 до 100

	if (number < 100) {
		numWord = toHundred(number);
	}

	// От 100 до 1000

	if (number >= 100) {
		numWord = toThousand(number);
	}

	// От 1 000 до 10 000

	if (number >= 1000) {
		numWord = toTenThousands(number);
	}

	// От 10 000 до 100 000

	if (number >= 10000) {
		numWord = toHndThousands(number);
	}


	// От 100 000 до 1 000 000

	if (number >= 100000) {
		numWord = toMillion(number);
	}

	return numWord;

}

// Транскибирование целой части числа

function fullRun() {
	const number = +document.querySelector('input').value;

	let finalWord = '';

	const last = {
		'0': 'ов',
		'1': '',
		'2': 'а',
		'3': 'а',
		'4': 'а',
		'5': 'ов',
		'6': 'ов',
		'7': 'ов',
		'8': 'ов',
		'9': 'ов'
	}

	// Миллионы

	function mln(num) {
		if (num == '000000000') return '';
		const mlnAllChar = num.toString().slice(0, -6);
		let mlnLastChar = mlnAllChar.slice(-1);
		const otherChar = num.toString().slice(-6);
		if (mlnAllChar.slice(-2) > 9 && mlnAllChar.slice(-2) < 20) {   // Проверка на 10 - 19
			finalWord = `${run(mlnAllChar)} миллионов ${run(otherChar)}`;
		} else {
			finalWord = `${run(mlnAllChar)} миллион${last[mlnLastChar]} ${run(otherChar)}`;
		}
		return finalWord;
	}

	// Миллиарды

	function mlrd(num) {
		const mlrdAllChar = num.toString().slice(0, -9);
		let mlrdLastChar = mlrdAllChar.slice(-1);
		const otherChar = num.toString().slice(-9);
		if (mlrdAllChar.slice(-2) > 9 && mlrdAllChar.slice(-2) < 20) {   // Проверка на 10 - 19
			finalWord = `${run(mlrdAllChar)} миллиардов ${mln(otherChar)}`;
		} else {
			finalWord = `${run(mlrdAllChar)} миллиард${last[mlrdLastChar]} ${mln(otherChar)}`;
		}
	}


	if (number > 999999999) {
		mlrd(number);
	}
	else if (number > 999999) {
		mln(number);
	} else {
		finalWord = run(number);
	}

	out.innerHTML = finalWord;
}

// Отчистка инпута

function cleanInput() {
	document.querySelector('input').value = ''
	out.innerHTML = '';
}

// Копирование в буфер обмена

function copy() {
	out.select();
	document.execCommand('copy');
}

	
const out = document.querySelector('.out');

const transcribeBtn = document.querySelector('.transcribe');
const cleanBtn = document.querySelector('.clean');
const copyBtn = document.querySelector('.copy');

transcribeBtn.addEventListener('click', fullRun); // Запуск транскрибирования
cleanBtn.addEventListener('click', cleanInput); // Отчистка инпута
copyBtn.addEventListener('click', copy); // Копирование текста в буфер обмена