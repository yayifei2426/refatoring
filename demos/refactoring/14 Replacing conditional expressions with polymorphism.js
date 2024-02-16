/*
 * @Description:
 * @Author: ju.rui
 * @Date: 2022-09-01 20:12:01
 */
// 以多态处理变体逻辑
// 远洋航行风险评估, 评估标准取决于航程本身特征和船长历史航行.
const voyage = { zone: 'west-indies', length: 10 };
const history = [
  {
    zone: 'china',
    profit: -2,
  },
  {
    zone: 'west-indies',
    profit: 15,
  },
  {
    zone: 'east-indies',
    profit: 15,
  },
  {
    zone: 'west-africa',
    profit: 7,
  },
];

function rating(voyage, history) {
  const vpf = voyageProfitRactor(voyage, history);
  const vr = voyageRisk(voyage);
  const chr = captainHistoryRisk(voyage, history);
  if (vpf * 3 > vr + chr * 2) return 'A';
  else return 'B';
}
function voyageProfitRactor(voyage, history) {
  let result = 2;
  if (voyage.zone === 'china') result += 1;
  if (voyage.zone === 'east-indies') result += 1;
  if (voyage.zone === 'china' && hasChina(history)) {
    result += 3;
    if (history.length > 10) result += 1;
    if (voyage.length > 12) result += 1;
    if (voyage.length > 18) result -= 1;
  } else {
    if (history.length > 8) result += 1;
    if (voyage.length > 14) result -= 1;
  }
  return result;
}
function hasChina(history) {
  return history.some((v) => 'china' === v.zone);
}
function voyageRisk(voyage) {
  let result = 1;
  if (voyage.length > 4) result += 2;
  if (voyage.length > 8) result += voyage.length - 8;
  if (['china', 'east-indies'].includes(voyage.zone)) result += 4;
  return Math.max(result, 0);
}
function captainHistoryRisk(voyage, history) {
  let result = 1;
  if (history.length < 5) result += 4;
  result += history.filter((v) => v.profit < 0).length;
  if (voyage.zone === 'china' && hasChina(history)) result -= 2;
  return Math.max(result, 0);
}
// ****** 重构后
// 建立工厂类

function createRating(voyage, history) {
  if (voyage.zone === 'china' && history.some((v) => 'china' === v.zone)) {
    return new ExperiencedChinaRating(voyage, history);
  } else {
    return new Rating(voyage, history);
  }
}
function rating(voyage, history) {
  return createRating(voyage, history).value;
}

class Rating {
  constructor(voyage, history) {
    this.voyage = voyage;
    this.history = history;
  }
  get value() {
    const vpf = this.voyageProfitRactor;
    const vr = this.voyageRisk;
    const chr = this.captainHistoryRisk;
    if (vpf * 3 > vr + chr * 2) return 'A';
    else return 'B';
  }
  get voyageProfitRactor() {
    let result = 2;
    // if (this.voyage.zone === 'china') result += 1;
    // if (this.voyage.zone === 'east-indies') result += 1;
    if (['china', 'east-indies'].includes(this.voyage.zone)) result += 1;
    result += this.voyageLengthRactor;
    result += this.historyLengthRactor;
    return result;
  }
  get voyageLengthRactor() {
    return this.voyage.length > 14 ? -1 : 0;
  }
  get historyLengthRactor() {
    return this.history.length > 8 ? 1 : 0;
  }
  get voyageRisk() {
    let result = 1;
    if (this.voyage.length > 4) result += 2;
    if (this.voyage.length > 8) result += this.voyage.length - 8;
    if (['china', 'east-indies'].includes(this.voyage.zone)) result += 4;
    return Math.max(result, 0);
  }
  get captainHistoryRisk() {
    let result = 1;
    if (this.history.length < 5) result += 4;
    result += this.history.filter((v) => v.profit < 0).length;
    return Math.max(result, 0);
  }
}
class ExperiencedChinaRating extends Rating {
  get captainHistoryRisk() {
    const result = super.captainHistoryRisk - 2;
    return Math.max(result, 0);
  }
  get voyageLengthRactor() {
    let result = 0;
    if (this.voyage.length > 12) result += 1;
    if (this.voyage.length < 18) result -= 1;
    return result;
  }
  get historyLengthRactor() {
    return this.history.length > 10 ? 1 : 0;
  }
  get voyageProfitRactor() {
    return super.voyageProfitRactor + 3;
  }
}

rating(voyage, history);
