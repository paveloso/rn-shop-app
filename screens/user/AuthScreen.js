import React from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Button } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient'; // start={[-1, -1]} end={[1, 1]} - diagonal gradient

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';

import Colors from '../../constants/Colors';

const AuthScreen = props => {
    return (
        <KeyboardAvoidingView behavior='height' keyboardVerticalOffset={30} style={styles.screen}>
            <LinearGradient colors={['#abc2d4', '#c5e3fa']} start={[-1, -1]} end={[1, 1]} style={styles.gradient}>
                <Card style={styles.authContainer}>
                    <ScrollView>
                        <Input
                            id="email"
                            label="Email"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorMessage="Please enter a valid email address"
                            onInputChange={() => {}}
                            initialValue=""
                            placeholder="your email"     
                        />
                        <Input
                            id="password"
                            label="Password"
                            keyboardType="default"
                            secureTextEntry
                            required
                            minLength={5}
                            autoCapitalize="none"
                            errorMessage="Please enter a valid password"
                            onInputChange={() => {}}
                            initialValue=""
                            placeholder="your password"     
                        />
                        <View style={styles.buttonContainer}>
                            <Button title="Login" color={Colors.primary} onPress={() => {}} />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button title="Switch to Sign up" color={Colors.secondary} onPress={() => {}} />
                        </View>
                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
};

AuthScreen.navigationOptions = {
    headerTitle: 'Authenticate'
};

const styles = StyleSheet.create({
    gradient: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    screen: {
        flex: 1,
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20
    },
    buttonContainer: {
        marginTop: 10
    }
});

export default AuthScreen;