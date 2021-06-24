# mattiaCAM

Ammagamma EDUCATION

mattiaCam is an object detection - image classification web-app, for educational purpose, and no data is collected: everything works locally on your device.

BREVE DESCRIZIONE DELL'APPLICAZIONE:

Applicazione che permette di rilevare e classificare oggetti da video e immagini.
L'utente ha la possibilità di scegliere la modalità di rilevamento oggetti in tempo reale, tramite la webcam, o quella di classificazione di una immagine, tramite caricamento.

Nel caso del rilevamento oggetti tramite webcam, l'utente vedrà disegnato intorno agli oggetti riconosciuti un rettangolo contente il nome della categoria a cui è associato e il relativo grado di confidenza (in percentuale). Il video viene processato in locale e NON viene caricato su alcun server remoto.

Nel caso della classificazione tramite immagine caricata direttamente dall'utente, verrà semplicamente mostrata una tabella con scritto le varie categorie riconosciute e le relative percentuali di confidenza. L'immagine è caricata in locale e NON viene inviata ad alcun server remoto.

LIBRERIE E MODELLI UTILIZZATI:

L'applicazione è stata creata utilizzando [React](https://it.reactjs.org/) e implementando la libreria [TensorFlow.js](https://www.tensorflow.org/js/tutorials), per saperne di più clicca sui link precedenti.

Per l'analisi e la classificazione l'applicazione utilizza modelli pre-allenati, per quanto riguarda il rilevamento tramite webcam viene utilizzato il modello [coco-ssd](https://www.npmjs.com/package/@tensorflow-models/coco-ssd) mentre per la classificazione dell'immagine viene utilizzato il modello [mobilenetV1](https://www.npmjs.com/package/@tensorflow-models/mobilenet), clicca sui link per saperne di più.

PROCEDURA PER INSTALLARE ED ESEGUIRE L'APPLICAZIONE:

Assicurati di avere installato Node.js e il gestore di pacchetti npm se non è così non preoccuparti segui semplicemente questa guida: [installazione Node e npm](https://docs.npmjs.com/cli/v7/configuring-npm/install)	

Effettuare il clone del repository tramite il comando: git clone https://github.com/AGedu/mattiaCAM.git

Entra nella cartella appena scaricata e lancia il comando: npm install
	
Una volta terminata l'installazione delle dipendenze necessarie sei pronto a lanciare l'applicazione con il comando: npm start


Per il rilevamento tramite webcam è stato preso spunto dal codice messo a disposizione qui -> [codice](https://github.com/nicknochnack/RealTimeObjectDetectionTFJSReact.git)

Per il rilevamento tramite immagine è stato preso spunto dal codice messo a disposizione qui -> [codice](https://github.com/jonnyk20/dogscope-react.git)

BREVE GUIDA PER UTILIZZARE AL MEGLIO L'APPLICAZIONE:

Una volta avviata l'applicazione con il comando npm start (vedi sezione PROCEDURA PER INSTALLARE ED ESEGUIRE L'APPLICAZIONE) ti troverai nella schermata iniziale dell'applicazione dove puotare due "sezioni" REAL TIME e OFFLINE.

In entrambe le sezioni troverai un pulsante LOAD MODEL che carica il modello pre-allenato, successivamente, in funzione della modalità scelta si può continuare come indicato di seguito.

REAL TIME MULTI-OBJECT DETECTION
Cliccando sul pulsante START verrà avviata la webcam e il modello incomincerà a rilevare gli oggetti in automatico.
Per terminare il rilevamento automatico ti basterà cliccare sul pulsante STOP.

IMAGE CLASSIFICATION
Cliccando su UPLOAD si aprirà la finestra di sistema per caricare un'immagine; successivamente, dopo aver scelto l'immagine, si può avviare l'analisi cliccando su IDENTIFY.
Una volta terminata l'analisi verranno mostrati i primi tre risultati  della classificazione, con la relativa confidenza in percentuale.
Per caricare una nuova immagine basta cliccare nuovamente il pulsante UPLOAD e poi IDENTIFY.

DA SVILUPPARE!
* scatto fotografia del rilevamento in tempo reale
* implementazione di più modelli pre-allenati, da scegliere quando si carica il modello
* implementazione altre modalità di utilizzo (e.g. pose detection, face detection, ...)

[perchè abbiamo creato mattiaCam?](https://magazine.ammagamma.com/education-mattiacam-computer-vision)