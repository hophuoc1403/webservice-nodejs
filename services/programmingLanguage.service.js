import {getOffset, emptyOrRow} from '../helper.js'
import {config} from "../config.js"
import {query} from './db.js'

// interface IProgrammingLanguage {
//     name : string,
//     released_year:number,
//     githut_rank:number,
//     tiobe_rank:number,
//     pypl_rank:number
// }

export const getMultiple = async (page = 1) => {
    const offset = getOffset(page, config.listPerPage)
    const rows = await query(`SELECT id, name, released_year, githut_rank, pypl_rank, tiobe_rank 
    FROM programming_languages LIMIT ?,?`, [offset, config.listPerPage])
    const data = emptyOrRow(rows)
    const meta = {page}

    return {
        data,
        meta
    }
}

export const create = async (programmingLanguage) => {
    console.log(programmingLanguage.file)
    const result = await query(`insert into programming_languages \n +
           (name, released_year, githut_rank, pypl_rank, tiobe_rank) \n +
            VALUES`,
        [programmingLanguage.name, programmingLanguage.released_year, programmingLanguage.githut_rank, programmingLanguage.pypl_rank, programmingLanguage.tiobe_rank])
    let message = 'Error in creating programming language';
    if (result.affectedRows) {
        message = 'Programming language created successfully'
    }
    return {message}
}

export const update = async (id, programmingLanguage) => {
    const result = await query(`update programming_languages set name = ?,released_year = ?,
    githut_rank = ?,pypl_rank=?,tiobe_rank=?`,
        [programmingLanguage.name, programmingLanguage.released_year, programmingLanguage.githut_rank, programmingLanguage.pypl_rank, programmingLanguage.tiobe_rank])

    let message = 'Error in updating programming language';

    if (result.affectedRows) {
        message = 'Programming language updated successfully'
    }
    return {message}
}

export const deleteLanguage = async (id) => {
    const result = await query(`DELETE FROM programming_languages WHERE id=?`,id)
    let message = 'Error in deleting programming language';

    if (result.affectedRows) {
        message = 'Programming language deleted successfully';
    }

    return {message};
}