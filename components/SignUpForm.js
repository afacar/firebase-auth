import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';

const ROOOT_URL = 'https://us-central1-one-time-password-6ce9c.cloudfunctions.net/';

class SignUpForm extends Component {
    // instead of writing const state decleration in constructor
    // we can simply initialize under class 
    // some fancy shortcut comes with ES7
    state= { phone: '' };


    // Another syntatic sugar from ES7
    // instead of binding context this.handleSubmit.bind(this)
    // we write air function as follows 
/*     handleSubmit = () => {
        axios.post(`${ROOOT_URL}/createUser`, {
            phone: this.state.phone
        })
          .then(() => {
            axios.post(`${ROOOT_URL}/requestOneTimePassword`, { phone: this.state.phone})
          })

    } */

    // And another syntactic sugar from ES7
    // Following function is refactored with Sync Await 
    handleSubmit = async () => {
        try {
            await axios.post(`${ROOOT_URL}/createUser`, { phone: this.state.phone });
            await axios.post(`${ROOOT_URL}/requestOneTimePassword`, { phone: this.state.phone });
        } catch (err) {
            console.log(err);
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
                <Button onPress={this.handleSubmit} title="Submit" />
            </View>
        );
    }
}

export default SignUpForm;