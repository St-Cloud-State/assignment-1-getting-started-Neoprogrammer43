//Array that stores the user applications
const applications = [];

// Function that accepts a user's application and returns a confrimation #
function acceptApplication() {
    const name = document.getElementById('applicantName').value;
    const zipCode = document.getElementById('zipCode').value;

    // Generate a application number. Increases by one for each app request. 
    const appNumber = applications.length + 1;

    // Creates a new application object with number, name, zipCode, and app status
    const newApplication = {
        appNumber: appNumber,
        name: name,
        zipCode: zipCode,
        status: 'received' // Default status. Status can later be changed.
    };

    // Adds the new user application to the list
    applications.push(newApplication);

    // Display confirmation message to the user
    const confirmationMessage = document.getElementById('confirmationMessage');
    confirmationMessage.innerHTML = `The Application Has Been Successfully Received. Your Application Number is: ${appNumber}`;
}

// Function that checks the status of an application. Tells user if no such app has been created.
function checkStatus() {
    const appNumber = document.getElementById('checkAppNumber').value;
    const application = applications.find(app => app.appNumber == appNumber);

    const statusMessage = document.getElementById('statusMessage');

    if (application) {
        statusMessage.innerHTML = `Status for Application ${appNumber}: ${application.status}`;
    } else {
        statusMessage.innerHTML = `Application Number ${appNumber} not found.`;
    }
}

// Function that handles changing the status depending on user click.
function updateStatus(statusCode) {
    const appNumber = document.getElementById('changeAppNumber').value;
    const statusOptions = ['received', 'processing', 'accepted', 'rejected'];
    const newStatus = statusOptions[statusCode - 1]; // Maps the status code to status.

    const application = applications.find(app => app.appNumber == appNumber);

    const changeStatusMessage = document.getElementById('changeStatusMessage');

    if (application) {
        application.status = newStatus;
        changeStatusMessage.innerHTML = `Status for Application ${appNumber} has been updated to: ${newStatus}`;
    } else {
        changeStatusMessage.innerHTML = `Application Number ${appNumber} not found.`;
    }
}
