const express = require('express')
const cors = require('cors');
const expressGraphQL = require('express-graphql')
const schema = require('./schema.js')
const app = express();

app.use(cors());

app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true
}))

app.listen(4000, () => {
    console.log('Server is runing on port 4000..')
});