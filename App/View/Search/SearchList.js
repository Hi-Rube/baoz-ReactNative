'use strict';

var React = require('react-native');
var SearchListRowView = require('../Search/SearchListRow');

var {
  ListView,
  View
  } = React;

var SearchListView = React.createClass({
  render: function () {
    return (
      <ListView
        style={this.props.style}
        dataSource={this.props.data}
        automaticallyAdjustContentInsets={false}
        showsVerticalScrollIndicator={false}
        renderRow={this._renderRow}
      />
    );
  },
  _renderRow: function (data) {
    return (
      <SearchListRowView
        data={data}
      />
    )
  }
});

module.exports = SearchListView;