import React from 'react';
import { AppNavigator } from './navigators/app-navigator'
import { NovelSourceListProvider } from './providers/novel-source-list-provider';

export default function App() {
    return (
        <NovelSourceListProvider>
            <AppNavigator />
        </NovelSourceListProvider>
    );
}