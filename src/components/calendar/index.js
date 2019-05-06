import React from "react";
import moment from "moment";
import { range } from "moment-range";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import "./calendar.css";
export default class Calendar extends React.Component {

  state = {
    selectedMonth: moment(),
    selectedYear: moment().startOf("year"),
    selectedMonthEvents: [],  
    dateObject: moment(),
    selectedDay: moment().startOf("day"),
    showEvents: false,
    WeekOfmonth: true,

  };


constructor(props) {
    super(props);
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this.goToCurrentMonthView = this.goToCurrentMonthView.bind(this);
    this.addEvent = this.addEvent.bind(this);
    this.showCalendar = this.showCalendar.bind(this);
    this.initialiseEvents();
    
}




 freeday = d => {
    if (this.state.WeekOfmonth == true)
      return (
        moment([
          this.state.dateContext.year(),
          this.state.dateContext.month(),
          d
        ]).day() === 5 ||
        moment([
          this.state.dateContext.year(),
          this.state.dateContext.month(),
          d
        ]).day() === 6
      );
    else
      return (
        moment([
          this.state.dateContextWeeker.year(),
          this.state.dateContextWeeker.month(),
          d
        ]).day() === 5 ||
        moment([
          this.state.dateContextWeeker.year(),
          this.state.dateContextWeeker.month(),

          d
        ]).day() === 6
      );
  };
  
addEvent = this.addEvent.bind(this);
showCalendar = this.showCalendar.bind(this);

  daysInMonth = () => {
    return this.state.dateObject.daysInMonth();
  };

year = () => {    
   return this.state.selectedYear.format("Y");
    };
  currentDay = () => {
    return this.state.dateObject.format("D");
  };
  firstDayOfMonth = () => {
    let dateObject = this.state.dateObject;
    let firstDay = moment(dateObject)
      .startOf("month")
      .format("d"); // Day of week 0...1..5...6
    return firstDay;
  };
  month = () => {
    return this.state.dateObject.format("MMMM");
  };
  showMonth = (e, month) => {
    this.setState({
      showMonthTable: !this.state.showMonthTable,
     showDateTable: !this.state.showDateTable
        
    });
  };
  showCalendar() {
    this.setState({
      selectedMonth: this.state.selectedMonth,
      selectedDay: this.state.selectedDay,
      showEvents: false
    });
  }
goToCurrentMonthView(){
    const currentMonthView = this.state.selectedMonth;
    this.setState({
      selectedMonth: moment()
    });
  }
  
/*this.state.showYearTable = true*/

previous() {
    const currentMonthView = this.state.selectedMonth;

    this.setState({
      selectedMonth: currentMonthView.subtract(1, "month")
    });
  }

  next() {
    const currentMonthView = this.state.selectedMonth;
    this.setState({
      selectedMonth: currentMonthView.add(1, "month")
    });
  }

  getDates(startDate, stopDate) {
    var dateArray = [];
    var currentDate = moment(startDate);
    var stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format("YYYY"));
      currentDate = moment(currentDate).add(1, "year");
    }
    return dateArray;
  }
renderDayLabel() {
    const currentSelectedDay = this.state.selectedDay;
    return (
      <span className="box month-label">
        {currentSelectedDay.format("DD MMMM YYYY")}
      </span>
    );
  }
  onDayClick = (e, d) => {
      
   this.state.showEvents = true;
      
    this.setState(
      {
        selectedDay: d
      },
      () => {
        console.log("SELECTED DAY: ", this.state.selectedDay);
      }
    );
  };





select(day) {
    this.setState({
      selectedMonth: day.date,
      selectedDay: day.date.clone(),
      showEvents: true
    });
  }

