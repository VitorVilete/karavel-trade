class Quota {
  private _base: string;
  private _date: Date;
  // private _rates: Array<[Country, Float32Array]>;
  /**
   * Getter base
   * @return {string}
   */
  get base(): string {
    return this._base;
  }

  /**
   * Getter date
   * @return {Date}
   */
  get date(): Date {
    return this._date;
  }

  /**
   * Setter base
   * @param {string} value
   */
  set base(value: string) {
    this._base = value;
  }

  /**
   * Setter date
   * @param {Date} value
   */
  set date(value: Date) {
    this._date = value;
  }

  constructor(base: string, date: Date) {
    this._base = base;
    this._date = date;
  }
}
