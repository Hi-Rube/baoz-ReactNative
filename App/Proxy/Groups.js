'use strict';

var Util = require('./Util');
var Api = require('../Network/Api');

var getGroupClubs = function(groupName, successFunc, errorFunc){
	fetch(Api.getGroupClubs(groupName))
      .then(function(response){
      	return Util.getApiData(response._bodyText);
      })
      .then(function(responseObj){
      	successFunc && successFunc(responseObj.groupman.list);
      })
      .catch((error) => {
   			errorFunc && errorFunc(error);
  		})
      .done();
}

module.exports = {
	getGroupClubs: getGroupClubs
};