handleAdd() {
    const monthEvents = this.state.selectedMonthEvents;
    const currentSelectedDate = this.state.selectedDay;

    let newEvents = [];

    var eventTitle = prompt("Please enter a name for your event: ");

    switch (eventTitle) {
      case "":
        alert("Event name cannot be empty.");
        break;
      case null:
        alert("Changed your mind? You can add one later!");
        break;
      default:
        var newEvent = {
          title: eventTitle,
          date: currentSelectedDate,
          dynamic: true
        };

        newEvents.push(newEvent);

        for (var i = 0; i < newEvents.length; i++) {
          monthEvents.push(newEvents[i]);
        }

        this.setState({
          selectedMonthEvents: monthEvents
        });
        break;
    }
  }


  addEvent() {
    const currentSelectedDate = this.state.selectedDay;
    let isAfterDay = moment().startOf("day").subtract(1, "d");
    if (currentSelectedDate.isAfter(isAfterDay)) {
      this.handleAdd();
    } else {
      if (window.confirm("Are you sure you want to add an event in the past?")) {
        this.handleAdd();
      } else {
      } // end confirm past
    }
  }

  removeEvent(i) {
    const monthEvents = this.state.selectedMonthEvents.slice();
    const currentSelectedDate = this.state.selectedDay;

    if (window.confirm("Are you sure you want to remove this event?")) {
      let index = i;

      if (index != -1) {
        monthEvents.splice(index, 1);
      } else {
        alert("No events to remove on this day!");
      }

      this.setState({
        selectedMonthEvents: monthEvents
      });
    }
  }

  initialiseEvents() {
    const monthEvents = this.state.selectedMonthEvents;

    let allEvents = [];

    var event1 = {
      title:
        "Press the Add button and enter a name for your event. P.S you can delete me by pressing me!",
      date: moment(),
      dynamic: false
    };

    var event2 = {
      title: "Event 2 - Meeting",
      date: moment().startOf("day").subtract(2, "d").add(2, "h"),
      dynamic: false
    };

    var event3 = {
      title: "Event 3 - Cinema",
      date: moment().startOf("day").subtract(7, "d").add(18, "h"),
      dynamic: false
    };

    var event4 = {
      title: "Event 4 - Theater",
      date: moment().startOf("day").subtract(16, "d").add(20, "h"),
      dynamic: false
    };

    var event5 = {
      title: "Event 5 - Drinks",
      date: moment().startOf("day").subtract(2, "d").add(12, "h"),
      dynamic: false
    };

    var event6 = {
      title: "Event 6 - Diving",
      date: moment().startOf("day").subtract(2, "d").add(13, "h"),
      dynamic: false
    };

    var event7 = {
      title: "Event 7 - Tennis",
      date: moment().startOf("day").subtract(2, "d").add(14, "h"),
      dynamic: false
    };

    var event8 = {
      title: "Event 8 - Swimmming",
      date: moment().startOf("day").subtract(2, "d").add(17, "h"),
      dynamic: false
    };

    var event9 = {
      title: "Event 9 - Chilling",
      date: moment().startOf("day").subtract(2, "d").add(16, "h"),
      dynamic: false
    };
    
        var event10 = {
      title:
        "Hello World",
      date: moment().startOf("day").add(5, "h"),
      dynamic: false
    };

    allEvents.push(event1);
    allEvents.push(event2);
    allEvents.push(event3);
    allEvents.push(event4);
    allEvents.push(event5);
    allEvents.push(event6);
    allEvents.push(event7);
    allEvents.push(event8);
    allEvents.push(event9);
    allEvents.push(event10);

    for (var i = 0; i < allEvents.length; i++) {
      monthEvents.push(allEvents[i]);
    }

    this.setState({
      selectedMonthEvents: monthEvents
    });
  }




 renderMonthLabel() {
    const currentMonthView = this.state.selectedMonth;
    return (
      <div>
        {currentMonthView.format("MMMM YYYY")}
      </div>
    );
  }
  
  
  
  renderDayLabel() {
    const currentSelectedDay = this.state.selectedDay;
    return (
      <span className="box month-label">
        {currentSelectedDay.format("DD MMMM YYYY")}
      </span>
    );
  }
  
  renderWeeks() {
    const currentMonthView = this.state.selectedMonth;
    const currentSelectedDay = this.state.selectedDay;
    const monthEvents = this.state.selectedMonthEvents;

      
    let grday = true;  
      
    let weeks = [];
    let done = false;
    let previousCurrentNextView = currentMonthView
      .clone()
      .startOf("month")
      .subtract(1, "d")
      .day("Sunday");
    let count = 0;
    let monthIndex = previousCurrentNextView.month();
    while (!done) {
  
        
      weeks.push(
        <Week
          previousCurrentNextView={previousCurrentNextView.clone()}
          currentMonthView={currentMonthView}
          monthEvents={monthEvents}
          selected={currentSelectedDay}
          select={day => this.select(day)}
        />
      );
      previousCurrentNextView.add(1, "w");
      done = count++ > 2 && monthIndex !== previousCurrentNextView.month();
      monthIndex = previousCurrentNextView.month();
    }
    return weeks;
  }



  render() {
    const currentMonthView = this.state.selectedMonth;
    const currentSelectedDay = this.state.selectedDay;
    const showEvents = this.state.showEvents;
    
     if (showEvents){
      return (
        <div className="tail-datetime-calendar">
        <div className="calendar-navi">
             <span
          onClick={e => {
            this.showCalendar();
          }}
           className="back"><img src={require("./img/arrow_left.png")}/>
             </span>

         {(
           
            <span
              class="calendar_2"
            >
<div className="row title-header">
              {this.renderDayLabel()}
            </div>
            </span>

          )}
          
            <span
          onClick={e => {
            this.handleAdd();
          }}
           className="add"><img src={require("./img/plus_1.png")}/>
             </span>
              </div>
          <Events
            selectedMonth={this.state.selectedMonth}
            selectedDay={this.state.selectedDay}
            selectedMonthEvents={this.state.selectedMonthEvents}
            removeEvent={i => this.removeEvent(i)}
            />
        </div>
    
      );
} else {
             return (
      <div className="tail-datetime-calendar">
        <div className="calendar-navi">
          <span
              onClick={this.previous}
            class="calendar-button button-prev"
          >prev</span>
          { (
            <span
              className="calendar-label"
            >
              {this.renderMonthLabel()}
            </span>
          )}
           <span
          onClick={e => {
            this.next();
          }}
          className="calendar-button button-next"
        >next</span>
        </div>
       

          <div className="calendar-date">
             <DayNames />
           <div className="days-container">
                {this.renderWeeks()}
          </div>
        <span className="now_time">Today: {this.currentDay() + ' '  + this.month()+ ' ' +this.year() }</span>
</div>
   
      </div>

      );

    }
  }
  
}

