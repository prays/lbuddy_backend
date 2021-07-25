const handleGetCourses = (db) => async (req, res) => {
    let { email } = req.body;
    await db.select('*')
        .from('courses')
        .where('email', '=', email)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json('Unable to get courses');
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
module.exports = {handleGetCourses}