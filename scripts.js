let courseId = 1;

function addCourse() {
    const coursesDiv = document.getElementById('courses');

    const courseDiv = document.createElement('div');
    courseDiv.innerHTML = `
        <label for="grade${courseId}">Grade:</label>
        <input type="text" id="grade${courseId}" placeholder="A" style="text-transform: uppercase;">

        <label for="credit${courseId}">Credit Hours:</label>
        <input type="number" id="credit${courseId}" placeholder="3">

        <br>
    `;

    coursesDiv.appendChild(courseDiv);
    courseId++;
}

function deleteCourse() {
    const coursesDiv = document.getElementById('courses');

    // Get the last course added
    const lastCourse = coursesDiv.lastElementChild;

    // Check if there is a course to delete
    if (lastCourse) {
        coursesDiv.removeChild(lastCourse);
        courseId--;
    }
}

function calculateGPA() {
    const courses = document.querySelectorAll('[id^="grade"]');
    const credits = document.querySelectorAll('[id^="credit"]');
    const resultDiv = document.getElementById('result');

    let totalCredits = 0;
    let weightedSum = 0;
    let hasValidCourses = false;

    courses.forEach((course, index) => {
        const rawGrade = course.value.toUpperCase();
        const grade = parseGradeWithSign(rawGrade);
        const credit = parseFloat(credits[index].value);

        if (!isNaN(credit) && !isNaN(convertGradeToNumeric(grade))) {
            totalCredits += credit;
            weightedSum += credit * convertGradeToNumeric(grade);
            hasValidCourses = true;
        }
    });

    if (!hasValidCourses) {
        resultDiv.innerHTML = 'Please add at least one valid course.';
        return;
    }

    const gpa = weightedSum / totalCredits;
    resultDiv.innerHTML = `Your GPA is: ${gpa.toFixed(2)}`;
}

function parseGradeWithSign(rawGrade) {
    // Remove any non-alphabetic characters
    const cleanGrade = rawGrade.replace(/[^A-Za-z]/g, '');

    // Check if the last character is a plus or minus sign
    const sign = rawGrade.endsWith('+') ? '+' : rawGrade.endsWith('-') ? '-' : '';

    return cleanGrade + sign;
}
function resetForm() {
    const coursesDiv = document.getElementById('courses');
    coursesDiv.innerHTML = '';  // Remove all added courses
    courseId = 1;  // Reset courseId counter
    document.getElementById('result').innerHTML = '';  // Clear the result

    // Add a new default course after reset (optional)
    addCourse();
}

function convertGradeToNumeric(grade) {
    switch (grade) {
        case 'A+':
        case 'A':
            return 4.0;
        case 'A-':
            return 3.66;
        case 'B+':
            return 3.33;
        case 'B':
            return 3.00;
        case 'B-':
            return 2.66;
        case 'C+':
            return 2.33;
        case 'C':
            return 2.00;
        case 'C-':
            return 1.66;
        case 'D+':
            return 1.33;
        case 'D':
            return 1.0;
        case 'F':
            return 0.0;
        default:
            return NaN;
    }
}
