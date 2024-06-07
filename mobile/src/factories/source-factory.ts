// This is the source code of source factory:

// Import the models
import Source from "../models/sources/source";
import SourceOne from "../models/sources/source-one";
import SourceTwo from "../models/sources/source-two";
import SourceThree from '../models/sources/source-three'
import RNFS from 'react-native-fs';
// import path from 'path';

export const sourceImportURLs = [
    {label: SourceOne.title, value: SourceOne.importURL},
    {label: SourceTwo.title, value: SourceTwo.importURL},
    {label: SourceThree.title, value: SourceThree.importURL},
]

const configPath = './source-config.json'

// Source factory class
export class SourceFactory {
    static async ImportSource(SourceImportURL: string): Promise<Source> {
        const configPath = RNFS.DownloadDirectoryPath + '/source-config.json'
        const configContent: string = await RNFS.readFile(configPath, 'utf8');
        const config = JSON.parse(configContent)
        const newSource = {
            type: 'source-two',
            tittle: 'Source Two',
            importURL: SourceImportURL
        };
        config.sources.push(newSource);
        RNFS.writeFile(configPath, JSON.stringify(config, null, 2), 'utf8')
        try {
            // const modulePath = path.join(__dirname, SourceImportURL);
            const SourceModule = await import("../models/sources/source-two");
            console.log("Test Dynamic Import")
            console.log(SourceModule)
            return new SourceModule.default();
          } catch (error) {
            console.error(`Error importing source from ${SourceImportURL}:`, error);
            return null;
          }
    }

    // Get source by import URL
    static async getSource(SourceImportURL: string): Promise<Source> {
        switch (SourceImportURL) {
            case SourceOne.importURL:
                //console.log('Tao source One')
                return new SourceOne();
            case SourceTwo.importURL:
                return new SourceTwo();
            case SourceThree.importURL:
                return new SourceThree();
            case "":
            {
                console.log("Test Dynamic Import")
                return await this.ImportSource(SourceImportURL);
            }
            default:
                return null;
        }
    }

    static createSource(idSource: number): Source {
        switch (idSource) {
            case SourceOne.idToCreate:
                return new SourceOne();
            case SourceTwo.idToCreate:
                return new SourceTwo();
            case SourceThree.idToCreate:
                return new SourceThree();
            default:
                return null;
        }
    }
    
}
