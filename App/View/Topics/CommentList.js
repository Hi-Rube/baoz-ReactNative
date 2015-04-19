'use strict';

var React = require('react-native');
var Comments = require('../../Proxy/Comments');
var CommentListRowView = require('./CommentListRow')

var {
  Text,
  View,
  ListView,
  ActivityIndicatorIOS
  } = React;

var CommentListView = React.createClass({
  getInitialState: function () {
    return {
      loaded: false,
      commentList: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    }
  },
  _renderCommentListRow: function (data) {
    return (
      <CommentListRowView
        item={data}
      />
    );
  },
  render: function () {
    if (!this.state.loaded) {
      return (
        <View style={Style.loadingContainer}>
          <ActivityIndicatorIOS color="#356DD0" style={{marginVertical: 30, marginBottom: 30}} />
        </View>
      );
    } else {
      return (
        <View style={Style.commentListView}>
          <ListView
            automaticallyAdjustContentInsets={false}
            showsVerticalScrollIndicator={false}
            dataSource={this.state.commentList}
            renderRow={this._renderCommentListRow}
          />
        </View>
      );
    }
  },
  componentDidMount: function () {
    var that = this;
    Comments.getCommentsList(this.props.topicId, 0, function (data) {
      //add floor's id
      Array.prototype.forEach.call(data, (item, index)=> {
        item['floorId'] = index + 1;
      });
      that.setState({loaded: true, commentList: that.state.commentList.cloneWithRows(data)});
    }, function (error) {
      console.log(error.message);
    })
  }
});

var Style = React.StyleSheet.create({
  loadingContainer: {
    backgroundColor: '#eeeeee',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  commentListView: {
    marginTop: 65,
    flex: 1
  }
});

module.exports = CommentListView;