import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, Button} from 'react-native';
import * as firebase from 'firebase';
import HomeScreen from './UpdateScreen';

export default class ProfileScreen extends React.Component{
    state = {
        email: "",
        displayName: "",
        body: ""
    };

    componentDidMount() {
        const {email,displayName} = firebase.auth().currentUser;

        this.setState({email,displayName});
    };

    signOutUser = () => {
        firebase.auth().signOut();
    };

    render(){
        LayoutAnimation.easeInEaseOut();

        return (
            <View style={styles.container}>
                <Text>Hi {this.state.displayName}!</Text>
                <Text>zipCode {this.state.body}!</Text>
                <TouchableOpacity style={styles.logout} onPress={this.signOutUser}>
                    <Text>Logout</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.logout} onPress={() => this.props.navigation.navigate('Update')}>
                    <Text>Update Info</Text>
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
    }
})