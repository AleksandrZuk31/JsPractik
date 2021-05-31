

let money, income, addExprenses, deposit, mission, period;

// присваиваю значения

money = 60000;
income = 'car repairs';
addExprenses = 'Телефон, Бензин, Интернет'; 
deposit = true;
mission = 1000000;
period = 12;

// применяю методы и свойства

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);


console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');

// запрос на перечисление расходов

addExprenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
console.log(addExprenses);
console.log(addExprenses.length);
console.log(addExprenses.toLowerCase());
console.log(addExprenses.split (', '));

// запрос на проверку депозита

deposit = confirm('Есть ли у вас депозит в банке?');
console.log(deposit);

// запрос о месячном доходе

money = +prompt('Ваш месячный доход?');
console.log(money);

// объявление дополнительных переменных

let expenses1, expenses2, amount1, amount2, budgetDay, budgetMonth, executionMission;

// запросы о расходах

expenses1 = prompt('Введите обязательную статью расходов?');
amount1 = +prompt('Во сколько это обойдется?');
expenses2 = prompt('Введите обязательную статью расходов?');
amount2 = +prompt('Во сколько это обойдется?');

// рассчет бюджета на месяц

budgetMonth = money - amount1 - amount2;
console.log('Бюджет на месяц: ', budgetMonth);

// расчет срока доститижения цели

executionMission = Math.ceil(mission / budgetMonth);
console.log('Цель будет достигнута за ' + executionMission + ' месяцев(-а)'); 

// расчет бюджета на день

budgetDay = Math.floor(budgetMonth / 30);
console.log('Бюджет на день ', budgetDay);

// сравнение уровня дохода

if (budgetDay > 1200) {
    console.log('У вас высокий уровень дохода');
} else if (budgetDay <= 1200, 600 <= budgetDay) {
    console.log('У вас средний уровень дохода');
} else if (budgetDay >= 0) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else {
 console.log('Что то пошло не так');
}
   