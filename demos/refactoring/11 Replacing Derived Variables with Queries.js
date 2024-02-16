/*
 * @Description:
 * @Author: ju.rui
 * @Date: 2022-09-01 11:44:17
 * @Description: 以查询取代派生变量 Replacing Derived Variables with Queries
 */
// 例子1: 单一数据来源
// 重构前
class ProductionPlan {
  get production() {
    return this._production;
  }
  applyAdjustment(anAdjustment) {
    this._adjustments.push(anAdjustment);
    this._production += anAdjustment.amount;
  }
}
// 重构后
class ProductionPlan {
  get production() {
    return this._adjustments.reduce((sum, a) => (sum += a), 0);
  }
  applyAdjustment(anAdjustment) {
    this._adjustments.push(anAdjustment);
  }
}
// 例子2, 多数据源

// 重构前
class ProductionPlan {
  constructor(production) {
    this._production = production;
    this._adjustments = [];
  }
  get production() {
    return this._production;
  }
  applyAdjustment(anAdjustment) {
    this._adjustments.push(anAdjustment);
    this._production += anAdjustment.amount;
  }
}
// 重构后
class ProductionPlan {
  constructor(production) {
    this._initialProduction = production;
    this._adjustments = [];
  }
  get production() {
    return this._initialProduction + this.calculatedProductionAccumulator;
  }
  get calculatedProductionAccumulator() {
    return this._adjustments.reduce((sum, a) => (sum += a), 0);
  }
  applyAdjustment(anAdjustment) {
    this._adjustments.push(anAdjustment);
  }
}
