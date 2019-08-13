class Country {
  private _name: string;
  private _abbrName: string;

  /**
   * Getter name
   * @return {string}
   */
  get name(): string {
    return this._name;
  }

  /**
   * Getter abbrName
   * @return {string}
   */
  get abbrName(): string {
    return this._abbrName;
  }

  /**
   * Setter name
   * @param {string} value
   */
  set name(value: string) {
    this._name = value;
  }

  /**
   * Setter abbrName
   * @param {string} value
   */
  set abbrName(value: string) {
    this._abbrName = value;
  }
}
