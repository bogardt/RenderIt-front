Render it - Project
===================

# Table of Contents

- [Render it - Project](#render-it---project)
- [Table of Contents](#table-of-contents)
- [Utils](#utils)
- [Correction classique du projet :](#correction-classique-du-projet)
- [Project architecture](#project-architecture)

  
# Utils
Un projet utilitaire a ete creer pour faciliter le lancement de la stack par un seul point de montage, pour vous evitez le chemin de correction classique veuillez directement telecharger le depot suivant via :
```
git clone git@github.com:bogardt/RenderIt-stack.git
```

# Correction classique du projet :
Pour que le projet communique avec le backend vous devez clonner le projet suivant (n'importe ou sur votre machine), via la commande :
```
git clone git@github.com:bogardt/RenderIt-back.git
```

Et suivre le README du depot du backend pour lancer sa stack.

Ce projet d'ecole tourne sur docker, suivre ce process pour lancer le serveur node :

```bash
docker-compose build --no-cache
```

```bash
docker-compose up
```

En tant que deamo
```
docker-compose up -d
```


This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).



# Project architecture

```
render-it-front/
  public/
    index.html
    favicon.ico
    manifest.json
  src/
      Components/
        Login/
          Login.js
        Register/
          Register.js
        App.js
      img/
      redux/
        actions/
          login.js
        reducers/
          login.s
        store.js
      index.css
      index.js
      logo.svg
      registerServiceWorker.js
  node_modules/
  .editorconfig
  .eslintrc.json
  .gitignore
  .prettierrc
  docker-compose.yml
  Dockerfle
  entrypoint.sh
  LICENSE
  package.json
  README.md
```

For the project to build, **these files must exist with exact filenames**:

* `src/index.js` is the JavaScript entry point.
* `src/Components` folder for components
* `src/redux` folder for redux pattern
* `src/redux/actions` forlder for redux actions
* `src/redux/reducers` folder for redux reducers (multiple reducer with combineReducers) 
* `src/redux/store.js` the instance of store is here
