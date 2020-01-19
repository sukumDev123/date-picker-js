# Show Date picker

I would create some libery for date picker

#### in html tag like index.html

```
    <-- Handle about calendar  -->
    <div class="date-picker-sub-div-Big">
      <div class="date-picker-sub-div">
        <div class="select_month" id="select_month"></div>
        <div id="date_">
          <div id="date_picker"></div>
        </div>
      </div>
    </div>


    <-- Handle about date picker  -->
    <div class="date_picker_input"></div>

    <-- Handle show date for thai day, date, month, year  -->
    <div class="show_pickerI"></div>


```

### init srcipt class

```
    // some function for handle calculation date something
    function calulationSomething() {
        console.log("some calulator equiption");
    }
    let datePicker = new DatePickerClass();
    new HandleInputDatePicker(
      "#date_picker_input",
      datePicker,
      "#show_pickerI",
      calulationSomething
    );


```
