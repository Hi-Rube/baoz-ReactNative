'use strict';

var React = require('react-native');
var TopicListRowView = require('./TopicListRow');

var {
  ListView
  } = React;

var TopicListView = React.createClass({
  _renderTopicListRow: function (data) {
    return (
      <TopicListRowView
        item={data}
      />
    );
  },
  render: function () {
    return (
      <ListView
        automaticallyAdjustContentInsets={false}
        showsVerticalScrollIndicator={false}
        dataSource={this.props.data}
        renderRow={this._renderTopicListRow}
      />
    );
  }
});

module.exports = TopicListView;