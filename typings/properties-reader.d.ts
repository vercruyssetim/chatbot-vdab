export as namespace propertiesReaderLib;

export = PropertiesReader;

declare function PropertiesReader(filename: string): PropertiesReader.Properties

declare namespace PropertiesReader{
    export interface Properties {
        get(name: string): string;
    }
}
