import React from 'react';
import { AppNavigator } from './navigators/app-navigator'
import { NovelSourceListProvider } from './providers/novel-source-list-provider';
import { FavoriteNovelListProvider } from './providers/favorite-novel-list-provider';
import { HistoryChapterListProvider } from './providers/history-chapter-list-provider';
import { ToastProvider } from 'react-native-toast-notifications'

export default function App() {
    return (
        <ToastProvider>
            <HistoryChapterListProvider>
                <FavoriteNovelListProvider>
                    <NovelSourceListProvider>
                        <AppNavigator />
                    </NovelSourceListProvider>
                </FavoriteNovelListProvider>
            </HistoryChapterListProvider>
        </ToastProvider>
    );
}