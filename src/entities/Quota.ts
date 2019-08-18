import { Rate } from './Rate';

export class Quota {
    private _base: string;
    private _date: Date;
    private _rates: Rate[];

    /**
     * Getter base
     * @return {string}
     */
    public get base(): string {
        return this._base;
    }

    /**
     * Setter base
     * @param {string} value
     */
    public set base(value: string) {
        this._base = value;
    }

    /**
     * Getter date
     * @return {Date}
     */
    public get date(): Date {
        return this._date;
    }

    /**
     * Setter date
     * @param {Date} value
     */
    public set date(value: Date) {
        this._date = value;
    }

    /**
     * Getter rates
     * @return {Rate[]}
     */
    public get rates(): Rate[] {
        return this._rates;
    }

    /**
     * Setter rates
     * @param {Rate[]} value
     */
    public set rates(value: Rate[]) {
        this._rates = value;
    }

    constructor(base?: string, date?: Date, rates?: Rate[]) {
        this._base = base || '';
        this._date = date || new Date();
        this._rates = rates || new Array<Rate>();
    }
}
