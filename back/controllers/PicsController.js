/*
 * Controller: Galerie/pics
 * **************** */ 

exports.picspage = (req, res) => {
  console.log('je suis la page blog')
  // Variable de récupération de tout les articles
  let sql = `SELECT * FROM pics`;
  db.query(sql, (error, data, fields) => {
    if (error) throw error;
    res.render('pics', {
      status: 200,
      dbpics: data,
      message: "pics lists retrieved successfully"
    })
  })
};