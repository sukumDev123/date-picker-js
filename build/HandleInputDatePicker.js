"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HandleInputDatePicker = function () {
  /**
   *
   * @param {string} id_element_value id of element div for set value of date set is DD/MM/YY like a input element but it it div id ex. #booking_start
   * @param {DatePickerClass} datePicker new DatePickerClass()
   * @param {string} id_element_to_show_ex id of element of label or something like a tag h1 , h3 or other for show Full date like a day date month and year
   * @param {function} calDateBooking function this for cal date ex. 1 day 80: 30 hr.
   */
  function HandleInputDatePicker(id_element_value, datePicker, id_element_to_show_ex, calDateBooking) {
    var _this = this;

    _classCallCheck(this, HandleInputDatePicker);

    this.checkStatus = false;
    this.datePicker;
    this.text_for = "";
    this.datePicker = datePicker;
    this.element = document.querySelector(id_element_value);
    this.element2 = document.querySelector(id_element_to_show_ex);
    this._createText()(datePicker.get_day_month_year());
    calDateBooking();
    this.calDateBooking = calDateBooking;
    this.element.onclick = function () {
      console.log("test");
      _this._openPicker();
    };
  }

  _createClass(HandleInputDatePicker, [{
    key: "_openPicker",
    value: function _openPicker() {
      var dpsd = document.querySelector(".date-picker-sub-div-Big");
      if (dpsd.style.display === "block") {
        dpsd.style.display = "none";
      } else {
        dpsd.style.display = "block";
        this.datePicker.pass_elment_data(this._createText());
      }
    }
  }, {
    key: "remove_node",
    value: function remove_node() {
      while (this.element.firstChild) {
        this.element.firstChild.remove();
      }
    }
  }, {
    key: "_createText",
    value: function _createText() {
      var _this4 = this;
      return function (text) {
        _this4.remove_node();
        _this4.element.className = "date_picker_input";
        var createElementDiv = document.createElement("div");
        createElementDiv.className = "row";
        var createDivContantH5 = document.createElement("div");
        createDivContantH5.className = "col-9 text-center";
        var createDivContantICalendar = document.createElement("div");
        createDivContantICalendar.className = "col-3 text-center";
        var createH5 = document.createElement("a");
        var textNode = document.createTextNode(text);
        createH5.appendChild(textNode);
        var createDateI = document.createElement("i");
        createDateI.className = "fas fa-calendar-day";
        createDivContantH5.appendChild(createH5);
        createDivContantICalendar.appendChild(createDateI);
        createElementDiv.appendChild(createDivContantH5);
        createElementDiv.appendChild(createDivContantICalendar);
        var textSplit = text.split("/"); // day , month , year
        var date_ = new Date(textSplit[1] + "/" + textSplit[0] + "/" + textSplit[2]); // month/day/year

        _this4.element2.innerHTML = days[date_.getDay()] + " " + date_.getDate() + " " + thaiMonths[date_.getMonth()] + " \u0E1E.\u0E28. " + (date_.getFullYear() + 543);
        _this4.element.appendChild(createElementDiv);

        if (_this4.calDateBooking) {
          _this4.calDateBooking();
        }
      };
    }
  }]);

  return HandleInputDatePicker;
}();