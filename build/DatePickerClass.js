"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var thaiMonths = ["ม.ค.", "ก.พ.", "มี.ค", "เม.ย", "พ.ค", "มิ.ย", "ก.ค", "ส.ค", "ก.ย", "ต.ค", "พ.ย", "ธ.ค"];
var days = ["อ.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."];

var DatePickerClass = function () {
  function DatePickerClass() {
    _classCallCheck(this, DatePickerClass);

    this.mS = {
      January: 31,
      February: 29,
      March: 31,
      April: 30,
      May: 31,
      June: 30,
      July: 31,
      August: 31,
      September: 30,
      October: 31,
      November: 30,
      December: 31
    };
    var dateNow = new Date();
    this.chooseMonth = dateNow.getMonth();
    this.chooseYear = dateNow.getFullYear();
    this.chooseDay = dateNow.getDate();
    this.functions = [];
    this.initMonths();
    this.initDate(new Date());
  }

  _createClass(DatePickerClass, [{
    key: "formatDateMonth",
    value: function formatDateMonth(date) {
      return date >= 10 ? date : "0" + date;
    }
  }, {
    key: "pass_elment_data",
    value: function pass_elment_data(element) {
      this.element = element;
    }
  }, {
    key: "delete_element_data",
    value: function delete_element_data() {
      this.element = element;
    }
  }, {
    key: "get_day_month_year",
    value: function get_day_month_year() {
      return this.formatDateMonth(this.chooseDay) + "/" + this.formatDateMonth(this.chooseMonth + 1) + "/" + this.chooseYear;
    }

    /**
     *
     * @param {Date} dateNow
     */

  }, {
    key: "_createDatePicker",
    value: function _createDatePicker(dateNow) {
      var datePicker = [];
      var findDateLimitEachMonth = this.mS[months[dateNow.getMonth()]];

      for (var i = 1; i <= findDateLimitEachMonth; i++) {
        var date = i;
        var month = dateNow.getMonth();
        var dateClass = new Date(month + 1 + "/" + date + "/" + dateNow.getFullYear());
        var checkMonth_E = dateClass.getMonth() + 1 == month + 1; // เช็คเดือนที่รับมาต้องเท่ากับเดือนที่จะส่งออก สมมุติ รับเดือนมา เป็นเดือน 2 ผลที่ด้จาก class date ต้องเป็นเดือน 2 ไม่ใช่เดือน อื่นๆ
        if (dateClass != "Invalid Date" && checkMonth_E) {
          datePicker.push([dateClass.getDate(), days[dateClass.getDay()]]);
        }
      }
      return datePicker;
    }
  }, {
    key: "initHeaderOfDate",
    value: function initHeaderOfDate(datePicker, createDiv) {
      if (datePicker.children.length === 0) {
        // add day header Sunday , Monday , Tuesday
        days.forEach(function (d) {
          var createDiv2 = document.createElement("div");
          createDiv2.className = "sub-date-p";
          var createText = document.createTextNode(d);
          createDiv2.appendChild(createText);
          createDiv.appendChild(createDiv2);
        });
        datePicker.appendChild(createDiv);
      } else {
        datePicker.children[1].remove();
      }
    }
    /**
     *
     * @param {Date} date
     */

  }, {
    key: "initDate",
    value: function initDate(date) {
      var _this = this;

      var dateP = this._createDatePicker(date);
      if (dateP.length) {
        (function () {
          var datePicker = document.getElementById("date_picker");
          var createDiv = document.createElement("div");
          createDiv.className = "datePicker";
          _this.initHeaderOfDate(datePicker, createDiv);

          var createTr2 = document.createElement("div");
          createTr2.className = "datePicker";
          var indexGo = false;
          var index = 0;
          for (var i = 0; i <= 35; i++) {
            try {
              (function () {
                var createTd = document.createElement("div");
                var ind = days.indexOf(dateP[index][1]); // check index of day

                // if this index === first date index of day set indexGo = true
                // ex. if date 1 == monday, sunday value is null.
                if (i == ind) {
                  indexGo = true;
                }
                //
                if (indexGo) {
                  var text = document.createTextNode(dateP[index][0]);
                  createTd.appendChild(text);
                  index++;
                  if (dateP[index][0] == new Date().getDate() && _this.chooseMonth == new Date().getMonth() && _this.chooseYear == new Date().getFullYear()) {
                    createTd.className = "createTdNow"; // set color for today
                  }
                } else {
                  var _text = document.createTextNode("");
                  createTd.appendChild(_text);
                }
                //
                createTd.onclick = function () {
                  Array.from(createTr2.children).forEach(function (d) {
                    if (d.className !== "createTdNow") d.className = "";
                  });
                  createTd.className = "createTdActive";
                  _this.chooseDay = createTd.innerHTML;

                  _this.element(_this.get_day_month_year());
                  document.querySelector(".date-picker-sub-div-Big").style.display = "none";
                };
                createTr2.appendChild(createTd);
                datePicker.appendChild(createTr2);
              })();
            } catch (error) {
              // console.log({ error });
            }
          }
        })();
      }
    }
  }, {
    key: "format_header_show_month",
    value: function format_header_show_month(mNow) {
      return months[mNow] + " " + this.chooseYear;
    }
  }, {
    key: "initMonths",
    value: function initMonths() {
      var _this2 = this;

      var mNow = this.chooseMonth;

      var mSelete = months[mNow] + "  " + this.chooseYear;
      var createMD = document.createElement("div");
      var createH5 = document.createElement("h5");
      createH5.style.color = "white";
      var textNode = document.createTextNode(mSelete);
      createH5.appendChild(textNode);
      createMD.appendChild(createH5);

      //
      var prevButton = document.createElement("button");
      var text1 = document.createTextNode("<");
      prevButton.className = "btnNextPrev pointer";
      //
      var nextButton = document.createElement("button");
      var text2 = document.createTextNode(">");
      nextButton.className = "btnNextPrev pointer";

      prevButton.appendChild(text1);
      nextButton.appendChild(text2);
      nextButton.onclick = function () {
        var _whenUserClickNextMon = _this2._whenUserClickNextMonthOrYear(mNow),
            monthNow = _whenUserClickNextMon.monthNow,
            showMonthAndYear = _whenUserClickNextMon.showMonthAndYear;

        mNow = monthNow;
        _this2.chooseMonth = mNow;
        createH5.innerHTML = showMonthAndYear;
        _this2.initDate(new Date(mNow + 1 + "/1/" + _this2.chooseYear));
      };
      prevButton.onclick = function () {
        var _whenUserClickPreviou = _this2._whenUserClickPreviousMonthOrYear(mNow),
            monthNow = _whenUserClickPreviou.monthNow,
            showMonthAndYear = _whenUserClickPreviou.showMonthAndYear;

        mNow = monthNow;
        _this2.chooseMonth = mNow;
        createH5.innerHTML = showMonthAndYear;
        _this2.initDate(new Date(mNow + 1 + "/1/" + _this2.chooseYear));
      };
      //  set button and header
      document.getElementById("select_month").appendChild(prevButton);
      document.getElementById("select_month").appendChild(createMD);
      document.getElementById("select_month").appendChild(nextButton);
    }
  }, {
    key: "_whenUserClickNextMonthOrYear",
    value: function _whenUserClickNextMonthOrYear(mNow) {
      var _if_ = mNow < 11;
      this.chooseYear = _if_ ? this.chooseYear : parseInt(this.chooseYear) + 1;
      var monthNow = _if_ ? mNow + 1 : 0;
      return {
        monthNow: monthNow,
        showMonthAndYear: this.format_header_show_month(monthNow)
      };
    }
  }, {
    key: "_whenUserClickPreviousMonthOrYear",
    value: function _whenUserClickPreviousMonthOrYear(mNow) {
      var _if_ = mNow > 0;
      this.chooseYear = _if_ ? this.chooseYear : parseInt(this.chooseYear) - 1;
      var monthNow = _if_ ? mNow - 1 : months.length - 1;
      return {
        monthNow: monthNow,
        showMonthAndYear: this.format_header_show_month(monthNow)
      };
    }
  }]);

  return DatePickerClass;
}();