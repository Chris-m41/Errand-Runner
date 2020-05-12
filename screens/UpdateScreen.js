import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, LayoutAnimation} from 'react-native';
import * as firebase from 'firebase';
import { TextInput } from 'react-native-gesture-handler';

export default class UpdateScreen extends React.Component{
    // update = {
    //     displayName: this.state.name
    // }
    //TODO: Fix user infoupdate info. 
    handleUpdate = () => {
        firebase.auth().currentUser.updateProfile(update)
    }

    state = {
        email: "",
        name: ""
    };

    componentDidMount() {
        const {email,displayName} = firebase.auth().currentUser;

        this.setState({email,displayName});
    };
    //  var user = firebase.auth().currentUser;
    render(){
        LayoutAnimation.easeInEaseOut();

        return (
            <View style={styles.container}>
                <Text>Update profile screen</Text>
                <View>
                    <Text style={styles.inputTitle}>Full Name</Text>
                    <Text style={styles.inputTitle}>{this.state.displayName}</Text>
                    <TextInput 
                    style={styles.input} 
                    autoCapitalize='none'
                    value={this.state.displayName}
                    ></TextInput>
                    </View>
                    <TouchableOpacity style={{marginTop: 32}} onPress={this.handleUpdate}>
                    <Text>Save Info</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginTop: 32}} onPress={() => this.props.navigation.navigate('Profile')}>
                    <Text>Back to Profile</Text>
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
    input: {
        borderBottomColor: '#8A8F9E',
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: '#161F3D'
    },
})