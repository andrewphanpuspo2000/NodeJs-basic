import express from "express";
import path from "path";
import fs from "fs";
const app = express();
const PORT = 500;
const __dirname = path.resolve();
const userlistPath = __dirname + "/src/userList.csv";
//make our server available request

//middleware
app.use(express.urlencoded());

console.log(__dirname);
app.listen(PORT, (error) => {
  error
    ? console.log(error.message)
    : console.log(`server is running on server ${PORT}`);
});

app.get("/registration", (req, res) => {
  //   res.send("<h1>login page</h1>");
  console.log(req.query, "line 22");
  res.sendFile(__dirname + "/src/regForm.html");
});
app.post("/registration", (req, res) => {
  //   res.send("<h1>login page</h1>");
  const { email, password } = req.body;
  const str = `${email},${password}\n`;
  console.log(str, " line 29 ");

  fs.appendFile(userlistPath, str, (error) => {
    console.log(error + " error msg line 32");
  });
  console.log(req.body, "line 34");

  res.sendFile(__dirname + "/src/regForm.html");
});
app.get("/", (req, res) => {
  res.send(`<h1>home page</h1>
  <a href="/registration"><button>Register</button></a>  
  `);
});
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/src/loginForm.html");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const str = `${email},${password}`;
  console.log(req.body);
  fs.readFile(userlistPath, (err, data) => {
    err ? console.log(err.message) : console.log("success");
    const getData = data.toString();
    const convertArr = getData.split("\n");
    console.log(convertArr);
    if (convertArr.includes(str)) {
      res.send(`<h1 style="color:green">login succesfull</h1>`);
    } else {
      res.send(`<h1 style="color:red">login fail </h1>`);
    }
  });
});
