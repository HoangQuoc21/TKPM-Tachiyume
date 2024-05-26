// This is the source code of source factory:

// Import the models
import Source from "../models/sources/source";
import {SourceOneImportURL, SourceOne} from "../models/sources/source-one";
import {SourceTwoImportURL, SourceTwo} from "../models/sources/source-two";
import {SourceThreeImportURL, SourceThree} from '../models/sources/source-three'
// Source factory class
export default class SourceFactory {
    // Get source by import URL
    static getSource(SourceImportURL: string): Source {
        switch (SourceImportURL) {
            case SourceOneImportURL:
                return new SourceOne();
            case SourceTwoImportURL:
                return new SourceTwo();
            case SourceThreeImportURL:
                return new SourceThree();
            default:
                return null;
        }
    }
}
