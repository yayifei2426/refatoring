/*
 * @Description:
 * @Author: ju.rui
 * @Date: 2022-09-01 16:31:48
 */
// 接‘提炼类’的例子
// 重构前
class Person {
  constructor() {
    this._telephoneNumber = new TelephoneNumber();
  }
  get officeAreaCode() {
    return this._telephoneNumber.areaCode;
  }
  set officeAreaCode(arg) {
    this._telephoneNumber.areaCode = arg;
  }
  get officeNumber() {
    return this._telephoneNumber.number;
  }
  set officeNumber(arg) {
    this._telephoneNumber.number = arg;
  }
  get telephoneNumber() {
    return this._telephoneNumber.toString();
  }
}
class TelephoneNumber {
  constructor() {}
  get areaCode() {
    return this._areaCode;
  }
  set areaCode(arg) {
    this._areaCode = arg;
  }
  get number() {
    return this._number;
  }
  set number(arg) {
    this._number = arg;
  }
  toString() {
    return `${this.areaCode} ${this.number}`;
  }
}
// 重构后
class Person {
  constructor() {
    this._telephoneNumber = new TelephoneNumber();
  }
  get officeAreaCode() {
    return this._telephoneNumber.areaCode;
  }
  set officeAreaCode(arg) {
    this._telephoneNumber = new TelephoneNumber(arg, this.officeNumber);
  }
  get officeNumber() {
    return this._telephoneNumber.number;
  }
  set officeNumber(arg) {
    this._telephoneNumber = new TelephoneNumber(this.officeAreaCode, arg);
  }
  get telephoneNumber() {
    return this._telephoneNumber.toString();
  }
}
class TelephoneNumber {
  constructor(areaCode, number) {
    this._areaCode = areaCode;
    this._number = number;
  }
  get areaCode() {
    return this._areaCode;
  }
  set areaCode(arg) {
    this._areaCode = arg;
  }
  get number() {
    return this._number;
  }
  set number(arg) {
    this._number = arg;
  }
  toString() {
    return `${this.areaCode} ${this.number}`;
  }
}
