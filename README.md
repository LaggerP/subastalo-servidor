# Aplicaciones Distribuidas - UADE
#### Este repositorio hace referencia al backend de la aplicación "Subastalo"

###### Antes de empezar con el proyecto, es necesario tener configurada la base de datos. 
###### Vamos a usar Microsoft SQL Server (mssql).


---

Recomiendo usar Docker para levantar un servidor SQL Server. Para instalar Docker ir a la página de [Docker](https://www.docker.com/products/docker-desktop)... Una vez instalado Docker correr en la consola el siguiente comando: 
```sh
    docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=rootSubastalo0*" -p 1433:1433 --name subastalo-mssql -d mcr.microsoft.com/mssql/server:2017-latest
```
Dicho comando creará una imagen (si es necesario) y un contenedor Docker que tendrá el SQL Server. Una vez terminada esta parte, podremos continuar con la configuración del código.

1- Correr ``npm install`` para instalar todas las dependencias del proyecto. (es necesario que se corra ``npm 
install -g migrate`` para instalar la dependencia migrate que se encargará de crear las tablas)

2- Crear un archivo ``.env`` e ingresar los siguientes datos o customizar según sea necesario:
```
SECRET_JWT=hola_soy_un_token_secreto
BCRYPT_ROUNDS=10
DB_SERVER=localhost
DB_USER=sa
DB_PASSWORD=rootSubastalo0*
DB_NAME=subastalo
DB_PORT=1433
EMAIL_HOST=tu_smtp@email.com
EMAIL_PORT=587
EMAIL_SECURE=true
EMAIL_USER=tu_email@email.com
EMAIL_PASSWORD=tu_p4ssw0rd_Email
```
3- Crear la base de datos ``subastalo``

4- Si el contenedor de Docker de mssql fue creado y ejecutado de forma correcta, al correr el comando ``migrate`` 
podremos crear todas las tablas en nuestra base de datos SQL Server.

>Para ver si se crearon las tablas se deberá usar Microsoft Server Management Studio (MSMS) o algún otro 
>software compatible con SQL Server. Yo recomiendo Datagrip por su grandes funcionalidades.


> Para crear nuevas migraciones tirar el siguiente comando ``migrate create NOMBRE_MIGRATE``