/*const path = require('path',)

module.exports = {
  /*axios: {
    proxy: true,
    host: "localhost",
    prefix: "/api/"
  },
  proxy: {
    "/api/": process.env.PROXY_API || "http://localhost:8080/"
  },*/
  /*devServer: {
    proxy: {
      "/api/":{
        target: process.env.PROXY_API || "http://localhost:8080/"
      } 
    }
  }

}*/

module.exports = {
  devServer: {
    disableHostCheck: true
  }
}

