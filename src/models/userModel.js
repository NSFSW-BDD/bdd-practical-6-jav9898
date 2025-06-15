const pool = require('../services/db');

var userModel={

    //GET users
    getUsers: (callback) => {
        const query = 'SELECT * FROM user';
        pool.query(query, [], callback);
    },

    getUserByUserid: (data,callback) => {
        const query = 'SELECT * FROM user where userid=?';
        pool.query(query, [data.userid], callback);
    },


    insertUser: (data,callback) => {
        const query = 'insert into user(username,email,role,password) values(?,?,?,?)';
        pool.query(query, [data.username,data.email,data.role,data.password], callback);
    },

    updateUser: (data,callback) => {
        const query = 'update user set email=?,password=? where userid=?';
        pool.query(query, [data.email,data.password,data.userid], callback);
    },
    deleteUser: (data,callback) => {
        const query = 'delete from user where userid=?';
        pool.query(query, [data.userid], callback);
    },
    login: (data,callback) => {
        const query = 'SELECT * FROM user where email=? and password=?';
        pool.query(query, [data.email,data.password], callback);
    },


}

module.exports = userModel;