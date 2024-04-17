console.log("👋🌍");

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
                <button id="checkMarkItem" onclick="toggleInCart(${row.id})">✅</button>
            </td>
            <td>
                <button id="deleteItem" onclick = "deleteItem(${row.id})">❌</button>
            </td>
        </tr>
        `;
    }
  }
}

getGroceries();
