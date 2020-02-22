<!-- prettier-ignore-start -->
# SPA usando VanillaJs

 <img src="https://www.normaeditorial.com/libros_img/978846792409101_G.jpg" width="48">
 <br>
Se creara una pagina usando la **API** de _Rick and Morty_ [link to API!](https://rickandmortyapi.com/)

### Inicializando Git Repositorio

Con el comando

```
git init
```

### Inicializando Nuestro Proyecto

Con el comando

```
npm init
```

### Creando la Estructura de folders

- src ( donde estara todo el codigo ) 
	- pages ( donde estaran las paginas del proyecto) 
	- routes (rutas del proyecto) 
	- styles (estilos del proyecto) 
	- templates (donde ponemos las secciones, ej:header)
	- utils (utilitarios del proyecto) 
	- index.js ( dond etsa la implementacion del proyecto)
	- .gitignore 
		- node_modules para que esta carpeta no suba al repositorio

+ public (carpeta donde esta  el codigo que se manda a produccion)
	+ index.html



### Instalando Dependencias

Se instala **Babel** que se encarga de interpretar el Js moderno para que sea interpretado por cualquier navegador

y **Webpack** para crear el *bundle* que se enviara a produccion

- @babel/core (que incluye toda la libreria de babel)
- babel-loader  
- webpack 
- html-webpack-plugin 
- webpack-cli 
- webpack-dev-server --save-dev (entorno de desarrolllo local)


```
$ npm install @babel/core babel-loader html-webpack-plugin webpack webpack-cli webpack-dev-server --save-dev

```

### Configurando Webpack
En la raiz de nuestra App se crea el arichivo webpack.config.js que lleva lo siguiente
<!-- prettier-ignore-end -->

const path = require('path'); //configuracion de node que nos permite acceder haciando estamos dentro de la carpeta
const HtmlWebpackPlugin = require('html-webpack-plugin'); //para trabjar con html

```
//se creara el modulo donde estara toda la configuracion
module.exports = {
	entry: './src/index.js', //punto de entrada
	output: { //salida
		path: path.resolve(__dirname, 'dist'), //hacia donde va el prouecto y crea la carpeta dist
		filename: 'main.js', //el compilado se llamara main.js
	},
	resolve: { //extensiones de nuestra app
		extensions: ['.js'], //extenciones que se van a usar
	},
	module: { //reglas paa trabajar
		rules: [ //reglas de babel para compatibilidad de todos los navegadores
			{
				test: /\.js?$/, //
				exclude: /node_modules/,//excuir carpeta
				use: {
					loader: 'babel-loader',
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin(
			{
				inject: true,
				template: './public/index.html',
				filename: './index.html',
			},
		),
	],
};
```

### Configurando nuestro Package.json

Abrimos el Package.json y añadimos dos scripts.
Uno para compilar y mandar a prodcuccion,
y el otro habilita entorno de desarrollo local para hacer pruebas

```
"scripts": {
	"build": "webpack --mode production", //compila para mandar a produccion
	"start": "webpack-dev-server --open --mode development" //habilita entorno de desarrollo local para hacer pruebas
},
```

### index html y js

Creamos cualquier codigo en el index.js en la raiz. un hola mundo bastaria.

y la estructura basica en public/index.html con secctiones claves para despues insertarle codigo a traves de JS

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Cientific</title>
  </head>
  <body>
    <main class="Main">
      <header class="header" id="header"></header>
      <section id="content">
        <div class="loading"></div>
      </section>
    </main>
  </body>
</html>
```

### Compilando en Webpack

Para compilar nuestro proyecto y mandarlo produccion, creando la carpeta **_dist_** se realiza el comando

### Creamos el Template de Home

Donde estara el home del proyecto

```
const Home = () => {
	const view = `
	<div class="Characters">
	<article class="Character-item">
		<a href="#/1/">
			<img src="image" alt="name" />
			<h2>Name</h2>
		</a>
	</article>
</div>
`;
	return view;
};

export default Home;

```

### Creamos el Template de Header

/src/templates/Header.js

```
const Header = () => {
  const view = `
  <div class="Header-main">
      <div class="Header-logo">
        <h1>
          <a href="/">
            100tifi.co
          </a>
        </h1>
      </div>
      <div class="Header-nav">
        <a href="#/about/">About</a>
      </div>
    </div>
    `;
  return view;
};
export default Header;
```

### Creamos el Template de el personaje

/src/pages/Character.js

```
const Character = () => {
  const view = `
  <div class="Characters-inner">
      <article class="Characters-card">
        <img src="image" alt="name" />
        <h2>Name</h2>
      </article>
      <article class="Characters-card">
        <h3>Episodes:</h3>
        <h3>Status:</h3>
        <h3>Species</h3>
        <h3>Gender</h3>
        <h3>Origin</h3>
        <h3>Last Location</h3>
      </article>
    </div>
  `;
  return view;
};
export default Character;
```

### Creamos el Template de la Pagina 404 Not Found

```
const Error404 = () => {
  const view = `
  <div class="Error404">
    <h2>Error, Pagina no encontrada</h2>
  </div>
  `;
  return view;
  export default Error404;
};
```

## Trabajando con las Rutas

Creamos
/src/routes/index.js
importamos los template y las paginas creadas

```
import Header from '../templates/Header';
import Home from '../pages/Home';
import Character from '../pages/Character';
import Error404 from '../pages/Error404';
```

configuramos las rutas

```
const routes = {
  '/': Home,
  '/:id': Character,
  '/contact': 'Contact',
};
```

ahora creamos el manejador, el router

```
const router = async () => {
  const header = null || document.getElementById('header');
  const content = null || document.getElementById('content');

  header.innerHTML = await Header();
};
```

## Modificando el index.js

Para que tome los cambios, se debe importar la routa y escuhar algun cambio de evento load

```
import router from './routes';

window.addEventListener('load', router);

```

### utils

Para obtener el hash creamos el archivo
todo esto es para acceder a la barra de direcciones y manipular las direccion y asignar el template segun sea el caso

#### creamos el siguiente archivo

/src/utils/getHash.js

```
const getHash = () =>
  location.hash.slice(1).toLocaleLowerCase().split('/')[1] || '/';
export default getHash;
```

- En el video, min 02:12 tiene un typo. debio escribir slice en vez de slide

- En el min 02:37 otro typo. debio ser toLocaleLowerCase.

Asi que tu funcion **correctamente escrita** debe quedar asi:

```
const getHash = () =>
  location.hash.slice(1).toLocaleLowerCase().split('/')[1] || '/';
export default getHash;
```

Donde

- **location.hash** trae el fragmento de la url a partir de donde encuentre un #. En este caso traería #/1/
- **.slice(1)** corta la url y muestra a partir del primer elemento. En este Caso el resultado es /1/
- **.toLocaleLowerCase()** convierte a minúscula la cadena
- \*\*.split('/') separa la cadena en un array y borra el caracter pasado como argumento q en este aso es el /
- **[1]** trae el primer elemento del split anterior que en este caso es 1 (representa la id 1)

#### Cramos el otro archivo

/src/utils/resolveRoutes.js

```
const resolveRoutes = route => {
  if (route.length <= 3) {
    let validRoute = route === '/' ? route : '/:id';
    return validRoute;
  }
  return `/${route}`;
};

export default resolveRoutes;

```

### Añadimos la logica al router de la url

```
 let hash = getHash();
  let route = await resolveRoutes(hash);
  let render = routes[route] ? routes[route] : Error404;
  content.innerHTML = await render();
```

y en el /src/index.js se añade

```
window.addEventListener('hashchange', router);
```

## Ahora a enfocarse en Fetch Data

Se crea el archivo
_src/utils/getData.js_

```
const API = 'https://rickandmortyapi.com/api/character/';

const getData = async id => {
  const apiURL = id ? `${API}${id}` : API;
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error', error);
  }
};
export default getData;
```

este archivo hay que importarlo desde Home quedando asi

```
import getData from '../utils/getData';

