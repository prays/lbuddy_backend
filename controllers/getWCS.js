const handleGetWCS = (db) => async (req, res) => {
    let { email } = req.body;
    await db.select('*').from('wcs')
        .where('email', '=', email)
        .then(data => res.json(data))
        .catch(error => {
            console.log(error);
            res.status(400).json('Unable to get WCS');
        })
}
module.exports = {handleGetWCS}