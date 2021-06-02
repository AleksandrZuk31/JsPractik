'use strict'

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money, income, addExprenses, deposit, mission, period;

// присваиваю значения

income = 'car repairs';
deposit = true;
mission = 1000000;

// применяю методы и свойства

let start = function() {
    do {
        money = prompt('Ваш месячный доход?');
    }
    while (!isNumber(money));
};

start();

let showTypeOf = function(data) {
    console.log(typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

// объявление дополнительных переменных

let expenses1, expenses2, budgetDay, executionMission, accumulatedMonth;

// вывод месячного дохода

console.log('Ваш доход', money);

// функция рассчета расходов за месяц
let count;

let getExpensesMonth = function() {
    let sum = 0;

    for (let i = 0; i < 2; i++) {

            if (i === 0) {
                expenses1 = prompt('Введите обязательную статью расходов?', 'бензин');
                while (!isNumber(count)) {
                    count = prompt('Во сколько это обойдется?');
                }

            } else if (i ===1) {
                expenses2 = prompt('Введите обязательную статью расходов?', 'алименты');
                do{
                    count = prompt('Во сколько это обойдется?');
                }
                while (!isNumber(count));
                }    
            }
        sum+= +count;
    
    console.log(sum);
    return sum;
};

let expensesAMount = getExpensesMonth();

console.log( 'Расходы за месяц ', expensesAMount);

// запрос на перечисление расходов

addExprenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
console.log(addExprenses.toLowerCase());
console.log(addExprenses.split (', '));

// функция расчета накоплений за месяц

let getAccumulatedMonth = function(sum1, sum2) {
    return sum1 - sum2;
}

accumulatedMonth = getAccumulatedMonth(money, expensesAMount);

// расчет срока доститижения цели

let getTargetMonth = function(sum1, sum2) {
    return Math.ceil(sum1 / sum2);
}

getTargetMonth(mission, accumulatedMonth);
if (getTargetMonth(mission, accumulatedMonth) >0) {
    console.log('Цель будет достигнута за ' + getTargetMonth(mission, accumulatedMonth) + ' месяцев(-а)');     
} else {
    console.log('Цель не будет достигнута'); 
}

// расчет бюджета на день

budgetDay = Math.floor(accumulatedMonth / 30);
console.log('Бюджет на день ', budgetDay);

// сравнение уровня дохода

let getStatusIncome = function() {
    if (budgetDay >= 1200) {
        return ('У вас высокий уровень дохода');
    } else if (budgetDay >= 600) {
        return ('У вас средний уровень дохода');
    } else if (budgetDay >= 0) {
        return ('К сожалению у вас уровень дохода ниже среднего');
    } else {
     return ('Что то пошло не так');
    }    
}

console.log(getStatusIncome());
