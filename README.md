# Aplicaciones Distribuidas - UADE
#### Este repositorio hace referencia al backend de la aplicación "Subastalo"

###### Antes de empezar con el proyecto, es necesario tener configurada la base de datos. 
###### Vamos a usar Microsoft SQL Server (mssql).


---

Recomiendo usar Docker para levantar un servidor SQL Server. Para instalar Docker ir a la página de Docker... Una vez instalado Docker correr en la consola el siguiente comando: 
```sh
    docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=rootSubastalo0*" -p 1433:1433 --name subastalo-mssql -d mcr.microsoft.com/mssql/server:2017-latest
```
Dicho comando creará una imagen (si es necesario) y un contenedor Docker que tendrá el SQL Server. Una vez terminada esta parte, podremos continuar con la configuración del código.
1- Correr ``npm install`` para instalar todas las dependencias del proyecto.
2- Si el contenedor de Docker de mssql fue creado y ejecutado de forma correcta, al correr el comando ``migrate`` podremos crear todas las tablas en nuestra base de datos SQL Server.

>Para ver si se crearon las tablas se deberá usar Microsoft Server Management Studio (MSMS) o algún otro >software compatible con SQL Server. Yo recomiendo Datagrip por su grandes funcionalidades.