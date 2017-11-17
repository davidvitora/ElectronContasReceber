import Con from './connection';

export default class DAO{

    constructor(component){
        this.conn = Con()();
        this.comp = component;
    }

    getFirstId(callback){
        this.conn.query('select * from ' + this.table + ' limit 1',(err, result)=>{
            if(err){
                callback(err, null);
            } else {
                callback(null, result[0]);
            }
        });
    }

    getIdList(callback){
        this.conn.query('select * from ' + this.table, (err, result)=>{
            if(err){
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    getAll(callback){
        this.conn.query('select * from ' + this.table, (err, result)=>{
            if(err){
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    getObject(id, callback){
        console.log(
        this.conn.query("select * from " + this.table + " where id  = " + id , (err, result)=>{
            if(err){          
                callback(err, null);
            } else {
                callback(null, result[0]);
            }
        })
        );
    }

    deleteObject(id, callback){
        this.conn.query("delete from " + this.table + " where id = " + id , (err, result)=>{
            if(err){
                callback(err, null);
            } else {
                callback(null, result);
            }
        })
    }


}