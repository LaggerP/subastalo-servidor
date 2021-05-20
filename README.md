# Aplicaciones Distribuidas - UADE
#### Este repositorio hace referencia a la API Rest de la aplicación "Subastalo"

**Contexto de la aplicación:**
Nuestro cliente necesita una app mobile que permita poder seguir realizando subastas (que antes de la pandemia eran 
presenciales) de forma remota. Es por eso que se nos encomendó desarrollar una API Rest que utilice una base de 
datos existente (MSSQL) y permita registrar todos los sucesos que ocurran en esta:

### Ejemplos:
- realización de pujas sobre un item que está siendo subastado.
- registro de nuevos usuarios (previa verificación crediticia de la persona).
- sistema de categorías (teniendo en cuenta la verificación crediticia de la persona).
- cargar tus items para ser subastados (previa verificación por parte de la casa de subastas).
- cargar métodos de pago (tarjetas y cuentas bancarias).
- permitir modificación de información personal.
- historial de participación en subastas (subastas ganadas, perdidas, pujas realizadas, etc.).
- sistema de envío de emails (aviso de creación de usuario, cambio de contraseña, bienvenida, etc.).
-  [más información de los requerimientos](https://github.com/LaggerP/distribuidas-servidor/wiki/Requerimientos-de-la-aplicaci%C3%B3n)

---

##### Antes de empezar con el proyecto, es necesario tener configurada la base de datos. 
##### Vamos a usar Microsoft SQL Server (mssql).



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
