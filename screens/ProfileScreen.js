import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, Button} from 'react-native';
import * as firebase from 'firebase';
import HomeScreen from './UpdateScreen';
import database from '@react-native-firebase/database';



export default class ProfileScreen extends React.Component{
    state = {
        email: "",
        displayName: "",
        zipCode: ""
    };

    componentDidMount() {
        const {email,displayName, zipCode} = firebase.auth().currentUser;

        this.setState({email,displayName,zipCode});
    };


    //testing read data
    // Get a reference to the database service
    //  database = firebase.database();
    

    signOutUser = () => {
        firebase.auth().signOut();
    };

    render(){
        LayoutAnimation.easeInEaseOut();

        return (
            <View style={styles.container}>
                <Text>Hi {this.state.displayName}!</Text>
                <Text>ZipCode: {this.retrieveZip}!</Text>

                <TouchableOpacity style={styles.logout} onPress={this.signOutUser}>
                    <Text>Logout</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.logout} onPress={() => this.props.navigation.navigate('Update')}>
                    <Text>Update Info</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.logout} onPress={() => this.props.navigation.navigate('Info')}>
                    <Text>Add/Change Information</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logout: {
        marginTop: 32,
        backgroundColor: 'pink'
    }
})