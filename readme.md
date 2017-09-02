# korbitAPI
 
 > korbit api Object based Promise (using AXIOS)
  
## install
 
 > npm install --save korbitapi
 
 ## example (how to use this)
 
 ``` javascript
 
 var KorbitAPI = require('korbitapi');
 var korbit = new KorbitAPI();
 
 korbit.ticker('btc').then(function(response){
   console.log(response.data)
 })
 
 ```