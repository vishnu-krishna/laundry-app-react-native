import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import store from './store/store';
import StackNavigator from './Navigator/StackNavigator';
import { AuthContextProvider } from './context/AuthContext';

export default function App() {
    return (
        <Provider store={store}>
            <AuthContextProvider>
                <StackNavigator/>
                <StatusBar style='auto'/>
            </AuthContextProvider>

        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
});
