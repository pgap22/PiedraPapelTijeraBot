require('dotenv').config();
const discord = require('discord.js')
const client = new discord.Client();
const disbut = require("discord-buttons");
disbut(client);
const token = process.env.BOT_TOKEN;
const prefix = process.env.BOT_PREFIX;
var timeout = process.env.TIMEOUT_GAME;
var timeout_select = process.env.TIMEOUT_SELECT
var timeout = parseInt(timeout);
var timeout_select = parseInt(timeout_select)
/*
Variables default para el minijuego
*/
var jugadorNumeroUno = "";
var jugadorNumeroDos = "";

var jugadorNumeroUnoNombre = ""
var jugadorNumeroDosNombre = "";

var opcionDeJugadorUno = "";
var opcionDeJugadorDos = "";

var botonId = "";
var menuId = "";

var jugadorNumeroUnoConfirmar = false
var jugadorNumeroDosConfirmar = false
var noTimeOut = false;
var noTimeOut2 = false

var jugadoresListos = false;
/*
Variable Bool para solo tener una sesion de juego
*/
var juegoActivo = false;
/*
Variable Bool para seleccionar un objeto en el menu!
*/
var menuOnPlayer1 = false
var menuOnPlayer2 = false
/*
TImer para time out
*/
let timer = setTimeout(() => {
    if (noTimeOut2) {
        console.log('JUego terminado asiq xd')
        clearTimeout(timer)
    }
    else{
    console.log('TIMEOUT HEAVY 10 MINTOS')
    VariablesAlDefault();
    }
}, timeout)


function VariablesAlDefault() {
    /*
    Variables default para el minijuego
    */
    jugadorNumeroUno = "";
    jugadorNumeroDos = "";

    jugadorNumeroUnoNombre = "";
    jugadorNumeroDosNombre = "";

    opcionDeJugadorUno = "";
    opcionDeJugadorDos = "";

    botonId = "";
    menuId = "";

    jugadorNumeroUnoConfirmar = false
    jugadorNumeroDosConfirmar = false
    noTimeOut = false;
    noTimeOut2 = false

    jugadoresListos = false;
    /*
    Variable Bool para solo tener una sesion de juego
    */
    juegoActivo = false;
    /*
    Variable Bool para seleccionar un objeto en el menu!
    */
    menuOnPlayer1 = false
    menuOnPlayer2 = false
    console.log('VARIABLE AS DEFAULT')
}




client.once('ready', () => {
    console.log("Listo!")
})

