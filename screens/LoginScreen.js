import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image, StatusBar, LayoutAnimation} from 'react-native';
import * as firebase from 'firebase';

export default class LoginScreen extends React.Component{
    static navigationOptions = {
        headerShown: false //Use to be know as: header: null
    }

    state ={
        email: "",
        password: "",
        errorMessage: null
    }

    handleLogin =() => {
        const {email, password} = this.state;

        firebase
            .auth()
            .signInWithEmailAndPassword(email,password)
            .catch(error => this.setState({errorMessage: error.message}));
    }

    render(){
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"></StatusBar>
                {/* This code to be used to add image at the top of the login screen */}
                {/* <Image source={require("../assets/authHeader.png")}></Image>  */}
                <Text style={styles.greeting}>{`Hello again.\nWelcome Back.`}</Text>

                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Email Address</Text>
                        <TextInput 
                        style={styles.input} 
                        autoCapitalize='none'
                        onChangeText={email => this.setState({email})}
                        value={this.state.email}
                        ></TextInput>
                    </View>

                    <View style={{marginTop: 32}}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput 
                        style={styles.input} 
                        autoCapitalize='none'
                        secureTextEntry={true}
                        onChangeText={password => this.setState({password})}
                        value={this.state.password}
                        ></TextInput>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                    <Text style={{color: '#FFF', fontWeight: '500', fontSize: 22}}>Sign in</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{alignSelf: 'center', marginTop: 32}} onPress={() => this.props.navigation.navigate("Register")}>
                    <Text style={{color: '#414959', fontSize: 18}}>
                        New to Social App? <Text style={{fontWeight: '500', color: '#2971ff'}}>Sign up</Text>
                    </Text>
                </TouchableOpacity>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcfcfc'
    },
    greeting: {
        marginTop: 50,
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center'
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
        fontSize: 15,
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
        backgroundColor: '#2971FF',
        borderRadius: 4,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center'
    }
})