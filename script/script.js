'Use strict';

// кнопка Рассчитать
let start = document.getElementById('start'),
// кнопки "+"
plusIncome = document.getElementsByTagName('button')[0],
plusExpenses = document.getElementsByTagName('button')[1],
// Чекбокс
depositCheck = document.querySelector('#deposit-check'),
// Поля ввода возможных доходов
additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
// Элементы правой части программы
budgetMonthValue = document.getElementsByClassName('result-total')[0],
budgetDayValue = document.getElementsByClassName('result-total')[1],
expensesMonthValue = document.getElementsByClassName('result-total')[2],
additionalIncomeValue = document.getElementsByClassName('result-total')[3],
additionalExpensesValue = document.getElementsByClassName('result-total')[4],
incomePeriodValue = document.getElementsByClassName('result-total')[5],
targetMonthValue = document.getElementsByClassName('result-total')[6],
// Оставшиеся поля
salaryAmount = document.querySelector('.salary-amount'),
expensesTitle = document.querySelector('.expenses-title'),
expensesItems = document.querySelectorAll('.expenses-items'),
additionalExpensesItem = document.querySelector('.additional_expenses-item'),
targetAmount = document.querySelector('.target-amount'),
periodSelect = document.querySelector('.period-select'),
periodAmount = document.querySelector('.period-amount'),
incomeTitle = document.querySelector('.income-title'),
incomeItem = document.querySelectorAll('.income-items');

// создаем объект appData

let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    expensesMonth: 0,
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
// функция рассчитать
    start: function() {
        appData.budget = +salaryAmount.value;
        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();
        appData.showResult();
    },    
// блок обязательных расходов
    addExpensesBlock: function(){
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
            expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plusExpenses);
            expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3){
            plusExpenses.style.display = 'none';
        }
    },
// блок дополнительных доходов
    addIncomeBlock: function(){
        let cloneIncomeItem = incomeItem[0].cloneNode(true);
            incomeItem[0].parentNode.insertBefore(cloneIncomeItem, plusIncome);
            incomeItem = document.querySelectorAll('.income-items');
        if(incomeItem.length === 3){
            plusIncome.style.display = 'none';
        }
    },
// обязательные расходы    
    getExpenses: function(){
        expensesItems.forEach(function(item){
          let itemExpenses = item.querySelector('.expenses-title').value;
          let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                appData.expenses[itemExpenses] = +cashExpenses;
              }
        });
    },
// обязательные доходы
    getIncome: function() {
        incomeItem.forEach(function(item){
          let itemIncome = item.querySelector('.income-title').value;
          let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== ''){
                appData.income[itemIncome] = +cashIncome;
            }
        });
            for (let key in appData.income){
                appData.incomeMonth += +appData.income[key];
            }
    },
// возможные расходы
    getAddExpenses: function(){
          let addExpenses = additionalExpensesItem.value.split(',');
              addExpenses.forEach(function(item){
                  item = item.trim();
            if (item !== ''){
                appData.addExpenses.push(item);
            }
        });
    },
// возможные доходы    
    getAddIncome: function(){
          additionalIncomeItem.forEach(function(item){
          let itemValue = item.value.trim();
            if(itemValue !== ''){
                appData.addIncome.push(itemValue);
            }
        });
    },
// получение результов в поля    
    showResult: function(){
          budgetMonthValue.value = appData.budgetMonth;
          budgetDayValue.value = Math.ceil(appData.budgetDay);
          expensesMonthValue.value = appData.expensesMonth;
          additionalExpensesValue.value = appData.addExpenses.join(', ');
          additionalIncomeValue.value = appData.addIncome.join(',');
          targetMonthValue.value = appData.getTargetMonth();
          incomePeriodValue.value = appData.calcSavedMoney();
    },
    getExpensesMonth : function() {
        for (let key in appData.expenses) {
          appData.expensesMonth += appData.expenses[key];
        } 
    },
    getBudget : function() {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth / 30; 
    },
    getTargetMonth : function() {
        return Math.ceil(targetAmount.value / appData.budgetMonth);
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
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
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
        return incomePeriodValue.value = (appData.budgetMonth * +periodSelect.value);
    },
}
// запрещение нажатия рассчитать при пусом поле дохода
    start.disabled = true;
       const btnStart = function (){
        if(salaryAmount.value === '') {
            start.disabled = true;
        } else {
            start.disabled = false;
        } 
      };
// обработчики событий
  salaryAmount.addEventListener('oninput', btnStart);
  start.addEventListener('click', appData.start);
  plusExpenses.addEventListener('click', appData.addExpensesBlock);
  plusIncome.addEventListener('click', appData.addIncomeBlock);
  periodSelect.addEventListener('change', appData.calcSavedMoney);
// отбражение значения range
  periodSelect.oninput = function() {
    periodAmount.textContent = periodSelect.value;
  };                                                           
  periodSelect.oninput();

// Пока оставил, в задании ничего не сказано было, хотя надо доделать)
 
// расчет срока доститижения цели

// appData.getTargetMonth(appData.mission, appData.budgetMonth);
// if (appData.getTargetMonth(appData.mission, appData.budgetMonth) >0) {
// console.log('Цель будет достигнута за ' + appData.getTargetMonth(appData.mission, appData.budgetMonth) + ' месяцев(-а)');     
// } else {
//  console.log('Цель не будет достигнута'); 
// }

//appData.getInfoDeposit();

//appData.addExpenses = appData.addExpenses.map(n => `${n[0].toUpperCase()}${n.slice(1)}`).join(', ');