const handleSignIn = (db, bcrypt) => async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json('incorrect form submission');
    }

    try {
        const dbPass = 
            await db.select('email', 'hash')
            .from('login')
            .where('email', '=', email);
        
        const isValid = await bcrypt.compare(password, dbPass[0].hash);
        
        if (isValid) {
            db.select('*').from('users')
                .where('email', '=', email)
                .then(user => {
                    res.json(user[0])
                })
                .catch(error => res.status(400).json('Unable to get user'));
        } else {
            res.status(400).json('Invalid credentials');
        }
    } catch {
        res.status(400).json('Invalid credentials');
    }
    
}

module.exports = {handleSignIn}