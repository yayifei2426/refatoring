/*
 * @Description:
 * @Author: ju.rui
 * @Date: 2022-09-02 12:17:22
 */
// 适用只读场景
// 重构前
//
class Site {
  get customer() {
    return this._customer;
  }
}

class Customer {
  get name() {}
  get billingPlan() {}
  set billingPlan(arg) {}
  get paymentHistory() {}
}
// 客户端1
const aCustomer = site.customer;
//...
let customerName;
if (aCustomer === 'unknown') customerName = 'occupant';
else customerName = aCustomer.name;

// 客户端2
const plan =
  aCustomer === 'unknown' ? registry.billingPlans.basic : aCustomer.billingPlan;

// 客户端3 该示例去掉更新操作.
// if (aCustomer !== 'unknown') aCustomer.billingPlan = newPlan;

// 客户端4
const weeksDelinquent =
  aCustomer === 'unknown'
    ? 0
    : aCustomer.paymentHistory.weeksDelinquentInlastYear;

// 重构后
function createUnknownCustomer() {
  // 如果使用了这样的字面量,应该使用诸如 Object.freeze将其冻结
  // return {
  //   isUnknown: true,
  //   name: 'occupant',
  //   billingPlan: registry.billingPlans.basic,
  //   paymentHistory: {
  //     weeksDelinquentInlastYear: 0,
  //   },
  // };
  return Object.freeze({
    isUnknown: true,
    name: 'occupant',
    billingPlan: registry.billingPlans.basic,
    paymentHistory: {
      weeksDelinquentInlastYear: 0,
    },
  });
}
class Site {
  get customer() {
    return this._customer === 'unknown'
      ? createUnknownCustomer()
      : this._customer;
  }
}

class Customer {
  get isUnknown() {
    return false;
  }
  get name() {}
  get billingPlan() {
    return registry.billingPlans.basic;
  }
  set billingPlan(arg) {}
  get paymentHistory() {}
}

// 客户端1
const aCustomer = site.customer;
//...
let customerName = aCustomer.name;

// 客户端2
const plan = aCustomer.billingPlan;

// 客户端3
// aCustomer.billingPlan = newPlan;
// 客户端4
const weeksDelinquent = aCustomer.paymentHistory.weeksDelinquentInlastYear;
