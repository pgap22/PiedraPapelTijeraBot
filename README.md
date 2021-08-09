# Un Bot de piedra papel tijera.

   **Requisitos**
   

 1. Node JS
 2. Tener instalado las librerias
 3. Datos para nuestro .env

 **Instalación**
 
En la terminal pondremos lo siguiente 

    git clone https://github.com/pgap22/PiedraPapelTijeraBot.git
    cd PiedraPapelTijeraBot
    npm install
**Datos de nuestro bot**

 
Cambiaremos el archivo .env.example a solamente **.env**

Hay 2 datos que son requisitos nuestro token de nuestro bot [Aqui Puedes crear tu bot y obtener el token](https://discord.com/developers/applications) Y además de el, id de nuestro canal específico para el bot, para obtener el id de nuestro canal habilita el modo desarrollador![Activar modo desarrollador](https://cdn.discordapp.com/attachments/872674835896098856/874107596913651722/unknown.png)
 
 
Para obtener el id de nuestro canal damos click derecho en el y copiar el id en nuestro **.env*

 

Tu **.env** debe ser algo asi (Los valores son diferentes a los tuyos)

**EJEMPLO .ENV**

    
    BOT_TOKEN=TUTOKENDELBOT
    BOT_PREFIX=$
    BOT_ID_CANAL=000000000

**Por ultimo...**
Inciaras tu bot asi!

    Node app.js

Solo faltaría invitar a tu bot al tu serveridor supongo que ya sabes como hacerlo 😀

# COMANDOS
**$start** = Para iniciar una sesion 

**$FinJuego** = Cancelar una sesion de juego
