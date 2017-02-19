export class Greeter {

    private _message: string;

    constructor(message: string) {
        this._message = message;
    }

    public speak(): string {
        return this._message;
    }
}