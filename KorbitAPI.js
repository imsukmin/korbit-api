const axios = require('axios')

function korbitapi () {
  if (!(this instanceof arguments.callee )) {
    console.error('it is ONLY use with "new" keyword')
    return false
  }

  // public API
  this.callPublicAPI = function (commend, parameter) {
    return axios.get('https://api.korbit.co.kr/v1/' + commend + serializeObject(parameter))
    // .then(function (response) {
    //   var data = response.data
    //   console.log('callPublicAPI response: ', data, data.result)
    // })
    .catch(function (error) {
      console.log('callPublicAPI error', error);
    })
  }
}

// utils
var isCurrencyPublic = function (c) {
  return (c === 'btc' || c === 'bch' || c === 'eth' || c === 'etc' ||  c === 'xrp')
}

var isEmpty = function (obj) {
  return Object.keys(obj).length === 0;
}

var serializeObject = function (object) {
  if (isEmpty(object)) {
    return ''
  }

  var data = [];
  for(var p in object) {
    if (object.hasOwnProperty(p)) {
      data.push(encodeURIComponent(p) + "=" + encodeURIComponent(object[p]))
    }
  }
  return '?' + data.join("&");
}

/**
 * public API
 */
// Public - Ticker
korbitapi.prototype.ticker = function (currency) {
  if(!isCurrencyPublic(currency) && currency !== 'all' ) {
    console.error('ticker: currency type is NOT correct! [ currency: ' + currency + ' ]')
    return false
  }
  var parameter = {
    'currency_pair': currency + '_krw' // Default value: btc, Allowed values: btc, bch, eth, etc, xrp
  }
  return this.callPublicAPI('ticker', parameter)
}

// Public - TickerDetail
korbitapi.prototype.tickerDetail = function (currency) {
  if(!isCurrencyPublic(currency) && currency !== 'all' ) {
    console.error('ticker: currency type is NOT correct! [ currency: ' + currency + ' ]')
    return false
  }
  var parameter = {
    'currency_pair': currency + '_krw' // Default value: btc, Allowed values: btc, bch, eth, etc, xrp
  }
  return this.callPublicAPI('ticker/detailed', parameter)
}

// Public - Orderbook
korbitapi.prototype.orderbook= function (currency) {
  if(!isCurrencyPublic(currency)) {
    console.error('orderbook: currency type is NOT correct! [ currency: ' + currency + ' ]')
    return false
  }
  var parameter = {
    'currency_pair': currency + '_krw' // Default value: btc, Allowed values: btc, bch, eth, etc, xrp
  }
  return this.callPublicAPI('orderbook', parameter)
}

// Public - transactions
korbitapi.prototype.transactions = function (currency) {
  if(!isCurrencyPublic(currency)) {
    console.error('transactions: currency type is NOT correct! [ currency: ' + currency + ' ]')
    return false
  }
  var parameter = {
    'currency_pair': currency + '_krw', // Default value: btc, Allowed values: btc, bch, eth, etc, xrp
    'time': 'hour' // Default value: hour, Allowed values: minute, hour, day
  }
  return this.callPublicAPI('transactions', parameter)
}

// Public - constants
korbitapi.prototype.constants = function () {
  return this.callPublicAPI('constants', {})
}

module.exports = korbitapi

module.exports.default = korbitapi

