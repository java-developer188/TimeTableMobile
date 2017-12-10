import React, {Component} from 'react';
import {
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    View,
    Dimensions,
    Platform,
    Easing,
    NativeModules,
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import {Screens} from './Screens';
import {WebServiceCallManager} from '../utilities/WebServiceCallManager';
import {SessionManager} from "../utilities/SessionManager";

const imgBackButton = require('.././assets/back.png');
const imgMenuButton = require('.././assets/menu.png');
const {width, height} = Dimensions.get('window');


/*
 NavigationManager manages the overall navigation of the app.
 Also the Navigation bar Left and Right buttons along with Title.
 */
export class NavigationManager extends Component {

    constructor(props) {
        super(props);
    }



    renderScene(route, navigator) {

        const SpecificScreenClass = route.className;

        return <SpecificScreenClass navigator={navigator}/>;

    }


    //logout Button
    logout = (<View style={styles.rightButton}>
        <TouchableOpacity onPress={() => {
            SessionManager.clearSession();
            this.nav.pop()
        }}>
            <Text style={styles.rightButtonTitle}>{'Logout'}</Text>
        </TouchableOpacity>
    </View>);

    // Cancel Text Button
    cancel = (
        <View style={styles.rightButton}>
            <TouchableOpacity onPress={() => {
                this.nav.resetTo(Screens.LoginScreen)
            }}>
                <Text style={styles.rightButtonTitle}>{'Cancel'}</Text>
            </TouchableOpacity>
        </View>
    );

    // Home Text Button
    homescreen = (
        <View style={styles.rightButton}>
            <TouchableOpacity onPress={() => {
                this.nav.popToRoute(Screens.HomeScreen)
            }}>
                <Text style={styles.rightButtonTitle}>{'Home'}</Text>
            </TouchableOpacity>
        </View>
    );

    // Home Text Button
    settings = (
        <View style={styles.rightButton}>
            <TouchableOpacity onPress={() => {
                this.nav.push(Screens.SettingsContainer)
            }}>
                <Text style={styles.rightButtonTitle}>{'Settings'}</Text>
            </TouchableOpacity>
        </View>
    );

    //Backbutton
    backbutton = (
        <View style={styles.rightButton}>
        <TouchableOpacity onPress={() => this.nav.pop()}>
            <View style={styles.backView}>
                <Image source={imgBackButton} style={styles.imgBackButton}/>
                <Text style={styles.backText}>{'Back'}</Text>
            </View>
        </TouchableOpacity>
        </View>
    );

    //menu Button
    menuButton = (
        <TouchableOpacity onPress={() => this._drawer.openDrawer()}>
            <View style={styles.menuView}>
                <Image source={imgMenuButton} style={styles.imgMenuButton}/>
            </View>
        </TouchableOpacity>
    );

    // Handle the route screen , also handle left button , right button and title header

    navigationBarRouteMapper = {
        LeftButton: (route, navigator, index, navState) => {


            if (route === Screens.LoginScreen || route === Screens.WelcomeScreen ) {
                return this.settings;
            }
            else {
                return this.backbutton;

            } // LeftButton else end
            return null;
        },
        RightButton: (route, navigator, index, navState) => {

            if (route === Screens.LoginScreen || route === Screens.SettingsContainer ||
                route === Screens.RegistrationScreen) {
                return null;
            }
            else if (route === Screens.WelcomeScreen) {
                return this.logout;
            }
            else {
                return this.homescreen;
            }
            // return null;
        },
        Title: (route, navigator, index, navState) => {

            if (route === Screens.LoginScreen) {
                return (
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{route.title}</Text>
                    </View>
                );
            }
            else {
                return (
                    //  <TouchableOpacity onPress = { () => this._drawer.openDrawer()}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{route.title}</Text>
                    </View>
                    //  </TouchableOpacity>
                );
            }
        },
    }

    render() {
        return (
            <Navigator
                ref={(ref) => {
                    this.nav = ref;
                }}
                initialRoute={Screens.LoginScreen}
                renderScene={this.renderScene}
                configureScene={(route, routeStack) => Navigator.SceneConfigs.FadeAndroid }
                navigationBar={
                    <Navigator.NavigationBar
                        routeMapper={this.navigationBarRouteMapper}
                        style={styles.navBar}
                    /> // end of navigation bar
                }
            />
        );
    } // end of render method
} // end of navigation class


const styles = StyleSheet.create({
    navBar: {
        backgroundColor: '#4E5166',
        height: 56,
        // height : (Math.floor(( (height+width) * 5.4)/100))
    },
    title: {
        fontSize: (width + height) * .018,
        fontFamily: 'Arial',
        color: '#FFFFFF',
        backgroundColor: 'transparent',
        marginBottom: 2,
        padding: (( (Platform.OS === 'ios') ? 8 : 0)),

    },
    rightButtonTitle: {
        fontSize: (width + height) * 0.012,
        fontFamily: 'Arial',
        color: '#FFFFFF',
        backgroundColor: 'transparent',
        marginBottom: 2,
    },
    titleContainer: (Platform.OS === 'ios') ? {} : {
        height: height * 0.096,
        width: width * 0.6112,
        marginBottom: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    rightButton: {
        height: 56,
        backgroundColor: 'transparent',
        marginRight: 10,
        marginLeft:5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    backView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.1806,
        //paddingTop: (( (Platform.OS === 'ios') ? 9 : 18)),
    },
    backText: {
        color: 'white',
        textAlign: 'center',
        fontSize: (width + height) * 0.012,
    },
    imgBackButton: {
        //marginLeft: 8,
        height: 18,
        width: 18,
    },
    drawerContent: {
        height: height,
        justifyContent: 'space-around',
        alignItems: 'center',
        // width : width,
        backgroundColor: '#6D777A'
    },
    leftBottom: {
        color: 'white'
    },
    drawer: {
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowRadius: 10
    }
    , imgMenuButton: {
        marginLeft: 0,
        height: 18,
        width: 18,
    },
    menuView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.0906,
        paddingTop: (( (Platform.OS === 'ios') ? 9 : 18)),
    },
});