const Home = async () => {
  const characters = await getData();
  const view = `
  <div class="Characters">
    ${characters.results
      .map(
        character => `
    <article class="Character-item">
      <a href="#/${character.id}/">
        <img src="${character.image}" alt="${character.name}" />
        <h2>${character.name}</h2>
      </a>
      </article>
      `,
      )
      .join('')}
</div>
`;
  return view;
};

export default Home;

```

Luego se configuran el Character quedando asi el archivo

```
import getHash from '../utils/getHash';
import getData from '../utils/getData';

const Character = async () => {
  const id = getHash();
  const character = await getData(id);
  const view = `
  <div class="Characters-inner">
      <article class="Characters-card">
      <img src="${character.image}" alt="${character.name}" />
        <h2>${character.name}</h2>
      </article>
      <article class="Characters-card">
        <h3>Episodes:<span>${character.episode.length}</span></h3>
        <h3>Status:<span>${character.status}</span></h3>
        <h3>Species:<span>${character.status}</span></h3>
        <h3>Gender: <span>${character.gender}</span></h3>
        <h3>Origin: <span>${character.origin.name}</span></h3>
        <h3>Last Location: <span>${character.location}</span></h3>
      </article>
    </div>
  `;
  return view;
};
export default Character;

```

## Añadiendo estilo

En nuestro terminal

```
npm install copy-webpack-plugin --save-dev
```

abrimos _webpack.config.js_ y se añade una constante

```
const CopyWebpackPlugin = require('copy-webpack-plugin');
```

y luego añaimos el siguiente plugin que sera el encargado de llevar nuestra hoja de css a la carpeta dist

```
 new CopyWebpackPlugin([
      {
        from: './src/styles/styles.css',
        to: '',
      },
    ])
```

y por ultimo añadimos el link del css en la hoja de public/index.html

```
<link rel="stylesheet" type="text/css" href="../src/styles/styles.css" />
```

<!-- prettier-ignore-end -->
