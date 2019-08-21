export class Rate {
    private _coin: string;
    private _value: number;
    private _flag: string;



    /**
     * Getter flag
     * @return {string}
     */
	public get flag(): string {
		return this._flag;
	}

    /**
     * Setter flag
     * @param {string} value
     */
	public set flag(value: string) {
		this._flag = value;
	}


    /**
     * Getter coin
     * @return {string}
     */
	public get coin(): string {
		return this._coin;
	}

    /**
     * Getter value
     * @return {number}
     */
	public get value(): number {
		return this._value;
	}

    /**
     * Setter coin
     * @param {string} value
     */
	public set coin(value: string) {
		this._coin = value;
	}

    /**
     * Setter value
     * @param {number} value
     */
	public set value(value: number) {
		this._value = value;
	}


	constructor(coin?: string, value?: number, flag?: string) {
		this._coin = coin || '';
    this._value = value || 0;
    this._flag = flag || '';
    }    

  }