const sql = require("sqlite3").verbose()
const path = require("path")
const dbServerPath = path.resolve(__dirname, 'server.db')
let db

const connectDB = () => {
    db = new sql.Database(dbServerPath,sql.OPEN_READWRITE | sql.OPEN_CREATE, (err) => {
        if (err) {
          return console.error("Houve um erro na conexão:\n",err.message);
        }
        console.log('Banco de dados Server Connectado ')
    });
}
connectDB()

const disconnectDB = () =>{
    db.close(err =>{
        if(err){
            return console.error("Houve um erro na desconexão:\n",err.message)
        }
        console.log("Desconectado com sucesso!")
    })
}
module.exports = {
    name: "ConnectionFactory",
    connectDB, disconnectDB, db
}