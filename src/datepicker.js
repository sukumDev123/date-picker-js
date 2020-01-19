var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
var thaiMonths = [
  "ม.ค.",
  "ก.พ.",
  "มี.ค",
  "เม.ย",
  "พ.ค",
  "มิ.ย",
  "ก.ค",
  "ส.ค",
  "ก.ย",
  "ต.ค",
  "พ.ย",
  "ธ.ค"
];
var days = ["อ.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."];

class DatePickerClass {
  constructor() {
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
    this.chooseDay = "";

    this.chooseMonth = "";
    this.chooseYear = "";
    this.functions = [];
    this.initMonths();
    this.initDate(new Date());
  }
  formatDateMonth(date) {
    return date >= 10 ? date : `0${date}`;
  }

  pass_elment_data(element) {
    this.element = element;
  }
  delete_element_data() {
    this.element = element;
  }
  get_day_month_year() {
    return `${this.formatDateMonth(this.chooseDay)}/${this.formatDateMonth(
      this.chooseMonth + 1
    )}/${this.chooseYear}`;
  }

  /**
   *
   * @param {Date} dateNow
   */
  _createDatePicker(dateNow) {
    let datePicker = [];
    const findDateLimitEachMonth = this.mS[months[dateNow.getMonth()]];
    this.chooseMonth = dateNow.getMonth();
    this.chooseYear = dateNow.getFullYear();
    this.chooseDay = dateNow.getDate();
    for (let i = 1; i <= findDateLimitEachMonth; i++) {
      const date = i;
      const month = dateNow.getMonth();
      const dateClass = new Date(
        `${month + 1}/${date}/${dateNow.getFullYear()}`
      );
      const checkMonth_E = dateClass.getMonth() + 1 == month + 1; // เช็คเดือนที่รับมาต้องเท่ากับเดือนที่จะส่งออก สมมุติ รับเดือนมา เป็นเดือน 2 ผลที่ด้จาก class date ต้องเป็นเดือน 2 ไม่ใช่เดือน อื่นๆ
      if (dateClass != "Invalid Date" && checkMonth_E) {
        datePicker.push([dateClass.getDate(), days[dateClass.getDay()]]);
      }
    }
    return datePicker;
  }

  /**
   *
   * @param {Date} date
   */
  initDate(date) {
    let dateP = this._createDatePicker(date);
    if (dateP.length) {
      const datePicker = document.getElementById("date_picker");
      const createDiv = document.createElement("div");
      createDiv.className = "datePicker";
      while (datePicker.firstChild) {
        datePicker.firstChild.remove();
      }

      // add day header Sunday , Monday , Tuesday
      days.forEach(d => {
        const createDiv2 = document.createElement("div");
        createDiv2.className = "sub-date-p";
        const createText = document.createTextNode(d);
        createDiv2.appendChild(createText);
        createDiv.appendChild(createDiv2);
      });
      datePicker.appendChild(createDiv);
      const createTr2 = document.createElement("div");
      createTr2.className = "datePicker";
      let indexGo = false;
      let index = 0;
      for (let i = 0; i <= 35; i++) {
        try {
          const createTd = document.createElement("div");
          createTd.className = "createTd";
          const ind = days.indexOf(dateP[index][1]);
          createTd.className = "date_";
          if (i == ind) {
            indexGo = true;
          }
          if (indexGo) {
            const text = document.createTextNode(dateP[index][0]);
            if (
              dateP[index][0] == new Date().getDate() &&
              this.chooseMonth == new Date().getMonth()
            ) {
              createTd.className = "createTdNow";
            }
            createTd.appendChild(text);
            index++;
          } else {
            const text = document.createTextNode("");
            createTd.appendChild(text);
          }
          createTd.onclick = () => {
            Array.from(createTr2.children).forEach(d => {
              if (d.className !== "createTdNow") d.className = "";
            });
            createTd.className = "createTdActive";
            this.chooseDay = createTd.innerHTML;

            this.element(this.get_day_month_year());
            document.querySelector(".date-picker-sub-div-Big").style.display =
              "none";
          };
          createTr2.appendChild(createTd);
          datePicker.appendChild(createTr2);
        } catch (error) {
          // console.log({ error });
        }
      }
    }
  }

  initMonths() {
    let mNow = new Date().getMonth();

    const mSelete = months[mNow];
    const createMD = document.createElement("div");
    const createH5 = document.createElement("h5");
    createH5.style.color = "white";
    const textNode = document.createTextNode(mSelete);
    createH5.appendChild(textNode);
    createMD.appendChild(createH5);

    const createButton = document.createElement("button");
    const text1 = document.createTextNode("<");
    createButton.className = "btnNextPrev pointer";
    const createButton2 = document.createElement("button");
    const text2 = document.createTextNode(">");
    createButton2.className = "btnNextPrev pointer";

    createButton.appendChild(text1);
    createButton2.appendChild(text2);
    createButton2.onclick = () => {
      if (mNow < 11) {
        mNow = mNow + 1;
        createMD.innerHTML = months[mNow];
        this.initDate(new Date(`${mNow + 1}/1/2020`));
      }
    };
    createButton.onclick = () => {
      if (mNow > 0) {
        mNow = mNow - 1;
        createMD.innerHTML = months[mNow];
        this.initDate(new Date(`${mNow + 1}/1/2020`));
      }
    };
    document.getElementById("select_month").appendChild(createButton);
    document.getElementById("select_month").appendChild(createMD);
    document.getElementById("select_month").appendChild(createButton2);
  }
}

class HandleInputDatePicker {
  /**
   *
   * @param {string} id_element_value id of element div for set value of date set is DD/MM/YY like a input element but it it div id ex. #booking_start
   * @param {DatePickerClass} datePicker new DatePickerClass()
   * @param {string} id_element_to_show_ex id of element of label or something like a tag h1 , h3 or other for show Full date like a day date month and year
   * @param {function} calDateBooking function this for cal date ex. 1 day 80: 30 hr.
   */
  constructor(
    id_element_value,
    datePicker,
    id_element_to_show_ex,
    calDateBooking
  ) {
    this.checkStatus = false;
    this.datePicker;
    this.text_for = "";
    this.datePicker = datePicker;
    this.element = document.querySelector(id_element_value);
    this.element2 = document.querySelector(id_element_to_show_ex);
    this._createText()(datePicker.get_day_month_year());
    calDateBooking();
    this.calDateBooking = calDateBooking;
    this.element.onclick = () => {
      console.log("test");
      this._openPicker();
    };
  }

  _openPicker() {
    const dpsd = document.querySelector(".date-picker-sub-div-Big");
    if (dpsd.style.display === "block") {
      dpsd.style.display = "none";
    } else {
      dpsd.style.display = "block";
      this.datePicker.pass_elment_data(this._createText());
    }
  }

  remove_node() {
    while (this.element.firstChild) {
      this.element.firstChild.remove();
    }
  }
  _createText() {
    var _this4 = this;
    return text => {
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
      var date_ = new Date(`${textSplit[1]}/${textSplit[0]}/${textSplit[2]}`); // month/day/year

      _this4.element2.innerHTML = `${days[date_.getDay()]} ${date_.getDate()} ${
        thaiMonths[date_.getMonth()]
      } พ.ศ. ${date_.getFullYear() + 543}`;
      _this4.element.appendChild(createElementDiv);

      if (_this4.calDateBooking) {
        _this4.calDateBooking();
      }
    };
  }
}
