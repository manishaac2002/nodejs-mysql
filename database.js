import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config()

const pool = mysql.createPool({
    host:process.env.MYSQL_HOST,
    port:process.env.MYSQL_PORT,//specify the port number 
    user:process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE_NAME
}).promise()


export async function getNotes(){
    const [rows] = await pool.query ("select * from notes")
    return rows
}
export async function getNote(id){
    const [rows] = await pool.query (
        `SELECT * 
        FROM notes
        WHERE id = ?
        `,[id])
    return rows[0]
}
export async function createNote(title,contents){
    const [result] =await pool.query(`
    INSERT INTO notes (title,contents)
    VALUES (?,?)`,
    [title,contents])
    const id =result.insertId
    return getNote(id)
}
