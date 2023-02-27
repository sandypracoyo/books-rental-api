const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();
const port = 3000;
const userRouter = require('./src/users/router');

app.use(express.json());
app.use('/user', userRouter);

app.get('*', (req,res)=>{
    res.send('Error not found')
})

app.post('*', (req,res)=>{
    res.send('Error not found')
})

app.put('*', (req,res)=>{
    res.send('Error not found')
})

app.patch('*', (req,res)=>{
    res.send('Error not found')
})

app.delete('*', (req,res)=>{
    res.send('Error not found')
})


app.listen(port, () => {
    console.log(`APP RUNNING AT : ${port}`);
});
