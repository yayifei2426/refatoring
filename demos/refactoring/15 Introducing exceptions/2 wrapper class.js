/*
 * @Description:
 * @Author: ju.rui
 * @Date: 2022-09-02 12:17:22
 */
// 重构前
// 一家提供公共事业服务的公司将自己的服务安装在不同的场所
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

// 客户端3
if (aCustomer !== 'unknown') aCustomer.billingPlan = newPlan;

// 客户端4
const weeksDelinquent =
  aCustomer === 'unknown'
    ? 0
    : aCustomer.paymentHistory.weeksDelinquentInlastYear;

// 重构后

class Site {
  get customer() {
    return this._customer === 'unknown'
      ? new UnknownCustomer()
      : this._customer;
  }
}
class UnknownCustomer {
  get isUnknown() {
    return true;
  }
  get name() {
    return 'occupant';
  }
  get billingPlan() {
    return registry.billingPlans.basic;
  }
  set billingPlan(arg) {
    // ignore 暂时没有设值逻辑
  }
  get paymentHistory() {
    return new NullPaymentHistory();
  }
}
class NullPaymentHistory {
  get weeksDelinquentInlastYear() {
    return 0;
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
aCustomer.billingPlan = newPlan;
// 客户端4
const weeksDelinquent = aCustomer.paymentHistory.weeksDelinquentInlastYear;
