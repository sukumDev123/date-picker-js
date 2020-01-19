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
    const dateNow = new Date();
    this.chooseMonth = dateNow.getMonth();
    this.chooseYear = dateNow.getFullYear();
    this.chooseDay = dateNow.getDate();
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

      if (datePicker.children.length === 0) {
        // add day header Sunday , Monday , Tuesday
        days.forEach(d => {
          const createDiv2 = document.createElement("div");
          createDiv2.className = "sub-date-p";
          const createText = document.createTextNode(d);
          createDiv2.appendChild(createText);
          createDiv.appendChild(createDiv2);
        });
        datePicker.appendChild(createDiv);
      } else {
        datePicker.children[1].remove();
      }

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
              this.chooseMonth == new Date().getMonth() &&
              this.chooseYear == new Date().getFullYear()
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

  format_header_show_month(mNow) {
    return `${months[mNow]} ${this.chooseYear}`;
  }

  initMonths() {
    let mNow = this.chooseMonth;

    const mSelete = `${months[mNow]}  ${this.chooseYear}`;
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
      const {
        monthNow,
        showMonthAndYear
      } = this.whenUserClickNextOrPrevYearOrMonth(
        mNow < 11,
        mNow + 1,
        0,
        parseInt(this.chooseYear) + 1
      );
      mNow = monthNow;
      this.chooseMonth = mNow;
      createH5.innerHTML = showMonthAndYear;
      this.initDate(new Date(`${mNow + 1}/1/${this.chooseYear}`));
    };
    createButton.onclick = () => {
      const {
        monthNow,
        showMonthAndYear
      } = this.whenUserClickNextOrPrevYearOrMonth(
        mNow > 0,
        mNow - 1,
        months.length - 1,
        parseInt(this.chooseYear) - 1
      );
      mNow = monthNow;
      this.chooseMonth = mNow;
      createH5.innerHTML = showMonthAndYear;
      this.initDate(new Date(`${mNow + 1}/1/${this.chooseYear}`));
    };
    document.getElementById("select_month").appendChild(createButton);
    document.getElementById("select_month").appendChild(createMD);
    document.getElementById("select_month").appendChild(createButton2);
  }

  whenUserClickNextOrPrevYearOrMonth(
    _if_,
    v_if_is_true,
    v_if_is_false,
    year_plus_or_neg
  ) {
    this.chooseYear = _if_ ? this.chooseYear : year_plus_or_neg;
    const monthNow = _if_ ? v_if_is_true : v_if_is_false;
    return {
      monthNow: monthNow,
      showMonthAndYear: this.format_header_show_month(monthNow)
    };
  }
}
