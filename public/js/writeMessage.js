const MD5 = new Hashes.MD5;

const submitMessage = () => {
    const passcode = MD5.hex(document.querySelector("#passcode").value);
    const message = document.querySelector("#message").value;
    
    firebase.database().ref().push({
        passcode: passcode,
        message: message
    });
}

document.querySelector("#buttonSend").addEventListener("click", submitMessage);