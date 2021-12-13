var currenyIDs = [];    
var currencyNames = [];
var currencyData;

document.addEventListener("DOMContentLoaded", function(){


    var request = new XMLHttpRequest()
    request.open('GET', 'https://api.exchange.coinbase.com/currencies', true)
    request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response)
        if (request.status >= 200 && request.status < 400) {
            console.log(data);
            
            data.forEach(currency => {
                currencyNames.push(currency.name);
                currenyIDs.push(currency.id);
            })
            getCurrencyData();
        } else {
            const errorMessage = document.createElement('marquee')
            errorMessage.textContent = `Gah, it's not working!`
            app.appendChild(errorMessage)
        }
    }

    request.send()

    function getCurrencyData() {
        request.open('GET', 'https://api.exchange.coinbase.com/products/stats', true)
            request.onload = function () {
                var data1 = JSON.parse(this.response)
                
                if (request.status >= 200 && request.status < 400){
                    displayAll(data1);
                    search(data1);
                    currencyData = data1;
                }
                else {
                    const errorMessage = document.createElement('marquee')
                    console.log( `Gah, it's not working!` );
                    app.appendChild(errorMessage)
                }
                
            }
        request.send();
    } 

});

function displayAll(data1){
    var i = 0;
    currenyIDs.forEach(curr => {
        if(data1[curr + '-USD'] != null){
            var last = parseFloat(data1[curr + '-USD']['stats_24hour'].last);
            var open = parseFloat(data1[curr + '-USD']['stats_24hour'].open);
            var change;
            var changeHtmlString;
            if( open < last){
                change = (last - open)/open * 100;
                changeHtmlString = '<p1 id="change" class="green">' + change.toFixed(4) + '%</p>';
            }else if(last < open){
                change = (open - last)/open * 100;
                changeHtmlString = '<p1 id="change" class="red">' + change.toFixed(4) + '%</p>';
            }else{
                change = 0;
                changeHtmlString = '<p1 id="change" class="red" style="color:white;">' + change.toFixed(4) + '%</p>';
            }
            document.getElementById('currency-list').innerHTML += '<div class="currency-container">'
            +'<p1 class="currency-id">'+ curr +'</p1>'
            +'<p1 class="volume"> Vol '+ data1[curr + '-USD']['stats_24hour'].volume +'</p1>'
            +'<p1 class="current-price">$'+ data1[curr + '-USD']['stats_24hour'].last +'</p1>'
            +'<div id="'+ curr +'" class="add-fav" onclick="addToFavorites(this.id)"></div>'
            + changeHtmlString
            +'</div>';
            i++;

            if(favList.includes(curr)){
                document.getElementById(curr).innerHTML = "-";
            }else{
                document.getElementById(curr).innerHTML = "+";
            }
        }
    })
}

function displayFavorites(data1, favList){
    var i = 0;
    favList.forEach(curr=> {
        if(data1[curr + '-USD'] != null){
            var last = parseFloat(data1[curr + '-USD']['stats_24hour'].last);
            var open = parseFloat(data1[curr + '-USD']['stats_24hour'].open);
            var change;
            var changeHtmlString;
            if( open < last){
                change = (last - open)/open * 100;
                changeHtmlString = '<p1 id="change" class="green">' + change.toFixed(4) + '%</p>';
            }else if(last < open){
                change = (open - last)/open * 100;
                changeHtmlString = '<p1 id="change" class="red">' + change.toFixed(4) + '%</p>';
            }else{
                change = 0;
                changeHtmlString = '<p1 id="change" class="red" style="color:white;">' + change.toFixed(4) + '%</p>';
            }
            document.getElementById('favorites-list').innerHTML += '<div class="currency-container">'
            +'<p1 class="currency-id">'+ curr +'</p1>'
            +'<p1 class="volume"> Vol '+ data1[curr + '-USD']['stats_24hour'].volume +'</p1>'
            +'<p1 class="current-price">$'+ data1[curr + '-USD']['stats_24hour'].last +'</p1>'
            +'<div id="'+ curr +'" class="add-fav" onclick="removeCrypto(this.id)">-</div>'
            + changeHtmlString
            +'</div>';
            i++;
            console.log(favList);
            if(favList.includes(curr)){
                console.log("here");
                document.getElementById(curr).innerHTML = "-";
            }else{
                document.getElementById(curr).innerHTML = "+";
            }
        }
    })
}

function displayCrypto(data1, curr, i){
    var last = parseFloat(data1[curr + '-USD']['stats_24hour'].last);
    var open = parseFloat(data1[curr + '-USD']['stats_24hour'].open);
    var change;
    var changeHtmlString;
    if( open < last){
        change = (last - open)/open * 100;
        changeHtmlString = '<p1 id="change" class="green">' + change.toFixed(4) + '%</p>';
    }else if(last < open){
        change = (open - last)/open * 100;
        changeHtmlString = '<p1 id="change" class="red">' + change.toFixed(4) + '%</p>';
    }else{
        change = 0;
        changeHtmlString = '<p1 id="change" class="red" style="color:white;">' + change.toFixed(4) + '%</p>';
    }
    document.getElementById('currency-list').innerHTML += '<div class="currency-container">'
    +'<p1 class="currency-id">'+ curr +'</p1>'
    +'<p1 class="volume"> Vol '+ data1[curr + '-USD']['stats_24hour'].volume +'</p1>'
    +'<p1 class="current-price">$'+ data1[curr + '-USD']['stats_24hour'].last +'</p1>'
    +'<div id="'+ curr +'" class="add-fav" onclick="addToFavorites(this.id)"></div>'
    + changeHtmlString
    +'</div>';
    i++;

    if(favList.includes(curr)){
        document.getElementById(curr).innerHTML = "-";
    }else{
        document.getElementById(curr).innerHTML = "+";
    }
}

function addClickFunction(){
    currenyIDs.forEach(curr => {
        document.getElementById(curr).onclick = addToFavorites(curr);
    });
}

function search(data1){
    const search = document.getElementById('search');

    const inputHandler = function(e) {
        document.getElementById('currency-list').innerHTML = "";
        var i = 0;
        console.log(data1['UST-USD']['stats_24hour'].last);
        console.log(data1['UST-USD']['stats_24hour'].open);
        currenyIDs.forEach(curr => {
            if(data1[curr + '-USD'] != null){
                if(curr.includes(e.target.value.toUpperCase(), 0)){
                   displayCrypto(data1, curr, i);
                }
            }
        })
    }

    search.addEventListener('input', inputHandler);
    search.addEventListener('propertychange', inputHandler);
}

function removeCrypto(curr){
    if(favList.includes(curr, 0)){
        favList = favList.filter(item => item !== curr);
    }
    const database = firebase.database();
    database.ref('/users/'+ userId).set({
        crypto : favList
    });
    document.getElementById("favorites-list").innerHTML ="";
    displayFavorites(currencyData, favList);
}

function doFavorites(){
    document.getElementById("search").style.display ="none";
    document.getElementById("fav-header").style.display ="block";
    document.getElementById("favorites-list").innerHTML ="";
    displayFavorites(currencyData, favList);
    document.getElementById("currency-list").style.display = "none";
    document.getElementById("favorites-list").style.display = "block";
}

function doSearch(){
    document.getElementById("search").style.display ="block";
    document.getElementById("fav-header").style.display ="none";
    document.getElementById("favorites-list").style.display = "none";
    document.getElementById("currency-list").style.display = "block";
    document.getElementById("currency-list").innerHTML ="";
    displayAll(currencyData);
}