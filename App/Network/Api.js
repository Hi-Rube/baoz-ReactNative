'use strict';

var AppData = require('../AppData');

var BALANCING = function () {
  var secondDomain = ['as', 'f', 't'];
  return [Math.floor(Math.random() * 10), secondDomain[Math.floor(Math.random() * 3)]];
};

var BAOZ_TEXT_URL = 'http://i.baoz.cn/rest/object/';
var BAOZ_SORT_URL = 'http://i.baoz.cn/rest/';
var BAOZ_IMAGE_URL = function () {
  var balancing = BALANCING();
  return "http://" + balancing[0] + '.' + balancing[1] + '.' + 'baoz.cn/f/';
};

function api(api) {
  return BAOZ_TEXT_URL + encodeURIComponent(api);
};

function sortapi(api) {
  return BAOZ_SORT_URL + encodeURIComponent(api);
}

function getImageURL(source, options) {
  options || (options = {});
  options.type || (options['type'] = 'png');
  return BAOZ_IMAGE_URL() + source + '.' + options.type;
};

function getGroupClubs(groupName) {
  return api(AppData.Groups.getURL(groupName));
};

function getClubsInfo(clubName) {
  return api(AppData.Clubs.getBlockURL(clubName));
};

function getClubsBBS(clubName, start) {
  if (typeof clubName == 'string' || start <= 0) {
    return api(AppData.Clubs.getbbsURL(clubName));
  } else if (typeof clubName == 'number') {
    return sortapi(AppData.Clubs.getbbsSortURL(clubName, start)).replace(/%2F/g, '/');
  }
};

function getCommentsList(topicID, start) {
  if (start == 0) {
    return api(AppData.Comments.getCommentURL(topicID, 0));
  }
  return sortapi(AppData.Comments.getCommentURL(topicID, start)).replace(/%2F/g, '/');
};

module.exports = {
  getGroupClubs: getGroupClubs,
  getImageURL: getImageURL,
  getClubsInfo: getClubsInfo,
  getClubsBBS: getClubsBBS,
  getCommentsList: getCommentsList
};
