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

var getClubsBBS = function (clubName, start, successFunc, errorFunc) {
  fetch(Api.getClubsBBS(clubName, start))
    .then(function (response) {
      return Util.getApiData(response._bodyText);
    })
    .then(function (responseObj) {
      if (start <= 0) {
        successFunc && successFunc(responseObj.bbs.top.bbs.list.concat(responseObj.bbs.list.bbs.list));
      } else {
        successFunc && successFunc(responseObj);
      }
    })
    .catch((error)=> {
      errorFunc && errorFunc(error);
    })
    .done();
};

module.exports = {
  getClubsInfo: getClubsInfo,
  getClubsBBS: getClubsBBS
};