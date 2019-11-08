document.addEventListener("DOMContentLoaded", () => {
///////////////////////////////////////////////////////////////    
//Budget Control
///////////////////////////////////////////////////////////////
    let Calc = document.getElementById("Budget-calculator") ,
        Income = document.querySelector("#Budget-type-income").querySelector(".type-changes-value .value-number") ,
        IncomePercentage = document.querySelector("#Budget-type-income").querySelector(".type-changes-value .value-percentage") ,
        Expenses = document.querySelector("#Budget-type-expenses").querySelector(".type-changes-value .value-number") ,
        ExpensesPercentage = document.querySelector("#Budget-type-expenses").querySelector(".type-changes-value .value-percentage");
        AddItem = [
            document.querySelector("select#Add-type"),
            document.querySelector("input#Add-description"),
            document.querySelector("input#Add-value")
        ];
      
    AddItem[0].addEventListener('change', function (){
        if (AddItem[0].value == "exp")
        {
            for(let i = 0; i < AddItem.length; i++)
            {
                AddItem[i].classList.replace("blue-border" , "red-border");
            }
            document.querySelector("button.Add-btn").classList.replace("blue-button" , "red-button");
        }
        else if (AddItem[0].value == "inc")
        {
            for(let i = 0; i < AddItem.length; i++)
            {
                AddItem[i].classList.replace("red-border" , "blue-border");
            }
            document.querySelector("button.Add-btn").classList.replace("red-button" , "blue-button");
        }
    });

    AddItem[2].addEventListener('keypress', function (e){
        if (e.key == "+" || e.key == "-" || e.key == "," || e.key == "e")
        {
            let result = "";
            for(let i = 0; i < AddItem[2].value.length; i++)
            {                
                if (AddItem[2].value[i] != "+" && AddItem[2].value[i] != "-" && 
                AddItem[2].value[i] != "," && AddItem[2].value[i] != "e")
                {
                    result += AddItem[2].value[i];
                }
            }
            setTimeout(function(){
                AddItem[2].value = result;
            });
        }
    });

    let AddNewItem = function(){
        if (AddItem[1].value != "" && AddItem[2].value != "")
        {
            let index = AddItem[0].value == "inc" ? document.querySelectorAll(`.Income .item`).length + 1 :document.querySelectorAll(`.Expenses .item`).length + 1;
            let NewBudgetItem = 
                `<div class="item" id="${AddItem[0].value}-${index}">
                    <div class="item-description">${AddItem[1].value}</div>
                    <div class="item-changes">
                        <button class="item-delete-button">
                            <i class="fa fa-times-circle-o" aria-hidden="true"></i>
                        </button>
                        <div class="item-percentage"></div>
                        <div class="item-value">${AddItem[0].value == "inc" ? "+" : "-"} ${BigNumbers("parse" , (parseFloat(AddItem[2].value)).toFixed(2))}</div>
                    </div>
                </div>`
            ;
            let ListItem = AddItem[0].value == "inc" ? `.Income .Income-list` : `.Expenses .Expenses-list`;
            document.querySelector(ListItem).insertAdjacentHTML('beforeend', NewBudgetItem);
            for(let i = 0 ; i < document.querySelectorAll(`.item-delete-button`).length; i++)
            {
                document.querySelectorAll(`.item-delete-button`)[i].addEventListener("click" , DeleteItem);
            }
            AddItem[1].value = "";
            AddItem[2].value = "";
            AddItem[1].focus();
            RefreshBudget();
        }
        else
        {
            for(let i = 1; i < AddItem.length; i++)
            {
                if (AddItem[i].value == "")
                {
                    AddItem[i].focus();
                    break;
                }
            }
        }
    };

    let DeleteItem = function(e){
        let itemId = e.target.parentNode.parentNode.parentNode.id;
        let itemName = itemId.slice(0 , 3) == "inc" ? "Income" : "Expenses";
        let indexId = itemId.slice(4 , itemId.length);
        for (let i = indexId; i < document.querySelectorAll(`.${itemName} .item`).length; i++)
        {
            console.log(`${itemId.slice(0 , 3)}-${i}`);
            document.getElementById(`${itemId.slice(0 , 3)}-${String(parseInt(i) + 1)}`).id = `${itemId.slice(0 , 3)}-${i}`;
        }
        (document.getElementById(itemId)).parentNode.removeChild(document.getElementById(itemId));
        RefreshBudget();
    };

    document.addEventListener("keypress" , function(e){if (e.key == "Enter"){AddNewItem();}});
    document.querySelector(".Add-btn").addEventListener("click" , AddNewItem);

    RefreshBudget();
///////////////////////////////////////////////////////////////
//Additional Function Plugins
///////////////////////////////////////////////////////////////
// Parse String to Number
    function StringToNumber(e , number){
        if(e == "+" || e == "-")
        {
            for(let i = 0; i < number.length; i++) 
            {
                if (number[i] == e)
                {
                    number = number.slice(i + 2 , number.length);
                }
            }
        }
        else if (e == "%")
        {
            let result = "";
            for(let i = 0; i < number.length; i++) 
            {
                if (number[i] == " ")
                {
                    continue;
                }
                else if (number[i] != e)
                {
                    result += number[i];
                }
                else {
                    break;
                }
            }
            number = result;
        }
        return parseFloat(number);
    }
    function BigNumbers(Parses , number){
        if (number[number.length-3] != ".")
        {
            number += ".00";
        }
        if (number.length > 6)
        {
            let result = "";
            for (let i = 0; i < number.length; i++)
            {
                if (Parses == "parse")
                {
                    if (i > 3 && i % 3 == 0)
                    {
                        result += "'";
                    }
                    result += number[number.length - i - 1];
                }
                else if ("Unparse") 
                {
                    if (number[number.length - i - 1] != "'")
                    {
                        result += number[number.length - i - 1];
                    }
                }
            }
            let ResultReverse = "";
            for (let i = 0; i < result.length; i++)
            {
                ResultReverse += result[result.length - i - 1];
            }
            result = ResultReverse;
            return result;
        }
        else 
        {
            return number;
        }
    }
// Month Time Data
    (function(){
        var now, year, month;
        now = new Date();
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        month = months[now.getMonth()];
        year = now.getFullYear();
        document.querySelector(".Date-Time").textContent = month + ' ' + year;
    }());
///////////////////////////////////////////////////////////////    
// Refresh All Budget
///////////////////////////////////////////////////////////////
    function RefreshBudget() {
        RefreshBudgetType(Income , IncomePercentage , "Income" , "inc" , "+");
        RefreshBudgetType(Expenses , ExpensesPercentage , "Expenses" , "exp" , "-");        

        function RefreshBudgetType(Budget , BudgetPercentage , BudgetName , BudgetItemName , BudgetType){
            if (document.getElementById(`${BudgetItemName}-1`) != null)
            {
                let budg = 0;
                for (let i = 0; i < document.querySelectorAll(`.${BudgetName} .item`).length ; i++) {
                    let values = (document.getElementById(`${BudgetItemName}-${i+1}`).querySelector(".item-value")).textContent;
                    values = StringToNumber(`${BudgetType}`, BigNumbers("Unparse" ,values));
                    budg += values;
                }
                budg.toFixed(2);
                Budget.textContent = `${BudgetType} ` + BigNumbers("parse" , String(budg));
                if (BudgetType == "+" && BudgetPercentage.textContent != "100%")
                {
                    BudgetPercentage.textContent = "100%";
                }
                else if (BudgetType == "-" && IncomePercentage.textContent == "100%")
                {
                    BudgetPercentage.textContent = ((StringToNumber("-" , BigNumbers("Unparse" ,Expenses.textContent)) / StringToNumber("+" , BigNumbers("Unparse" , Income.textContent)))*100).toFixed(0) + "%";
                }
                let budgper = 0;
                for (let i = 0; i < document.querySelectorAll(`.${BudgetName} .item`).length ; i++) {
                    let valuesVal = (document.getElementById(`${BudgetItemName}-${i+1}`).querySelector(".item-value")).textContent;
                    let valuePer = (document.getElementById(`${BudgetItemName}-${i+1}`).querySelector(".item-percentage"));
                    if (i + 1 == document.querySelectorAll(`.${BudgetName} .item`).length && 
                    ((StringToNumber(`${BudgetType}`, BigNumbers("Unparse" ,valuesVal)) / 
                    StringToNumber(`${BudgetType}`, BigNumbers("Unparse" , Budget.textContent))) * 
                    StringToNumber("%" , BudgetPercentage.textContent) != 
                    StringToNumber("%" , BudgetPercentage.textContent) - 
                    parseInt(budgper * StringToNumber("%" , BudgetPercentage.textContent))) &&
                    (BudgetName != "Expenses" || ExpensesPercentage.textContent != "---"))
                    {
                        let result = StringToNumber("%" , BudgetPercentage.textContent) - parseInt(budgper * StringToNumber("%" , BudgetPercentage.textContent));
                        valuePer.textContent = result + "%";                          
                    }
                    else if (BudgetName != "Expenses" || ExpensesPercentage.textContent != "---")
                    {
                        let result = StringToNumber(`${BudgetType}`, BigNumbers("Unparse" ,valuesVal)) / StringToNumber(`${BudgetType}`, BigNumbers("Unparse" , Budget.textContent));
                        budgper += result;
                        valuePer.textContent = (parseInt(result * StringToNumber("%" , BudgetPercentage.textContent))).toFixed(0) + "%";
                    }
                    else
                    {
                        valuePer.textContent = "---";
                    }
                }
            }
            else if (BudgetPercentage.textContent != "---")
            {
                Budget.textContent = `${BudgetType} ` + 0.00;
                BudgetPercentage.textContent = "---";
            }
        }

        let Result = StringToNumber("+" , BigNumbers("Unparse" , Income.textContent)) - StringToNumber("-" , BigNumbers("Unparse" , Expenses.textContent)),
            type = (Result.toFixed(2)) < 0 ? "- " : "+ " ;

        Calc.textContent = type + BigNumbers("parse" , ((Math.abs(Result)).toFixed(2)));
    }
});
///////////////////////////////////////////////////////////////
//Test
///////////////////////////////////////////////////////////////
console.log(window);