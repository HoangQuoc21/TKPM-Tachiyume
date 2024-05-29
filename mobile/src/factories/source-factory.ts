// This is the source code of source factory:

// Import the models
import Source from "../models/sources/source";
import SourceOne from "../models/sources/source-one";
import SourceTwo from "../models/sources/source-two";
import SourceThree from '../models/sources/source-three'

export const sourceImportURLs = [
    {label: SourceOne.title, value: SourceOne.importURL},
    {label: SourceTwo.title, value: SourceTwo.importURL},
    {label: SourceThree.title, value: SourceThree.importURL},
]


// Source factory class
export class SourceFactory {
    // Get source by import URL
    static getSource(SourceImportURL: string): Source {
        switch (SourceImportURL) {
            case SourceOne.importURL:
                console.log('Tao source One')
                return new SourceOne();
            case SourceTwo.importURL:
                return new SourceTwo();
            case SourceThree.importURL:
                return new SourceThree();
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
