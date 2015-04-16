'use strict';

var React = require('react-native');
var GroupListRowView = require('./GroupListRow');

var {
  ListView,
  Text
  } = React;

var GroupListView = React.createClass({
  render: function () {
    return this._renderGroupList();
  },
  _renderGroupList: function () {
    return (
      <ListView
        automaticallyAdjustContentInsets={false}
        showsVerticalScrollIndicator={false}
        style={this.props.style}
        dataSource={this.props.data}
        renderRow={this._renderGroupListRow}
      />
    );
  },
  _renderGroupListRow: function (data) {
    return (
      <GroupListRowView item={data}/>
    )
  }
});

module.exports = GroupListView;