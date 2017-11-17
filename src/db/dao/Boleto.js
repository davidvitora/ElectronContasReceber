import DAO from './DAO';

export default class Pedido extends DAO{
    constructor(component){
        super(component);
        this.table = 'pedido';
    }

    save(obj, callback){
        console.log("objeto a ser gravado");
        console.log(obj);
        var sql = 'update ' + this.table + ' set';
        sql += ' valor = ' + obj.valor;
        sql += ', id_cliente = ' + obj.id_cliente;
        sql += ' where id  = ' + obj.id;
        this.conn.query(sql, (err, result)=>{
            if(err){
                alert(err);
            } else {
                callback(null, result);
            }
        });
    }

    insert(obj, callback){
        console.log("objeto a ser inserido");
        console.log(obj);
        var sql = 'insert into ' + this.table + ' (valor, id_cliente) values (';
        sql += obj.valor;
        sql += ', ' + obj.id_cliente + ");";
        this.conn.query(sql, (err, result)=>{
            if(err){
                alert(err);
            } else {
                callback(null, result);
            }
        });
    }

    getItens(id, callback){
        console.log(
        this.conn.query("select * from pedido_item where id_pedido = " + id , (err, result)=>{
            if(err){
                callback(err, null);
            } else {
                callback(null, result);
            }
        })
        );
    }

    saveItem(Item, callback){
        console.log("Item de pedido a ser salvo");
        console.log(Item);
        var sql = 'update pedido_item set';
        sql += ' valor = ' + Item.valor;
        sql += ', quantidade = ' + Item.quantidade;
        sql += ', id_produto = ' + Item.id_produto;
        sql += ' where id = ' + Item.id;
        this.conn.query(sql, (err, result)=>{
            if(err){
                alert(err);
            } else {
                callback(null, result);
            }
        });
    }

    insertItem(Item, callback){
        console.log("Item de pedido a ser inserido");
        console.log(Item);
        var sql = 'insert into pedido_item (valor,quantidade,id_produto,id_pedido) values (';
        sql += Item.valor;
        sql += ', ' + Item.quantidade;
        sql += ', ' + Item.id_produto;
        sql += ', ' + Item.id_pedido + ");";
        this.conn.query(sql, (err, result)=>{
            if(err){
                alert(err);
            } else {
                callback(null, result);
            }
        });
    }

    deleteItem(id, callback){
        this.conn.query("delete from pedido_item where id = " + id , (err, result)=>{
            if(err){
                callback(err, null);
            } else {
                callback(null, result);
            }
        })
    }

}