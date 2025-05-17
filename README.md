
# Proyecto Restaurante Tolos API

  

Este proyecto es una aplicación conectada a WordPress que sincroniza imágenes y texto. Utiliza Docker para facilitar la gestión del entorno.


## Descripción

  

La aplicación permite la sincronización de imágenes y textos desde WordPress, facilitando la gestión de contenido visual y textual. También incluye un formulario conectado a una base de datos para almacenar información adicional.

  

## Requisitos Previos

  

- Tener [Docker](https://www.docker.com/get-started) y [Docker Compose](https://docs.docker.com/compose/install/) instalados en tu máquina.

  

## Instalación

  

1. Clona el repositorio:

```bash
git clone https://github.com/nataliagamezbarea/restaurante-tolos-api.git
```
2. Accede al directorio de Docker:

```bash
cd restaurante-tolos-api/docker
```
3. Inicia los servicios de Docker:
```bash
docker-compose up -d
```

4. Inicia los servicios de Docker:
```bash
docker-compose down
```
## Acceso a Servicios

**phpMyAdmin:** Accede a la base de datos en la siguiente dirección:

```bash

http://localhost:8080
```

**wordpress:** Accede a wordpress para ver la información:

Visualización:

```bash

http://localhost:4282
```

Administración:

```bash

http://localhost:4282/wp-admin
```
Usuario : 
```bash
administrador
```

Contraseña:

```bash
!1JqZ5p0ScP2wFrmd7
```

**paginaweb:** Accede a la página web Tolos:

```bash

http://localhost:4282/restaurante/Vilacuisines.html
```
