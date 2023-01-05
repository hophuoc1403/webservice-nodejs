import mysql from "mysql2/promise";

import {config} from '../config.js';

export const query = async (sql,params) => {

    const connection = await mysql.createConnection(config.db)
    let [results, ] =  await connection.execute(sql,params)
    return results
}