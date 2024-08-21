export { };
// https://bobbyhadz.com/blog/typescript-make-types-global#declare-global-types-in-typescript

const a = {
    _id: '66be272358b1b5f9120f69c2',
    title: 'Truy Lùng Bảo Vật',
    description: 'Elvis Presley',
    category: 'CHILL',
    imgUrl: 'chill1.png',
    trackUrl: 'CHILL.mp3',
    countLike: 620,
    countPlay: 808,
    uploader: {
        _id: "66be272358b1b5f9120f69bc",
        email: "admin@gmail.com",
        name: "I'm admin",
        role: "ADMIN",
        type: "SYSTEM"
    },
    isDeleted: false,
    __v: 0,
    createdAt: '2024-08-15T16:04:51.800Z',
    updatedAt: '2024-08-15T16:04:51.800Z'
}
declare global {
    interface ITrackTop {
        _id: string;
        title: string;
        description: string;
        category: string;
        imgUrl: string;
        trackUrl: string;
        countLike: number;
        countPlay: number;
        uploader: {
            _id: string;
            email: string;
            name: string;
            role: string;
            type: string;
        };
        isDeleted: boolean;
        __v: number;
        createdAt: string;
        updatedAt: string;
    }

    interface IRequest {
        url: string;
        method: string;
        body?: { [key: string]: any };
        queryParams?: any;
        useCredentials?: boolean;
        headers?: any;
        nextOption?: any;
    }

    interface IBackendRes<T> {
        error?: string | string[];
        message: string;
        statusCode: number | string;
        data?: T;
    }

    interface IModelPaginate<T> {
        meta: {
            current: number;
            pageSize: number;
            pages: number;
            total: number;
        },
        result: T[]
    }

}
