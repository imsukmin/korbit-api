const axios = require('axios')
// const crypto = require('crypto')

function KorbitAPI (_ACCESS_TOKEN, _SECRET_KEY) {
  if (!(this instanceof arguments.callee )) {
    console.error('it is ONLY use with "new" keyword')
    return false
  }

  var ACCESS_TOKEN = _ACCESS_TOKEN
  var SECRET_KEY = _SECRET_KEY

  this.get_access_token = function () {
    return ACCESS_TOKEN
  }
  this.get_secret_key = function () {
    return SECRET_KEY
  }

  // public API
  this.callPublicAPI = function (commend, parameter) {
    return axios.get('https://api.korbit.co.kr/v1/' + commend + '/' + serializeObject(parameter))
    // .then(function (response) {
    //   var data = response.data
    //   console.log('callPublicAPI response: ', data, data.result)
    // })
      .catch(function (error) {
        console.log(error);
      })
  }

  // personal API
  this.callPersonalAPI = function (url, payload) {
    var token = this.get_access_token()
    var key = this.get_secret_key()

    if(token === undefined || typeof token !== 'string') {
      console.error('ACCESS_TOKEN is not correct: ', token)
    }

    if(key === undefined || typeof key !== 'string') {
      console.error('ACCESS_TOKEN is not correct: ', key)
    }

    var headers = {
      'content-type':'application/json',
      'X-COINONE-PAYLOAD': payload,
      'X-COINONE-SIGNATURE': crypto
        .createHmac('sha512', key.toUpperCase())
        .update(payload)
        .digest('hex')
    }
    return axios({
      'method': 'post',
      'url': url,
      // 'headers': headers,
      // 'data': payload
    })
    // .then(function (response) {
    //   var data = response.data
    //   console.log('callPersonalAPI response: ', data, data.result)
    // })
      .catch(function (error) {
        console.log(error);
      })
  }
}

// utils
var isNumber = function (value) {
  return typeof value === 'number'
}

var isFloat = function (value) {
  return (value === +value) && (value !== (value|0))
}

var isInteger = function (value) {
  return (value === +value) && (value === (value|0))
}

var isCurrency = function (c) {
  return (c === 'btc' || c === 'eth' || c === 'etc')
}

var isCurrencyPublic = function (c) {
  return (c === 'btc' || c === 'bch' || c === 'eth' || c === 'etc' ||  c === 'xrp')
}

var isOrderType = function (o) {
  return (o === 'buy' || o === 'sell')
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
KorbitAPI.prototype.ticker = function (currency) {
  if(!isCurrencyPublic(currency) && currency !== 'all' ) {
    console.error('ticker: currency type is NOT correct! [ currency: ' + currency + ' ]')
    return false
  }
  var parameter = {
    'currency_pair': currency + '_krw' // Default value: btc, Allowed values: btc, bch, eth, etc, xrp, all
  }
  return this.callPublicAPI('ticker', parameter)
}

// Public - TickerDetail
KorbitAPI.prototype.tickerDetail = function (currency) {
  if(!isCurrencyPublic(currency) && currency !== 'all' ) {
    console.error('ticker: currency type is NOT correct! [ currency: ' + currency + ' ]')
    return false
  }
  var parameter = {
    'currency_pair': currency + '_krw' // Default value: btc, Allowed values: btc, bch, eth, etc, xrp, all
  }
  return this.callPublicAPI('ticker/detail', parameter)
}

// Public - Orderbook
KorbitAPI.prototype.orderbook= function (currency) {
  if(!isCurrencyPublic(currency)) {
    console.error('orderbook: currency type is NOT correct! [ currency: ' + currency + ' ]')
    return false
  }
  var parameter = {
    'currency_pair': currency // Default value: btc, Allowed values: btc, bch, eth, etc, xrp
  }
  return this.callPublicAPI('orderbook', parameter)
}

// Public - transactions
KorbitAPI.prototype.transactions = function (currency) {
  if(!isCurrencyPublic(currency)) {
    console.error('transactions: currency type is NOT correct! [ currency: ' + currency + ' ]')
    return false
  }
  var parameter = {
    'currency_pair': currency, // Default value: btc, Allowed values: btc, bch, eth, etc, xrp
    'time': 'hour' // Default value: hour, Allowed values: minute, day
  }
  return this.callPublicAPI('transactions', parameter)
}

// Public - transactions
KorbitAPI.prototype.constants = function () {
  return this.callPublicAPI('constants', {})
}

/**
 * personal API
 */


module.exports = KorbitAPI

module.exports.default = KorbitAPI
