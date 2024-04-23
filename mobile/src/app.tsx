import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useEffect } from 'react';
import SourceOne from './factory/SourceOne';
import SourceInterface from './factory/SourceInterface';

export default function App() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const sourceOne: SourceInterface = new SourceOne();
    // sourceOne.findNovelsByPage(1);

    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             const data = await sourceOne.findNovelsByPage(1)
    //             console.log(data)
    //             setData(data);
    //             setLoading(false);
    //         } catch (error) {
    //             setError(error);
    //             setLoading(false);
    //         }
    //     }

    //     fetchData();

    // }, []);

    return (
        <View style={styles.container}>
            <Text>Đây là nội dung trong file src/app.tsx</Text>
            <StatusBar style='auto' />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});