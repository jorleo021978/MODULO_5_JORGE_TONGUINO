# MODULO_5_JORGE_TONGUINO

# CLASE-UNO

JORGE LEONEL TONGUINO 15/05/2024

git init
git add .
git commit -m "Initial commit"
git remote add origin <URL_del_repositorio_en_GitHub>
git push -u origin main

# CREAR UNA CARPETA REACT
npm create vite@latest
cd mi-proyecto-react
Selecciona "react"
Selecciona "javascript"
npm install
npm run dev

# para instalar la librerias react-router-dom
npm install react-router-dom

# suvir a la pajina: https://app.netlify.com/teams/jorleo021978/overview

npm run build

# subir la carpeta dist

control alt corchete derecho espacio ``

# Para trabajar con nodeJS

## Instalar package.json

npm init

1. instalar Libreria nodeJS

npm install nodemon --save-dev

## En package.json

1. se piede cambiar nombre

  "scripts": {
    "start": "node index.js", === gregar aqui y cambiar por:
    "watch": "nodemon index1c.js", === ejemplo
    "watch1": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },

se deve agreda "type": "module" S

  "name": "clase_3",
  "version": "1.0.0",
  "type": "module",
  "description": "trabajos de aprendizaje",
  "main": "init.js", 

  # instalar libreria de axios
  npm install axios