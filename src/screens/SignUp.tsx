//pantalla para crear usuario
//Datos requeridos! Email - Password - Age - Name - LastName

import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import { StackScreenProps } from '@react-navigation/stack'

import AsyncStorage from '@react-native-async-storage/async-storage'

//variable para guardar los usuarios!
//se declara aqui para evitar que solo se creen un solo usuario


interface Props extends StackScreenProps<any, any> { }

interface User {
  email: string,
  password: string,
  age: string,
  name: string,
  lastname: string,
  task: string[]
}

const SignUp = ({ navigation }: Props) => {

  let users: User[] = []

  const [user, setUser] = React.useState<User>({
    email: '',
    password: '',
    age: '',
    name: '',
    lastname: '',
    task: []
  })

  const createUser = async (user: User) => {

    users.push(user)
    setUser({
      email: '',
      password: '',
      age: '',
      name: '',
      lastname: '',
      task: []
    })

    //guardando datos
    try {
      const JsonValue = JSON.stringify(users)
      await AsyncStorage.setItem('users', JsonValue)
    } catch (error) {
      console.log('error', error)
    }

  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Do Something!</Text>
      <Text style={styles.text}>SignUp!</Text>
      <View>
        <TextInput style={styles.input}
          placeholder="Email"
          autoComplete="off"
          onChangeText={(email: string) => setUser({ ...user, email })}
          value={user.email}
        />

        <TextInput style={styles.input}
          placeholder="Password"
          autoComplete="off"
          secureTextEntry
          onChangeText={(password: string) => setUser({ ...user, password })}
          value={user.password}
        />

        <TextInput style={styles.input}
          placeholder="Age"
          autoComplete="off"
          keyboardType="numeric"
          onChangeText={(age: string) => setUser({ ...user, age })}
          value={user.age}
        />

        <TextInput style={styles.input}
          placeholder="Name"
          autoComplete="off"
          onChangeText={(name: string) => setUser({ ...user, name })}
          value={user.name}
        />

        <TextInput style={styles.input}
          placeholder="Lastname"
          autoComplete="off"
          onChangeText={(lastname: string) => setUser({ ...user, lastname })}
          value={user.lastname}
        />
      </View>

      <TouchableOpacity style={styles.registerButton} onPress={() => createUser(user)}>
        <Text style={styles.buttonText}>Register!</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Do you have an account? Just
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Login</Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B0E298'
  },
  input: {
    borderWidth: 2,
    borderColor: '#F9F9F9',
    borderTopRightRadius: 35,
    borderBottomLeftRadius: 35,
    width: 280,
    height: 45,
    color: 'black',
    marginBottom: 28,
    textAlign: 'center',
  },
  inputContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black'
  },
  text: {
    fontSize: 25,
    marginBottom: 25
  },
  registerButton: {
    borderWidth: 1,
    borderColor: '#6883BA',
    width: 170,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    backgroundColor: '#6883BA'
  },
  buttonText: {
    color: 'white'
  },
  linkText: {
    color: 'blue',
    fontSize: 16
  },
  footerText: {
    marginTop: 15,
    color: 'black'
  }
})

export default SignUp