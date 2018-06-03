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
var color = ['#FF8563','#716B99','#20B5A3','#FF6073','#CEE271'];
var topGap;

export default class RemoveSelectedCoursesListView extends Component {

    constructor(props) {
        super(props);
        topGap = this.props.topGap;
        this.state = {
            dataSource: this.props.dataSource,
            showHeader: this.props.showHeader,
            headerText: this.props.headerText,
        }
    }

    static defaultProps = {
        headerText: "",
        showHeader: false,
        dataSource: [],
    }


    renderRow =  (rowData,rowID) => (
            <View style={styles.row}>
                <View style={[styles.blockOne, {backgroundColor: color[rowID%5]}]}>
                    <Text style={styles.boldText}>
                        {rowData.courseCode}
                    </Text>
                </View>

                <View style={styles.blockTwo}>
                    <Text style={styles.balanceText}>
                        {rowData.fullname}
                    </Text>
                    <Text style={styles.text}>
                        {rowData.teacher}
                    </Text>
                </View>

                <View style={styles.blockThree}>
                    <Text style={styles.text}>
                        Section:
                    </Text>
                    <Text style={styles.sectionText} >
                        {rowData.section}
                    </Text>
                </View>
            </View>
    );


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
                    renderRow={(row,sectionID, rowID, highlightRow) => this.renderRow(row,rowID)}
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
        marginTop: ((height * 8) / 100),
    },
    header: {
        fontSize: ((width * 5) / 100),
        textAlign: 'left',
        fontWeight: 'bold',
        color: 'black',
        marginTop: ((height * 3) / 100),
        marginLeft: ((height * 2) / 100)
    },
    row:{
        flexDirection:'row',
       // height: ((height * 10) / 100),
    },
    blockOne:{
        flex:2,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: 'red',
    },
    blockTwo:{
        flex:4,
        marginTop: ((height * 3) / 100),
        marginLeft: ((height * 1.5) / 100)
    },
    blockThree:{
        width:undefined,
        flex:3,
        justifyContent:'center',
        alignItems:'center',
    },
    boldText: {
        fontSize: ((width * 4.5) / 100),
        textAlign: 'left',
        color: 'black',
        fontWeight:'bold',
        marginTop: ((height * 3) / 100),
    },
    text: {
        fontSize: ((width * 3.5) / 100),
        textAlign: 'left',
        color: 'black',
        marginTop: ((height * 1) / 100),
        paddingLeft: ((width * 5) / 100),
    },
    sectionText: {
        marginTop: ((height * 1) / 100),
        marginBottom: ((height * 1) / 100),
        marginLeft: ((height * 0.5) / 100),
        marginRight: ((height * 0.5) / 100),
        fontWeight:'bold',
        color: 'black',
        fontSize: ((width * 4.5) / 100),
        justifyContent:'center',
        alignItems:'center',
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

});
