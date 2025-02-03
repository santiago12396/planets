# Planetas App

Este es el proyecto **Planetas App**, una aplicación desarrollada con Angular version 19.1.5.

## 🌐 URL de Producción

Puedes ver la versión en producción de la aplicación en el siguiente enlace:

[https://santiago-lorduy.netlify.app/](https://santiago-lorduy.netlify.app/)

## APIs utilizadas

- [The Solar System OpenData](https://api.le-systeme-solaire.net/swagger/): Para obtener datos sobre los planetas del sistema solar.

## Requisitos 📋

Asegúrate de tener instalados los siguientes componentes en tu sistema:

- [Node.js](https://nodejs.org/) (versión 18 o superior).
- [Angular CLI](https://angular.dev/tools/cli) (versión >= 19.1.5) (opcional).

## Instalación 🔧

Para ejecuta el proyecto primero tienes que instalar los modulos de node:

`npm install`

## Ejecutar el Proyecto 🚀

Para iniciar la aplicación en entorno de desarrollo, sigue estos pasos:

- Ejecuta el siguiente comando para iniciar el servidor de desarrollo:

  `npm start` o si tienes instalado el Angular CLI puedes utilizar `ng serve`.

- Abre tu navegador y navega a http://localhost:4200.

## Decisiones técnicas 💡

1. **No se integró la API oficial de la NASA**:

   - La API de la NASA no proporciona un endpoint que devuelva todos los planetas en una sola petición.
   - La mayoría de los endpoints de la NASA devuelven la información en texto plano, a pesar de que se especifique en los parámetros de la petición que se desea recibir la respuesta en formato JSON.

2. **No se integró una API de imágenes como "images.nasa.gov"**:

   - Ninguna de las APIs consultadas proporcionaba información de los planetas junto con sus respectivas imágenes.
   - Decidí no integrar una API de imágenes externa para evitar realizar una petición adicional por cada planeta, lo que generaría una carga innecesaria y afectaría el rendimiento de la página.

3. **No se implementó la funcionalidad de filtrado por "Todos" o "Favoritos"**:
   - La API utilizada no soporta filtros con múltiples "matchers" a la vez. Si intentamos hacerlo, se devolvería uno u otro filtro dependiendo de su prioridad especificada, Además, realizar consultas individuales para cada planeta añadido como favorito no sería eficiente, especialmente cuando se pueden tener muchos planetas en la lista de favoritos.

### Ejemplo del filtro probado

Intenté realizar un filtro para obtener solo los datos de planetas que coincidan con los IDs de los planetas seleccionados como favoritos:

```text
order: englishName,asc
page: 1,5
filter[]: isPlanet,eq,true
filter[]: id,eq,terre
filter[]: id,eq,venus
filter[]: id,eq,mars
```

Este filtro no devolvía resultados. Si agregaba la bandera **"satisfy: any"** en los parámetros, funcionaba, pero rompía la lógica de negocio, ya que no respetaría el cumplimiento de los múltiples filtros a la vez.
