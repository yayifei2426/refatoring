/*
 * @Description:
 * @Author: ju.rui
 * @Date: 2022-09-04 22:35:30
 */
//重构前
class Booking {
  constructor(show, date) {
    this._show = show;
    this._date = date;
  }
  get hasTalkBack() {
    return this._show.hasOwnProperty('talkback') && !this.isPeakDay;
  }
  get basePrice() {
    let result = this._show.price;
    if (this.isPeakDay) result += Math.round(result * 0.15);
    return result;
  }
}
class PremiumBooking extends Booking {
  constructor(show, date, extras) {
    super(show, date);
    this._extras = extras;
  }
  get hasTalkBack() {
    return this._show.hasOwnProperty('talkback');
  }
  get basePrice() {
    return Math.round(super.basePrice + this._extras.premiumFee);
  }
  get hasDinner() {
    return this._extras.hasOwnProperty('dinner') && !this.isPeakDay;
  }
}
let aBooking = new PremiumBooking(show, date, extras);

// 重构后
// 新建一个委托类
function createPremiumBooking(show, date, extras) {
  const result = new Booking(show, date, extras);
  result._bePremium(extras);
  return result;
}
class PremiumBookingDelegate {
  constructor(hostBooking, extras) {
    this._host = hostBooking;
    this._extras = extras;
  }
  get hasTalkBack() {
    return this._host._show.hasOwnProperty('talkback');
  }
  extendBasePrice(base) {
    return Math.round(base + this._extras.premiumFee);
  }
  get hasDinner() {
    return this._extras.hasOwnProperty('dinner') && !this._host.isPeakDay;
  }
}
class Booking {
  constructor(show, date, extras) {
    this._show = show;
    this._date = date;
    this._extras = extras;
  }
  get hasTalkBack() {
    return this._premiumDelegate
      ? this._premiumDelegate.hasTalkBack
      : this._show.hasOwnProperty('talkback') && !this.isPeakDay;
  }
  get basePrice() {
    let result = this._show.price;
    if (this.isPeakDay) result += Math.round(result * 0.15);
    return this._premiumDelegate
      ? this._premiumDelegate.extendBasePrice(result)
      : result;
  }
  get hasDinner() {
    return this._premiumDelegate ? this._premiumDelegate.hasDinner : undifined;
  }
  _bePremium(extras) {
    this._premiumDelegate = new PremiumBookingDelegate(this, extras);
  }
}
