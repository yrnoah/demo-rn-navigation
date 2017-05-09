import React from 'react';
import {
  AppRegistry,
  Text,
  View,
  Button,
} from 'react-native';
import { StackNavigator, TabNavigator, NavigationActions } from 'react-navigation';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  replacePreviousAndPop(routeName, params) {
    const { dispatch } = this.props.navigation;
    dispatch(
      NavigationActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({routeName: 'Home'}),
          NavigationActions.navigate({routeName, params})
        ]
      })
    )
  }
  PopToTop() {
    const { dispatch } = this.props.navigation;
    dispatch(
      NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({routeName: 'Home'}),
        ]
      })
    )
  }
  render() {
    const { navigate, dispatch } = this.props.navigation;
    return (
      <View>
        <Text>Hello, Chat App!</Text>
        <Button
          onPress={() => this.replacePreviousAndPop('Chat', { user: 'YYY' })}
          title="REPLACE PREVIOUS AND POP"/>
        <Button
          onPress={() => this.PopToTop()}
          title="POP TO TOP"/>
      </View>
    );
  }
}

class ChatScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const {state, setParams, navigate} = navigation;
    const isInfo = state.params.mode === 'info';
    const {user} = state.params;
    return {
      title: isInfo ? `${user}'s Contact Info` : `Chat with ${state.params.user}`,
      headerRight: <Button title={isInfo ? 'Done' : `${user}'s info`}
        onPress={() => {
          setParams({ mode: isInfo ? 'none' : 'info'});
          navigate('Welcome');
        }}/>,
    }
  };
  render() {
    const { params } = this.props.navigation.state;
    return (
      <View>
        <Text>Chat with {params.user}</Text>
      </View>
    );
  }
}

class RecentChatsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Recent Chats',
    headerBackTitle: 'back',
  });
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>List of recent chats</Text>
        <Button
          onPress={() => navigate('Chat', { user: 'Lucy' })}
          title="Chat with Lucy"
        />
      </View>
    )
  }
}

class AllContactsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'All Chats',
    headerBackTitle: 'back',
  });
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>List of all contacts</Text>
        <Button
          onPress={() => navigate('Chat', { user: 'All' })}
          title="Chat with All"
        />
      </View>
    )
  }
}

const MainScreenNavigator = TabNavigator({
  Recent: { screen: RecentChatsScreen },
  All: { screen: AllContactsScreen },
  Recent2: { screen: RecentChatsScreen },
  All2: { screen: AllContactsScreen },
}, {
  initialRouteName: 'All',
  // headerMode: 'none',
});

const SimpleApp = StackNavigator({
  Home: { screen: MainScreenNavigator },
  Chat: { screen: ChatScreen },
  Welcome: { screen: HomeScreen },
}, {
  initialRouteName: 'Welcome',
  // mode: 'modal',
});

AppRegistry.registerComponent('SimpleApp', () => SimpleApp);
