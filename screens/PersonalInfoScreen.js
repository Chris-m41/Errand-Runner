import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image, StatusBar, Alert} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import * as firebase from 'firebase';
import database from '@react-native-firebase/database';



export default class PersonalInfoScreen extends React.Component{
    static navigationOptions = {
        headerShown: false
    };

    state ={
        address: "",
        zipCode: "",
        State: "",
        phoneNumber: "",
        city: "",
        errorMessage: null
    }

    createUserInfo(){
        var user = firebase.auth().currentUser;

        var updates = {};
        updates["/Users/" + user.uid] = {
            address: this.state.address,
            zipCode: this.state.zipCode,
            State: this.state.State,
            phoneNumber: this.state.phoneNumber,
            city: this.state.city
        };
        console.log("user id (update page): " + user.id)
        return firebase.database().ref().update(updates);
    }

    onButtonPress = () => {
        this.createUserInfo();
        Alert.alert('Info Saved');
        this.props.navigation.navigate('Profile');
    }

    //testing write/set user data to google firebase
    // Get a reference to the database service
    render(){
        return (
            <View style={styles.container}>
                <StatusBar barStyle='light-content'></StatusBar>
                
                
                {/* Image goes here just like in the login in screen */}


                <Text style={styles.greeting}>{`Hello!\n Sign up to get started.`}</Text>
                {/* <TouchableOpacity style={styles.avatar}>
                    <Ionicons
                        name='ios-add'
                        size={40}
                        color='#FFF'
                        style={{marginTop:6, marginLeft:2}}
                    ></Ionicons>
                </TouchableOpacity> */}

                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Street Address</Text>
                        <TextInput 
                        style={styles.input} 
                        autoCapitalize='none'
                        onChangeText={address => this.setState({address})}
                        value={this.state.address}
                        ></TextInput>
                    </View>

                    <View>
                        <Text style={styles.inputTitle}>city</Text>
                        <TextInput 
                        style={styles.input} 
                        autoCapitalize='none'
                        onChangeText={city => this.setState({city})}
                        value={this.state.city}
                        ></TextInput>
                    </View>


                    <View style={{marginTop: 32}}>
                        <Text style={styles.inputTitle}>State</Text>
                        <TextInput 
                        style={styles.input} 
                        autoCapitalize='none'
                        onChangeText={State => this.setState({State})}
                        value={this.state.State}
                        ></TextInput>
                    </View>

                    <View style={{marginTop: 32}}>
                        <Text style={styles.inputTitle}>zipCode</Text>
                        <TextInput 
                        style={styles.input} 
                        autoCapitalize='none'
                        onChangeText={zipCode => this.setState({zipCode})}
                        value={this.state.zipCode}
                        maxLength={5}
                        keyboardType={'numeric'}
                        ></TextInput>
                    </View>


                    <View style={{marginTop: 32}}>
                        <Text style={styles.inputTitle}>Phone Number</Text>
                        <TextInput 
                        style={styles.input} 
                        autoCapitalize='none'
                        onChangeText={phoneNumber => this.setState({phoneNumber})}
                        value={this.state.phoneNumber}
                        maxLength={10}
                        keyboardType={'numeric'}
                        ></TextInput>
                    </View>
                    
                    </View>
                {/* </View> */}

                <TouchableOpacity style={styles.button} onPress={this.onButtonPress}>
                    <Text style={{color: '#FFF', fontWeight: '500'}}>Sign up</Text>
                </TouchableOpacity>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    greeting: {
        marginTop: 50,
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center',
        // color: '#FFF'
    },
    errorMessage: {
        height: 72,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30
    },
    error: {
        color: '#E9446A',
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'center'
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30
    },
    inputTitle: {
        color: '#8A8F9E',
        fontSize: 10,
        textTransform: 'uppercase'
    },
    input: {
        borderBottomColor: '#8A8F9E',
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: '#161F3D'
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: '#E9446A',
        borderRadius: 4,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#E1E2E6',
        marginTop: 48,
        justifyContent: 'center',
        alignItems: 'center'
    }
})