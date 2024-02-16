/*
 * @Description:
 * @Author: ju.rui
 * @Date: 2022-09-02 20:46:19
 */
// 重构前

function alertForMiscreant(people) {
  for (const p of people) {
    if (p === 'don') {
      setOffAlarm();
      return 'don';
    }
    if (p === 'john') {
      setOffAlarm();
      return 'john';
    }
  }
  return '';
}
// 重构后
function findMiscreant(people) {
  for (const p of people) {
    if (p === 'don') {
      return 'don';
    }
    if (p === 'john') {
      return 'john';
    }
  }
  return '';
}
function alertForMiscreant(people) {
  if (findMiscreant(people) !== '') setOffAlarm();
}
