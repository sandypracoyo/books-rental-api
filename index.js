const express = require('express');

const app = express();
const port = 3000;
const authRouter = require('./src/auth/router');
const userRouter = require('./src/users/router');

app.use(express.json());

app.use('/auth', authRouter);
app.use('/users', userRouter);

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
