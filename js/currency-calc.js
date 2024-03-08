(function() {
'use strict';

  const elemStyles = {
    active: {
      color: '#0969da',
      border: '1px solid #0969da',
    },
    inactive: {
      color: 'silver',
      border: '1px solid silver',
    },
    valid: {
      visibility: 'hidden',
    },
    invalid: {
      visibility: 'visible',
    },
    result: {
      color: '#9f9f9f',
    },
  };

  const currency = [
    {
      rate: 40,
    },
  ]

// оператор - typeof:
/*
typeof - возвращает строку, представляющую тип данных переменной или выражения. 
Результаты typeof: 

"undefined": если переменная имеет значение undefined.
"boolean": если переменная является логическим значением true или false.
"number": если переменная является числом (включая NaN и Infinity).
"string": если переменная является строкой.
"symbol": если переменная является символом (введенным с ECMAScript 6).
"object": если переменная является объектом (включая массивы и функции).
"function": если переменная является функцией.
Внимание(!) - typeof null возвращает "object". Это считается ошибкой в языке - офиц. признанный баг.

проверка на число - typeof:
Позволяет явно проверить тип данных.
Всегда(!) возвращает 'string' для значений, введенных через форму (даже если это числовое представление)

проверка на число - Number(input.value):
Если строка содержит валидное числовое представление - число (успех).
Если строка не может быть преобразована в число -  NaN.

typeof и Number():
(!) - typeof Number(input.value) всегда будет 'number', даже если введенное значение не является числом.
*/

  // Прежде чем применять методы массива к HTMLCollection, его необходимо сконвертировать в массив:
  /*
  // Вариант 1 - вызов Array.from()
  const inputElements = document.getElementsByClassName('input');
    const inputs = Array.from(inputElements).map(element => {
    console.log(element.id);
    return element;
  });
  console.log(inputs);
  console.log(inputs[0]);
  console.log(inputs[0].id);
  //
  */

  /*
  // Вариант 2 - цикл for:
  const inputElements = document.getElementsByClassName('input');
  const inputs = [];

  for (let i = 0; i < inputElements.length; i++) {
    const element = inputElements[i];
    console.log(element.id);
    inputs.push(element);
  }
  console.log(inputs);
  console.log(inputs[0]);
  console.log(inputs[0].id);
  //
  */

  /*
  // Вариант 3 - spread:
  const inputElements = document.getElementsByClassName('input');
    const inputs = [...inputElements].map(element => {
    console.log(element.id);
    return element;
  });
  console.log(inputs);
  console.log(inputs[0]);
  console.log(inputs[0].id);
  console.log(Object.prototype.toString.call(inputs));
  //
  */


// Получаем все элементы с классом 'input'
//const inputElements = document.getElementsByClassName('input'); // old
// '.input' - все элементы с классом 'input'. Без точки - все элементы <input>
const inputElements = document.querySelectorAll('.input'); // ES6+
const btnCalc = document.getElementById('btnCalc');
const resultDisplayControl = document.getElementById('res-out');

// Преобразуем HTMLCollection в массив
//const inputsArray = Array.from(inputElements); // or
//const inputsArray = [...document.getElementsByClassName('input')]; // or
const inputsArray = [...inputElements]; // or
//console.log(inputsArray); // Array(5) [...]

/*
// Не используем этот код - в каждой итерации цикла создается новая функция handleInput - ресурсы!
inputsArray.forEach(input => {
  input.addEventListener('input', handleInput);
  function handleInput() {
    console.log(`id: ${input.id}, value: ${input.value}`);
  //console.log(event);
  }
});
*/

//
inputsArray.forEach(input => {
  input.addEventListener('input', (event) => {
    handleInput(event, input);
  });
});

inputsArray.forEach(input => {
  input.value = ''; 
  //console.log(inputsArray[0].value); // установка 5 полей в ''
});
//

/*
Можно передавать только event или только input;
- event - объект события, передается при срабатывании события ввода ('input'). 
содержит информацию о событии;
- Обычно передача объекта события event предоставляет более широкие возможности для работы с событием, 
нежели просто передача самого элемента ввода input;
- event.target.value - свойство предоставляет доступ к значению элемента, который инициировал событие;
- при срабатывании события 'input' - event.target указывает на элемент, вызвавший событие;
- value - текущее значение ввода этого элемента;
*/
function handleInput(event, input) {

  console.log('log1: ', input, typeof input, inputsArray[0], typeof inputsArray[0]); // object
  console.log('log2: ', typeof input.value, typeof inputsArray[0].value); // string string
  console.log('log3: ', typeof input.value, typeof Number(input.value), Number(input.value));
  console.log('log4: ', Number(inputsArray[0].value), isNaN(inputsArray[0].value)); // 'число' или NaN 
  
  // приводим к числу значение input-элемента:
  const inputValue = Number(event.target.value);

  console.log('log5: ', typeof inputValue, Number(inputValue)); 
  console.log('log6: ', input.value, inputsArray[0].value);  
  console.log('log7: ', Number(inputsArray[0].value), isNaN(inputsArray[0].value));
   //console.log(currency[0].rate); console.log(currency[0].str);
  if (inputsArray[0].value !== '' && inputsArray[1].value !== '' && inputsArray[2].value !== '' && 
      inputsArray[3].value !== '' && inputsArray[4].value !== '') {
    //console.log('if');
    //console.log(`id: ${event.target.id}, value: ${event.target.value}`);
    //console.log(event); 
    //console.log(input);
    //console.log(input.value);
    //console.log(inputsArray[0].value); 
    activeBtnCalc();
  } else {
    //console.log('else'); 
    //console.log(inputsArray[0].value);
    deactiveBtnCalc(); 
  }

  //const tooltips = document.getElementsByClassName('pc-form__tooltip-text'); // old
  const tooltips = document.querySelectorAll('.form__tooltip-text'); // ES6+
  for (let i = 0; i < inputsArray.length; i++) {
    const inputValue = Number(inputsArray[i].value);
    if (isNaN(inputValue)) {
      Object.assign(tooltips[i].style, elemStyles.invalid);
      deactiveBtnCalc();
    } else if (!isNaN(inputValue)) {
      Object.assign(tooltips[i].style, elemStyles.valid);
    }
  }

}

function activeBtnCalc() {
  btnCalc.addEventListener('click', calcBtnHandler); 
  Object.assign(btnCalc.style, elemStyles.active); 
}

function deactiveBtnCalc() {
  btnCalc.removeEventListener('click', calcBtnHandler);
  Object.assign(btnCalc.style, elemStyles.inactive); 
}



// Получение <select>:
const selectElement = document.getElementById('select');

selectElement.addEventListener('change', () => {
    
  calcBtnHandler(); 
  const selectedOption = selectElement.options[selectElement.selectedIndex];
  console.log('Selected currency:', selectedOption.value);
  
  // Получение значения атрибута "value" выбранной опции
  const unit = selectedOption.value; 
  console.log(unit); 
  const params = inputsArray.map(param => Number(param.value)); 
  //console.log(currency.rate);
  const rate = Number(currency[0].rate);   
 
  
  // Currency calculation:
  if (unit === 'USD') {
    let result = calc(...params, unit, rate) / rate;   
    console.log(result, rate); 
    resultDisplayControl.innerHTML = 
    new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: unit,
      currencyDisplay: 'narrowSymbol',
    }).format(result.toFixed(2));
  } else if (unit === 'UAH') {
    let result = calc(...params, unit, rate);   
    console.log(result, rate); 
    resultDisplayControl.innerHTML = 
    new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: unit,
      currencyDisplay: 'narrowSymbol',
    }).format(result.toFixed(2));
  }
  

});


function calcBtnHandler() {
  const selectElement = document.getElementById('select');
 
  const selectedOption = selectElement.options[selectElement.selectedIndex];
    
  const unit = selectedOption.value; 
  //const unit = 'UAH'; 
  console.log(unit);

  const params = inputsArray.map(param => Number(param.value)); 
  //console.log(currency.rate);
  const rate = Number(currency[0].rate); 
  console.log(rate);
  const result = calc(...params, unit, rate);
    
  resultDisplayControl.innerHTML = 
    new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: unit,
      currencyDisplay: 'narrowSymbol',
    }).format(result.toFixed(2));
  
  Object.assign(resultDisplayControl.style, elemStyles.result);
  deactiveBtnCalc();
}

// formula:
function calc( length, width, height, weight, distance, unit, rate ) {       
  let price;   
  price = (length + width + height + weight + distance);
  
  let result;
  result = price;
  return result;    
}  
// calc

})(); // immediately invoked functions

