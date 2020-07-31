const sql = require("sqlite3")

var database = "Users.db"
var conn
var cur
var connected = false

const Action = (bot, message, args) => {


}

//FUNÇÕES PRIMÁRIAS(ESENCIAIS)
function connect(){
    try{
        conn = sql.connect(database)
        cur = conn.cursor()
        connected  = true
    }catch(e){console.log('Erro na conexão:\n',e)}
}
function disconnect(){
    try{
        conn.close()
        connected  = false
    }catch(e){console.log('Erro na conexão:\n',e)}
}

function execute(sql,parms = null){
    if(connected){
        if(parms == null){cur.execute(sql)
        }else{cur.execute(sql,parms)}
        return true
    }else return false
}

function fetchall(){return cur.fetchall()}
function persist(){
    if(connected){
        conn.commit()
        return true
    }else return false
}
function initDB(){
   connect()
   execute(`CREATE TABLE IF NOT EXISTS Users
   (Id INTEGER,
    Nome TEXT,
    Email TEXT,
    GitHub TEXT,
    Descrição TEXT,
    Cargo TXT,
    Linguagens TXT,
    Reputação INTEGER)`)
    persist()
    disconnect()
}

//FUNÇÕES SECUNDÁRIAS(AÇÕES CRIADAS POR COMANDOS NO DISCORD OU TABELA)

//Visualização e procura
function viewAll(Ranking){
    connect()
    if(!Ranking){
        execute("SELECT * FROM Users ORDER BY Cargo ASC")
    }else{execute("SELECT * FROM Users ORDER BY Reputação DESC")}
    rows = fetchall()
    disconnect()
    return rows
}
function searchUser(Campo,Valor){
    connect()
    execute(`SELECT * FROM Users WHERE ${Campo}=${Valor} ORDER BY Cargo ASC`)
    rows = fetchall()
    disconnect()
    return rows
}


function addUser(Id){
    connect()
    execute("INSERT INTO Users VALUES(Id)",Id)
    persist()
    disconnect()
}
function updateUser(Id,Campo,Valor){
    connect()
    execute(`UPDATE Users SET ${Campo}=${Valor} WHERE Id=${Id}`)
    persist()
    disconnect()
}
function deleteUser(Campo, Valor){
    connect()
    execute(`DELETE FROM Users WHERE ${Campo}=${Valor}`)
    persist()
    disconnect()
}