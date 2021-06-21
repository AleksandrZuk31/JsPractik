'Use strict';

// кнопка Рассчитать
const start = document.getElementById('start'),
// кнопка Сбросить
cancel = document.getElementById('cancel');
// кнопки "+"
const plusIncome = document.getElementsByTagName('button')[0],
plusExpenses = document.getElementsByTagName('button')[1],
plusBtn = document.querySelectorAll('.btn_plus'),
// Чекбокс
depositCheck = document.querySelector('#deposit-check'),
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
targetAmount = document.querySelector('.target-amount'),
periodSelect = document.querySelector('.period-select'),
periodAmount = document.querySelector('.period-amount'),
incomeTitle = document.querySelector('.income-title'),
incomeAmount = document.querySelector('.income-amount'),
depositBank = document.querySelector('.deposit-bank'),
depositAmount = document.querySelector('.deposit-amount'),
depositPercent = document.querySelector('.deposit-percent');
let incomeItem = document.querySelectorAll('.income-items'),
additionalExpensesItem = document.querySelector('.additional_expenses-item'),
field = document.querySelectorAll('[type="text"]'),
additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
expensesItems = document.querySelectorAll('.expenses-items');
// создаем класс appData
class AppData {
  constructor() {
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
  }
  // функция рассчитать
    start () {
    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getInfoDeposit();
    this.getBudget();
    this.showResult();
    this.getPlusBtn();
    this.getField();
    start.style.display = 'none';
    cancel.style.display = 'block';
  }
    // Функция reset
    reset () {
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
    this.depositHandlerReset(),
    this.getFieldReset(),
    this.getPlusBtnReset(),
    this.addExpensesBlockReset(),
    this.addIncomeBlockReset(),
    cancel.style.display = 'none',
    start.style.display = 'block',
    periodSelect.value = 1,
    periodAmount.textContent = periodSelect.value;
  }
  // блокировка полей ввода
    getField (){
    field = document.querySelectorAll('[type="text"]'); 
    field.forEach(function(item){
      item.disabled = true;
    });
  }
    getFieldReset (){
    field = document.querySelectorAll('[type="text"]');
    field.forEach(function(item){
      item.disabled = false;
      item.value = '';
    });
  }
  // блокировка кнопок плюс
    getPlusBtn (){
    plusBtn.forEach(function(item){
      item.disabled = true;
    });
  }
    getPlusBtnReset (){
    plusBtn.forEach(function(item){
      item.disabled = false;
    });
  }
  // блок обязательных расходов
    addExpensesBlock (){
      let cloneExpensesItem = expensesItems[0].cloneNode(true);
          expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plusExpenses);
          expensesItems = document.querySelectorAll('.expenses-items');
      if(expensesItems.length === 3){
          plusExpenses.style.display = 'none';
      }
  }
    addExpensesBlockReset (){
      let expensesItems = document.querySelectorAll('.expenses-items');
      if(expensesItems.length !== 1){
        for (let i = 1; i < expensesItems.length; i++) {
        expensesItems[i].remove();
        } 
      }
      this.expensesItems = [],
      plusExpenses.style.display = 'block';
  }
  // блок дополнительных доходов
    addIncomeBlock (){
      let cloneIncomeItem = incomeItem[0].cloneNode(true);
          incomeItem[0].parentNode.insertBefore(cloneIncomeItem, plusIncome);
          incomeItem = document.querySelectorAll('.income-items');
      if(incomeItem.length === 3){
          plusIncome.style.display = 'none';
      }
  }
    addIncomeBlockReset (){
      let incomeItems = document.querySelectorAll('.income-items');
      if(incomeItems.length !== 1){
        for (let i = 1; i < incomeItems.length; i++) {
        incomeItems[i].remove();
        }; 
      };
      this.incomeItems = [],
      plusIncome.style.display = 'block';
  }
  // обязательные расходы    
    getExpenses () {
      expensesItems.forEach(function(item){
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
              this.expenses[itemExpenses] = +cashExpenses;
            }
      }, this);
  }
  // обязательные доходы
    getIncome () {
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
  }
  // возможные расходы
    getAddExpenses (){
        let addExpenses = additionalExpensesItem.value.split(',');
            addExpenses.forEach(function(item){
                item = item.trim();
          if (item !== ''){
              this.addExpenses.push(item);
          }
      }, this);
  }
  // возможные доходы    
    getAddIncome (){
        additionalIncomeItem.forEach(function(item){
        let itemValue = item.value.trim();
          if(itemValue !== ''){
              this.addIncome.push(itemValue);
          }
      }, this);
  }
  // получение результов в поля    
    showResult (){
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = Math.ceil(this.budgetDay);
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcSavedMoney();
  }
    getExpensesMonth (){
      for (let key in this.expenses) {
        this.expensesMonth += this.expenses[key];
      } 
  }
    getBudget (){
      const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
      this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
      this.budgetDay = this.budgetMonth / 30; 
  }
    getTargetMonth () {
      return Math.ceil(targetAmount.value / this.budgetMonth);
  }
    getStatusIncome () {
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
  }
    getInfoDeposit () {
      if(this.deposit){
        this.percentDeposit = depositPercent.value;
        this.moneyDeposit = depositAmount.value;
        }
  }
    calcSavedMoney(){
      // отбражение значения range
      periodAmount.textContent = periodSelect.value;
    return incomePeriodValue.value = (this.budgetMonth * +periodSelect.value);
  }
    changePercent() {
      let valueSelect = this.value;
        if (valueSelect === 'other') {
        valueSelect = '';
        depositPercent.style.display = 'inline-block';
          if(valueSelect < 0 || valueSelect > 100 || isNaN(valueSelect)) {
            alert('Введите корректное значение в поле проценты');
             start.disabled = true;
             }
           depositPercent.value = valueSelect;
      } else {
        depositPercent.value = valueSelect;
      }
    }
    depositHandler() {
      if(depositCheck.checked) {
        depositBank.style.display = 'inline-block';
        depositAmount.style.display = 'inline-block';
        this.deposit = true;
        depositBank.addEventListener('change', this.changePercent);
      } else {
        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        depositBank.value = '';
        depositAmount.value = '';
        this.deposit = false;
        depositBank.removeEventListener('change', this.changePercent);
      }
    }
    depositHandlerReset() {
      depositCheck.checked = false, 
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositPercent.style.display = 'none';
      depositBank.value = '';
      depositAmount.value = '';
      this.deposit = false;
      depositBank.removeEventListener('change', this.changePercent);
    }
    eventListeners (){
    // запрещение нажатия рассчитать при пусом поле дохода
    start.disabled = true;
      const btnStart = function (){
      if(salaryAmount.value === '') {
          start.disabled = true;
      } else {
          start.disabled = false;
      } 
      };
        const getStart = this.start.bind(this);
      start.addEventListener('click', getStart);
        const getCancel = this.reset.bind(this);
      cancel.addEventListener('click', getCancel);
      salaryAmount.addEventListener('input', btnStart);
      plusExpenses.addEventListener('click', this.addExpensesBlock);
      plusIncome.addEventListener('click', this.addIncomeBlock);
      periodSelect.addEventListener('change', this.calcSavedMoney);
      periodSelect.oninput = function() {
          periodAmount.textContent = periodSelect.value;
        };                                                           
        periodSelect.oninput();
      depositCheck.addEventListener('change', this.depositHandler.bind(this));
  }
}

const appData = new AppData();
appData.eventListeners();