import React from 'react';

import { NavigationContainer } from '@react-navigation/native'
import { MyStack } from './src/navigation/StackNavigator'

import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import mainReducer from './src/redux/reducers/mainReducer';


const myStore = createStore(mainReducer, applyMiddleware(thunk))

const App = () => {

  return (
    <Provider store={myStore}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </Provider>
  )
};

export default App;
