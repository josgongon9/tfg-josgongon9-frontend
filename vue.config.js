
module.exports = {
  devServer: {
    // 'auto' | 'all' [string] here
    //port: 8081,
    allowedHosts: 'all',
    proxy: {
      "/api/": {
        target: "https://tfg-josgongon9-backend.herokuapp.com/",
        secure: false,
      }
    }
  },
};
