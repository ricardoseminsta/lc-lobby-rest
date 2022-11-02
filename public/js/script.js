function getCurrentHour() {
    d = new Date();
    h = d.getHours();
    m = d.getMinutes();

    time = (h && m) < 10 ? '0' + d.getHours() + ':' + '0' + d.getMinutes() : d.getHours() + ':' + d.getMinutes();

    return time;
}

function subForm() {
    document.getElementById("formVisit").submit();
}

function setArrived() {
    button = document.getElementById("visitSub").addEventListener("click", function (event) {
        if (event) {
            event.preventDefault();
            document.getElementById("arrived").value = getCurrentHour();
            console.log(document.getElementById("arrived").value);
            subForm();
        } else {
            log('erro de evento')
        }
    });
}