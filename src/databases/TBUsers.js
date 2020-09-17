const sql = require("sqlite3").verbose()
const connectionFactory = require("./ConnectionFactory.js")
let db = connectionFactory.db

function connect(){
    connectionFactory.connectDB()
}
function initDB(){
    connect()
    db.run(`CREATE TABLE IF NOT EXISTS Users(
        Id INTEGER,
        Nome TEXT,
        Email TEXT,
        GitHub TEXT,
        Bio TEXT,
        Cargo TEXT,
        Linguagens TEXT,
        Reputação INTEGER)`,
    function(err){
        if(err){return console.log("Houve um erro:\n",err.message)}
        console.log("TABLE Users CRIADA COM SUCESSO")
    })
    connectionFactory.disconnectDB()
}
initDB()

//Funções para a manipulação da tabela Users.

const viewAll = (ranking) =>{
    if(!ranking){
        db.all(`SELECT * FROM Users ORDER BY Cargo ASC`,(err, rows) => {
            if (err) {throw err;}
            return rows
        });
    }else{
        db.all(`SELECT * FROM Users ORDER BY Reputação DESC`,(err, rows) => {
            if (err) {throw err;}
            return rows
        });
    }
    connectionFactory.disconnectDB()
}

const addUser = (Id) =>{
    db.run(`INSERT INTO Users(Id,Reputação,Cargo) VALUES(?,0,'notRecevied')`, [Id], function(err) {
        if (err) {
            console.log(err.message);
            return false
        }

        console.log(`A row foi inserida com sucesso`);
        return true
    });
    connectionFactory.disconnectDB()
}
const searchUser = (Id) =>{
    db.run(`SELECT * FROM Users WHERE Id=?`, [Id], function(err, row) {
        if (err) {return console.log(err.message);}
        return row
    });
    connectionFactory.disconnectDB()
}
const updateUser = (Id, Campo, Valor) =>{
    db.run(`UPDATE Users SET ${Campo}=${Valor} WHERE Id=${Id}`, function(err) {
        if (err) {return console.error(err.message);}

        console.log(`User updated`);
    });
    connectionFactory.disconnectDB()
}

const deleteUser = (Id) =>{
    db.run(`DELETE FROM Users WHERE Id=?`,Id, function(err) {
        if (err) {return console.error(err.message);}

        console.log(`Row deleted`);
    });
    connectionFactory.disconnectDB()
}

module.exports = {
    name: "Users",
    initDB,viewAll, addUser, searchUser,updateUser, deleteUser
}