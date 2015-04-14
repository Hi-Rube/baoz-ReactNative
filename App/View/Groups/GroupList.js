'use strict';

var React = require('react-native');
var Groups = require('../../Proxy/Groups');
var GroupListRowView = require('./GroupListRow');

var {
  ListView,
  Text
  } = React;

var CACHE = [];

var GroupListView = React.createClass({
  getInitialState: function () {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    }
  },
  render: function () {
    return this._renderGroupList();
  },
  _renderGroupList: function () {
    return (
      <ListView
        automaticallyAdjustContentInsets={false}
        showsVerticalScrollIndicator={false}
        style={this.props.style}
        dataSource={this.state.dataSource}
        renderRow={this._renderGroupListRow}
      />
    );
  },
  _renderGroupListRow: function (data) {
    return (
      <GroupListRowView item={data}/>
    )
  },
  componentWillReceiveProps: function (nextProps) {
    this._fetchData(nextProps.groupName);
  },
  componentDidMount: function () {
    this._fetchData(this.props.groupName);
  },
  _fetchData: function (groupName) {
    var cxt = this;
    if (CACHE.length != 0) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(CACHE)
      });
    }
    Groups.getGroupClubs(groupName, function (data) {
      CACHE = [];
      for (var i in data) {
        CACHE.push(data[i]);
      }
      console.log(data[0]);
      cxt.setState({dataSource: cxt.state.dataSource.cloneWithRows(CACHE)});
    }, function (err) {
      console.log(err);
    });
  }
});

module.exports = GroupListView;