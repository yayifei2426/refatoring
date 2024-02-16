/*
 * @Description:
 * @Author: ju.rui
 * @Date: 2022-08-23 21:08:13
 * @Description: 封装变量 Packaging variables
 */
// 重构前
let defaultOwner = { firstName: 'Martin', lastName: 'Fower' };

// 重构后 v1
let defaultOwnerData = { firstName: 'Martin', lastName: 'Fower' };
export function defaultOwner() {
  return defaultOwnerData;
}
export function setDefaultOwner(arg) {
  defaultOwnerData = arg;
}

// 重构后 v2 返回副本, 可以控制对源数据的修改
let defaultOwnerData = { firstName: 'Martin', lastName: 'Fower' };
export function defaultOwner() {
  return Object.assign({}, defaultOwnerData);
}
export function setDefaultOwner(arg) {
  defaultOwnerData = arg;
}

// 重构后 v3 封装记录, 可以控制对源数据的修改
let defaultOwnerData = { firstName: 'Martin', lastName: 'Fower' };
export function defaultOwner() {
  return new Person(defaultOwnerData);
}
export function setDefaultOwner(arg) {
  defaultOwnerData = arg;
}
class Person {
  constructor(data) {
    this._lastName = data.lastName;
    this._firstName = data.firstName;
  }
  get lastName() {
    return this._lastName;
  }
  get firstName() {
    return this._firstName;
  }
}
