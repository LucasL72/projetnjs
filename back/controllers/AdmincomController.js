/*
 * Controller: Page Admin
    Partie coms
 * **************** */
    const fs = require("fs");
    const path = require('path');
    
    /*----Méthode Post---*/
    exports.adminCreatecom = async (req, res) => {
        console.log("Je suis le controller Create pics dans Admin", req.body);
        let sql = `INSERT INTO commentaires (content,pseudouser,datecom,user_id,articles_id) values("${req.file.content}","${req.body.pseudouser}","1","28");`
        let values = [
            req.file.content,
            req.body.pseudouser
        ];
        db.query(sql, [values], function (err, data, fields) {
            if (err) throw err;
            let sql1 = `SELECT * FROM articles,pics`;
            db.query(sql1, async (error, data, fields) => {
                if (error) throw error;
                const articles = await db.query('select * from articles;');
                const pics = await db.query('select * from pics;');
                const user = await db.query('select * from user;');
                const coms = await db.query('select * from commentaires;');
                res.render('admin', {
                    status: 200,
                    dbuser: user,
                    dbarticles: articles,
                    dbcommentaires: coms,
                    dbpics: pics,
                    message: "Add Photo successfully"
                })
            })
        })
    
    };
    
    /*----Méthode Delete pour un---*/
    exports.adminDeleteOnecom = async (req, res) => {
        console.log("Je suis le controller Delete pics dans Admin", req.body);
        let sql = `DELETE FROM commentaires  WHERE id = ${req.params.id}`;
        let values = [
            req.params.idphotos
        ];
        db.query(sql, [values], function (err, data, fields) {
            if (err) throw err;
            let sql1 = `SELECT * FROM articles,pics`;
            db.query(sql1, async (error, data, fields) => {
                if (error) throw error;
                const articles = await db.query('select * from articles;');
                const pics = await db.query('select * from pics;');
                const user = await db.query('select * from user;');
                const coms = await db.query('select * from commentaires;');
                res.render('admin', {
                    status: 200,
                    dbuser: user,
                    dbarticles: articles,
                    dbcommentaires: coms,
                    dbpics: pics,
                    message: "Delete pic successfully"
                })
            })
        })
    };