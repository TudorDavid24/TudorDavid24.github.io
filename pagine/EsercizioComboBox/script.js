let menu = document.getElementById("menu");

function stampaSelezionato(){
    let selezionato = menu.value;
    console.log(selezionato);
    let testo = menu.options[menu.selectedIndex].text;
    console.log(testo);
}

function riempiConAnni(){
    let html = "";
    for(let i = 1990; i<=annoCorrente; i++){
        html+="<option value" + i + ">" + i + "</option>";
    }
    menu.innerHTML = html;
}

let txt = document.getElementById("textBox1");
function stampaTextBox(){
    console.log(txt1.value)
}