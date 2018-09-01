import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';
import firebase from 'firebase';

const ROOOT_URL = 'https://us-central1-one-time-password-6ce9c.cloudfunctions.net/';

class SignInForm extends Component {
    // instead of writing const state decleration in constructor
    // we can simply initialize under class 
    // some fancy shortcut comes with ES7
    state= { phone: '', code: '' };

    handleSubmit = async () => {
        try {
            let { data } = await axios.post(`${ROOOT_URL}/verifyOneTimePassword`, {
            phone: this.state.phone, code: this.state.code
            });
            firebase.auth().signInWithCustomToken(data.token);
        } catch (err) {
            console.log('SignInForm Error-> ', err);
        }
    }

    render () {
        return (
            <View>
                <View style={{ marginBottom: 10 }}>
                    <FormLabel>Enter Phone Number</FormLabel>
                    <FormInput 
                        value={this.state.phone}
                        onChangeText={phone => this.setState({ phone })}
                    />
                </View>
                <View style={{ marginBottom: 10 }}>
                    <FormLabel>Enter Code</FormLabel>
                    <FormInput 
                        value={this.state.code}
                        onChangeText={code => this.setState({ code })}
                    />
                </View>
                <Button onPress={this.handleSubmit} title="Submit" />
            </View>
        );
    }
}

export default SignInForm;