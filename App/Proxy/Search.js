'use strict';

var Util = require('./Util');
var Api = require('../Network/Api');

var getSearchResult = function (query, successFunc, errorFunc) {
  console.log(Api.getSearch(query))
  fetch(Api.getSearch(query))
    .then(function (response) {
      return response._bodyText;
    })
    .then(function (responseObj) {
      successFunc && successFunc(responseObj);
    })
    .catch((error) => {
      errorFunc && errorFunc(error);
    })
    .done();
};

module.exports = {
  getSearchResult: getSearchResult
};