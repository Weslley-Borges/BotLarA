const sql = require("sqlite3").verbose()
const connectionFactory = require("./ConnectionFactory.js")
let db = connectionFactory.db

function connect(){
    connectionFactory.connectDB()
}
function initDB(){
    connect()
    db.run(`CREATE TABLE IF NOT EXISTS Regras(
        Título TEXT,
        Descrição TEXT,
        Punições TEXT,
        NumOcorrências INTEGER)`,
    function(err){
        if(err){return console.log("Houve um erro:\n",err.message)}
        console.log("TABLE Regras CRIADA COM SUCESSO")
    })
    connectionFactory.disconnectDB()
}
initDB()


const viewAll = (message) =>{
    db.all(`SELECT * FROM Regras`,(err, rows) => {
        if (err) {throw err;}
        for(r in rows){
            const embed = new MessageEmbed()
                .setAuthor(
                    "LarA",
                    `https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.png`,
                    'https://github.com/Weslley-Borges/BOTLarA')
                .setThumbnail(`https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.png`)
                .setTitle(r.Título)
                .setColor('#0664c9')
                .setDescription(r.Descrição,"\nPunições:\n",r.Punições,"\nNúmero de ocorrências:",r.NumOcorrências);
            message.author.send(embed);
        }
    });
    connectionFactory.disconnectDB()
}

const addRegra = (Tittle) =>{
    db.run(`INSERT INTO Regras(Título) VALUES(${Tittle})`, [Id], function(err) {
        if (err) {
            console.log(err.message);
        }
        console.log(`A regra foi inserida com sucesso`);
    });
    connectionFactory.disconnectDB()
}
const deleteRegra = (Tittle) =>{
    db.run(`DELETE * FROM Regras WHERE Título=?`,Tittle, function(err) {
        if (err) {return console.error(err.message);}

        console.log(`Regra deletada`);
    });
    connectionFactory.disconnectDB()
}


const updateRegra = (Tittle, Campo, Valor) =>{
    db.run(`UPDATE Regras SET ${Campo}=${Valor} WHERE Título=${Tittle}`, function(err) {
        if (err) {return console.error(err.message);}

        console.log(`Regra updated`);
    });
    connectionFactory.disconnectDB()
}

module.exports = {
    name: "Regras",
    initDB,viewAll, addRegra,updateRegra, deleteRegra
}