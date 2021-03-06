const handleProfileGet = (db) => (req, res) => {
    const { email } = req.params;
    db.select('*').from('users').where({ email })
        .then(user => {
            if (user.length) {
                res.json(user[0]);
            } else {
                res.status(404).json('No such user');
            }
        })
        .catch(error => console.log(error))
}

module.exports = {handleProfileGet}