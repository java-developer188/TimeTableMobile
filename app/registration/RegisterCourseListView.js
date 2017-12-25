import React, {Component} from 'react'
import {
    View,
    ListView,
    Text,
    StyleSheet,
    Alert,
    TouchableHighlight,
    Dimensions,
    Image
} from 'react-native'
const {width, height} = Dimensions.get("window");
var color = ['#FF8563', '#716B99', '#20B5A3', '#FF6073', '#CEE271'];
const selectIcon = require('.././assets/tick.png');
var topGap;

export default class RegisterCourseListView extends Component {

    constructor(props) {
        super(props);
        topGap = this.props.topGap;
        this.state = {
            dataSource: this.props.dataSource,
            showHeader: this.props.showHeader,
            headerText: this.props.headerText,
            onPress: this.props.onpress,
        }

    }

    static defaultProps = {
        headerText: "",
        showHeader: false,
        dataSource: [],
    }


    renderRow = (rowData, rowID) => {
        return (
            <TouchableHighlight underlayColor='gainsboro' onPress={() => {
                this.state.onPress(rowData);
            }}>
                <View style={[styles.row]}>
                    <View style={[styles.block, {backgroundColor: color[rowID%5]}]}/>
                    <Text style={styles.header}>
                        {rowData.fullName}
                    </Text>
                </View>
        </TouchableHighlight>)
    };


    renderHeader = (headerText) => {
        return (
            <View >
                <Text style={styles.labelTextHeading}>
                    {headerText}
                </Text>
            </View>
        );
    }

    _renderPage(data, width, height) {
        return (
            <View>
                <Image source={data} resizeMode='cover'
                       style={{width: width, height: height, backgroundColor: 'transparent'}}/>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    style={styles.listviewcontainer}
                    dataSource={this.state.dataSource}
                    renderRow={(row, sectionID, rowID, highlightRow) => this.renderRow(row, rowID)}
                    renderHeader={this.state.showHeader ? () => this.renderHeader(this.state.headerText) : () => {
                    }}
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator}/>}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: ((width * 2) / 100),
        paddingBottom: ((width * 2) / 100),
        //marginLeft: ((width * .5) / 100),
        marginTop: ((height * 0) / 100),
    },
    header: {
        fontSize: ((width * 5) / 100),
        textAlign: 'left',
        fontWeight: 'bold',
        color: 'black',
        marginTop: ((height * 3) / 100),
        marginLeft: ((height * 2) / 100),
        marginRight: ((height * 2) / 100),
        marginBottom: ((height * 0.5) / 100),
    },
    row: {
        flexDirection: 'row',
        //height: ((height * 8) / 100),
    },
    block: {
        width: ((width * 3) / 100)
    },
    text: {
        fontSize: ((width * 3.5) / 100),
        textAlign: 'left',
        color: 'black',
        marginTop: ((height * 1) / 100)
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'black'
    },
    listviewcontainer: {
        height: ((height * 75) / 100),
    }
});
