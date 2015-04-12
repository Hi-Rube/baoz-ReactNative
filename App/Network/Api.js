'use strict';

var AppData = require('../AppData');

var BAOZ_URL = 'http://i.baoz.cn/rest/object/';

function api(api){
	return BAOZ_URL + encodeURIComponent(api);
};

function getGroupClubs(groupName){
	return api(AppData.Groups.getURL(groupName));
};

function getClubsInfo(clubName){
	return api(AppData.Clubs.getBlockURL(clubName));
};

module.exports = {
	getGroupClubs: getGroupClubs
};
