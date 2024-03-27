function loadStudents() {
  fetch('students.json')
    .then(response => response.json())
    .then(data => {
      students = data;
      displayStudents();
    })
}

function saveStudents() {
  fetch('students.json', {
    body: JSON.stringify(students),
  })
}

let students = [];

function addStudent(event) {
  event.preventDefault();
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const age = document.getElementById('age').value;
  const year = document.getElementById('year').value;
  const faculty = document.getElementById('faculty').value;
  const courses = document.getElementById('courses').value.split(',').map(course => course.trim());

  const student = {
    firstName: firstName,
    lastName: lastName,
    age: age,
    year: year,
    faculty: faculty,
    courses: courses
  };

  students.push(student);

  displayStudents();
  clearFormFields();
  saveStudents();
}

function displayStudents() {
  const studentList = document.getElementById('studentList');
  studentList.innerHTML = '';
  students.forEach((student, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = 
    `Name: ${student.firstName} ${student.lastName}, 
    Age: ${student.age}, 
    Year: ${student.year}, 
    Faculty: ${student.faculty}, 
    Courses: ${student.courses.join(', ')}`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      deleteStudent(index);
    });

    listItem.appendChild(deleteButton);
    studentList.appendChild(listItem);
  });
}

function deleteStudent(index) {
  students.splice(index, 1);
  displayStudents();
}

loadStudents();
const form = document.getElementById('studentForm');
form.addEventListener('submit', addStudent);