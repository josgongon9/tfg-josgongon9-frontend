# Repositorio Frontend proyecto Trabajo Fin de Grado Josgongon9 - Configuración arranque en Local

## Prerequisitos
Definimos el proxy en el fichero ```.env``` (donde hemos arracando el backend):
```sh
VUE_APP_PROXY_API=http://localhost:8080
```
En el fichero ``` vue.config.js``` definidos el puerto donde queremos arrancar la aplicación:

```sh
port: 8081
```

## Instalacción y arranque
Nos movemos hacia la carpeta raiz donde hemos clonado el repositorio e instalamos las dependencias:

```sh
npm install
```

finalmente podemos arrancar la aplicación:
```sh
npm run serve
```