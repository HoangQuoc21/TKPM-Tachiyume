import Source from '../models/sources/source';
import RNFS from 'react-native-fs';

const wait = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
};
const API_URL = 'http://192.168.1.112:8000'

let importedSources: Source[] = [];
let dataImportedSources: Map<number, string> = new Map<number, string>();
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

            const data = await responseSendModule.json();
            console.log(data)
            await wait(4000);
            // import module written in hoc.ts
            const SourceModule = await import('../models/sources/hoc');
            console.log('Get Source', SourceModule)

            const importedSource = new SourceModule.default();
            importedSources.push(importedSource)

            // call api to add module in source-config.json
            const responseSendPropertise = await fetch(`${API_URL}/send-properties`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tittleName: importedSource.sourceTitle, id: importedSource.id, moduleCode: fileContent }),
            });

            const data2 = await responseSendPropertise.json()

            return importedSource;
        } catch (error) {
            console.error(`Error importing source from ${SourceImportURL}:`, error);
            return null;
        }
    }

    static async createSource(idSource: number): Promise<Source | null> {
        const response = await fetch(`${API_URL}/get-data-module`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: idSource }),
        });
        const responseData = await response.json()
        console.log(responseData)
        wait(2000)
        const SourceModule = await import('../models/sources/importedInstance');
        const importSource = new SourceModule.default();
        return importSource;
    }
}
