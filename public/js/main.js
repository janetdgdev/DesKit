// Sticky Notes
const addBox = document.querySelector('.add-box'),
popupBox = document.querySelector('.popup-box'),
popupTitle = popupBox.querySelector('header p'),
closeIcon = document.querySelector('header i'),
titleEl = document.querySelector('#title'),
descEl = document.querySelector('#desc'),
addBtn = document.querySelector('#addNote');


const months= ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const notes = JSON.parse(localStorage.getItem('notes') || '[]');
let isUpdate = false, updateId;

function showNotes() {
    document.querySelectorAll('.note').forEach(note => note.remove());
    notes.forEach((note, index)=>{
        let liEl=`<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${note.description}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onClick="updateNote(${index}, '${note.title}', '${note.description}')"  class="uil uil-edit"></i>
                                <i onClick="deleteNote(${index})" class="uil uil-trash"></i>
                            </div>
                        </div>
                    </li>`;
        addBox.insertAdjacentHTML('afterend', liEl);
    });
}

showNotes();

function deleteNote(noteId) {
    let confirmDelete= confirm("Are you sure you want to delete this note?");
    if(!confirmDelete) return;
    notes.splice(noteId, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    showNotes();
}

function updateNote(noteId, title, desc) {
    isUpdate = true;
    updateId = noteId;
    addBox.click();
    titleEl.value = title;
    descEl.value = desc;
    addBtn.innerText = 'Edit Note';
    popupTitle.innerText = 'Editing a Note';
}


addBox.addEventListener('click', ()=>{
    titleEl.focus();
    popupBox.classList.add('show')
});

closeIcon.addEventListener('click', ()=>{
    isUpdate = false;
    titleEl.value = '';
    descEl.value = '';
    addBtn.innerText = 'Add Note';
    popupTitle.innerText = 'Add a new Note';
    popupBox.classList.remove('show');
});

addBtn.addEventListener('click', (e)=>{
  e.preventDefault();
  let noteTitle = titleEl.value,
  noteDesc = descEl.value;
  if (noteTitle || noteDesc) {
      let dateEl= new Date(),
      month = months[dateEl.getMonth()],
      day = dateEl.getDate(),
      year = dateEl.getFullYear();


      let noteInfo = {
          title: noteTitle,
          description: noteDesc,
          date: `${month} ${day} ${year}`
      }
      
      if (!isUpdate) {
          notes.push(noteInfo);
      }else{
          isUpdate = false;
          notes[updateId] = noteInfo;
      }
      
      localStorage.setItem('notes', JSON.stringify(notes));
      closeIcon.click();
      showNotes();
  }
});

// Timer
const timer = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15,
  longBreakInterval: 4,
  sessions: 0,
};

let interval;

// const buttonSound = new Audio('button-sound.mp3');
const mainButton = document.getElementById('js-btn');
mainButton.addEventListener('click', () => {
  // buttonSound.play();
  const { action } = mainButton.dataset;
  if (action === 'start') {
    startTimer();
  } else {
    stopTimer();
  }
});

const modeButtons = document.querySelector('#js-mode-buttons');
modeButtons.addEventListener('click', handleMode);

function getRemainingTime(endTime) {
  const currentTime = Date.parse(new Date());
  const difference = endTime - currentTime;

  const total = Number.parseInt(difference / 1000, 10);
  const minutes = Number.parseInt((total / 60) % 60, 10);
  const seconds = Number.parseInt(total % 60, 10);

  return {
    total,
    minutes,
    seconds,
  };
}

