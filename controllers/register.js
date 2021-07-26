const handleRegister = (db, bcrypt, saltRounds) => async (req, res) => {
    const trx = await db.transaction();
    let { first_name, last_name, email, password, group_id } = req.body;
    if (!first_name || !last_name || !email || !password || !group_id) {
        return res.status(400).json('incorrect form submission');
    }
    const hash = await bcrypt.hash(password, saltRounds);

    const newUser = {
        email: email,
        first_name: first_name,
        last_name: last_name,
        group_id: group_id,
        joined: new Date()
    }   
    
    await trx('users').insert(newUser)
    .then(() => {
        return trx('login').where('email', '=', email).insert({
            email: email,
            hash: hash
        })
    })
    .then(() => {
        trx.commit();
        db.select('*').from('users')
            .where('email', '=', email)
            .then(user => {
                res.json(user[0])
            })
    })
    .catch(error => {
        trx.rollback();
        console.log(error)
        res.status(400).json('Unable to register 2');
    });
}

module.exports = {handleRegister}