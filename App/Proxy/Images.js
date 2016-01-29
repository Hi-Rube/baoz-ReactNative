'use strict';

var Api = require('../Network/Api');

var getImageURL = function(source, options){
	return Api.getImageURL(source, options);
};

module.exports = {
	getImageURL: getImageURL
};
