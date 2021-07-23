const MD5 = new Hashes.MD5;
const inputForm = document.querySelector("#passcode");

const getMessages = () => {
    const messagesRef = firebase.database().ref();
        messagesRef.on('value', (snapshot) => {
        const data = snapshot.val();
        for(key in data) {
            if(data[key]["passcode"] == MD5.hex(inputForm.value)) {
                renderMessageAsHtml(data[key]["message"]);
                break;
            }
        }
    });
}

const renderMessageAsHtml = (message) => {
    // Hide input form
    passcodeInput.style.display = 'none';

    // Render message as HTML
    const messageDisplay = document.getElementById('message');
    messageDisplay.innerHTML = message;
}