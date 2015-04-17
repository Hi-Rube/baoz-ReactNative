'use strict';

var React = require('react-native');

var {
  Text
  } = React;

var TopicListRowView = React.createClass({
  render: function () {
    return (
      <Text>
      {this.props.item.data.message.title}
      </Text>
    );
  }
});

module.exports = TopicListRowView;