function startTimer() {
  let { total } = timer.remainingTime;
  const endTime = Date.parse(new Date()) + total * 1000;

  if (timer.mode === 'pomodoro') timer.sessions++;

  mainButton.dataset.action = 'stop';
  mainButton.textContent = 'stop';
  mainButton.classList.add('active');

  interval = setInterval(function() {
    timer.remainingTime = getRemainingTime(endTime);
    updateClock();

    total = timer.remainingTime.total;
    if (total <= 0) {
      clearInterval(interval);

      switch (timer.mode) {
        case 'pomodoro':
          if (timer.sessions % timer.longBreakInterval === 0) {
            switchMode('longBreak');
          } else {
            switchMode('shortBreak');
          }
          break;
        default:
          switchMode('pomodoro');
      }
      // Sound
      // document.querySelector(`[data-sound="${timer.mode}"]`).play();

      startTimer();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(interval);

  mainButton.dataset.action = 'start';
  mainButton.textContent = 'start';
  mainButton.classList.remove('active');
}

function updateClock() {
  const { remainingTime } = timer;
  const minutes = `${remainingTime.minutes}`.padStart(2, '0');
  const seconds = `${remainingTime.seconds}`.padStart(2, '0');

  const min = document.getElementById('js-minutes');
  const sec = document.getElementById('js-seconds');
  min.textContent = minutes;
  sec.textContent = seconds;
  const progress = document.getElementById('js-progress');
  progress.value = timer[timer.mode] * 60 - timer.remainingTime.total;
}

function switchMode(mode) {
  timer.mode = mode;
  timer.remainingTime = {
    total: timer[mode] * 60,
    minutes: timer[mode],
    seconds: 0,
  };

  document
    .querySelectorAll('button[data-mode]')
    .forEach(e => e.classList.remove('active'));
  document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
  document.querySelector('#app').style.backgroundColor = `var(--${mode})`;
  document
    .getElementById('js-progress')
    .setAttribute('max', timer.remainingTime.total);

  updateClock();
}

function handleMode(event) {
  const { mode } = event.target.dataset;

  if (!mode) return;

  switchMode(mode);
  stopTimer();
}

document.addEventListener('DOMContentLoaded', () => {
  if ('Notification' in window) {
    if (
      Notification.permission !== 'granted' &&
      Notification.permission !== 'denied'
    ) {
      Notification.requestPermission().then(function(permission) {
        if (permission === 'granted') {
          new Notification(
            'Awesome! You will be notified at the start of each session'
          );
        }
      });
    }
  }

  switchMode('pomodoro');
});

//Calendar
// Calendar Variables
let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

let shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let monthAndYear = document.getElementById("monthAndYear");

// Events Storage
let calendarEvents = {}; // Initialize an empty object to store events
document.addEventListener("DOMContentLoaded", function () {
  const storedEvents = events.get("calendarEvents");
  calendarEvents = storedEvents || {}; // Load events or initialize to an empty object
  showCalendar(currentMonth, currentYear); // Render the calendar with stored events
});

var events = {
  // Save data to localStorage
  set: function(key, value) {
    if (!key || value === undefined || value === null) {
      return;
    }

    if (typeof value === "object") {
      value = JSON.stringify(value); // Serialize objects/arrays
    }

    localStorage.setItem(key, value);
  },

  // Retrieve data from localStorage
  get: function(key) {
    var value = localStorage.getItem(key);

    if (!value) {
      return; // Return undefined if no value exists
    }

    try {
      return JSON.parse(value); // Deserialize JSON
    } catch (e) {
      return value; // Return raw value if not JSON
    }
  },

  // Delete data from localStorage
  delete: function(key) {
    localStorage.removeItem(key);
  },

  // Clear all events from localStorage
  clear: function() {
    localStorage.clear();
  }
};

// Initialize Calendar
showCalendar(currentMonth, currentYear);

// Planner
let plannerDate = document.getElementById("plannerDate");

function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function goToToday() {
    currentMonth = today.getMonth();
    currentYear = today.getFullYear();
    showCalendar(currentMonth, currentYear);
}

function addEvent() {
  const eventInput = document.getElementById("eventInput");
  const eventText = eventInput.value.trim();

  if (!eventText) {
      alert("Please enter an event.");
      return;
  }

  const placeholder = eventInput.placeholder;
  const dateMatch = placeholder.match(/(\d+)\/(\d+)\/(\d+)/); // Matches DD/MM/YYYY
  if (!dateMatch) {
      alert("No valid date selected.");
      return;
  }

  const [_, day, month, year] = dateMatch;
  const dateKey = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  // Update events in memory
  if (!calendarEvents[dateKey]) {
      calendarEvents[dateKey] = [];
  }
  calendarEvents[dateKey].push(eventText);

  // Save to localStorage
  events.set("calendarEvents", calendarEvents);

  // Refresh the calendar display for the current month/year
  showCalendar(currentMonth, currentYear);

  // Clear the input field
  eventInput.value = '';
}


function showCalendar(month, year) {
  let firstDay = new Date(year, month).getDay();
  let daysInMonth = 32 - new Date(year, month, 32).getDate();

  let tbl = document.getElementById("calendar-body");
  tbl.innerHTML = ""; // Clear previous cells

  monthAndYear.innerHTML = shortMonths[month] + " " + year;

  let date = 1;
  for (let i = 0; i < 6; i++) {
      let row = document.createElement("tr");
      row.classList.add("fixed-rows");

      for (let j = 0; j < 7; j++) {
          if (i === 0 && j < firstDay) {
              let cell = document.createElement("td");
              row.appendChild(cell);
          } else if (date > daysInMonth) {
              break;
          } else {
              let cell = document.createElement("td");
              cell.classList.add("px-2");
              cell.textContent = date;

              // Highlight today's date
              if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                  cell.classList.add("bg-info");
              }

              // Display events for this date
              const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
              if (calendarEvents[dateKey]) {
                  const eventList = document.createElement("ul");
                  eventList.classList.add("text-xs", "mx-auto", "p-0", "col-8");
                  calendarEvents[dateKey].forEach(event => {
                      const eventItem = document.createElement("li");
                      eventItem.classList.add('list-unstyled', 'fw-medium', 'badge', 'bg-primary', 'text-light', 'd-block', 'mt-1', 'overflow-auto')
                      eventItem.textContent = event;
                      eventList.appendChild(eventItem);
                  });
                  cell.appendChild(eventList);
              }

              // Add click event to add events
              cell.addEventListener("click", (function (day) {
                  return function () {
                      document.getElementById("eventInput").placeholder = `Add Event on ${day}/${month + 1}/${year}`;
                  };
              })(date));

              row.appendChild(cell);
              date++;
          }
      }

      tbl.appendChild(row);
  }
}

function showPlanner(){
  let planner = document.getElementById('planner-body')
  //attach eventlistener to ul
  //function will look at the date the ul is in and search events on that date
  //lastly, display on the planner

}