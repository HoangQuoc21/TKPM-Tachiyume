import Source from '../models/sources/source';
import RNFS from 'react-native-fs';

const wait = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
};
const API_URL = 'http://192.168.1.112:8000'

export class SourcePlugin {

    static async getSource(SourceImportURL: string): Promise<Source | null> {
        try {
            const fileContent = await RNFS.readFile(SourceImportURL, 'utf8');
            // call api to write module in hoc.ts
            const responseSendModule = await fetch(`${API_URL}/send-module`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ moduleCode: fileContent }),
            });

            const apiResponseSendModule = await responseSendModule.json();
            console.log(apiResponseSendModule.message)
            wait(4000);
            // import module written in hoc.ts
            const SourceModule = await import('../models/sources/importedModule');
            const importedSource = new SourceModule.default();
            return importedSource;
        } catch (error) {
            console.error(`Error importing source from ${SourceImportURL}:`, error);
            return null;
        }
    }

    static async createSource(idSource: number): Promise<Source | null> {
        // call api to write instance in importedInstance.ts
        const responseGetDataModule = await fetch(`${API_URL}/get-data-module`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: idSource }),
        });
        const responseData = await responseGetDataModule.json()
        console.log(responseData.message)
        wait(2000)
        const SourceModule = await import('../models/sources/importedInstance');
        const importSource = new SourceModule.default();
        return importSource;
    }
}
