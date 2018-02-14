const axios = require('axios')

class Location {
  //function to find user's location detail
  static findLocation () {
    return new Promise((resolve, reject) => {
      axios.get(`https://ipfind.co?ip=139.195.170.205&auth=f7a050ba-5f3b-4784-b333-626785ffd6ec`)
      .then(result => {
        resolve(result)
      })
      .catch(err => {
        reject(err)
      })
    })
  }
}
module.exports = Location;