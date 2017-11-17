import DAO from './DAO';

export default class ContasReceber extends DAO{
    constructor(component){
        super(component);
        this.table = 'contas_receber';
    }

    save(obj, callback){
        console.log("objeto a ser gravado");
        console.log(obj);
        var sql = 'update ' + this.table + ' set';
        sql += ' valor = ' + obj.valor;
        sql += ', quantidade_parcelas = ' + obj.quantidade_parcelas;
        sql += ', id_contas_financeiras = ' + obj.id_contas_financeiras;
        sql += ', id_cliente = ' + obj.id_cliente;
        if(obj.id_pedido == 0 || obj.id_pedido == null){
            sql += ', id_pedido = NULL';
        } else {
            sql += ', id_pedido = ' + obj.id_pedido;
        }
        sql += ' where id = ' + obj.id;
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
        var sql = 'insert into ' + this.table + ' (valor, quantidade_parcelas, id_contas_financeiras, id_cliente, id_pedido, vencimento) values (';
        sql += obj.valor;
        sql += ', ' + obj.quantidade_parcelas;
        sql += ', ' + obj.id_contas_financeiras;
        sql += ', ' + obj.id_cliente;
        if(obj.id_pedido == 0 || obj.id_pedido == null){
            sql += ', NULL ';
        } else {
            sql += ', ' + obj.id_pedido;
        }
        sql += ',\' ' + obj.vencimento + "\');";
        console.log("sql")
        console.log(sql);
        this.conn.query(sql, (err, result)=>{
            if(err){
                alert(err);
            } else {
                callback(null, result);
            }
        });
    }

    getParcelas(id, callback){
        console.log(
        this.conn.query("select * from contas_receber_parcela where id_contas_receber = " + id , (err, result)=>{
            if(err){
                callback(err, null);
            } else {
                callback(null, result);
            }
        })
        );
    }

    saveParcela(Item, callback){
        console.log("Item de pedido a ser salvo");
        console.log(Item);
        var sql = 'update contas_receber_parcela set';
        sql += ' valor = ' + Item.valor;
        sql += ', valor_recebido = ' + Item.valor;
        sql += ', numero_parcela = ' + Item.numero_parcela;
        sql += ', vencimento = \'' + Item.vencimento;
        if(Item.data_recebimento ==  null){
            sql += '\', data_recebimento = null';
        } else {
            sql += '\', data_recebimento = \'' + Item.data_recebimento + '\'';
        }
        sql += ', juros = ' + Item.juros;
        sql += ', id_contas_receber = ' + Item.id_contas_receber;
        sql += ', pago = ' + Item.pago;
        sql += ' where id = ' + Item.id;
        console.log("Query da parcela");
        console.log(sql);
        this.conn.query(sql, (err, result)=>{
            if(err){
                alert(err);
            } else {
                callback(null, result);
            }
        });
    }

    insertParcela(Item, callback){
        console.log("Parcela a ser inserida");
        console.log(Item);
        var sql = 'insert into contas_receber_parcela (numero_parcela, valor, valor_recebido, vencimento, juros, id_contas_receber) values (';
        sql += Item.numero_parcela;
        sql += ', ' + Item.valor;
        sql += ', ' + Item.valor_recebido;
        sql += ', \'' + Item.vencimento;
        sql += '\', ' + Item.juros;
        sql += ', ' + Item.id_contas_receber + ");";
        this.conn.query(sql, (err, result)=>{
            if(err){
                alert(err);
            } else {
                callback(null, result);
            }
        });
    }

    deleteParcelas(id, callback){
        this.conn.query("delete from contas_receber_parcela where id_contas_receber = " + id , (err, result)=>{
            if(err){
                callback(err, null);
            } else {
                callback(null, result);
            }
        })
    }

}