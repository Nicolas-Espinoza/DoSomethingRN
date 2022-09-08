import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { StackScreenProps } from '@react-navigation/stack'

interface Props extends StackScreenProps<any, any> { }

import Axios from 'axios'

interface Activity {
  activity: string,
  participants: number,
  type: string,
}

interface User {
  email: string,
  password: string,
  age: string,
  name: string,
  lastname: string,
  task: Activity[]
}

const Home = ({ route, navigation }: Props) => {

  const [randomActivity, setRandomActivity] = React.useState<Activity>({
    activity: '',
    participants: 0,
    type: '',
  })

  const fetchingActivity = async () => {
    const { data } = await Axios.get('http://www.boredapi.com/api/activity')
    console.log(data)
    setRandomActivity(data)
  }

  React.useEffect(() => {
    fetchingActivity()
  }, [])

  const user = route.params as User

  const addToList = (activity: Activity) => {
    console.log('user', route.params)
    user.task.push(activity)
    console.log('user arr', user)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome {user!.name}!</Text>
        <Text style={styles.subtitle}>Age: {user!.age}</Text>
      </View>
      <View style={styles.task}>
        <Text style={styles.boxTitle}>Title:</Text>
        <Text style={styles.text}>{randomActivity.activity}</Text>
        <Text style={styles.boxTitle}>Participants:</Text>
        <Text style={styles.text}>{randomActivity.participants}</Text>
        <Text style={styles.boxTitle}>Type:</Text>
        <Text style={styles.text}>{randomActivity.type}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={fetchingActivity}>
          <Text style={styles.buttonText}>Refresh</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => addToList(randomActivity)}>
          <Text style={styles.buttonText}>Add to List</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity style={styles.largeButton} onPress={() => navigation.navigate('ActivitiesToDo', user)}>
          <Text style={styles.buttonText}>Activities To Do!</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#412973'
  },
  text: {
    color: 'black'
  },
  task: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eb9064',
    width: '100%',
    height: '25%',
    marginBottom: 60,
    borderBottomLeftRadius: 100,
    borderTopRightRadius: 100,
    borderTopLeftRadius: 25,
    borderBottomRightRadius: 25
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 90
  },
  title: {
    fontSize: 40,
    color: '#f0f0f0'
  },
  subtitle: {
    fontSize: 25,
    color: '#f0f0f0'
  },
  boxTitle: {
    color: '#f0f0f0',
    fontSize: 16,
    textDecorationLine: 'underline',
    marginBottom: 4
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '10%',
    paddingHorizontal: 50
  },
  button: {
    width: 130,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: '#b1e1e9',
  },
  buttonText: {
    color: 'black'
  },
  largeButton: {
    width: 310,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: '#b1e1e9',
  }
})

export default Home