client.on('clickButton', async (button) => {
    /*
    Boton que confirma el segundo jugador
    */
    const bot = new disbut.MessageButton()
        .setLabel('Powered @pgap22')
        .setStyle('grey')
        .setID('done')

    /*
    Checa si es el boton de la sesion activa ademas de corroborar que el jugador 1 no sea igual que el 2
    */
    if (button.id == botonId) {
        if (button.clicker.id == jugadorNumeroUno) {
            const ErrorAutoPlayer = new discord.MessageEmbed()
                .setColor('RED')
                .setTitle('ERROR D:')
                .setDescription('Nop, tu no puedes ser el jugador 2! **Sos el jugador 1!** \n\n\nPD. Consigue amigos :D')

            button.clicker.user.send(ErrorAutoPlayer)

            await button.reply.defer()

        } else if (button.clicker.id != jugadorNumeroUno) {
            noTimeOut = true;
            jugadorNumeroDos = button.clicker.id
            const Done = new discord.MessageEmbed()
                .setColor('GREY')
                .setDescription('Ya esta el 2nd jugador')
                .setTitle('Listo a jugar')
            button.message.edit({
                button: bot,
                embed: Done
            })
            await button.reply.defer();

            const Vamos = new discord.MessageEmbed()
                .setColor('YELLOW')
                .setDescription('Vamos a jugar **Piedra, Papel Y Tijera!** En Discord,\n\nPorfavor confirmame que estas aún aqui presionando este boton! \nAsi podremos comenzar')
                .setTitle('Todo ya esta listo!')
                .setFooter('Powered by **Pgap#1203**')
            let confirmacionboton = new disbut.MessageButton()
                .setEmoji('☑')
                .setID('confirmar')
                .setLabel('Confirmar')
                .setStyle('green')

            client.users.fetch(jugadorNumeroDos).then((user) => {
                user.send({
                    button: confirmacionboton,
                    embed: Vamos,
                    content: 'lee detenidamente :)'
                })
                jugadoresListos = true;
            })
            client.users.fetch(jugadorNumeroUno).then((user) => {
                user.send({
                    button: confirmacionboton,
                    embed: Vamos,
                    content: 'lee detenidamente :)'
                })
                jugadoresListos = true;
            })
        }


    }
    /*
    Boton agregado para indicar que ya estan los 2 jugadores
    */
    else if (button.id == 'done') {

        await button.reply.defer()
    }
    /*
    Boton para confirmar xd
    */
    else if (button.id == 'confirmar') {
        let confirmadoBoton = new disbut.MessageButton()
            .setStyle('green')
            .setEmoji('✅')
            .setLabel('Ha sido confirmado')
            .setID('confirmo')

        const ConfirmoEmbed = new discord.MessageEmbed()
            .setColor('GREEN')
            .setDescription('Ha sido confirmado hora de esperar al otro jugador')
            .setTitle('Confirmado')



        if (jugadoresListos) {
            if (button.clicker.id == jugadorNumeroUno) {
                button.message.edit({
                    button: confirmadoBoton,
                    embed: ConfirmoEmbed
                })
                jugadorNumeroUnoConfirmar = true
            }
            if (button.clicker.id == jugadorNumeroDos) {
                button.message.edit({
                    button: confirmadoBoton,
                    embed: ConfirmoEmbed
                })
                jugadorNumeroDosConfirmar = true
            }

            await button.reply.defer()

            if (jugadorNumeroDosConfirmar & jugadorNumeroUnoConfirmar) {
                let HTP = new discord.MessageEmbed()
                    .setTitle('Como jugar?')
                    .setDescription('Te he enviado un menú desplegable para que selecciones que vas a elegir!\n\n**Solo puedes elegir uno y NO PUEDES CAMBIAR**')
                    .setFooter('Created by pgap22')

                let piedra = new disbut.MessageMenuOption()
                    .setLabel('Piedra')
                    .setEmoji('💎')
                    .setValue('piedra')
                    .setDescription('Esto es una piedra')

                let tijera = new disbut.MessageMenuOption()
                    .setLabel('Tijera')
                    .setEmoji('✂')
                    .setValue('tijera')
                    .setDescription('Esto es una tijera')

                let papel = new disbut.MessageMenuOption()
                    .setLabel('Papel')
                    .setEmoji('🧻')
                    .setValue('papel')
                    .setDescription('Esto es un papel')

                let menuPPT = new disbut.MessageMenu()
                    .setPlaceholder('Click aqui para seleccionar tu objeto :D')
                    .setID(menuId)
                    .addOptions([piedra, tijera, papel])

                client.users.fetch(jugadorNumeroDos).then((user) => {
                    user.send(HTP, menuPPT)
                })
                client.users.fetch(jugadorNumeroUno).then((user) => {
                    user.send(HTP, menuPPT)
                })
            }
        }
    }



    // solo para no buguear al dar click xd
    else if (button.id == 'confirmo') {
        await button.reply.defer()
    }

    /*
    Checa si la sesion a sido acabada clickeando alguna sesion pasada PD. Podia haber ahorrado mucho codigo creado el embed y el boton y poniedo un id pero q huevaxd
    */
    else if (button.id != botonId || button.id != 'done' || button.id != 'confirmar' || button.id != 'confirmo') {
        let buttonNoSesion = new disbut.MessageButton()
            .setStyle('red')
            .setID('termiando')
            .setLabel('La sesion de este boton se ha terminado')

        let Termiando = new discord.MessageEmbed()
            .setColor('RED')
            .setTitle('Se ha terminado D:')
            .setDescription('Esta sesion ya se ha acabado')

        button.message.edit({
            button: buttonNoSesion,
            embed: Termiando
        })
        await button.reply.defer();
    }




});

/*
Seleccion de objeto
*/


