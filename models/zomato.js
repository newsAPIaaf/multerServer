const axios = require('axios')

class Zomato {
  static search (lat, lon, query) {
    return new Promise((resolve, reject) => {
      axios.get(`https://developers.zomato.com/api/v2.1/search?q=${query}&lat=${lat}&lon=${lon}&count=10`, {
        headers: {
          'user-key': 'b6b2616426ed3f1550065a192c12f052'
        }
      })
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        reject(err)
      })
    })
  }
}

module.exports = Zomato;
