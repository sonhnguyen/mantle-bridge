export default class ApplicationError extends Error {
    public status: number;

    constructor(message: string = 'ApplicationError', status: number = 500) {
        super(message); // Pass the message to the parent Error class
        this.name = this.constructor.name; // Set the error name to the class name
        this.status = status;

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
