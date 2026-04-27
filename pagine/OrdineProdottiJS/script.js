function calcolaTotale() {
    // Definizione dei prezzi unitari
    const prezzi = {
        qta1: 16,
        qta2: 25,
        qta3: 350,
        qta4: 200
    };

    let totaleGenerale = 0;

    // Ciclo attraverso le 4 righe per calcolare i subtotali
    for (let i = 1; i <= 4; i++) {
        let qta = document.getElementById('qta' + i).value;
        let prezzo = prezzi['qta' + i];
        
        // Calcolo subtotale riga
        let subtotale = qta * prezzo;
        
        // Scrittura del subtotale nell'input corrispondente
        document.getElementById('tot' + i).value = subtotale + "€";
        
        // Aggiunta al totale generale
        totaleGenerale += subtotale;
    }

    // Scrittura del totale finale
    document.getElementById('totaleFinale').value = totaleGenerale + "€";
}
function inviaOrdine() {
    // 1. Recupera i dati dal form
    const email = document.getElementById('email').value;
    const totale = document.getElementById('totaleFinale').value;
    const notifiche = document.getElementById('si').checked ? "Sì" : "No";
    const pagamento = document.getElementById('pagamento').value;

    if (!email) {
        alert("Per favore, inserisci un indirizzo email.");
        return;
    }

    // 2. Crea il contenuto del corpo della mail
    const oggetto = "Nuovo Ordine Ricevuto";
    const corpo = `Dettagli Ordine:%0A%0A` +
                  `Totale: ${totale}%0A` +
                  `Pagamento: ${pagamento}%0A` +
                  `Notifiche richieste: ${notifiche}%0A%0A` +
                  `Grazie per aver effettuato l'ordine!`;

    // 3. Apre il client di posta con i dati precompilati
    window.location.href = `mailto:${email}?subject=${oggetto}&body=${corpo}`;
}