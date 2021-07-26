const fetch = require('node-fetch');

const handleRecommendations = (db) => (req, res) => {
    const { statement, email } = req.body;
    
    db('wcs')
        .insert({
            statement: statement,
            email: email,
            submit_time: new Date()
        })
        .onConflict('email')
        .merge()
        .then(() => {
            fetch('https://68qo4ph1tc.execute-api.ap-southeast-1.amazonaws.com/inference', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    statement: statement
                })
            })
                .then(resp => resp.json())
                .then(data => {
                    console.log(data)
                    res.json(data)
                })
                .catch(err => {
                    console.log(err);
                    res.status(400).json('Unable to get recommendations.');
                })
        })
        .catch(error => {
            console.log(error);
            res.status(400).json('Unable to set wcs');
        });

}

module.exports = {handleRecommendations}