client.on('clickMenu', async (button) => {

    if (button.id == menuId) {
        client.users.fetch(jugadorNumeroUno).then((user) => {
            jugadorNumeroUnoNombre = user.username
        })
        client.users.fetch(jugadorNumeroDos).then((user) => {
            jugadorNumeroDosNombre = user.username
        })

        if (button.clicker.id == jugadorNumeroUno & !menuOnPlayer1) {


            menuOnPlayer1 = true
            opcionDeJugadorUno = button.values.toString()
            console.log('JUGADOR UNO: ' + opcionDeJugadorUno)
            client.users.fetch(jugadorNumeroDos).then((user) => {
                const eligio = new discord.MessageEmbed()
                    .setDescription(`${jugadorNumeroUnoNombre} Ya eligio`)
                    .setColor('YELLOW')
                    .setTitle('Notificacion')
                user.send(eligio)
            })
            await button.reply.defer()
        } else if (button.clicker.id == jugadorNumeroUno & menuOnPlayer1) {
            button.message.channel.send(`Ya has selccionado, Tu elejiste **${opcionDeJugadorUno.toUpperCase()}** `)
            await button.reply.defer()
        }


        if (button.clicker.id == jugadorNumeroDos & !menuOnPlayer2) {
            menuOnPlayer2 = true
            opcionDeJugadorDos = button.values.toString()
            console.log('JUGADOR Dos: ' + opcionDeJugadorDos)
            await button.reply.defer()
            client.users.fetch(jugadorNumeroUno).then((user) => {
                const eligio = new discord.MessageEmbed()
                    .setDescription(`${jugadorNumeroDosNombre} Ya eligio`)
                    .setColor('YELLOW')
                    .setTitle('Notificacion')
                user.send(eligio)
            })

        } else if (button.clicker.id == jugadorNumeroDos & menuOnPlayer2) {
            button.message.channel.send(`Ya has selccionado, Tu elejiste **${opcionDeJugadorDos.toUpperCase()}** `)
            await button.reply.defer()
        }
    }

    if (button.id != menuId) {

        let buttonNoSesion = new disbut.MessageButton()
            .setStyle('red')
            .setID('termiando')
            .setLabel('La sesion de este boton se ha terminado')

        let Termiando = new discord.MessageEmbed()
            .setColor('RED')
            .setTitle('Se ha terminado D:')
            .setDescription('Esta sesion ya se ha acabado')

        await button.message.edit({
            button: buttonNoSesion,
            embed: Termiando,
            content: 'Se ha terminado esta sesion D:'
        })
        await button.reply.defer();
    }

    /*
    Vamos a ver quien es el ganador con ifs y detectar cuando ya los 2 jugadores elijieron
    */
    if (menuOnPlayer2 & menuOnPlayer1) {

        //embeds bonitos para indicar que paso xd
        const Empate = new discord.MessageEmbed()
            .setColor('GREY')
            .setDescription('Vaya parece que han empatado!\n\n**Pueden iniciar otra ronda con $start**')
            .setTitle('EMPATE')

        const Gane = new discord.MessageEmbed()
            .setColor('GREEN')
            .setDescription('Felicidades has ganado ! :D')
            .setTitle('Has Ganado :D')
        const Pierde = new discord.MessageEmbed()
            .setTitle('Has perdido D:')
            .setDescription('Que mal has perdido! Suerte en la proxima!')
            .setColor('RED')


        //Empate
        if (opcionDeJugadorUno == opcionDeJugadorDos) {

            client.users.fetch(jugadorNumeroUno).then((user) => {
                jugadorNumeroUnoNombre = user.username
            })
            client.users.fetch(jugadorNumeroDos).then((user) => {
                jugadorNumeroDosnoNombre = user.username
            })

            client.users.fetch(jugadorNumeroUno).then((user) => {
                user.send(Empate)
            })
            client.users.fetch(jugadorNumeroDos).then((user) => {
                user.send(Empate)
            })
        }

        //Identificamos la opcion de jugador1 para ver si gano o perdio atraves de un else if para evitar confuciones
        else if (opcionDeJugadorUno == 'tijera') {

            //Depende de lo que haya elejido el jugador 2 Vamos a ver quien a ganado

            if (opcionDeJugadorDos == 'piedra') {

                client.users.fetch(jugadorNumeroUno).then((user) => {
                    user.send(Pierde)


                    const Elecciones = new discord.MessageEmbed()
                        .setColor('BLUE')
                        .setDescription(`**${jugadorNumeroUnoNombre}: ** ${opcionDeJugadorUno.toUpperCase()}\n\n**${jugadorNumeroDosNombre}:** ${opcionDeJugadorDos.toUpperCase()} `)
                        .setTitle('Elecciones')
                    //Voy a enviar un embed de que eligio cada uno :)

                    user.send(Elecciones)
                })

                client.users.fetch(jugadorNumeroDos).then((user) => {
                    user.send(Gane)


                    const Elecciones = new discord.MessageEmbed()
                        .setColor('BLUE')
                        .setDescription(`**${jugadorNumeroUnoNombre}: ** ${opcionDeJugadorUno.toUpperCase()}\n\n**${jugadorNumeroDosNombre}:** ${opcionDeJugadorDos.toUpperCase()} `)
                        .setTitle('Elecciones')
                    //Voy a enviar un embed de que eligio cada uno :)

                    user.send(Elecciones)
                })


            } else if (opcionDeJugadorDos == 'papel') {

                client.users.fetch(jugadorNumeroUno).then((user) => {
                    user.send(Gane)


                    const Elecciones = new discord.MessageEmbed()
                        .setColor('BLUE')
                        .setDescription(`**${jugadorNumeroUnoNombre}: ** ${opcionDeJugadorUno.toUpperCase()}\n\n**${jugadorNumeroDosNombre}:** ${opcionDeJugadorDos.toUpperCase()} `)
                        .setTitle('Elecciones')
                    //Voy a enviar un embed de que eligio cada uno :)

                    user.send(Elecciones)
                })

                client.users.fetch(jugadorNumeroDos).then((user) => {
                    user.send(Pierde)


                    const Elecciones = new discord.MessageEmbed()
                        .setColor('BLUE')
                        .setDescription(`**${jugadorNumeroUnoNombre}: ** ${opcionDeJugadorUno.toUpperCase()}\n\n**${jugadorNumeroDosNombre}:** ${opcionDeJugadorDos.toUpperCase()} `)
                        .setTitle('Elecciones')
                    //Voy a enviar un embed de que eligio cada uno :)

                    user.send(Elecciones)
                })


            }
        }
        // Y hacemos lo mismo con todos xD
        else if (opcionDeJugadorUno == 'papel') {
            //Depende de lo que haya elejido el jugador 2 Vamos a ver quien a ganado

            if (opcionDeJugadorDos == 'tijera') {

                client.users.fetch(jugadorNumeroUno).then((user) => {
                    user.send(Pierde)


                    const Elecciones = new discord.MessageEmbed()
                        .setColor('BLUE')
                        .setDescription(`**${jugadorNumeroUnoNombre}: ** ${opcionDeJugadorUno.toUpperCase()}\n\n**${jugadorNumeroDosNombre}:** ${opcionDeJugadorDos.toUpperCase()} `)
                        .setTitle('Elecciones')
                    //Voy a enviar un embed de que eligio cada uno :)

                    user.send(Elecciones)
                })

                client.users.fetch(jugadorNumeroDos).then((user) => {
                    user.send(Gane)


                    const Elecciones = new discord.MessageEmbed()
                        .setColor('BLUE')
                        .setDescription(`**${jugadorNumeroUnoNombre}: ** ${opcionDeJugadorUno.toUpperCase()}\n\n**${jugadorNumeroDosNombre}:** ${opcionDeJugadorDos.toUpperCase()} `)
                        .setTitle('Elecciones')
                    //Voy a enviar un embed de que eligio cada uno :)

                    user.send(Elecciones)
                })

            } else if (opcionDeJugadorDos == 'piedra') {

                client.users.fetch(jugadorNumeroUno).then((user) => {
                    user.send(Gane)


                    const Elecciones = new discord.MessageEmbed()
                        .setColor('BLUE')
                        .setDescription(`**${jugadorNumeroUnoNombre}: ** ${opcionDeJugadorUno.toUpperCase()}\n\n**${jugadorNumeroDosNombre}:** ${opcionDeJugadorDos.toUpperCase()} `)
                        .setTitle('Elecciones')
                    //Voy a enviar un embed de que eligio cada uno :)

                    user.send(Elecciones)
                })

                client.users.fetch(jugadorNumeroDos).then((user) => {
                    user.send(Pierde)


                    const Elecciones = new discord.MessageEmbed()
                        .setColor('BLUE')
                        .setDescription(`**${jugadorNumeroUnoNombre}: ** ${opcionDeJugadorUno.toUpperCase()}\n\n**${jugadorNumeroDosNombre}:** ${opcionDeJugadorDos.toUpperCase()} `)
                        .setTitle('Elecciones')
                    //Voy a enviar un embed de que eligio cada uno :)

                    user.send(Elecciones)
                })


            }

        } else if (opcionDeJugadorUno == 'tijera') {
            //Depende de lo que haya elejido el jugador 2 Vamos a ver quien a ganado

            if (opcionDeJugadorDos == 'piedra') {

                client.users.fetch(jugadorNumeroUno).then((user) => {
                    user.send(Pierde)


                    const Elecciones = new discord.MessageEmbed()
                        .setColor('BLUE')
                        .setDescription(`**${jugadorNumeroUnoNombre}: ** ${opcionDeJugadorUno.toUpperCase()}\n\n**${jugadorNumeroDosNombre}:** ${opcionDeJugadorDos.toUpperCase()} `)
                        .setTitle('Elecciones')
                    //Voy a enviar un embed de que eligio cada uno :)

                    user.send(Elecciones)
                })

                client.users.fetch(jugadorNumeroDos).then((user) => {
                    user.send(Gane)


                    const Elecciones = new discord.MessageEmbed()
                        .setColor('BLUE')
                        .setDescription(`**${jugadorNumeroUnoNombre}: ** ${opcionDeJugadorUno.toUpperCase()}\n\n**${jugadorNumeroDosNombre}:** ${opcionDeJugadorDos.toUpperCase()} `)
                        .setTitle('Elecciones')
                    //Voy a enviar un embed de que eligio cada uno :)

                    user.send(Elecciones)
                })


            } else if (opcionDeJugadorDos == 'papel') {

                client.users.fetch(jugadorNumeroUno).then((user) => {
                    user.send(Gane)


                    const Elecciones = new discord.MessageEmbed()
                        .setColor('BLUE')
                        .setDescription(`**${jugadorNumeroUnoNombre}: ** ${opcionDeJugadorUno.toUpperCase()}\n\n**${jugadorNumeroDosNombre}:** ${opcionDeJugadorDos.toUpperCase()} `)
                        .setTitle('Elecciones')
                    //Voy a enviar un embed de que eligio cada uno :)

                    user.send(Elecciones)
                })

                client.users.fetch(jugadorNumeroDos).then((user) => {
                    user.send(Pierde)


                    const Elecciones = new discord.MessageEmbed()
                        .setColor('BLUE')
                        .setDescription(`**${jugadorNumeroUnoNombre}: ** ${opcionDeJugadorUno.toUpperCase()}\n\n**${jugadorNumeroDosNombre}:** ${opcionDeJugadorDos.toUpperCase()} `)
                        .setTitle('Elecciones')
                    //Voy a enviar un embed de que eligio cada uno :)

                    user.send(Elecciones)
                })

            }
        }
    } //llave del proceso para ver quien gana


}) //llave del evento clickmenu

