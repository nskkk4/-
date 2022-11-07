// Маска phone
window.addEventListener("DOMContentLoaded", function() {
    [].forEach.call( document.querySelectorAll('.input__phone'), function(input) {
    var keyCode;
    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        var pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        var matrix = "+7 (___)-___-__-__",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, function(a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a
            });
        i = new_value.indexOf("_");
        if (i != -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i)
        }
        var reg = matrix.substr(0, this.value.length).replace(/_+/g,
            function(a) {
                return "\\d{1," + a.length + "}"
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
        if (event.type == "blur" && this.value.length < 5)  this.value = ""
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)

  });

});

let array = [];
let copy = [];

function Sort() {
    copy = [];
    for (let i = 0; i < array.length; i++){
        copy[i] = array[i];
    }

    copy.sort((a, b) => a[0].toLowerCase() > b[0].toLowerCase() ? 1 : -1);

    for (let i = 0; i < copy.length; i++){
        for (let j = 0; j < copy.length-1; j++){
            if (copy[j][2] < copy[j + 1][2]) {
                let q = copy[j];
                copy[j] = copy[j + 1];
                copy[j + 1] = q;
            }
        }
    }
}

function SortSearch(info) {
    copy = [];
    let j = 0;

    for (let i = 0; i < array.length; i++){            

        let one = array[i][0].toLowerCase();
        let two = info.toLowerCase();

        if(one.search(two) != -1) {
            copy[j] = array[i];
            j++;
        }
    }

    copy.sort((a, b) => a[0].toLowerCase() > b[0].toLowerCase() ? 1 : -1);
    
    for (let i = 0; i < copy.length; i++){
        for (let j = 0; j < copy.length-1; j++){
            if (copy[j][2] < copy[j + 1][2]) {
                let q = copy[j];
                copy[j] = copy[j + 1];
                copy[j + 1] = q;
            }
        }
    }

}


function Output(ar) {
    document.getElementById("row").innerHTML = "";

    for (let i = 0; i < ar.length; i++){

        (ar[i][2] > 0) ? heart = 'fa-heart' : heart = 'fa-heart-o';

        document.getElementById("row").innerHTML += 
        '<div class="contact" id="' + ar[i][1] + '">' +
            '<img class="contact__icon" src="img/icon.png" alt="Контакт">' +
            '<div class="contact__content">' +
                '<h4 class="contact__h4">' + ar[i][0] + '</h4>' +
                '<p class="contact__p">' + ar[i][1] + '</p>' +
            '</div>' +
            '<div class="contact__btn">' +
                '<i  class="fa fa-times fa-btn contact__i" aria-hidden="true" onclick=\'Delete("' + ar[i][1] + '")\'></i>' +
                '<i class="fa ' + heart  + ' fa-btn contact__i" aria-hidden="true" onclick=\'Like("' + ar[i][1] + '")\'></i>' +
            '</div>' +
        '</div>';
    }

}



function Display(el, sost) {
    document.getElementById(el).style.display = sost;
}

function Add() {
    Display('modal', 'flex');
    Display('book', 'none');
}

function Delete(nomer) {
    for(let i = 0; i < array.length; i++) {
        if(array[i][1] == nomer ){
            array.splice(i, 1); 
            document.getElementById(nomer).remove();
        }
    } 
    
    if (array.length === 0){
        document.getElementById("row").innerHTML = "<span class='row-span'>Номеров нет</div>";
    }

    for (let i = 0; i < array.length; i++){
        copy[i] = array[i];
    }
}

function Like(nomer) {
    for(let i = 0; i < array.length; i++) {
        if(nomer == array[i][1]){
            array[i][2] = !array[i][2];
        }
    } 

    Sort();
    Output(copy);
}

function Create() {
    let inputName = document.getElementById("input__name").value;
    let inputPhone = document.getElementById("input__phone").value;
    let checkboxLike = document.getElementById("like").checked;

    let errorName = 0;
    let errorPhone = 0;
    
    if(!inputName) {
        alert("Введите имя");
        errorName++;
    }else {
        if(!/^[A-ZА-ЯЁ]+$/i.test(inputName)) {
            alert("Имя введено неверно");
            errorName++;
        }else {
            if (inputName.length > 11) {
                alert("Имя слишком длинное");
                errorName++;
            }
        }
    }

    if(!inputPhone) {
        alert("Введите номер");
        errorPhone++;
    }else {
        if (inputPhone.length < 17) {
            alert("Номер слишком короткий");
            errorPhone++;
        }else {
            for(let i = 0; array.length > i; i++) {
                if(array[i][1] == inputPhone){
                    alert("Номер телефона уже используется");
                    errorPhone++;
                }
            } 
        }
    }

    if(errorName == 0 && errorPhone == 0) {
        array.push([inputName, inputPhone, checkboxLike]);

        Sort();
        Output(copy);

        document.getElementById("input__name").value = "";
        document.getElementById("input__phone").value = "";
        document.getElementById("like").checked = false;

        Display('modal', 'none');
        Display('book', 'flex');
    }
}

function Search() {
    let errorSearch = 0;
    let search = document.getElementById("search__input").value;

    if (array.length) {
        if(!search) {
            alert("Введите запрос");
            errorSearch++;
        }else {
            if (search.length >= 15) {
                alert("Запрос слишком длинный");
                errorSearch++;
            }else {
                if (!/^[A-ZА-ЯЁ]+$/i.test(search)) {
                    alert("Запрос введен неверно");
                    errorSearch++;
                }
            }
        }
    }

    if(errorSearch == 0) {
        SortSearch(search);
        Output(copy);
    }

    if (!copy.length) {
        document.getElementById("row").innerHTML = "<span class='row-span'>Контакты не найдены</div>";
    }
}

function Contact() {
    if (array.length === 0){
        document.getElementById("row").innerHTML = "<span class='row-span'>Контакты не найдены</div>";
    }else {
        Sort();
        Output(copy);
    }
}