class Events extends React.Component {
  render() {
    const currentMonthView = this.props.selectedMonth;
    const currentSelectedDay = this.props.selectedDay;
    const monthEvents = this.props.selectedMonthEvents;
    const removeEvent = this.props.removeEvent;

    const monthEventsRendered = monthEvents.map((event, i) => {
      return (
        <div
          key={event.title}
          className="event-container"
          onClick={() => removeEvent(i)}
        >
          <ReactCSSTransitionGroup
            component="div"
            className="animated-time"
            transitionName="time"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
            <div className="event-time event-attribute">
              {event.date.format("HH:mm")}
            </div>
          </ReactCSSTransitionGroup>
          <ReactCSSTransitionGroup
            component="div"
            className="animated-title"
            transitionName="title"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
            <div className="event-title event-attribute">{event.title}</div>
          </ReactCSSTransitionGroup>
        </div>
      );
    });

    const dayEventsRendered = [];

    for (var i = 0; i < monthEventsRendered.length; i++) {
      if (monthEvents[i].date.isSame(currentSelectedDay, "day")) {
        dayEventsRendered.push(monthEventsRendered[i]);
      }
    }

    return (
      <div className="day-events">
        {dayEventsRendered}
      </div>
    );
  }
}


class DayNames extends React.Component {
  render() {
    return (
      <div className="row days-header">
        <span className="box day-name">S</span>
        <span className="box day-name">M</span>
        <span className="box day-name">T</span>
        <span className="box day-name">W</span>
        <span className="box day-name">T</span>
        <span className="box day-name">F</span>
        <span className="box day-name">S</span>
      </div>
    );
  }
}



class Week extends React.Component {
    
  
  render() {
    let days = [];
    let date = this.props.previousCurrentNextView;
    let currentMonthView = this.props.currentMonthView;
    let selected = this.props.selected;
    let select = this.props.select;
    let monthEvents = this.props.monthEvents;

    for (var i = 0; i < 7; i++) {

      var dayHasEvents = false;
      for (var j = 0; j < monthEvents.length; j++) {
        if (monthEvents[j].date.isSame(date, "day")) {
          dayHasEvents = true;
        }
      }

      let day = {
        name: date.format("dd").substring(0, 1),
        number: date.date(),
        isCurrentMonth: date.month() === currentMonthView.month(),
        isToday: date.isSame(new Date(), "day"),
        date: date,
        hasEvents: dayHasEvents
      };

      days.push(<Day day={day} selected={selected} select={select} />);
      date = date.clone();
      date.add(1, "d");
    }
    return (
      <div className="row week">
        {days}
      </div>
    );
  }
}






class Day extends React.Component {
  render() {
    let day = this.props.day;
    let selected = this.props.selected;
    let select = this.props.select;
    let week = moment().isoWeekday(1); 
    let sun = moment().isoWeekday(7);

    return (
      <div
        className={
          "day" +
          (day.isToday ? " today" : "") +
          (day.isCurrentMonth ? "" : "different-month") +
          (day.date.isSame(selected) ? " selected" : "") +
          (day.hasEvents ? " has-events" : "")+
          (day.date.day() == 0 || day.date.day() == 6 ? " freeday" : "")
        }
        onClick={() => select(day)}
      >
        <div className="day-number">{day.number}</div>
      </div>
    );
  }
}
