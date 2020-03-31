import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class JobsScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Jobs Screen</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})