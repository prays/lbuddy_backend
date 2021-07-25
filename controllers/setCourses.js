const handleSetCourses = (db) => async (req, res) => {
    let { course, email } = req.body;
    await db('courses')
        .insert({
            email: email,
            course: course,
            joined: new Date()
        })
        .then(() => {
            db.select('*').from('courses').where('email', '=', email)
            .then(data => {
                res.json(data);
            })
        })
        .catch(error => {
            console.log(error);
            res.status(400).json('Unable to set courses');
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
module.exports = {handleSetCourses}