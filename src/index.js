import express from "express";
import programmingLanguagesRouter  from "../routes/programmingLanguages.js"
import {create} from "../services/programmingLanguage.service.js";
import router from "../routes/programmingLanguages.js";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))
// app.use(
//     express.urlencoded({
//       extended:true
//     })
// )

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.get('/form',(req,res) => {
    res.render('index')
})

app.use("/programming-languages", programmingLanguagesRouter);
app.use((err,req,res,next) => {
  const statusCode = err.statusCode || 500
  res.status(statusCode).json({ message: err.message });
  console.error(err.message,err.stack)
})

app.post('/programming-languages',async  (req,res,next) => {
    try{
        console.log(req.body)
        // res.json(await create(req.body))
        res.json(req.body)
    }catch (err) {
        console.error(`Error while creating programming language`, err.message);
        next(err);
    }
})

app.listen(port, () => {
  console.log("app is listening ...");
});


