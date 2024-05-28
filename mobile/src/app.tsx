import React from 'react';
import { AppNavigator } from './navigators/app-navigator'
import { NovelSourceListProvider } from './providers/novel-source-list-provider';
import { ToastProvider } from 'react-native-toast-notifications'
import { View, Text } from 'react-native';

export default function App() {
    return (
        <ToastProvider>
            <NovelSourceListProvider>
                <AppNavigator />
            </NovelSourceListProvider>
        </ToastProvider>
    );
}