const express = require('express');

const app = express();
const port = 3000;
const { errorMiddleware } = require('./middlewares/error');
const { logInfo } = require('./utils/log');
const authRouter = require('./src/auth/router');
const bookRouter = require('./src/books/router');
const userRouter = require('./src/users/router');
const transactionRouter = require('./src/transactions/routes');

app.use(express.json());
app.use('/', authRouter);
app.use('/books', bookRouter);
app.use('/users', userRouter);
app.use('/transaction', transactionRouter);
app.use(errorMiddleware);

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
    logInfo('Service running at port : 3000')
});
