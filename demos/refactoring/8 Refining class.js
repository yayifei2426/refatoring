/*
 * @Description:
 * @Author: ju.rui
 * @Date: 2022-08-27 11:41:20
 * @Description: 提炼类 Refining class
 */
// 重构前
class Person {
  get name() {
    return this._name;
  }
  set name(arg) {
    this._name = arg;
  }
  get telephoneNumber() {
    return `${this._officeAreaCode} ${this._officeNumber}`;
  }
  get officeAreaCode() {
    return this._officeAreaCode;
  }
  set officeAreaCode(arg) {
    this._officeAreaCode = arg;
  }
  get officeNumber() {
    return this._officeNumber;
  }
  set officeNumber(arg) {
    this._officeNumber = arg;
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
// TODO:
// 这个时候的TelephoneNumber更像是一个值对象
// 因此 “引用对象改为值对象”
