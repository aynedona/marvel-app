
export interface Comic {
    id: number;
    title: string;
    thumbnail: {
        path: string;
        extension: string;
    };
    urls: Array<{
        type: string;
        url: string;
    }>;
}