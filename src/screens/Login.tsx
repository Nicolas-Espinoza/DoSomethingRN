import React from "react";
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Alert } from "react-native";
import { StackScreenProps } from '@react-navigation/stack'

import AsyncStorage from '@react-native-async-storage/async-storage'

interface Props extends StackScreenProps<any, any> { }

interface User {
  email: string,
  password: string
}

const Login = ({ navigation }: Props) => {

  const [user, setUser] = React.useState<User>({
    email: '',
    password: ''
  })

  const [allUsers, setAllUsers] = React.useState<User[]>([])

  React.useEffect(() => {
    const gettingUsers = async () => {
      //leyendo datos
      try {
        const JsonValue = await AsyncStorage.getItem('users')
        if (JsonValue == null) {
          Alert.alert('No users found!', 'No users found in this device, Please create one!', [
            {
              text: 'Ok',
              style: "cancel"
            }
          ])
        } else {
          setAllUsers(JSON.parse(JsonValue))
        }
      } catch (error) {
        console.log('error', error)
      }
    }
    gettingUsers()
  }, [allUsers])



  const LoginUser = async (user: User) => {
    console.log('all users', allUsers)
    const { email, password } = user
    //buscar al usuario por mail en nuestro array
    const loginUser = allUsers.find((user) => {
      if (user.password === password && user.email === email) {
        return user
      }
    })
    if (!loginUser) {
      Alert.alert('No users found!', 'Please verify your password or email!', [
        {
          text: 'Ok',
          style: "cancel"
        }
      ])
    } else {
      navigation.navigate('Home', loginUser)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Do Something!</Text>
      <View style={styles.inputContainer}>

        <TextInput style={styles.passwordInput}
          placeholder="Email"
          autoComplete="off"
          onChangeText={(email) => setUser({ ...user, email })}
        />

        <TextInput style={styles.passwordInput}
          placeholder="Password"
          autoComplete="off"
          secureTextEntry
          onChangeText={(password) => setUser({ ...user, password })}
        />

        <TouchableOpacity style={styles.loginButton} onPress={() => LoginUser(user)}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.generalText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.linkText}>Create One!</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#DDE8B9'
  },
  passwordInput: {
    borderWidth: 1,
    borderColor: '#796465',
    borderRadius: 50,
    width: 280,
    height: 45,
    color: 'black',
    marginBottom: 35,
    textAlign: 'center',
  },
  title: {
    color: 'black',
    fontSize: 45,
    paddingTop: 80
  },
  loginButton: {
    backgroundColor: '#CB8589',
    width: 180,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderColor: '#7D6F86',
    borderWidth: 1,
    marginBottom: 25
  },
  buttonText: {
    color: 'white',
    fontSize: 18
  },
  footerContainer: {
    alignItems: 'center'
  },
  linkText: {
    color: 'blue',
    fontSize: 16
  },
  generalText: {
    fontSize: 16
  },
  inputContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50
  }
});

export default Login;