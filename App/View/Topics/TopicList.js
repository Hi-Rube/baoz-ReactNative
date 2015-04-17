'use strict';

var React = require('react-native');
var TopicListRowView = require('./TopicListRow');

var {
  ListView,
  Text,
  View
  } = React;

var TopicListView = React.createClass({
  _renderTopicListRow: function (data) {
    return (
      <TopicListRowView
        item={data}
      />
    );
  },
  _renderFooter: function () {
    return (
      <View style={styles.listFooter}>
        <Text style={styles.listFooterText}>刷新</Text>
        <Text style={styles.listFooterText}>下一页</Text>
      </View>
    )
  },
  render: function () {
    return (
      <ListView
        style={styles.topicListView}
        automaticallyAdjustContentInsets={false}
        showsVerticalScrollIndicator={false}
        dataSource={this.props.data}
        renderFooter={this._renderFooter}
        renderRow={this._renderTopicListRow}
      />
    );
  }
});

var styles = React.StyleSheet.create({
  topicListView: {
    borderTopWidth: 1,
    borderTopColor: '#2a2',
    marginTop: 6,
    paddingTop: 6,
    marginBottom: 120
  },
  listFooter: {
    height: 40,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  listFooterText: {
    fontWeight:'bold',
    color:'#777'
  }
});

module.exports = TopicListView;