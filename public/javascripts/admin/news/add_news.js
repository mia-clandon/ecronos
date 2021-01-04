window.addEventListener('load', function () {
    document.getElementById('sampleeditor').setAttribute('contenteditable', 'true');
    document.getElementById('sampleeditor2').setAttribute('contenteditable', 'true');
    document.getElementById('sampleeditor3').setAttribute('contenteditable', 'true');
    document.getElementById('sampleeditor4').setAttribute('contenteditable', 'true');
});

function format(command, value) {
    document.execCommand(command, false, value);
}

function process() {
    document.getElementById("hidden").value = document.getElementById("sampleeditor").innerHTML;
    document.getElementById("hidden2").value = document.getElementById("sampleeditor2").innerHTML;
    document.getElementById("hidden3").value = document.getElementById("sampleeditor3").innerHTML;
    document.getElementById("hidden4").value = document.getElementById("sampleeditor4").innerHTML;
    return true;
}
