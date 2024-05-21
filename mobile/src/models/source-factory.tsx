// This is the source code of source factory:

// Import the models
import Source from "./sources/source";
import {SourceOneImportURL, SourceOne} from "./sources/source-one";

// Source factory class
export default class SourceFactory {
    // Get source by import URL
    static getSource(SourceImportURL: string): Source {
        switch (SourceImportURL) {
            case SourceOneImportURL:
                return new SourceOne();
            default:
                return null;
        }
    }
}
