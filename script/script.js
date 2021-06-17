'Use strict';

// кнопка Рассчитать
let start = document.getElementById('start'),
// кнопка Сбросить
cancel = document.getElementById('cancel'),
// кнопки "+"
plusIncome = document.getElementsByTagName('button')[0],
plusExpenses = document.getElementsByTagName('button')[1],
plusBtn = document.querySelectorAll('.btn_plus'),
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
expensesAmount = document.querySelector('.expenses-amount'),
expensesItems = document.querySelectorAll('.expenses-items'),
additionalExpensesItem = document.querySelector('.additional_expenses-item'),
targetAmount = document.querySelector('.target-amount'),
periodSelect = document.querySelector('.period-select'),
periodAmount = document.querySelector('.period-amount'),
incomeTitle = document.querySelector('.income-title'),
incomeItem = document.querySelectorAll('.income-items'),
incomeAmount = document.querySelector('.income-amount'),
field = document.querySelectorAll('[type="text"]'); 
// создаем класс appData

const AppData = function () {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.expensesMonth = 0;
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
};
// функция рассчитать
AppData.prototype.start = function() {
    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.showResult();
    this.getPlusBtn();
    this.getField();
    start.style.display = 'none';
    cancel.style.display = 'block';
};
// Функция reset
AppData.prototype.reset = function() {
    this.budget = 0,
    this.budgetDay = 0,
    this.budgetMonth = 0,
    this.income = {},
    this.incomeMonth = 0,
    this.addIncome = [],
    this.expenses = {},
    this.expensesMonth = 0,
    this.addExpenses = [],
    this.deposit = false,
    this.percentDeposit = 0,
    this.moneyDeposit = 0,
    this.getFieldReset(),
    this.getPlusBtnReset(),
    this.addExpensesBlockReset(),
    this.addIncomeBlockReset(),
    cancel.style.display = 'none',
    start.style.display = 'block',
    periodSelect.value = 1,
    periodAmount.textContent = periodSelect.value;
};
// блокировка полей ввода
AppData.prototype.getField = function(){
  field = document.querySelectorAll('[type="text"]'); 
  field.forEach(function(item){
    item.disabled = true;
  });
};
AppData.prototype.getFieldReset = function(){
  field = document.querySelectorAll('[type="text"]');
  field.forEach(function(item){
    item.disabled = false;
    item.value = '';
  });
};
// блокировка кнопок плюс
AppData.prototype.getPlusBtn = function(){
  plusBtn.forEach(function(item){
    item.disabled = true;
  });
};
AppData.prototype.getPlusBtnReset = function(){
  plusBtn.forEach(function(item){
    item.disabled = false;
  });
};
// блок обязательных расходов
AppData.prototype.addExpensesBlock = function(){
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plusExpenses);
        expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3){
        plusExpenses.style.display = 'none';
    }
};
AppData.prototype.addExpensesBlockReset = function(){
    let expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length != 1){
      for (i = 1; i < expensesItems.length; i++) {
      expensesItems[i].remove();
      }; 
    };
    this.expensesItems = [],
    plusExpenses.style.display = 'block';
};
// блок дополнительных доходов
AppData.prototype.addIncomeBlock = function(){
    let cloneIncomeItem = incomeItem[0].cloneNode(true);
        incomeItem[0].parentNode.insertBefore(cloneIncomeItem, plusIncome);
        incomeItem = document.querySelectorAll('.income-items');
    if(incomeItem.length === 3){
        plusIncome.style.display = 'none';
    }
};
AppData.prototype.addIncomeBlockReset = function(){
    let incomeItems = document.querySelectorAll('.income-items');
    if(incomeItems.length != 1){
      for (i = 1; i < incomeItems.length; i++) {
      incomeItems[i].remove();
      }; 
    };
    this.incomeItems = [],
    plusIncome.style.display = 'block';
};
// обязательные расходы    
AppData.prototype.getExpenses = function() {
    expensesItems.forEach(function(item){
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
          if(itemExpenses !== '' && cashExpenses !== ''){
            this.expenses[itemExpenses] = +cashExpenses;
          }
    }, this);
};
// обязательные доходы
AppData.prototype.getIncome = function() {
    incomeItem.forEach(function(item){
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
        if(itemIncome !== '' && cashIncome !== ''){
            this.income[itemIncome] = +cashIncome;
        }
    }, this);
        for (let key in this.income){
            this.incomeMonth += +this.income[key];
        }
};
// возможные расходы
AppData.prototype.getAddExpenses = function(){
      let addExpenses = additionalExpensesItem.value.split(',');
          addExpenses.forEach(function(item){
              item = item.trim();
        if (item !== ''){
            this.addExpenses.push(item);
        }
    }, this);
};
// возможные доходы    
AppData.prototype.getAddIncome = function(){
      additionalIncomeItem.forEach(function(item){
      let itemValue = item.value.trim();
        if(itemValue !== ''){
            this.addIncome.push(itemValue);
        }
    }, this);
};
// получение результов в поля    
AppData.prototype.showResult = function(){
      budgetMonthValue.value = this.budgetMonth;
      budgetDayValue.value = Math.ceil(this.budgetDay);
      expensesMonthValue.value = this.expensesMonth;
      additionalExpensesValue.value = this.addExpenses.join(', ');
      additionalIncomeValue.value = this.addIncome.join(', ');
      targetMonthValue.value = this.getTargetMonth();
      incomePeriodValue.value = this.calcSavedMoney();
};
AppData.prototype.getExpensesMonth = function() {
    for (let key in this.expenses) {
      this.expensesMonth += this.expenses[key];
    } 
};
AppData.prototype.getBudget = function() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = this.budgetMonth / 30; 
};
AppData.prototype.getTargetMonth = function() {
    return Math.ceil(targetAmount.value / this.budgetMonth);
};
AppData.prototype.getStatusIncome = function() {
    const _this = this;
    if (_this.budgetDay >= 1200) {
        return ('У вас высокий уровень дохода');
    } else if (_this.budgetDay >= 600) {
        return ('У вас средний уровень дохода');
    } else if (_this.budgetDay >= 0) {
        return ('К сожалению у вас уровень дохода ниже среднего');
    } else {
        return ('Что то пошло не так');
    }
};
AppData.prototype.getInfoDeposit = function() {
    this.deposit = confirm('Есть ли у вас депозит в банке?');
    const _this = this;
      if(_this.deposit){
          let yearPercentDeposit;
            do {
              yearPercentDeposit = prompt('Какой годовой процент?');
            }
            while (isNaN(yearPercentDeposit) || yearPercentDeposit === '' || yearPercentDeposit === null);
              _this.percentDeposit = +yearPercentDeposit;
    
          let inputMoneyDeposit;
            do {
              inputMoneyDeposit = prompt('Какая сумма заложена?'); 
            }
            while (isNaN(inputMoneyDeposit) || inputMoneyDeposit === '' || inputMoneyDeposit === null);
              _this.moneyDeposit = +inputMoneyDeposit;
      }
};
AppData.prototype.calcSavedMoney = function(){
    // отбражение значения range
    periodAmount.textContent = periodSelect.value;
   return incomePeriodValue.value = (this.budgetMonth * +periodSelect.value);
    
};
AppData.prototype.eventListeners = function(){
  // запрещение нажатия рассчитать при пусом поле дохода
   start.disabled = true;
    const btnStart = function (){
    if(salaryAmount.value === '') {
        start.disabled = true;
    } else {
        start.disabled = false;
    } 
    };
      let getStart = this.start.bind(this);
    start.addEventListener('click', getStart);
      let getCancel = this.reset.bind(this);
    cancel.addEventListener('click', getCancel);
    salaryAmount.addEventListener('input', btnStart);
    plusExpenses.addEventListener('click', this.addExpensesBlock);
    plusIncome.addEventListener('click', this.addIncomeBlock);
    periodSelect.addEventListener('change', this.calcSavedMoney);
    periodSelect.oninput = function() {
        periodAmount.textContent = periodSelect.value;
      };                                                           
      periodSelect.oninput();
};

const appData = new AppData();
appData.eventListeners();


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