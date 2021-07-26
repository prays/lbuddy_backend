const handleSetWCS = (db) => async (req, res) => {
    let { statement, email } = req.body;
    await db('wcs')
        .insert({
            statement: statement,
            email: email,
            submit_time: new Date()
        })
        .onConflict('email')
        .merge()
        .then(() => res.json('Success'))
        .catch(error => {
            console.log(error);
            res.status(400).json('Unable to set wcs');
        });
        // .insert({ course_id: id })
        // .update({ course_id: courses }, ['id', 'courses'])
        // .then(() => {
        //     db.select('*').from('users')
        //         .where('id', '=', id)
        //         .then(user => {
        //             res.json(user[0])
        //         })
        // })
        // .catch(error => {
        //     res.status(400).json('Unable to update courses');
        // });
}
module.exports = {handleSetWCS}