import { Alert, Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import * as location from 'expo-location';
import { PermissionStatus } from 'expo-location';
import { useEffect, useState } from 'react';
import { Feather, Ionicons } from '@expo/vector-icons';
import Carousel from '../components/Carousel';
import Services from '../components/Services';
import DressItem from '../components/DressItem';
import { useCollection } from '../hooks/useCollection';
import { getProducts } from '../store/ProductReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const [ displayCurrentAddress, setDisplayCurrentAddress ] = useState('We are loading your location');
    const [ locationServicesEnabled, setLocationServicesEnabled ] = useState(false);
    const navigation = useNavigation();
    const cart = useSelector((state) => state.cart.cart);
    const total = cart.map((item) => item.quantity * item.price).reduce((curr, prev) => curr + prev, 0);
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product.product);
    const { documents: products } = useCollection('products');

    useEffect(() => {
        if (product.length > 0) return;
        if (products) {
            dispatch(getProducts(products));
        }
    }, [ products ]);


    useEffect(() => {
        checkIfLocationEnabled();
        getCurrentLocation();
    }, []);

    const checkIfLocationEnabled = async () => {
        let enabled = await location.hasServicesEnabledAsync();
        if (!enabled) {
            Alert.alert(
                //title
                'Location services not enabled',
                //body
                'enable location services to continue',
                [
                    { text: 'Yes', onPress: () => console.log('Yes Pressed') },
                    {
                        text: 'No',
                        onPress: () => console.log('No Pressed'),
                        style: 'cancel',
                    },
                ],
                { cancelable: false },
            );
        } else {
            setLocationServicesEnabled(enabled);
        }
    };

    const getCurrentLocation = async () => {
        let { status } = await location.requestForegroundPermissionsAsync();
        if (status !== PermissionStatus.GRANTED) {
            Alert.alert(
                //title
                'Permission denied',
                //body
                'Allow the app to use the location services',
                [
                    { text: 'Yes', onPress: () => console.log('Yes Pressed') },
                    {
                        text: 'No',
                        onPress: () => console.log('No Pressed'),
                        style: 'cancel',
                    },
                ],
                { cancelable: false },
            );
        }

        const { coords } = await location.getCurrentPositionAsync();
        if (coords) {
            const { latitude, longitude } = coords;
            let response = await location.reverseGeocodeAsync({ latitude, longitude });
            for (let item of response) {
                let address = `${item.name} ${item.city} ${item.postalCode}`;
                setDisplayCurrentAddress(address);
            }
        }
    };

    return (
        <>
            <ScrollView style={{ backgroundColor: '#F0F0F0', flex: 1, marginTop: 50 }}>
                {/*location and profile*/}
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                    <Ionicons name='location-sharp' size={30} color='#fd5c63'/>
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: '600' }}>Home</Text>
                        <Text>{displayCurrentAddress}</Text>
                    </View>
                    <Pressable onPress={() => navigation.navigate('Profile')} style={{
                        marginLeft: 'auto',
                        marginRight: 7,
                    }}>
                        <Image
                            style={{ width: 40, height: 40, borderRadius: 20 }}
                            source={{
                                uri: 'https://yt3.ggpht.com/nNDmTyDahJeMQuO4GwS0aj57co0YSNL5mh_XkE6KPwPxm8Dl6-0qeTKiipOsvSHijEXwKKbSyg=s88-c-k-c0x00ffffff-no-rj-mo',
                            }}
                        />
                    </Pressable>
                </View>
                {/* Search Bar */}
                <View
                    style={{
                        padding: 10,
                        margin: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderWidth: 0.8,
                        borderColor: '#C0C0C0',
                        borderRadius: 10,
                    }}
                >
                    <TextInput placeholder='Search for items or More'/>
                    <Feather name='search' size={24} color='#fd5c63'/>
                </View>

                {/* Image Carousel */}
                <Carousel/>

                {/* Services Component */}
                <Services/>

                {/* Render all the Products */}
                {product && product.map((item, index) => (
                    <DressItem item={item} key={index}/>
                ))}
            </ScrollView>
            {total !== 0 && (
                <Pressable
                    style={{
                        backgroundColor: '#088F8F',
                        padding: 10,
                        marginBottom: 40,
                        margin: 15,
                        borderRadius: 7,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <View>
                        <Text style={{
                            fontSize: 17,
                            fontWeight: '600',
                            color: 'white',
                        }}>{cart.length} items | $ {total}</Text>
                        <Text style={{
                            fontSize: 15,
                            fontWeight: '400',
                            color: 'white',
                            marginVertical: 6,
                        }}>extra charges might apply</Text>
                    </View>

                    <Pressable onPress={() => navigation.navigate('PickUp')}>
                        <Text style={{ fontSize: 17, fontWeight: '600', color: 'white' }}>Proceed to pickup</Text>
                    </Pressable>
                </Pressable>
            )}
        </>


    );
};

export default HomeScreen;

