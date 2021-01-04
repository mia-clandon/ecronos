window.addEventListener('load', function () {
    document.getElementById('sampleeditor').setAttribute('contenteditable', 'true');
    document.getElementById('sampleeditor2').setAttribute('contenteditable', 'true');
    document.getElementById('sampleeditor3').setAttribute('contenteditable', 'true');
    document.getElementById('sampleeditor4').setAttribute('contenteditable', 'true');
});

function format(command, value) {
    document.execCommand(command, false, value);
}

function process(form) {
    document.getElementById("hidden").value = document.getElementById("sampleeditor").innerHTML;
    document.getElementById("hidden2").value = document.getElementById("sampleeditor2").innerHTML;
    document.getElementById("hidden3").value = document.getElementById("sampleeditor3").innerHTML;
    document.getElementById("hidden4").value = document.getElementById("sampleeditor4").innerHTML;

    if (document.getElementById('hidden').value === "") {
        document.getElementById('err_hidden').innerHTML = 'Поле обязательно для заполнения';
        document.getElementById('hidden_errors').innerHTML = 'Есть поля, которые были незаполнены!';
        return false
    }
    if (document.getElementById('hidden2').value === ""){
        document.getElementById('err_hidden2').innerHTML = 'Поле обязательно для заполнения';
        document.getElementById('hidden_errors').innerHTML = 'Есть поля, которые были незаполнены!';
        return false
    }
    if (document.getElementById('hidden3').value === ""){
        document.getElementById('err_hidden3').innerHTML = 'Поле обязательно для заполнения';
        document.getElementById('hidden_errors').innerHTML = 'Есть поля, которые были незаполнены!';
        return false
    }
    if (document.getElementById('hidden4').value === ""){
        document.getElementById('err_hidden4').innerHTML = 'Поле обязательно для заполнения';
        document.getElementById('hidden_errors').innerHTML = 'Есть поля, которые были незаполнены!';
        return false
    }
    if (document.getElementById('profile').value === ""){
        document.getElementById('err_hidden5').innerHTML = 'Поле обязательно для заполнения';
        document.getElementById('hidden_errors').innerHTML = 'Есть поля, которые были незаполнены!';
        return false
    }
    if (document.getElementById('hidden6').value === ""){
        document.getElementById('err_hidden6').innerHTML = 'Поле обязательно для заполнения';
        document.getElementById('hidden_errors').innerHTML = 'Есть поля, которые были незаполнены!';
        return false
    }


    return true;
}
