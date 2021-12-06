var currenyIDs = [];    
var currencyNames = [];

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
                    var i = 0;
                    if (request.status >= 200 && request.status < 400){
                        currenyIDs.forEach(curr => {
                            if(data1[curr + '-USD'] != null){

                                document.getElementById('currency-list').innerHTML += '<div class="currency-container">'
                                +'<p1 class="currency-id">'+ curr +'</p1>'
                                +'<p1 class="volume"> Volume : '+ data1[curr + '-USD']['stats_24hour'].volume +'</p1>'
                                +'<p1 class="current-price">$'+ data1[curr + '-USD']['stats_24hour'].last +'</p1>'
                                +'</div>';

                                console.log(currencyNames[i]);
                                console.log(data1[curr + '-USD']['stats_24hour'].volume);
                                i++;
                            }
                        })
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

   