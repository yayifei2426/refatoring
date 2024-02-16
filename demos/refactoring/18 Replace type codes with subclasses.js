/*
 * @Description:
 * @Author: ju.rui
 * @Date: 2022-09-04 20:59:51
 */
// 范例: 使用间接继承
// 类似前面的例子,但这里员工已经有“全职”和“兼职”两个子类, 不宜再根据员工类别代码创建子类了.
// 重构前
class Employee {
  constructor(name, type) {
    this.validateType(type);
    this._name = name;
    this._type = type;
  }
  validateType(arg) {
    if (!['engineer', 'manager', 'salesman'].includes(arg))
      throw new Error('type is not legal!');
  }
  get type() {
    return this._type;
  }
  set type(arg) {
    this._type = arg;
  }
  get capitalizedType() {
    return (
      this._type.charAt(0).toUpperCase() + this._type.substr(1).toLowerCase()
    );
  }
  toString() {
    return `${this._name} (${this.capitalizedType})`;
  }
}
// 重构后
class Employee {
  constructor(name, type) {
    this.validateType(type);
    this._name = name;
    this.type = type; /* */
  }
  validateType(arg) {
    if (!['engineer', 'manager', 'salesman'].includes(arg))
      throw new Error('type is not legal!');
  }
  toString() {
    return `${this._name} (${this.type.capitalizedName})`;
  }
  get type() {
    return this._type;
  }
  set type(arg) {
    this._type = Employee.createEmployeeType(arg);
  }
  static createEmployeeType(aString) {
    switch (aString) {
      case 'engineer':
        return new Engineer();
      case 'manager':
        return new Manager();
      case 'salesman':
        return new Salesman();
    }
  }
}
class EmployeeType {
  get capitalizedName() {
    return (
      this.toString().charAt(0).toUpperCase() +
      this.toString().substr(1).toLowerCase()
    );
  }
}
class Engineer extends EmployeeType {
  toString() {
    return 'engineer';
  }
}
class Manager extends EmployeeType {
  toString() {
    return 'manager';
  }
}
class Salesman extends EmployeeType {
  toString() {
    return 'salesman';
  }
}
let a = new Employee('11', 'engineer');
