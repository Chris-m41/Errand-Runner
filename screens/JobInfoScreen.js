import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, TouchableWithoutFeedback, LayoutAnimation} from 'react-native';
import * as firebase from 'firebase';

export default class JobInfoScreen extends React.Component{
    render() {
        LayoutAnimation.easeInEaseOut();
        
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Display')}>
                    <Text>Go Back</Text>
                </TouchableOpacity>
                <Text>Job Info Screen</Text>
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