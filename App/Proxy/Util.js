'use strict';

function getApiData(apiData){
	return JSON.parse(apiData.substring(7, apiData.length - 2));
};

module.exports = {
	getApiData: getApiData
};