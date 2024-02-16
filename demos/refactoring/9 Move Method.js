/*
 * @Description:
 * @Author: ju.rui
 * @Date: 2022-08-27 13:06:37
 * @Description: 搬移函数 Move Method
 */
//重构前
class Account {
  get bankCharge() {
    let result = 4.5;
    if (this._daysOverdrawn > 0) {
      result += this.overdraftCharge;
    }
    return result;
  }
  get overdraftCharge() {
    if (this.type.isPremium) {
      const baseCharge = 10;
      if (this._daysOverdrawn <= 7) {
        return baseCharge;
      } else {
        return (baseCharge += (this.daysOverdrawn - 7) * 0.85);
      }
    } else {
      return this.daysOverdrawn * 1.75;
    }
  }
}
// 重构后
class Account {
  get bankCharge() {
    let result = 4.5;
    if (this._daysOverdrawn > 0) {
      result += this.overdraftCharge;
    }
    return result;
  }
  get overdraftCharge() {
    return this.type.overdraftCharge(this.daysOverdrawn);
  }
}

class AccountType {
  overdraftCharge(daysOverdrawn) {
    if (this.isPremium) {
      const baseCharge = 10;
      if (daysOverdrawn <= 7) {
        return baseCharge;
      } else {
        return (baseCharge += (daysOverdrawn - 7) * 0.85);
      }
    } else {
      return daysOverdrawn * 1.75;
    }
  }
}
// 若account 对象上有很多数据需要传递, 可以直接将整个对象传递过去
class Account {
  get bankCharge() {
    let result = 4.5;
    if (this._daysOverdrawn > 0) {
      result += this.overdraftCharge;
    }
    return result;
  }
  get overdraftCharge() {
    return this.type.overdraftCharge(this.daysOverdrawn);
  }
}

class AccountType {
  overdraftCharge(account) {
    if (this.isPremium) {
      const baseCharge = 10;
      if (account.daysOverdrawn <= 7) {
        return baseCharge;
      } else {
        return (baseCharge += (account.daysOverdrawn - 7) * 0.85);
      }
    } else {
      return account.daysOverdrawn * 1.75;
    }
  }
}
