import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Services = () => {

    const services = [
        {
            id: '0',
            image: 'https://cdn-icons-png.flaticon.com/128/3003/3003984.png',
            name: 'Washing',

        },
        {
            id: '11',
            image: 'https://cdn-icons-png.flaticon.com/128/2975/2975175.png',
            name: 'Laundry',
        },
        {
            id: '12',
            image: 'https://cdn-icons-png.flaticon.com/128/9753/9753675.png',
            name: 'Wash & Iron',

        },
        {
            id: '13',
            image: 'https://cdn-icons-png.flaticon.com/128/995/995016.png',
            name: 'Cleaning',
        },

    ];
    return (
        <>
            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 7 }}>Services Available</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {services.map((service, index) => (
                        <Pressable style={{
                            margin: 10,
                            backgroundColor: 'white',
                            padding: 20,
                            borderRadius: 7,
                        }} key={index}>
                            <View>
                                <Image source={{ uri: service.image }} style={{ width: 70, height: 70 }}/>
                                <Text style={{ textAlign: 'center', marginTop: 10 }}>{service.name}</Text>
                            </View>

                        </Pressable>
                    ))}
                </ScrollView>
            </View>

            {/*<View style={[ styles.itemContainer ]}>*/}
            {/*<View style={styles.CircleShapeView}>*/}
            {/*    <Image style={styles.iconItem} source={{*/}
            {/*        uri: 'https://cdn-icons-png.flaticon.com/128/9753/9753675.png',*/}
            {/*    }}/>*/}
            {/*</View>*/}
            {/*</View>*/}
        </>

    );
};

export default Services;

const styles = StyleSheet.create({
    // CircleShapeView: {
    //     width: 150,
    //     height: 150,
    //     borderRadius: 150,
    //     backgroundColor: '#00BCD4',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    // itemContainer: {
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     // height: 130,
    // },
    // iconItem: {
    //     width: 70, height: 70,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
});