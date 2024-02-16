/*
 * @Description:
 * @Author: ju.rui
 * @Date: 2022-08-23 18:31:32
 * @Description 提炼函数 Refine functions
 */

// 重构前
function printOwning() {
  let outstanding = 0;
  printBanner();
  // calculate outstanding
  for (const o of invoice.orders) {
    outstanding += o.account;
  }
  recordDueDate(invoice);
  printDetails(invoice, outstanding);
}

// 重构后
function printOwning() {
  printBanner();
  // calculate outstanding
  const outstanding = calculateOutstanding(invoice); // 常量
  recordDueDate(invoice);
  printDetails(invoice, outstanding);
}
function calculateOutstanding(invoice) {
  let result = 0; // 命名习惯
  for (const o of invoice.orders) {
    result += o.account;
  }
  return result;
}
