// This is the source code of source factory:

// Import the models
import Source from "../models/sources/source";
import SourceOne from "../models/sources/source-one";
import SourceTwo from "../models/sources/source-two";
import SourceThree from '../models/sources/source-three'
import RNFS from 'react-native-fs';

export const sourceImportURLs = [
    {label: SourceOne.title, value: SourceOne.importURL},
    {label: SourceTwo.title, value: SourceTwo.importURL},
    {label: SourceThree.title, value: SourceThree.importURL},
]

const wait = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

// Source factory class
export class SourceFactory {
    static async ImportSource(SourceImportURL: string): Promise<Source> {
        try {
            const fileContent = await RNFS.readFile(SourceImportURL, 'utf8')
            // console.log(fileContent)
            const response = await fetch('http://172.24.96.1:8000/send-module', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({moduleCode: fileContent})
            })

            const data = await response.json();
            console.log(data);
            await wait(2000)
            const SourceModule = await import("../models/sources/hoc");
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
            default:
                return await this.ImportSource(SourceImportURL);
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
