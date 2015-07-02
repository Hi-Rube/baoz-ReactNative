'user strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var PixelRatio = require('PixelRatio');
var AppData = require('../../AppData');
var Images = require('../../Proxy/Images');
var ParseHTML = require('../../Common/ParseHTML');
var ParseRule = require('../../Common/ParseRule');
var {
    Text,
    View,
    Image,
    WebView
    }=React;

var WINDOW_WIDTH = Dimensions.get('window').width;
var WINDOW_HEIGHT = Dimensions.get('window').height;
var WINDOW_PIXELRATIO = PixelRatio.get();

var CommentListRowView = React.createClass({
    _renderContent: function () {
        var data = this.props.item.data;
        var title = null;
        var attachment = null;
        if (data.message.title) {
            title = <Text style={styles.titleText}>{data.message.title}</Text>
        }
        if (data.message.attachment2) {
            attachment = data.message.attachment2.map((item) => {
                var _width = item.width > WINDOW_WIDTH - 6 * WINDOW_PIXELRATIO ?
                WINDOW_WIDTH - 6 * WINDOW_PIXELRATIO : item.width - 6 * WINDOW_PIXELRATIO;
                return (
                    <Image
                        source={{uri: Images.getImageURL(item.source, {type: item.type == 'jpeg' ? 'jpg' : item.type})}}
                        style={{
                            width: _width,
                            height: item.height * (_width / (item.width - 6 * WINDOW_PIXELRATIO)),
                            marginTop: 6,
                            marginLeft: -3
                        }}
                    />
                );
            });
        }
        return (
            <View style={{padding: 6}}>
      {title}
                <ParseHTML
                    code={data.message.content}
                    customTagToStyle={ParseRule}
                />
      {attachment}
            </View>
        );
    },
    render: function () {
        var data = this.props.item.data;
        //fix baoz.cn's bug
        data.message.user || (data.message.user = {
            user: {
                name: 'admin',
                icon: {crop: AppData.Clubs.DEFAULT_ICON_URI}
            }
        });
        data.message.user.user.icon || (data.message.user.user.icon = {crop: AppData.Clubs.DEFAULT_ICON_URI});
        return (
            <View style={styles.container}>
                <View style={styles.head}>
                    <Image
                        style={styles.userHead}
                        source={{uri: Images.getImageURL(data.message.user.user.icon.crop + '.fc')}}/>
                    <View style={{flex: 1}}>
                        <Text style={styles.userName}>
            {data.message.user.user.name}
                        </Text>
                        <Text style={styles.createTime}>
            {data.message.created.replace('T', ' ').replace('Z', ' ').substr(0, data.message.created.length - 5)}
                        </Text>
                    </View>
                    <Text style={styles.floorId}>
          {this.props.item.floorId + 'L'}
                    </Text>
                </View>
       {this._renderContent()}
            </View>
        )
    }
});

var styles = React.StyleSheet.create({
    container: {
        flex: 1
    },
    head: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#eee',
        padding: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    userHead: {
        width: 20,
        height: 20,
        marginRight: 6
    },
    userName: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#2a2'
    },
    createTime: {
        fontSize: 10,
        color: '#888'
    },
    floorId: {
        fontSize: 9,
        color: '#666',
        fontWeight: 'bold'
    },
    titleText: {
        color: '#2a2',
        fontWeight: 'bold',
        fontSize: 13,
        marginBottom: 4
    }
});

module.exports = CommentListRowView;