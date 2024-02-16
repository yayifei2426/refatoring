/*
 * @Description:
 * @Author: ju.rui
 * @Date: 2022-09-03 16:48:27
 */
//重构前
class Employee {
  constructor(name, typeCode) {
    this._name = name;
    this._typeCode = typeCode;
  }
  get type() {
    return Employee.legalTypeCodes[this._typeCode];
  }
  static legalTypeCodes() {
    return { E: 'engineer', M: 'manager' };
  }
}
// 调用方1
candidate = new Employee(document.name, document.empType);
// 调用方2
const leadEngineer = new Employee(document.leadEngineer, 'E');

// 重构后
function createEmployee(name, typeCode) {
  return new Employee(name, typeCode);
}
// 调用方1
candidate = createEmployee(document.name, document.empType);
// 调用方2
function createEngineer(name, typeCode) {
  return new Employee(name, 'E');
}
const leadEngineer = createEngineer(document.leadEngineer);

class Employee {
  constructor(name, typeCode) {
    this._name = name;
    this._typeCode = typeCode;
  }
  get type() {
    return Employee.legalTypeCodes[this._typeCode];
  }
  static legalTypeCodes() {
    return { E: 'engineer', M: 'manager' };
  }
}
