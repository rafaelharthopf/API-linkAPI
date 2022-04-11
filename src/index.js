const app = require('./server');
const routes = require('./routes')


app.listen(3000, () => {
    console.log("Server run");
})