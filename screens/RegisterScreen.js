import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image, StatusBar, ScrollView} from 'react-native';
import * as firebase from 'firebase';

export default class RegisterScreen extends React.Component{
    static navigationOptions = {
        headerShown: false
    };

    state ={
        name: "",
        email: "",
        password: "",
        errorMessage: null
    }

    handleSignUp = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(userCredentials => {
                return userCredentials.user.updateProfile({
                    displayName: this.state.name
                })
            })
            .catch(error => this.setState({errorMessage: error.message}));
        
    };


    //testing write/set user data to google firebase
    // Get a reference to the database service
    render(){
        return (
            <ScrollView style={styles.container}>
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
                        <Text style={styles.inputTitle}>Full Name</Text>
                        <TextInput 
                        style={styles.input} 
                        autoCapitalize='none'
                        onChangeText={name => this.setState({name})}
                        value={this.state.name}
                        ></TextInput>
                    </View>

                    
                


                    <View style={{marginTop: 32}}>
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

                <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
                    <Text style={{color: '#FFF', fontWeight: '500', fontSize: 22}}>Sign Up</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={{alignSelf: 'center', marginTop: 32}}
                    onPress={() => this.props.navigation.navigate("Login")}
                    >
                    <Text style={{color: '#414959', fontSize: 18}}>
                        Already have an account? <Text style={{fontWeight: '500', color: '#2971ff'}}>Login</Text>
                    </Text>
                </TouchableOpacity>

            </ScrollView>
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
        backgroundColor: '#2971ff',
        borderRadius: 4,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
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