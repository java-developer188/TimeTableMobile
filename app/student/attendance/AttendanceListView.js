import React, {Component} from 'react'
import {
    View,
    ListView,
    Text,
    StyleSheet,
    Alert,
    TouchableHighlight,
    Dimensions
} from 'react-native'
const {width, height} = Dimensions.get("window");
var color = ['#FF8563', '#716B99', '#20B5A3', '#FF6073', '#CEE271'];
// Showing the customer accounts data row
var topGap;

export default class AttendanceListView extends Component {

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

    buttonsHandler(type) {
        this.state.onPress(type);
    }


    renderRow = (rowData, rowID) => (
        <View style={styles.row}>
            <View style={styles.blockOne}>
                <View style={ styles.presentButton}>
                    <View style={ styles.middleContainerViewButtonsBtn}>
                        {this.getPresentButton(rowData.mark,rowData.id)}
                    </View>
                </View>
            </View>

            <View style={styles.blockTwo}>
                <Text style={styles.boldText}>
                    Classes Attended
                </Text>
                <Text style={styles.text}>
                    {rowData.attended}
                </Text>
                <Text style={styles.textBottom}>
                    {rowData.percentage}
                </Text>
            </View>

            <View style={styles.blockThree}>
                <Text style={styles.boldText}>
                    {rowData.course}
                </Text>
            </View>


        </View>
    )
    ;

    getPresentButton(mark,id) {
        if (mark === "true" ) {
            return (
                <TouchableHighlight
                    onPress={ () => {this.buttonsHandler(id)}}>
                    <Text style={ styles.btnTextLabels}>Present</Text>
                </TouchableHighlight>);
        }
        else {
            return (
                <View style={styles.btnDisable}
                    >
                    <Text style={ styles.btnTextLabels}>Present</Text>
                </View>);
        }
    }


    renderHeader = (headerText) => {
        return (
            <View >
                <Text style={styles.labelTextHeading}>
                    {headerText}
                </Text>
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
        marginLeft: ((width * 0) / 100),
        marginTop: ((height * 9) / 100),
    },
    row: {
        flexDirection: 'row',
    },
    blockOne: {
        flex: 2,
        alignItems: 'center',
    },
    blockTwo: {
        flex: 2,
        alignItems: 'center',
        marginLeft: ((height * 2) / 100)
    },
    blockThree: {
        flex: 4,
        alignItems: 'center',
    },
    presentButton: {
        marginTop: ((height * 4) / 100),
        borderRadius: 4,
        width: ((width * 20) / 100),
    },
    btnTextLabels: {
        color: '#FFFFFF',
        height: 35,
        textAlign: 'center',
        backgroundColor: '#4E5166',
        paddingTop: 9
    },
    boldText: {
        fontSize: ((width * 3.5) / 100),
        textAlign: 'left',
        color: 'black',
        fontWeight: 'bold',
        marginTop: ((height * 4) / 100),
    },
    text: {
        fontSize: ((width * 3.5) / 100),
        textAlign: 'left',
        color: 'black',
        marginTop: ((height * 1) / 100),
    },
    textBottom: {
        marginBottom: ((height * 2) / 100),
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'black'
    },
    listviewcontainer: {
        height: ((height * 85) / 100),
    },
    balanceText: {
        fontSize: ((width * 4) / 100),
        fontWeight: 'bold',
        textAlign: 'left',
        paddingLeft: ((width * 5) / 100),
        color: 'black'
    },
    labelTextHeading: {
        marginTop: ((height * 2) / 100),
        color: '#FFFFFF',
        backgroundColor: '#00826B',
        fontFamily: 'Arial-BoldMT',
        fontSize: ((height * 1.8) / 100),
    },
    btnDisable:{
        backgroundColor:'#000000',
        opacity:0.4
    },

});
