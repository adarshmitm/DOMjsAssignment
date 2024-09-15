document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('student-form');
    const studentTable = document.querySelector('#student-table tbody');
    let editIndex = null;

    // Load existing students from localStorage
    let students = JSON.parse(localStorage.getItem('students')) || [];

    // Render students to table
    const renderStudents = () => {
         // Clear the table before adding rows
        studentTable.innerHTML = '';
        students.forEach((student, index) => {
            const row = `
                <tr>
                    <td>${student.name}</td>
                    <td>${student.id}</td>
                    <td>${student.email}</td>
                    <td>${student.contact}</td>
                    <td>
                        <button onclick="editStudent(${index})" class="editBtn">Edit</button>
                        <button onclick="deleteStudent(${index})" class="deleteBtn">Delete</button>
                    </td>
                </tr>
            `;
            studentTable.innerHTML += row;
        });
    };

    const saveToLocalStorage = () => {
        localStorage.setItem('students', JSON.stringify(students));
    };

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('student-name').value;
        const id = document.getElementById('student-id').value;
        const email = document.getElementById('email').value;
        const contact = document.getElementById('contact-no').value;

        if (editIndex !== null) {
            // Update existing record
            students[editIndex] = { name, id, email, contact };
            editIndex = null;
        } else {
            // Add new record
            students.push({ name, id, email, contact });
        }

        saveToLocalStorage();
        renderStudents();
        form.reset();
    });

    // Edit student record
    window.editStudent = (index) => {
        const student = students[index];
        document.getElementById('student-name').value = student.name;
        document.getElementById('student-id').value = student.id;
        document.getElementById('email').value = student.email;
        document.getElementById('contact-no').value = student.contact;
        editIndex = index;
    };

    // Delete student record
    window.deleteStudent = (index) => {
        students.splice(index, 1);
        saveToLocalStorage();
        renderStudents();
    };

    renderStudents();
});