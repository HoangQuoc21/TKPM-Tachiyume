// This is the source code of source factory:

// Import the models
import Source from "../models/sources/source";
import SourceOne from "../models/sources/source-one";
import SourceTwo from "../models/sources/source-two";
import SourceThree from '../models/sources/source-three'
import { Platform } from "react-native";
import RNFS from 'react-native-fs';
// import path from 'path';

export const sourceImportURLs = [
    {label: SourceOne.title, value: SourceOne.importURL},
    {label: SourceTwo.title, value: SourceTwo.importURL},
    {label: SourceThree.title, value: SourceThree.importURL},
]

const configPath = './source-config.json'

// Đường dẫn tới thư mục chứa file source-config.json
const directoryPath = RNFS.DownloadDirectoryPath;
const sourceConfigFilePath = `${directoryPath}/source-config.json`;

// Dữ liệu mẫu cho file source-config.json
const sampleConfigData = {
  sources: [
  ]
};

// const writeSourceConfigFile = async (configData) => {
//     const configFileContent = JSON.stringify(configData, null, 2);
//     try {
//       await RNFS.writeFile(sourceConfigFilePath, configFileContent, 'utf8');
//       console.log('source-config.json created successfully!');
//     } catch (error) {
//       console.error('Error creating source-config.json:', error);
//     }
//   };
  
// Source factory class
export class SourceFactory {
    static async ImportSource(SourceImportURL: string): Promise<Source> {
        try {
            const fileContent = await RNFS.readFile(SourceImportURL, 'base64')
            // console.log(fileContent)
            const path = `../models/sources/${fileContent}`
            const SourceModule = await import(`../models/sources/source-three`);
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
