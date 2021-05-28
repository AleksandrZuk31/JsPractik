

let money, income, addExprenses, deposit, mission, period;

// присваиваю значения

money = 60000;
income = 'car repairs';
addExprenses = 'Phone, Petrol, Internet'; 
deposit = true;
mission = 1000000;
period = 12;

// применяю методы и свойства

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExprenses.length);

console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');

console.log(addExprenses.toLowerCase());
console.log(addExprenses.split (', '));

// объявляю пременную ежедневного бюджета и вывожу в консоль 

let budgetDay = money / 30;

console.log(budgetDay);

