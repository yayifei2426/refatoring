/*
 * @Description:
 * @Author: ju.rui
 * @Date: 2022-08-23 18:39:42
 * @Description: 内联函数 inline functions
 */
// 重构前
function reportLines(aCustomer) {
  const lines = [];
  gatherCustomerData(lines, aCustomer);
  return lines;
}
function gatherCustomerData(out, aCustomer) {
  out.push(['name', aCustomer.name]);
  out.push(['location', aCustomer.location]);
}

// 重构后

function reportLines(aCustomer) {
  const lines = [];
  lines.push(['name', aCustomer.name]);
  lines.push(['location', aCustomer.location]);
  return lines;
}
