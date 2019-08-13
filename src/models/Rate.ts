class Rate {
  private _country: Country;
  private _value: Float32Array;

  /**
   * Getter value
   * @return {Float32Array}
   */
  get value(): Float32Array {
    return this._value;
  }

  /**
   * Setter value
   * @param {Float32Array}
   */
  set value(value: Float32Array) {
    this._value = value;
  }

  /**
   * Getter country
   * @return {Country}
   */
  get country(): Country {
    return this._country;
  }

  /**
   * Setter country
   * @param {Country} value
   */
  set country(value: Country) {
    this._country = value;
  }

  constructor(country: Country, value: Float32Array) {
    this._country = country;
    this._value = value;
  }
}
