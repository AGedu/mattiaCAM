# mattiaCAM

Ammagamma EDUCATION
object detection - image classification web-app, for educational purpose

BREVE DESCRIZIONE DELL'APPLICAZIONE:

Applicazione che permette di rilevare e classificare oggetti.
L'utente ha la possibilità di scegliere se caricare l'immagine da analizzare oppure se effettuare un rilevamento tramite webcam.

Nel caso del rilevamento tramite webcam l'utente vedrà disegnato intorno agli oggetti riconosciuti un rettangolo contenteil nome della categoria a cui è associato e il relativo grado di confidenza.
L'utente ha la possibilità di scattare un'istantanea che mostrerà la foto con i relativi oggetti riconosciuti e può scaricarla in formato png.

Nel caso del rilevamento tramite immagine caricata direttamente dall'utente verrà semplicamente mostrata una tabella con scritto le varie categorie riconosciute e le relative percentuali di confidenza.

LIBRERIE E MODELLI UTILIZZATI:

L'applicazione utilizza le librerie javascript [React](https://it.reactjs.org/) e [TensorFlow.js](https://www.tensorflow.org/js/tutorials), per saperne di più clicca sui link precedentemente proposti.

Per l'analisi e la classificazione l'applicazione utilizza modelli preallenati, per quanto riguarda il rilevamento tramite webcam viene utilizzato il modello [cocossd](https://www.npmjs.com/package/@tensorflow-models/coco-ssd) mentre per la classificazione tramite immagine viene utilizzato il modello [mobilenet](https://www.npmjs.com/package/@tensorflow-models/mobilenet), clicca sui link per saperne di più.

PROCEDURA PER INSTALLARE ED ESEGUIRE L'APPLICAZIONE:

Assicurati di avere installato Node.js e il gestore di pacchetti npm se non è così non preoccuparti segui semplicemente questa guida: [installazione Node e npm](https://docs.npmjs.com/cli/v7/configuring-npm/install)	

Effettuare il clone del repository tramite il comando: git clone https://github.com/AGedu/mattiaCAM.git

Entra nella cartella appena scaricata e lancia il comando: npm install
	
Una volta terminata l'installazione delle dipendenze necessarie sei pronto a lanciare l'applicazione con il comando: npm start


Per il rilevamento tramite webcam è stato utilizzato il codice messo a disposizione qui [codice](https://github.com/nicknochnack/RealTimeObjectDetectionTFJSReact.git)

Per il rilevamento tramite immagine è stato utilizzato il codice messo a disposizione qui [codice](https://github.com/jonnyk20/dogscope-react.git)

BREVE GUIDA PER UTILIZZARE AL MEGLIO L'APPLICAZIONE:

Una volta avviata l'applicazione con il comando npm start (vedi sezione PROCEDURA PER INSTALLARE ED ESEGUIRE L'APPLICAZIONE) ti troverai nella schermata iniziale dell'applicazione dove puotare due "sezioni" REAL DETECTION e IMAGE CLASSIFICATION.

In entrambe le sezioni troverai un pulsante che avvia il relativo metodo di rilevamento.

Cliccando sul pulsante relativo alla sezione REAL DETECTION verrà avviata la webcam e il modello incomincerà a rilevare gli oggetti in automatico.
Una volta avviato il rilevamento degli oggetti sarà possibile effettuare una fotografia (tramite il pulsante con raffigurato una macchina fotografica) che ti permettera una volta analizzata e classificata di scaricarla tramite immagine png (per farlo baserà cliccare il pulsante di download) sul tuo computer.
Per terminare il rilevamento automatico ti basterà cliccare sul pulsante STOP.

Cliccando sul pulasante relativo alla sezione IMAGE CLASSIFICATION se l'applicazione è appena stata aperta bisogna aspettare il caricamento del modello e successivamente sarà possibile, sempre tramite il medesimo pulsante, caricare l'immagine e avviare la sua analisi.
Una volta terminata l'analisi verrà mostrta una tabella contenente i risultati.
Cliccando il pulsante sarà possibile resettare tutto e analizzare una nuova immagine.


