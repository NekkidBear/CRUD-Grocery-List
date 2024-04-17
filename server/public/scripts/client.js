console.log('👋🌍');

/** this function gets data from the server */
function getGroceries(){
    axios({
        method: "GET",
        url: "/groceries"
    })
    .then((response) => {
        let listData = response.data;
        renderDOM(listData);
    })
    .catch((error) => {
        console.log("There was an error retrieving your list. Error: ", error)
    }
)}

function renderDOM(data){
    let groceryList = data;
    let tableBodyLoc = document.getElementById("tableBodylocation");
    let runningTotal = 0
    tableBodyLoc.innerHTML = ""

    for (let row of groceryList){
        let unitPrice = Number(row.unit_price);
        let quantity = Number(row.quantity);
        let extendedPrice = unitPrice * quantity;
        runningTotal += extendedPrice;

        tableBodyLoc.innerHTML += `
        <tr>
            <td>${row.item}</td>
            <td>${row.unit_price}</td>
            <td>${row.quantity}</td>
            <td>${row.in_cart}</td>
            <td>${extendedPrice}</td>
            <td>${runningTotal}</td>
        </tr>
        `;
    }
}