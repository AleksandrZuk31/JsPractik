'use strict'

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    start = function() {
        do {
            money = +prompt('Ваш месячный доход?');
        }
        while (!isNumber(money));
    };

start();

// создаем объект appData

let appData = {
    income: {},
    budget: money,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 1000000,
    period: 3,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function() {
        appData.addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses.toLowerCase().split (', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        for (let i = 0; i < 2; i++) {
        appData.expenses[prompt('Введите обязательную статью расходов?')] = +prompt('Во сколько это обойдется?');
        }
        },
    getExpensesMonth : function() {
        let sum = 0;
        for (let key in appData.expenses) {
            sum += appData.expenses[key];
        } return sum;
    },
    getBudget : function(sum1, sum2) {
      return sum1 - sum2;
    },
    getTargetMonth : function(sum1, sum2) {
      return Math.ceil(sum1 / sum2);
    },
    getStatusIncome : function() {
      if (appData.budgetDay >= 1200) {
          return ('У вас высокий уровень дохода');
      } else if (appData.budgetDay >= 600) {
          return ('У вас средний уровень дохода');
      } else if (appData.budgetDay >= 0) {
          return ('К сожалению у вас уровень дохода ниже среднего');
      } else {
       return ('Что то пошло не так');
      }    
  }
};
    appData.asking();
    appData.expensesMonth = appData.getExpensesMonth();    
console.log( 'Расходы за месяц ', appData.expensesMonth);

appData.budgetMonth = appData.getBudget(appData.budget, appData.expensesMonth);

// расчет срока доститижения цели

appData.getTargetMonth(appData.mission, appData.budgetMonth);
if (appData.getTargetMonth(appData.mission, appData.budgetMonth) >0) {
    console.log('Цель будет достигнута за ' + appData.getTargetMonth(appData.mission, appData.budgetMonth) + ' месяцев(-а)');     
} else {
    console.log('Цель не будет достигнута'); 
}

// расчет бюджета на день

appData.budgetDay = Math.floor(appData.budgetMonth / 30);

// сравнение уровня дохода

console.log(appData.getStatusIncome());

for (let kuy in appData) {
  console.log('Наша программа включает в себя данные: ' + kuy + appData[kuy]);
}