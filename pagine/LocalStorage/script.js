let studenti = [];

function aggiungiStudente(){
    let nome = document.getElementById("nome").value;

    let regexNome = /^[a-zA-\s]+$/;
    if(!regexNome.test(nome)){
        alert("Il nome non è valido");
        return
    }
    studenti.push(nome);
    mostra


function eliminaStudente(indice){
    
}
}