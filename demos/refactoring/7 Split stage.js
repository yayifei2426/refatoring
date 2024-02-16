/*
 * @Description:
 * @Author: ju.rui
 * @Date: 2022-08-24 18:19:31
 * @Description: 拆分阶段 Split stage
 */
// 重构前
const orderData = orderString.split(/\s+/);
const productPrice = priceList[orderData[0].split('-')[1]];
const orderPrice = parseInt(orderData[1]) * productPrice;

// 重构后

function parseOrder(aString) {
  const values = aString.split(/\s+/);
  return {
    productID: values[0].split('-')[1],
    quantity: parseInt(values[1]),
  };
}
function price(order, priceList) {
  return order.quantity * priceList[order.productID];
}
const orderRecord = parseOrder(order);
const orderPrice = price(orderRecord, priceList);
