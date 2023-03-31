"use strict";

//HTML ELEMENT 
const namnEl = document.getElementById("NamnId");
const emailEl = document.getElementById("EmailId");
const adressEl = document.getElementById("AdressId");
const orderIdEl = document.getElementById("getOrderID");
const fraktEl = document.getElementById("fraktId");
const textEl = document.getElementById("TextId");
const updateButton = document.getElementById("Update");
const hiddenEl = document.getElementById("hidden");

//Fetch Order API
fetch('https://firestore.googleapis.com/v1/projects/hatutshop-48739/databases/(default)/documents/Ordrar') //Fetchar vårat api med ordrar (firebase)
.then(res=>res.json())
.then(data=>printOrders(data));


//Funktioner
function deleteCustomer(customerName) {
    console.log(customerName);
    console.log("deleteCustomer körs...");


    fetch("https://firestore.googleapis.com/v1/" + customerName, {
        method: 'DELETE',
        
    }) 
    alert("Beställningen är borttagen!");
    setTimeout(location.reload(), 2000);
}



function getData(name) {
    console.log(name);
    fetch("https://firestore.googleapis.com/v1/" + name)
    .then(res => res.json())
    .then(data=>updateData(data))
}

function updateData(data) {
    console.log("updateData körs...");
    console.log(data);
    hiddenEl.value = data.name;
    orderIdEl.value = data.fields.OrderId.integerValue;
    namnEl.value = data.fields.Name.stringValue;
    emailEl.value = data.fields.Email.stringValue;
    adressEl.value = data.fields.Adress.stringValue;
    fraktEl.value = data.fields.Frakt.stringValue;
}

function clickUpdate(updateData) {
    console.log("clickUpdate körs...");
    console.log(updateData);
   

    let name = hiddenEl.value;
    let localEmail = emailEl.value;
    let localOrder = orderIdEl.value;
    let localNamn = namnEl.value;
    let localAdress = adressEl.value;
    let localFrakt = fraktEl.value;

    console.log("Beställning ID: " + name);
    console.log("Nya Email adressen: " + localEmail);
    console.log("Nya Ordern: " + localOrder);
    console.log("Nya namnet på ordern: " + localNamn);
    console.log("Nya adressen på ordern: " + localAdress);
    console.log("Nya fraktvillkoren: " + localFrakt);
    

            let body = JSON.stringify(
        {
            "fields": {
                "Email": {
                    "stringValue": localEmail
                },
                "Name": {
                    "stringValue": localNamn
                },
                "Frakt": {
                    "stringValue": localFrakt
                },
                "OrderId": {
                    "integerValue": localOrder
                },
                "Adress": {
                    "stringValue": localAdress
                  }
             }
         })

         fetch("https://firestore.googleapis.com/v1/" + name, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: body
         }) .then(result=>result.json())
            .then(dataa => console.log(dataa));
            setTimeout(location.reload(), 2000);
            alert("Ordern har uppdaterats!");
            
    
}


function printOrders(data) {
    console.log("printOrders körs..."); //Här printar vi att metoden körs.
    console.log(data);
    let customerOrders = data.documents; //Skapar en varibel av dokumenten i json databasen

    for(let customer of customerOrders) {
        textEl.innerHTML += 
        `<h1>Produkt ID: ${customer.fields.OrderId.integerValue}</h1>
        <p> Namn: ${customer.fields.Name.stringValue} </p>
        <p> Email: ${customer.fields.Email.stringValue} </p>
        <p> Adress: ${customer.fields.Adress.stringValue} </p>
        <p> Frakt: ${customer.fields.Frakt.stringValue} </p>
        <button onclick="deleteCustomer('${customer.name}')">Ta bort order </button>
        <a href="#">
        <button onclick="getData('${customer.name}')" id="update">
        Ändra order 
        </button>
        </a>
        `
    }
}

//EVENTLYSSNARE 
updateButton.addEventListener("click", clickUpdate);