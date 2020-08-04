var BudgetController = (function(){
  var data;

  // function constructor
  function BudgetController(id, desc, value){
    this.id = id;
    this.desc = desc;
    this.value = value;
  }
  // data structure to store the income and expenses
  data = {
    inc: [],
    exp: [],
    id: 0
  };
  function calculatePercentage(totalIncome, totalExpense){
    if(totalIncome === 0)
      return '---'
    return ((totalExpense / totalIncome) * 100).toFixed(2) + '%';
  }
  return {
    getId: function(){
      data.id += 1;
      return data.id - 1;
    },

    addItemToData: function(id, type, desc, value){
      // Use constructor to add the item
      if(type === 'inc'){
        data.inc.push(new BudgetController(id, desc, value));
    }else if(type === 'exp'){
      data.exp.push(new BudgetController(id, desc, value));
    }
  },

    getTotalIncome: function(){
      var TotalIncome = 0;
      data.inc.forEach(function(current, index, array){
        TotalIncome += parseFloat(current.value);
      });
      return TotalIncome;
    },
    getTotalExpense: function(){
      var TotalExpense = 0;
      data.exp.forEach(function(current, index, array){
        TotalExpense += parseFloat(current.value);
      });
      return TotalExpense;
    },
    calculatePercentage: function(totalIncome, totalExpense){
      return calculatePercentage(totalIncome, totalExpense);
    },
    calculatePercentageOfExpenses: function(totalIncome){
      // Calculate percentage of every expenses using calculatePercentage method and store them to expensesPercantage.
      var expensesPercantage = data.exp.map(function(curr, index, array){
        return calculatePercentage(totalIncome, curr.value);
      });
      return expensesPercantage;
    },
    deleteItem: function(type, id){
      if(type === 'inc'){
        for(var i = 0; i < data.inc.length; i++){
          if(data.inc[i].id == id){
            // From ith index of array, delete one item
            data.inc.splice(i, 1);
            break;
          }
        }
      }else if(type === 'exp'){
        for(var i = 0; i < data.exp.length; i++){
          if(data.exp[i].id == id){
            // From ith index of array, delete one item
            data.exp.splice(i, 1);
            break;
          }
        }
      }
    }
  }
})();

var UIController = (function(){
var DOMstrings;

DOMstrings = {
  add__btn: document.querySelector('.add__btn'),
  add__value: document.querySelector('.add__value'),
  add__description: document.querySelector('.add__description'),
  add__type: document.querySelector('.add__type'),
  income__list: document.querySelector('.income__list'),
  expenses__list: document.querySelector('.expenses__list'),
  budget__income__value: document.querySelector('.budget__income--value'),
  selectDescriptionAndValue: document.querySelectorAll('.add__description, .add__value'),
  budget__expenses__value: document.querySelector('.budget__expenses--value'),
  budget__expenses__percentage: document.querySelector('.budget__expenses--percentage'),
  budget__value: document.querySelector('.budget__value'),
  budget__title__month: document.querySelector('.budget__title--month'),
  container: document.querySelector('.container'),
  setRedFocus: document.querySelectorAll('.add__type ,.add__description, .add__value'),
};

  function formatNumber(number){
    var num;
    number = number.split('.');
    if(number[0].length > 3){
      num = number[0].substr(0, number[0].length - 3) + ',' + number[0].substr(number[0].length - 3, 3);
    }else{
      num = number[0];
    }
    return num + '.' + number[1];
  }

  function clearFields(){
    // Convert List to array so, we can use forEach method
    var selectDescriptionAndValueArr = Array.prototype.slice.call(DOMstrings.selectDescriptionAndValue);
    selectDescriptionAndValueArr.forEach(function(current, index, array){
      current.value = "";
    });
  }
  // Our forEach method for NodeList
  function nodeListForEach(nodeList, func){
    for(var i = 0; i < nodeList.length; i++){
      func(nodeList[i], i, nodeList);
    }
  }
return{
  getDOMstrings: function(){
    return DOMstrings;
  },
  addItemToUI: function(id, type, desc, value){
    if(type === 'inc'){
    var html = '<div class="item clearfix" id=%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
    html = html.replace('%id%', 'income-' + id);
    html = html.replace('%description%', desc);
    html = html.replace('%value%', '+ ' + formatNumber(Math.abs(value).toFixed(2)));
    DOMstrings.income__list.insertAdjacentHTML('beforeend', html);
    clearFields();
    // transfer focus to description
    DOMstrings.add__description.focus();
  }else if(type === 'exp'){
    var html = '<div class="item clearfix" id="%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">27%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
    html = html.replace('%id%', 'expense-' + id);
    html = html.replace('%description%', desc);
    html = html.replace('%value%', '- ' + formatNumber(Math.abs(value).toFixed(2)));
    DOMstrings.expenses__list.insertAdjacentHTML('beforeend', html);
    clearFields();
    // transfer focus to description
    DOMstrings.add__description.focus();
  }
},
  displayTotalIncomeToUI: function(totalIncome){
    DOMstrings.budget__income__value.textContent = '+ ' + formatNumber(Math.abs(totalIncome).toFixed(2));
  },
  displayTotalExpenseToUI: function(totalExpense, percentage){
    DOMstrings.budget__expenses__value.textContent = '- ' + formatNumber(Math.abs(totalExpense).toFixed(2));
    DOMstrings.budget__expenses__percentage.textContent = percentage;
  },
  displayExpensesPercantage: function(expensesPercantage){
    //   Make NodeList forEach loop. expensesPercantage is NodeList here.
    var item__percentage = document.querySelectorAll('.item__percentage');
    nodeListForEach(item__percentage, function(current, index, nodeList){
        current.textContent = expensesPercantage[index];
    });
  },
  displayAvailableBudget: function(totalIncome, totalExpense){
    var budget__value = DOMstrings.budget__value;
    var availableBudget = formatNumber(Math.abs(totalIncome - totalExpense).toFixed(2));
    (totalIncome - totalExpense) >= 0 ? budget__value.textContent = '+ ' + availableBudget : budget__value.textContent = '- ' + availableBudget
  },
  displayMonth: function(){
    const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    var date = new Date();
    DOMstrings.budget__title__month.textContent = monthNames[date.getMonth()] + ' ' + date.getFullYear() + ' ';
  },
  deleteItemFromUI: function(selectedId){
    var el = document.getElementById(selectedId);
    el.parentNode.removeChild(el);
  },
  nodeListForEach: function(nodeList, func){
    return nodeListForEach(nodeList, func);
  }
}
})();

