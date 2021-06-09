'use strict'

let money,
    start = function() {
        do {
            money = prompt('Ваш месячный доход?', 60000);
        }
        while (isNaN(money) || money === '' || money === null)
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
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 1000000,
    period: 3,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function() {
        if(confirm('Есть ли у вас дополнительный источник заработка?')){
          let itemIncome; 
            do {
              itemIncome = prompt('Какой у вас дополнительный заработок?');
            }
            while(!isNaN(itemIncome) || itemIncome === ' ' || itemIncome === null);
          let cashIncome; 
            do {
            cashIncome = prompt('Сколько в месяц на этом зарабатываете?');
            }
            while(isNaN(cashIncome) || cashIncome === ' ' || cashIncome === null);
        appData.income[itemIncome] = cashIncome;
        }
        let addExpenses = prompt('Перечислите возможные расходы через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split (',');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        for (let i = 0; i < 2; i++) {
        let itemExpenses;
          do {
            itemExpenses = prompt('Введите обязательную статью расходов?');
          }
          while(!isNaN(itemExpenses) || itemExpenses === ' ' || itemExpenses === null);
        let cashExpenses;
          do {
              cashExpenses = prompt('Во сколько это обойдется?');
          }
          while (isNaN(cashExpenses) || cashExpenses === '' || cashExpenses === null);
        appData.expenses[itemExpenses] = +cashExpenses;
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
  },
  getInfoDeposit: function() {
    if(appData.deposit){
      let yearPercentDeposit;
        do {
          yearPercentDeposit = prompt('Какой годовой процент?');
          }
        while (isNaN(yearPercentDeposit) || yearPercentDeposit === '' || yearPercentDeposit === null);
      appData.percentDeposit = +yearPercentDeposit;
      
      let inputMoneyDeposit;
        do {
          inputMoneyDeposit = prompt('Какая сумма заложена?'); 
          }
        while (isNaN(inputMoneyDeposit) || inputMoneyDeposit === '' || inputMoneyDeposit === null);
      appData.moneyDeposit = +inputMoneyDeposit;
    }
  },
  calcSavedMoney: function(){
      return appData.budgetMonth * appData.period;
  }
};
    appData.asking();
    appData.expensesMonth = appData.getExpensesMonth();    
console.log('Расходы за месяц ', appData.expensesMonth);

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
appData.getInfoDeposit();

appData.addExpenses = appData.addExpenses.map(n => `${n[0].toUpperCase()}${n.slice(1)}`).join(', ');
console.log(appData.addExpenses);

// кнопка Рассчитать

const getStart = document.getElementById('start');
console.log(getStart);

// кнопки "+"

const getPlusIncome = document.getElementsByTagName('button')[0];
console.log(getPlusIncome);
const getPlusExpenses = document.getElementsByTagName('button')[1];
console.log(getPlusExpenses);

// Чекбокс

const getCheckbox = document.querySelector('#deposit-check');
console.log(getCheckbox);

// Поля ввода возможных доходов

const getAdditionalIncomeOne = document.querySelectorAll('.additional_income-item')[0];
console.log(getAdditionalIncomeOne);
const getAdditionalIncomeTwo = document.querySelectorAll('.additional_income-item')[1];
console.log(getAdditionalIncomeTwo);

// Элементы правой части программы

const getBudgetMonthValue = document.getElementsByClassName('result-total')[0];
console.log(getBudgetMonthValue);
const getBudgetDayValue = document.getElementsByClassName('result-total')[1];
console.log(getBudgetDayValue);
const getExpensesMonthValue = document.getElementsByClassName('result-total')[2];
console.log(getExpensesMonthValue);
const getAdditionalIncomeValue = document.getElementsByClassName('result-total')[3];
console.log(getAdditionalIncomeValue);
const getAdditionalExpensesValue = document.getElementsByClassName('result-total')[4];
console.log(getAdditionalExpensesValue);
const getIncomePeriodValue = document.getElementsByClassName('result-total')[5];
console.log(getIncomePeriodValue);
const getTargetMonthValue = document.getElementsByClassName('result-total')[6];
console.log(getTargetMonthValue);

// Оставшиеся поля

const getSalaryAmount = document.querySelector('.salary-amount');
console.log(getSalaryAmount);
const getIncomeTitle = document.querySelector('.income-title');
console.log(getIncomeTitle);
const getIncomeAmount = document.querySelector('.income-amount');
console.log(getIncomeAmount);
const getExpensesTitle = document.querySelector('.expenses-title');
console.log(getExpensesTitle);
const getExpensesAmount = document.querySelector('.expenses-amount');
console.log(getExpensesAmount);
const getAdditionalExpensesItem= document.querySelector('.additional_expenses-item');
console.log(getAdditionalExpensesItem);
const getTargetAmount = document.querySelector('.target-amount');
console.log(getTargetAmount);
const getPeriodSelect = document.querySelector('.period-select');
console.log(getPeriodSelect);