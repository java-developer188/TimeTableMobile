/**
 * Created by Haider on 10/26/2017.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ListView,
    Dimensions,
    Button
} from 'react-native';
const {width, height} = Dimensions.get("window");
var color = ['#FF8563','#716B99','#20B5A3','#FF6073','#CEE271'];

export default class Row extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSelected: this.props.isSelected
        }
    }

    render() {
        return (
            <TouchableOpacity onPress={() => {
                this.setState({isSelected: !this.state.isSelected})
                this.props.onPress(this.props.data,!this.state.isSelected)
            }}
                             >

                <View  style={[styles.row, this.state.isSelected ? {backgroundColor: 'gainsboro'} : {backgroundColor: 'transparent'}]}>
                    <View style={[styles.blockOne, {backgroundColor: color[this.props.rowID%5]}]}>
                        <Text style={styles.boldText}>
                            {this.props.data.courseCode}
                        </Text>
                    </View>

                    <View style={styles.blockTwo}>
                        <Text style={styles.balanceText}>
                            {this.props.data.teacher}
                        </Text>
                    </View>

                    <View style={styles.blockThree}>
                        <Text style={styles.text}>
                            Section:
                        </Text>
                        <Text style={styles.sectionText} >
                            {this.props.data.section}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({
    row:{
        flexDirection:'row',
        //height: ((height * 10) / 100),
        width :width
    },
    header: {
        fontSize: ((width * 5) / 100),
        textAlign: 'left',
        fontWeight: 'bold',
        color: 'black',
        marginTop: ((height * 3) / 100),
        marginLeft: ((height * 2) / 100)
    },
    container: {
        paddingTop: ((width * 2) / 100),
        marginLeft: ((width * 0) / 100),
        marginTop:((height *9) / 100),
    },
    rowInternal: {
        flexDirection:'row',
    },
    blockOne:{
        flex:2,
        alignItems:'center',
        backgroundColor: 'red',
    },
    blockTwo:{
        flex:4,
        marginTop: ((height * 3) / 100),
        marginLeft: ((height * 1.5) / 100)
    },
    blockThree:{
        flex:3,
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
    },
    sectionText: {
        marginTop: ((height * 0.01) / 100),
        marginBottom: ((height * 1) / 100),
        fontWeight:'bold',
        color: 'black',
        fontSize: ((width * 4.5) / 100),
    },
    balanceText: {
        fontSize: ((width * 5) / 100),
        fontWeight: 'bold',
        textAlign: 'left',
        paddingLeft: ((width * 5) / 100),
        color: 'black'
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'black'
    },
    listviewcontainer: {
        height: ((height * 100) / 100),
    },
    labelTextHeading: {
        marginTop: ((height * 2) / 100),
        color: '#FFFFFF',
        backgroundColor: '#00826B',
        fontFamily: 'Arial-BoldMT',
        fontSize: ((height * 1.8) / 100),
    }
});