'use strict';

var Groups = {
  URL: 'get.群组管理.club_',
  getURL: function (groupName) {
    return this.URL + groupName;
  },
  groups: ['院校', '聊天', '吃喝', '兴趣', '技术', '地区', '其他']
};

var Clubs = {
  DEFAULT_ICON_URI: 'f9bafc1e9eab04863fb7d42fa3a3f457.t120x120.r12x0x0x12.b2x0x6x2xf3f3f3',
  getBlockURL: function (club) {
    return 'get.' + club + '.block';
  },
  getbbsURL: function (club) {
    return 'get.' + club + '.bbs';
  },
  getHomeURL: function (club) {
    return 'get.' + club + '.home';
  }
};

var Data = {
  Groups: Groups,
  Clubs: Clubs
};

module.exports = Data;