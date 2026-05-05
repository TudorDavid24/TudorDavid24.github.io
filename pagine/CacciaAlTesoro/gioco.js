// ════════════════════════════════════════════
//  Caccia al Tesoro — Modulo 1, Sezione 1
// ════════════════════════════════════════════

console.log("=== CACCIA AL TESORO ===")
console.log("Il gioco sta partendo...")
console.log("Preparati!")

// ════════════════════════════════════════════
//  STATO DEL GIOCO E RIFERIMENTI DOM
// ════════════════════════════════════════════

// Recupera i riferimenti agli elementi DOM
const elNome = document.querySelector("#nome-giocatore")
const elPunteggio = document.querySelector("#punteggio")
const elContatore = document.querySelector("#contatore")
const elTestoIndizio = document.querySelector("#testo-indizio")
// AGGIUNTO: Selettore per il pulsante del GPS
const btnSonoQui = document.querySelector("#btn-sono-qui") 

// SPOSTATO IN ALTO: Definizione della classe per poterla usare nello stato
class Indizio {
  constructor(testo, soluzione, punti, lat, lon) {
     this.testo = testo;
     this.soluzione = soluzione;
     this.punti = punti;
     this.risolto = false;
     // AGGIUNTO: Oggetto coordinate necessario per il listener del GPS finale
     this.coordinate = { lat: lat, lon: lon }; 
  }
  
  verifica(risposta) {
    return risposta.toUpperCase() === this.soluzione;
  }
}

// AGGIUNTO: Creazione dell'array degli indizi
const indizi = [
  new Indizio("Prova ad andare in presidenza", "BarRosso", 50, 45.68715434915691, 9.179826087488959),
];

// Funzione che aggiorna l'intera interfaccia in base allo stato attuale
const aggiornaUI = (stato) => {
  elNome.textContent = stato.nomeGiocatore
  elPunteggio.textContent = stato.punteggio
 
  const daFare = stato.indizi.filter(i => !i.risolto)
  elContatore.textContent = daFare.length
 
  if (daFare.length > 0) {
    elTestoIndizio.textContent = daFare[0].testo
  } else {
    elTestoIndizio.textContent = "🏆 Hai completato la caccia!"
  }
}

// Stato iniziale del gioco
const stato = {
  nomeGiocatore: "Alice",
  punteggio: 0,
  indizi: indizi // AGGIORNATO: Passiamo l'array reale
}

// Prima chiamata: popola l'interfaccia con i dati iniziali
aggiornaUI(stato)

// Stato della partita
let partitaTerminata = false;
let indizioCorrenteIdx = 0;

// AGGIUNTO: Variabili mancanti per il messaggio
let nomeGiocatore = stato.nomeGiocatore;
let vite = 3;

// Messaggio di benvenuto
const benvenuto = `Benvenuto, ${nomeGiocatore}! Hai ${vite} vite. Buona fortuna!`;
console.log(benvenuto)

// Dati dell'indizio corrente (Simulazione iniziale)
const codiceCorretto = "PONTE42";
const puntiPerSblocco = 50;
const inputGiocatore = "PONTE42";
let punteggio = 80;

// Logica di verifica fissa
if (inputGiocatore === codiceCorretto && punteggio >= puntiPerSblocco) {
    console.log("✅ Codice corretto! Indizio sbloccato.")
    punteggio += 30;  
    console.log(`Nuovo punteggio: ${punteggio}`)
} else if (inputGiocatore !== codiceCorretto) {
    console.log("❌ Codice errato. Riprova!")
} else {
    console.log("⚠️ Codice giusto ma punti insufficienti.")
}


// ════════════════════════════════════════════════════════
//  CALCOLO DISTANZE GPS
// ════════════════════════════════════════════════════════

const calcolaDistanza = (lat1, lon1, lat2, lon2) => {
  const R = 6371000;  // raggio della Terra in metri

  const toRad = (deg) => deg * (Math.PI / 180)

  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2)
    + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2))
    * Math.sin(dLon / 2) * Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c;   // distanza in metri
}

// Coordinate fisse per test
const tesoroLat = 45.4654;
const tesoroLon = 9.1859;
const giocatoreLat = 45.4660;
const giocatoreLon = 9.1862;

// Calcolo
const distanza = calcolaDistanza(giocatoreLat, giocatoreLon, tesoroLat, tesoroLon)
console.log(`Distanza dal tesoro (Test): ${Math.round(distanza)} metri`)

// Sblocco basato sulla distanza
const RAGGIO_SBLOCCO = 30;  // entro 30 metri

if(distanza <= RAGGIO_SBLOCCO) {
  console.log("🎉 Sei sul posto! Indizio sbloccato.")
} else {
  const ancora = Math.round(distanza) - RAGGIO_SBLOCCO;
  console.log(`Ancora ${ancora} metri da percorrere.`)
}

// Istanziazione di prova e uso del metodo
const punto1 = new Indizio("Sotto il ponte", "PONTE42" , 50, 45.4654, 9.1859);
punto1.verifica("PONTE12");

// Riepilogo in console
const riepilogoPartita = (listaIndizi) => {
  const risolti = listaIndizi.filter(i => i.risolto)
  const daFare = listaIndizi.filter(i => !i.risolto)
  const punteggioAttuale = risolti.reduce((acc, i) => acc + i.punti, 0)
 
  console.log("═══ STATO DELLA PARTITA ═══")
  console.log(`Indizi totali  : ${listaIndizi.length}`)
  console.log(`Risolti        : ${risolti.length}`)
  console.log(`Rimanenti      : ${daFare.length}`)
  console.log(`Punteggio      : ${punteggioAttuale} pt`)
 
  if(daFare.length > 0) {
    console.log("Prossimo indizio:")
    console.log(`  ${daFare[0].testo}`)
  } else {
    console.log("🏆 Hai completato la caccia al tesoro!")
  }
}
 
riepilogoPartita(stato.indizi)

// ════════════════════════════════════════════════════════
//  GEOLOCALIZZAZIONE ED EVENTI DOM
// ════════════════════════════════════════════════════════

// AGGIUNTO: Geolocation promisificata
const ottieniPosizione = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
 
// Aggiorna il listener del pulsante con la versione GPS reale
btnSonoQui.addEventListener("click", async () => {
  elTestoIndizio.textContent = "📡 Sto rilevando la tua posizione..."
  btnSonoQui.disabled = true 
  
  try {
    const pos = await ottieniPosizione()  
    const lat = pos.coords.latitude
    const lon = pos.coords.longitude
 
    const daFare = stato.indizi.filter(i => !i.risolto)
    if (daFare.length === 0) return
 
    const indizioCorrente = daFare[0]
    
    // Calcolo della distanza reale dall'indizio in cui ti trovi
    const distanzaReale = calcolaDistanza(
      lat, lon,
      indizioCorrente.coordinate.lat,
      indizioCorrente.coordinate.lon
    )
    
    if (distanzaReale <= RAGGIO_SBLOCCO) {
      elTestoIndizio.textContent = "🎉 Sei sul posto! Inserisci la soluzione."
      elTestoIndizio.classList.add("vicino")
    } else {
      const mancano = Math.round(distanzaReale) - RAGGIO_SBLOCCO
      elTestoIndizio.textContent = `Ancora ${mancano} metri da percorrere`
    }
  } 
  catch (errore) {  
    elTestoIndizio.textContent = "⚠️ GPS non disponibile. Attiva la localizzazione."
  } 
  finally {    
    btnSonoQui.disabled = false 
  }
})