var Controller = (function(UIController, BudgetController){
  var DOMstrings;
  DOMstrings = UIController.getDOMstrings();

  // Initailize website and reset everything
  init();

  DOMstrings.add__btn.addEventListener('click', function(){
    addItem();
  });
  // This event will happen when any key is pressed on anywhere on page
  document.addEventListener('keypress', function(e){
    if(e.keyCode === 13 || e.which === 13){
    addItem();
  }
  });

  // Listen to container and when event is happaned find class where event is happened and delete that element
  DOMstrings.container.addEventListener('click', function(event){
    var id, selectedId;
    // find class where event is happened
    selectedId = event.target.parentNode.parentNode.parentNode.parentNode.id;
    id = selectedId.split('-');
    if(id[0] === 'income' || id[0] === 'expense'){
    id[1] = parseInt(id[1]);
    // delete that element
    id[0] === 'income' ? BudgetController.deleteItem('inc', id[1]) : BudgetController.deleteItem('exp', id[1]);
    UIController.deleteItemFromUI(selectedId);
    takeActions();
  }
  });

  // Change color when toggle b/w income and expenses
  DOMstrings.add__type.addEventListener('change', function(){
    UIController.nodeListForEach(DOMstrings.setRedFocus, function(curr, index, NodeList){
      curr.classList.toggle('red-focus');
    });
    DOMstrings.add__btn.classList.toggle('red');
  });
  function init(){
    UIController.displayMonth();
    UIController.displayAvailableBudget(0, 0);
    UIController.displayTotalIncomeToUI(0);
    UIController.displayTotalExpenseToUI(0, '---');
  }
  function addItem(){
    var value = DOMstrings.add__value.value;
    var desc = DOMstrings.add__description.value;
    var type = DOMstrings.add__type.value;
    if(value > 0 && desc !== ''){
      var id = BudgetController.getId();
      UIController.addItemToUI(id, type, desc, value);
      BudgetController.addItemToData(id, type, desc, value);
      takeActions();
  }
  }
  function takeActions(){
    var totalIncome = BudgetController.getTotalIncome();
    UIController.displayTotalIncomeToUI(totalIncome);
    var totalExpense = BudgetController.getTotalExpense();
    var percentage = BudgetController.calculatePercentage(totalIncome, totalExpense);
    UIController.displayTotalExpenseToUI(totalExpense, percentage);
    var expensesPercantage = BudgetController.calculatePercentageOfExpenses(totalIncome);
    UIController.displayExpensesPercantage(expensesPercantage);
    UIController.displayAvailableBudget(totalIncome, totalExpense);
  }

})(UIController, BudgetController);
