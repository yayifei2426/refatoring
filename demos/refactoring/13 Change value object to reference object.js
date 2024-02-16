/*
 * @Description:
 * @Author: ju.rui
 * @Date: 2022-09-01 16:55:32
 */
// 重构前
class Order {
  constructor(data) {
    this._number = data.number;
    this._customer = new Customer(data.customer);
  }
  get customer() {
    return this._customer;
  }
}
class Customer {
  constructor(id) {
    this._id = id;
  }
  get id() {
    return this._id;
  }
}
// 重构后
// 上种方式建立的Customer对象为值对象,
// 如果有5个订单都是属于id为123的顾客, 就会有5个独立的Customer对象, 对其中一个所做的修改, 不会反映在其他几个对象身上.
// 如果Customer是可变的, 会造成更新混乱.
///
// 建立一个仓库对象
let _repositoryData;
export function initialize() {
  _repositoryData = {};
  _repositoryData.customers = new Map();
}

export function registerCustomer(id) {
  if (!_repositoryData.customers.has(id))
    _repositoryData.customers.set(id, new Customer(id));
  return findCustomer(id);
}
export function findCustomer(id) {
  return _repositoryData.customers.get(id);
}
////
class Order {
  constructor(data) {
    this._number = data.number;
    this._customer = registerCustomer(data.customer);
  }
  get customer() {
    return this._customer;
  }
}

class Customer {
  constructor(id) {
    this._id = id;
  }
  get id() {
    return this._id;
  }
}
