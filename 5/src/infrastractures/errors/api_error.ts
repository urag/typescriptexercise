export class ApiError extends Error {
    private statusCode: number;

    constructor(code: number, message: string) {
        super(message)
        this.statusCode = code;
    }
}