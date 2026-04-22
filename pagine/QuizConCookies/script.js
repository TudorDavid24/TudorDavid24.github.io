function setCookie(nome, valore, giorni){
    let data = new Date();
    data.setTime(data.getTime() + (giorni * 24 * 60 * 1000))
    document.cookie = nome + "=" + encodeURIComponent(valore) + 
                            ";expires=" + data.toUTCString() +
                            ";path=/";
}

function getCookie(nome){
    let cookies = document.cookie.split(";");
    for (let i=0; i < cookies.length; i++) {
        let c = cookies[i].trim();
        if (c.startsWith(nome + "=")) {
            return decodeURIComponent(c.substring(nome.length + 1));
        }
    }
    return "";
}

function salvaDati(){
    let nome = document.getElementById("nome").value;
    let cognome = document.getElementById("cognome").value;
    let giornoNascita = document.getElementById("giornoNascita").value;
    let meseSelect = document.getElementById("meseSelect").value;
    let anno = document.getElementById("anno").value;
    let rispostaPrimaDomanda = document.getElementById("rispostaPrimaDomanda").value;
    let rispostaSecondaDomanda = document.getElementById("rispostaSecondaDomanda").value;
    
    let libreria = document.getElementById("rispostaDinamica").checked ? "Dinamiche" : "Statiche";
    
    let isVoid = document.getElementById("void").checked;
    let isInteger = document.getElementById("integer").checked;
    let isChar = document.getElementById("char").checked;
    
    let rispostaTerzaDomanda = document.getElementById("rispostaTerzaDomanda").value;

    setCookie("nome", nome, 1);
    setCookie("cognome", cognome, 1);
    setCookie("giornoNascita", giornoNascita, 1);
    setCookie("meseSelect", meseSelect, 1);
    setCookie("rispostaPrimaDomanda", rispostaPrimaDomanda, 1);
    setCookie("rispostaSecondaDomanda", rispostaSecondaDomanda, 1);
    setCookie("libreria", libreria, 1); // Salviamo il risultato finale
    setCookie("voidd", isVoid, 1);
    setCookie("integer", isInteger, 1);
    setCookie("char", isChar, 1);
    setCookie("rispostaTerzaDomanda", rispostaTerzaDomanda, 1);

    window.location.href = "Cookies.html";
}

function caricaRiepilogo(){

    let nome = getCookie("nome");
    let cognome = getCookie("cognome");
    let giornoNascita = getCookie("giornoNascita");
    let meseSelect = getCookie("meseSelect");
    let anno = getCookie("anno");
    let rispostaPrimaDomanda = getCookie("rispostaPrimaDomanda");
    let rispostaSecondaDomanda = getCookie("rispostaSecondaDomanda");
    let rispostaStatica = getCookie("rispostaStatica");
    let rispostaDinamica = getCookie("rispostaDinamica");
    let voidd = getCookie("voidd"); 
    let integer = getCookie("integer");
    let char = getCookie("char");
    let rispostaTerzaDomanda = getCookie("rispostaTerzaDomanda"); 

    let s = "";
    s += "Nome: " + nome + "<br>";
    s += "Cognome: " + cognome + "<br>";
    s += "Giorno di nascita: " + giornoNascita + "<br>";
    s += "Mese selezionato: " + meseSelect + "<br>";
    s += "Anno di nascita: " + anno + "<br>";
    s += "Linguaggio DB: " + rispostaPrimaDomanda + "<br>";
    s += "Valori booleani: " + rispostaSecondaDomanda + "<br>";
    s += "Librerie: " + (rispostaStatica === "true" ? "Statiche" : "Dinamiche") + "<br>";
    s += "Checkbox (void): " + voidd + "<br>";
    s += "Checkbox (integer): " + integer + "<br>";
    s += "Checkbox (char): " + char + "<br>";
    s += "8 bit corrispondono a: " + rispostaTerzaDomanda;

    document.getElementById("riepilogo").innerHTML = s;
}