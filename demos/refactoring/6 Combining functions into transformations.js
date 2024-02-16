/*
 * @Description:
 * @Author: ju.rui
 * @Date: 2022-08-24 17:57:24
 * @Description: 函数组合成变换：Combining functions into transformations
 */
// 重构前
reading = {
  customer: 'ivan',
  quantity: 10,
  month: 5,
  year: 2017,
};

// 客户端1
const aReading = acquireReading();
const baseCharge = baseRate(aReading.month, aReading.year) * aReading.quantity;

// 客户端2
const aReading = acquireReading();
const base = baseRate(aReading.month, aReading.year) * aReading.quantity;
const taxableCharge = Math.max(0, base - taxThreshold(aReading.year));

// 客户端3
const aReading = acquireReading();
const baseChargeAmount = calculateBaseCharge(aReading);
function calculateBaseCharge(aReading) {
  return baseRate(aReading.month, aReading.year) * aReading.quantity;
}

// 重构后

function enrichReading(original) {
  const result = _.cloneDeep(original);
  result.baseCharge = calculateBaseCharge(result);
  result.taxableCharge = Math.max(
    0,
    result.baseCharge - taxThreshold(result.year)
  );
  return result;
}
function calculateBaseCharge(aReading) {
  return baseRate(aReading.month, aReading.year) * aReading.quantity;
}

// 客户端1
const rawReading = acquireReading();
const aReading = enrichReading(rawReading);
const baseCharge = aReading.baseCharge;

// 客户端2
const aReading = acquireReading();
const baseCharge = enrichReading(rawReading);
const taxableCharge = aReading.taxableCharge;

// 客户端3
const aReading = acquireReading();
const baseCharge = enrichReading(rawReading);
