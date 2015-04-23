'use strict';

var Api = require('../Network/Api');

var search = function (query, successFunc, errorFunc) {
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

var searchPeople = function (name, page, successFunc, errorFunc) {
  var query = {
    t: 1,
    page: page,
    q: name
  };
  search(query, successFunc, errorFunc);
};

var searchClub = function (clubName, page, successFunc, errorFunc) {
  var query = {
    t: 2,
    page: page,
    q: clubName
  };
  search(query, successFunc, errorFunc);
};

var searchTopic = function (content, page, successFunc, errorFunc) {
  var query = {
    page: page,
    q: content,
    t: 3
  };
  search(query, successFunc, errorFunc);
};

module.exports = {
  searchPeople: searchPeople,
  searchTopic: searchTopic,
  searchClub: searchClub
};