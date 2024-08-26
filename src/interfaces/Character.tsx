import { Comic } from "./Comic";

export interface Character {
    id: number;
    name: string;
    description: string;
    modified: string;
    thumbnail: {
        path: string;
        extension: string;
    };
    comics: {
        available: number;
        items: Comic[];
    };
}