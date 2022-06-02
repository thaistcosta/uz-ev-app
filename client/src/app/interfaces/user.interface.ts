export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    carId: string;
    carUsableKwh: number;
    carUrl: string;
    panicLevel?: number;
    _id?: string;
}