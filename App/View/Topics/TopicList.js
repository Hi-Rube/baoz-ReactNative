'use strict';

var React = require('react-native');
var TopicListRowView = require('./TopicListRow');

var {
    ListView,
    Text,
    View,
    TouchableHighlight,
    } = React;

var TopicListView = React.createClass({
    _renderTopicListRow: function (data) {
        return (
            <TouchableHighlight
                onPress={()=> {
                    this.props.selectTopic(data.data.id, data.data.message.title);
                }}
                underlayColor={'#ccc'}>
                <View>
                    <TopicListRowView
                        item={data}
                    />
                </View>
            </TouchableHighlight>
        );
    },
    _renderFooter: function () {
        var list = this.props.data.$ListViewDataSource_dataBlob.s1;
        var item = list[list.length - 1];
        return (
            <View style={styles.listFooter}>
                <TouchableHighlight
                    onPress={()=>this.props.refresh()}
                    underlayColor={'#fff'}
                    style={styles.buttonContainer}>
                    <Text style={styles.listFooterText}>刷新</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={()=> {
                        if (item) {
                            this.props.nextPage(parseInt(item.sort))
                        }
                    }}
                    underlayColor={'#fff'}
                    style={styles.buttonContainer}>
                    <Text style={styles.listFooterText}>下一页</Text>
                </TouchableHighlight>
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
        flexDirection: 'row'
    },
    listFooterText: {
        fontWeight: 'bold',
        color: '#777'
    },
    buttonContainer: {
        flex: 1,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

module.exports = TopicListView;