const handleGetParticular = (db) => async (req, res) => {
    await db.select('*').from('users')
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            res.status(400).json('Unable to get particular')
        })
}
module.exports = {handleGetParticular}