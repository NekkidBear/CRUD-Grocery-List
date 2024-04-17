console.log("👋🌍");

let budget = 0;
/** this function gets data from the server */
function getGroceries() {
  axios({
    method: "GET",
    url: "/groceries",
  })
    .then((response) => {
      let listData = response.data;
      renderDOM(listData);
    })
    .catch((error) => {
      console.log("There was an error retrieving your list. Error: ", error);
    });
}
/** end getGroceries */

/** This function stores the budget */
function enterBudget() {
    let budgetInput = document.getElementById("budgetInput");
    budget = budgetInput.value;

}
/** end endterBudget() */

/** this function adds a new item to the list */
function addItem(){
  //TODO implement add item with axios call
}
/** end addItem */

//**this function deletes an item based on the ID/*
function deleteItem(id){
  //todo implement delete
}
//** end delete item */

/** this function updates the 'cart' status of an item based on it's ID */
function checkMarkItem(id){
  //todo implement update
}
/**end  */


/** This function takes the tata retrieved and synchronizes the DOM */
function renderDOM(data) {
  let groceryList = data;
  console.log("groceryList is:", groceryList);
  if (groceryList) {
    let tableBodyLoc = document.getElementById("tableBodylocation");
    let runningTotal = 0;
    tableBodyLoc.innerHTML = "";

    for (let row of groceryList) {
      let unitPrice = Number(row.unit_price.replace("$", ""));
      let quantity = Number(row.quantity);
      console.log("Type of Unit Price:", typeof row.unit_price);
      console.log("type of Quantity: ", typeof row.quantity);

      let extendedPrice = unitPrice * quantity;
      runningTotal += extendedPrice;
      let extendedPriceFormatted = extendedPrice.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
      let runningTotalFormatted = runningTotal.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });

      tableBodyLoc.innerHTML += `
        <tr>
            <td>${row.item}</td>
            <td>${row.unit_price}</td>
            <td>${row.quantity}</td>
            <td>${row.in_cart}</td>
            <td>${extendedPriceFormatted}</td>
            <td>${runningTotalFormatted}</td>
            <td>
                <button class="checkMarkItem" onclick="toggleInCart(${row.id})">✅</button>
            </td>
            <td>
                <button class="deleteItem" onclick = "deleteItem(${row.id})">❌</button>
            </td>
        </tr>
        `;
    }
  }
}
/** End renderDOM */

getGroceries();
