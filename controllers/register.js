const handleRegister = (db, bcrypt, saltRounds) => async (req, res) => {
    const trx = await db.transaction();
    let { email, fullName, birthdate, gender, education, job, yearJoined, groupID, password } = req.body;
    if (!email || !fullName || !birthdate || !gender || !education || !job || !yearJoined || !groupID || !password) {
        return res.status(400).json('incorrect form submission');
    }
    const hash = await bcrypt.hash(password, saltRounds);

    const newUser = {
        email: email,
        full_name: fullName,
        birthdate: birthdate,
        gender: gender,
        education: education,
        job: job,
        group_id: groupID,
        year_joined: yearJoined,
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