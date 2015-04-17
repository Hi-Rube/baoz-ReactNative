'use strict';

var Util = require('./Util');
var Api = require('../Network/Api');

var getClubsInfo = function (clubName, successFunc, errorFunc) {
  fetch(Api.getClubsInfo(clubName))
    .then(function (response) {
      return Util.getApiData(response._bodyText);
    })
    .then(function (responseObj) {
      successFunc && successFunc(responseObj.group);
    })
    .catch((error) => {
      errorFunc && errorFunc(error);
    })
    .done();
};

module.exports = {
  getClubsInfo: getClubsInfo
};