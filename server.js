function loadStudents() {
  fetch('students.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load students data');
      }
      return response.json();
    })
    .then(data => {
      students = data;
      displayStudents();
    })
    .catch(error => {
      console.error('Error loading students data:', error);
    });
}

function saveStudents() {
  fetch('students.json', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(students)
  })
  .catch(error => {
    console.error('Error saving students data:', error);
  });
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

function clearFormFields() {
  document.getElementById('firstName').value = '';
  document.getElementById('lastName').value = '';
  document.getElementById('age').value = '';
  document.getElementById('year').value = '';
  document.getElementById('faculty').value = '';
  document.getElementById('courses').value = '';
}

loadStudents();
const form = document.getElementById('studentForm');
form.addEventListener('submit', addStudent);