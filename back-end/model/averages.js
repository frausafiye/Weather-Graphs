const lowdb=require('lowdb')
const FileSync=require('lowdb/adapters/FileSync')
const adapter=new FileSync('./Model/averageTemps.json')
const db=lowdb(adapter)

module.exports=db