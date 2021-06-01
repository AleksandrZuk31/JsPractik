'use strict'

let money, income, addExprenses, deposit, mission, period;

// присваиваю значения

money = 60000;
income = 'car repairs';
addExprenses = 'Телефон, Бензин, Интернет'; 
deposit = true;
mission = 1000000;
period = 12;

// применяю методы и свойства

let showTypeOf = function(data) {
    console.log(typeof(data));
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

// объявление дополнительных переменных

let expenses1, expenses2, amount1, amount2, budgetDay, executionMission, accumulatedMonth;

// запрос о месячном доходе

money = +prompt('Ваш месячный доход?');
console.log('Ваш доход', money);

// запросы о расходах

expenses1 = prompt('Введите обязательную статью расходов?');
amount1 = +prompt('Во сколько это обойдется?');
expenses2 = prompt('Введите обязательную статью расходов?');
amount2 = +prompt('Во сколько это обойдется?');

// функция рассчета расходов за месяц

let getExpensesMonth = function(sum1, sum2) {
    return sum1 + sum2;
}

console.log( 'Расходы за месяц ', getExpensesMonth(amount1, amount2));

// запрос на перечисление расходов

addExprenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
console.log(addExprenses.split (', '));

// функция расчета накоплений за месяц

let getAccumulatedMonth = function(sum1, sum2) {
    return sum1 - sum2;
}

accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth(amount1, amount2));

// расчет срока доститижения цели

let getTargetMonth = function(sum1, sum2) {
    return Math.ceil(sum1 / sum2);
}

getTargetMonth(mission, accumulatedMonth);
console.log('Цель будет достигнута за ' + getTargetMonth(mission, accumulatedMonth) + ' месяцев(-а)'); 

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
