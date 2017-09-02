# korbitAPI
 
 > korbit api Object based Promise (using AXIOS)
 
 this api use only public API
 
 for Detail [https://apidocs.korbit.co.kr/](https://apidocs.korbit.co.kr/)
 
## demo (telegramBot)

[@korbitBot](http://t.me/korbitBot) [not available]
  
## install
 
 > npm install --save korbitapi
 
 ## example (how to use this)
 
 ``` javascript
 
 var KorbitAPI = require('korbitapi');
 var Korbit = new KorbitAPI();
 
 Korbit.ticker('btc').then(function(response){
   console.log(response.data)
 })
 
 ```git push