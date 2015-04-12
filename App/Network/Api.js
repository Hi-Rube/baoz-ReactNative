'use strict';

var AppData = require('../AppData');

var BALANCING = function(){
	var secondDomain = ['as', 'f', 't'];
	return [Math.floor(Math.random() * 10), secondDomain[Math.floor(Math.random() * 3)]];
};

var BAOZ_TEXT_URL = 'http://i.baoz.cn/rest/object/';
var BAOZ_IMAGE_URL = function(){
	var balancing = BALANCING();
	return "http://" + balancing[0] + '.' + balancing[1] + '.' + 'baoz.cn/f/';
};

function api(api){
	return BAOZ_TEXT_URL + encodeURIComponent(api);
};

function getImageURL(source,options){
	options || (options = {});
	options.type || (options['type'] = '.png');
	return BAOZ_IMAGE_URL() + source + options.type;
};

function getGroupClubs(groupName){
	return api(AppData.Groups.getURL(groupName));
};

function getClubsInfo(clubName){
	return api(AppData.Clubs.getBlockURL(clubName));
};

module.exports = {
	getGroupClubs: getGroupClubs,
	getImageURL: getImageURL
};
