const sql = require("sqlite3").verbose()
var db = require("../index.js").db

function initDB(){
    console.log('sdfsdf')
    db.run(`CREATE TABLE IF NOT EXISTS Users
    (Id INTEGER NOT NULL,
    Nome TEXT,
    Email TEXT,
    GitHub TEXT,
    Descrição TEXT,
    Cargo TEXT,
    Linguagens TEXT,
    Reputação INTEGER)`)
}

const viewAll = (ranking) =>{
    if(!Ranking){
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
    db.close();
}

const addUser = (Id) =>{
    db.run(`INSERT INTO Users(Id) VALUES(?)`, [Id], function(err) {
        if (err) {return console.log(err.message);}

        console.log(`A row foi inserida com sucesso`);
      });
}

const updateUser = (Id, Campo, Valor) =>{
    db.run(`UPDATE Users SET ${Campo}=${Valor} WHERE Id=${Id}`, function(err) {
        if (err) {return console.error(err.message);}

        console.log(`User updated`);
    });
}

const deleteUser = (Id) =>{
    db.run(`DELETE FROM Users WHERE Id=?`,Id, function(err) {
        if (err) {return console.error(err.message);}

        console.log(`Row deleted`);
    });
}

module.exports = {
    name: "Users",
    initDB,viewAll, addUser, updateUser, deleteUser
}