const axios = require('axios')
const key = process.env.WALMART_KEY

class Walmart {
  static search_all(req, res) {
    let url = `http://api.walmartlabs.com/v1/search?apiKey=${key}&query=${req.query.q}&sort=bestseller&responseGroup=full`
    axios.get(url)
      .then(response => {
        console.log(response, 'keluar gak');
        res.status(200).send(response.data)
      })
      .catch((err) => {
        res.status(500).send(err)
      })
  }

}

module.exports = Walmart
