function validateName() {
    if (!/^[a-zа-яёЁ]+$/i.test(document.getElementById("nameFeedback").value)) {
        document.getElementById("nameFeedbackWarning").classList.remove("d-none");
        return false;
    }
    document.getElementById("nameFeedbackWarning").classList.add("d-none");
    return true;
}

function validatePhone() {
    if (!/^\+\d\(\d{3}\)\d{3}\-\d{4}$/.test(document.getElementById("phoneFeedback").value)) {
        document.getElementById("phoneFeedbackWarning").classList.remove("d-none");
        return false;
    }
    document.getElementById("phoneFeedbackWarning").classList.add("d-none");
    return true;
}

function validateEmail() {
    if (!/^[a-zа-я]+[a-zа-я0-9._-]*@[a-z0-9-_]+\.[a-zа-я]{2,4}$/i.test(document.getElementById("emailFeedback").value)) {
        document.getElementById("emailFeedbackWarning").classList.remove("d-none");
        return false;
    }
    document.getElementById("emailFeedbackWarning").classList.add("d-none");
    return true;
}

function validateMessage() {
    if (!/^\w+$/i.test(document.getElementById("messageFeedback").value)) {
        document.getElementById("messageFeedbackWarning").classList.remove("d-none");
        return false;
    }
    document.getElementById("messageFeedbackWarning").classList.add("d-none");
    return true;
}

function validateForm() {
    return validateName() && validatePhone() && validateEmail() && validateMessage();
}

document.getElementById('submitFeedback').addEventListener('click', e => {
    document.getElementById("msgSubmitFeedback").classList.replace("d-inline-block", "d-none")
    e.preventDefault();
    if (validateForm()) {
        document.getElementById("msgSubmitFeedback").classList.replace("d-none", "d-inline-block");
    };
});