<template>
    <div>
        <div>

        </div>
    </div>
</template>

<script>
const fs = require('fs')
const mysql = require('mysql');
const data = fs.readFileSync('../../database.json');
const conf = JSON.parse(data);

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});
connection.connect();

export default {
    name : "Chat",
    data(){
        return {
            chatText: null
        }
    },
    created(){
        connection.query(
            'SELECT * FROM message',
            (err, rows, fields) => {
                this.chatText = rows
            }
        )
    }
}
</script>
