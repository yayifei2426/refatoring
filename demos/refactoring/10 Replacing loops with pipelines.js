/*
 * @Description:
 * @Author: ju.rui
 * @Date: 2022-09-01 10:58:40
 * @Description: 以管道取代循环 Replacing loops with pipelines
 */
// 重构前
// 筛选出印度所有办公室,并返回city和电话
function acquireData(input) {
  const lines = input.split('\n');
  let firstLine = true;
  const result = [];
  for (const line of lines) {
    if (firstLine) {
      firstLine = false;
      continue;
    }
    if (line.trim() === '') continue;
    const record = line.split(',');
    if (record[1].trim() === 'India') {
      result.push({ city: record[0].trim(), phone: record[2].trim() });
    }
  }
}
// 重构后
function acquireData(input) {
  const lines = input.split('\n');
  return lines
    .slice(1)
    .filter((line) => line.trim() !== '')
    .map((line) => line.split(','))
    .filter((record) => record[1].trim() === 'India')
    .map((record) => ({ city: record[0].trim(), phone: record[2].trim() }));
}
