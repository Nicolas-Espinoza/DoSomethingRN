import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

import { StackScreenProps } from '@react-navigation/stack'
import { ScrollView } from "react-native-gesture-handler";

import { useSelector, useDispatch } from 'react-redux'
import { getTask } from '../redux/actions/taskActions'


interface Props extends StackScreenProps<any, any> { }

interface User {
  email: string,
  password: string,
  age: string,
  name: string,
  lastname: string,
  task: Activity[]
}


interface Activity {
  activity: string,
  participants: number,
  type: string,
  key: string
}

const ActivitiesScreen = ({ navigation, route }: Props) => {

  const user = route.params as User

  const data = useSelector((state: any) => state.taskReducer)

  // data.map((dato) => {
  //   console.log('soy dato', JSON.stringify(dato, null, 3))
  // })

  const dispatch = useDispatch()

  React.useEffect(() => {
    //dispatch(getTask(user))
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activities To Do</Text>
      <Text style={styles.subtitle}>for {user!.name}!</Text>
      <ScrollView contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {
          user.task.map((task) => {
            return (
              <View style={styles.card}>
                <Text style={styles.text}>{task.activity}</Text>
                <TouchableOpacity style={styles.cancel}>
                  <Text>X</Text>
                </TouchableOpacity>
              </View>
            )
          })
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#21203f'
  },
  text: {
    color: 'black',
    marginTop: 8
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#79ae92',
    width: 320,
    height: 80,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 100,
    padding: 10
  },
  scrollView: {
    width: '80%',
    backgroundColor: '#21203f',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 30,
    marginBottom: 15,
    marginTop: 15,
    color: 'white'
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 15,
    color: 'white'
  },
  cancel: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  }
})

export default ActivitiesScreen