client.on('message', async (message) => {
   
    //XD lo unico que se me ocurrio xd
    if (message.embeds) {
        if (message.embeds[0]) {
            if (message.embeds[0].title == 'Elecciones') {
                console.log('JUEGO TERMINADO')
                noTimeOut2 = true;
                VariablesAlDefault();
                
            }
        }
    }

    /*
    Solucionador de spam del bot xD y para no funcionar el $start por DM
    */
    if (!message.guild || message.author.bot) {
        return 0;
    }
    /*
    Funcionamiento del juego sesion activa o no
    */

    if (message.content.toLowerCase() == `${prefix}start` & !juegoActivo) {
        /*
        Insertando datos a las variables
        */
        botonId = Math.floor(Math.random() * 90000) + 10000 //id para el boton y que no sea igual
        botonId = botonId.toString();

        menuId = Math.floor(Math.random() * 90000) + 10000 //id para el menu y que no sea igual
        menuId = menuId.toString();

        juegoActivo = true;
        jugadorNumeroUno = message.author.id;


        /*
        Crear boton para el elegir al segundo jugador
        */
        let SegundoJugador = new discord.MessageEmbed()
            .setDescription(`**${message.author.username}** El segundo jugador tendra que dar click al boton para jugar`)
            .setColor('GREEN')
            .setTitle('Esperando a el segundo jugador')

        let boton = new disbut.MessageButton()
            .setLabel('Da click aqui segundo jugador')
            .setStyle('blurple')
            .setID(botonId)

        message.channel.send({
            button: boton,
            embed: SegundoJugador
        })
        /*
        Detectar a los jugadores
        */
        client.users.fetch(jugadorNumeroUno).then((user) => {
            const EsperarSegundo = new discord.MessageEmbed()
                .setColor('BLUE')
                .setDescription('Esperando al jugador 2')
                .setTitle('Esperando...')
            user.send(EsperarSegundo)
            jugadoresListos = true

        })

        setTimeout(() => {
            if (!noTimeOut) {
                console.log('TIME OUT ELEGIR')
                message.channel.send('Hey, el segundo jugador parece estar AFK, no le da a el boton :(')
                VariablesAlDefault();
            } else {
                console.log('no time out pero vamos con el otro');
                timer;

            }
        }, timeout_select)


    } else if (message.content.toLowerCase() == `${prefix}start` & juegoActivo) {
        message.reply("Ya hay un juego activo");
    }

})
client.login(token)