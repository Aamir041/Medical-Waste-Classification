import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { firebase } from './config'
import React from 'react'

const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");

    loginUser = async (email, pwd) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, pwd);
            console.log("User Connected");
        }
        catch (error) {
            alert(error.message);
        } 
    }
    
    return (
        <View
            style={styles.container}
        >

            <View style={{ marginTop: 40, alignItems:"center" }}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    onChangeText={mail => setEmail(mail)}
                    value={email}
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    onChangeText={pass => setPwd(pass)}
                    value={pwd}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                />
                <TouchableOpacity
                    onPress={() => loginUser(email, pwd)}
                    style={styles.button}
                >
                    <Text
                    style={{
                        fontSize:26,
                        textAlign:"center",
                        alignItems:"center",
                        justifyContent:"center"
                    }}
                    >
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        marginTop:100,
    },
    loginText: {
        fontWeight: "bold",
        fontSize: 22
    },
    textInput:{
        paddingTop:20,
        paddingBottom:10,
        width:400,
        fontSize:20,
        borderBottomWidth:1,
        borderBottomColor:'#000',
        marginBottom:10,
        textAlign:'center'
    },
    button:{
        marginTop: 50,
        height: 70,
        width:250,
        backgroundColor:"#026efd",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:50
    }
})


export default Login