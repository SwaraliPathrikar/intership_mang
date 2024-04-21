
const internshipStatusSelect = document.getElementById("internshipStatus");
const internshipDescriptionDiv = document.getElementById("internshipDescription");
const messageDiv = document.getElementById("message");

internshipStatusSelect.addEventListener("change", function() {
  if (this.value === "yes") {
    internshipDescriptionDiv.style.display = "block";
  } else {
    internshipDescriptionDiv.style.display = "none";
  }
});

function submitForm() {
  const rollNumber = document.getElementById("rollNumber").value;
  const semesterNumber = document.getElementById("semesterNumber").value;
  const internshipStatus = document.getElementById("internshipStatus").value;
  const internshipTitle = document.getElementById("internshipTitle").value;
  const internshipInfo = document.getElementById("internshipInfo").value;

  if (rollNumber === "" || semesterNumber === "") {
    alert("Please enter a valid roll number and semester number.");
    return false;
  }

  if (internshipStatus === "yes" && internshipTitle === "") {
    alert("Please enter a title for your internship description.");
    return false;
  }

  const formData = {
    rollNumber: rollNumber,
    semesterNumber: semesterNumber,
    internshipStatus: internshipStatus,
    internshipTitle: internshipTitle,
    internshipInfo: internshipInfo
  };

  
}

