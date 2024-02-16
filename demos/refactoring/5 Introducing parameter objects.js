/*
 * @Description:
 * @Author: ju.rui
 * @Date: 2022-08-23 21:25:40
 * @Description: 引入参数对象 Introducing parameter objects
 */
// 重构前
const station = {
  name: 'ZB1',
  readings: [
    { temp: 47, time: '2016-11-10 09:10' },
    { temp: 53, time: '2016-11-10 09:20' },
    { temp: 49, time: '2016-11-10 09:30' },
  ],
};
function readingsOutsideRange(station, min, max) {
  return station.readings.filter((r) => r.temp < min || r.temp > max);
}

alerts = readingsOutsideRange(
  station,
  operatingPlan.temperatureFloor,
  operatingPlan.temperatureCeiling
);

// 重构后
class NumberRange {
  constructor(min, max) {
    this._data = { min, max };
  }
  get min() {
    return this._data.min;
  }
  get max() {
    return this._data.max;
  }
  contains(arg) {
    return arg >= this.min && arg <= this.max;
  }
}
function readingsOutsideRange(station, range) {
  return station.readings.filter((r) => !range.contains(r.temp));
}
const range = new NumberRange(
  operatingPlan.temperatureFloor,
  operatingPlan.temperatureCeiling
);

alerts = readingsOutsideRange(station, range);
