### CHATBOT Whatsapp (Baileys Provider)

<p align="center">
  <img width="300" src="https://i.imgur.com/Oauef6t.png">
</p>





```
npm install
npm start
```
desarrollo 
npm run dev

en el archivo package.json 
tienes que sustituir esto 
    "scripts": {
        
        "pre-copy": "cd .. && npm run  copy.lib base-baileys-memory",
        "start": "node app.js"
    },
por esto

  "scripts": {
        "prestart": "npx eslint . --no-ignore",
        "pre-copy": "cd .. && npm run  copy.lib base-baileys-memory",
        "start": "node app.js"
    },

SOLO EN DESARROLLO


---
## Recursos
scanea el codigo QR que corre en el puerto 3000