'use strict';

var Util = require('./Util');
var Api = require('../Network/Api');

var getCommentsList = function (topicId, start, successFunc, errorFunc) {
    fetch(Api.getCommentsList(topicId, start))
        .then(function (response) {
            return Util.getApiData(response._bodyText);
        })
        .then(function (responseObj) {
            if (!responseObj.length) {
                responseObj.comments.list.unshift({
                    data: {
                        id: responseObj.id,
                        base: responseObj.base,
                        message: responseObj.message,
                        sort: 0
                    }
                });
                responseObj = responseObj.comments.list;
            }
            successFunc && successFunc(responseObj);
        })
        .catch((error) => {
            errorFunc && errorFunc(error);
        })
        .done();
};

module.exports = {
    getCommentsList: getCommentsList
};