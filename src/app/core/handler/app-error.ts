export class AppError extends Error{
    constructor(message: string) {
        super(message);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, AppError.prototype);
    }

}
