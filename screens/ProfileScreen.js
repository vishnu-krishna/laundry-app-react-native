import { Pressable, SafeAreaView, StyleSheet, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useLogout } from '../hooks/useAuth';
import { useAuthContext } from '../hooks/useAuthContext';

const ProfileScreen = () => {
    const navigation = useNavigation();
    const { logOut } = useLogout();
    const { user } = useAuthContext();

    useEffect(() => {
        if (!user) {
            navigation.replace('Login');
        }
    }, [ user ]);

    return (
        <>
            {
                user && (
                    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Pressable style={{ marginVertical: 10 }}>
                            <Text>welcome {user.email}</Text>
                        </Pressable>

                        <Pressable onPress={() => logOut()}>
                            <Text>Sign Out</Text>
                        </Pressable>
                    </SafeAreaView>)
            }

        </>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({});