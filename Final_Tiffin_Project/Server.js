const express = require("express");
const path = require("path");
let cors = require("cors");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const multer = require("multer");
const jwt = require("jsonwebtoken");
app.use(cors());
const bcrypt= require("bcrypt");
// var corsOptions = {
  //   origin: "http://localhost:3000"
  // };
  
const cookieParser = require("cookie-parser");
const session = require("express-session");
app.use("/assets", express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "/public")));

//create connection
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tiffin_service",
});
//connect to database
conn.connect((err) => {
  if (err) throw err;
  console.log("mysql Connected...");
});

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*")
// }) 

var jwtSecret= 'UserAuthSecret'
// multer (route to upload images to server)
var imagename = "";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    // console.log(req.body.body.profile_img,'multerimage')
    console.log(file,'filename');

    imagename = Date.now() + path.extname(file.originalname) + "";
    console.log(imagename);
    cb(null, imagename);
  },
});
const fileFilter = (req, file, cb) => {
  console.log("Filter for file");
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

app.use (
  session ({
      key: "userId",
      secret: "subscribe",
      resave: false,
      saveUninitialized: false,
      cookie: {
          expires: 60 * 60 * 24,
      },
  })
);

// // For debugging:
// app.use(function(req, res, next) {
//   console.log("SessionID: " + req.sessionID);
//   console.log(req.isAuthenticated() ? "This user is logged in" : "This user is NOT logged in");
//   next();
// });

// Verify Token
const verifyJWT = (req, res, next) => {
  // console.log(req.headers,'reqconfig')
  let token = req.headers["authorization"];
  console.log(token,'tokenvalue')
  if (!token) {
      res.send("We need a token, please give it to us next time");
  } else {
    token = token.split(" ")[1];

      jwt.verify(token, jwtSecret, (err, decoded) => {
          if (err) {
              console.log(err);
              res.json({ auth: false, message: "you are failed to authenticate"});
          } else {
            console.log(decoded,'decodeddata')
            req.userId = decoded.id;
            console.log(req.userId,'userid')
              next();
          }
      });
  }
};

app.post('/sign_up', upload.single("file"), (req, res) => {
 
  console.log(req.body,'req_body')
  const salt= bcrypt.genSaltSync(11);
  const hashPass= bcrypt.hashSync(req.body.password,salt) 
//   if (req.method === 'POST') {
//     for (const [key, value] of Object.entries(req.body)) {
//         if (typeof(value) === 'string')
//             req.body[key] = value.trim();
//     }
// }

  let data = {
    username: req.body.username,
    password: hashPass,
    mobileno: req.body.mobile,
    email: req.body.email,
    category: req.body.category,
    gender: req.body.gender,
    city: req.body.city,
    address: req.body.address,
    profile_img: imagename,
  };
  console.log(data,'data of body')
  let sql = "SELECT * FROM sign_up WHERE username ='"+req.body.username+"'"  ;
  conn.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.json({ message: 'Username already exists' ,statusCode:401});
    }
    
    else {
      let sql2 = "SELECT * FROM sign_up WHERE email ='"+req.body.email+"'"  ;
    conn.query(sql2, (err, result2) => {
        if (err) throw err;
        if(result2.length>0){
        res.json({ message: 'Email already exist', statusCode: 401 });}
        else{
          let sql3="INSERT INTO sign_up SET?";
          conn.query(sql3,data,(err,result3)=>{
            if(err) throw err;
            res.json({ message: 'Data added Successfully',statusCode: 201 })
          })
        }
      });
    }
  });
});


app.get("/userget/:id", (req, res) => {
  console.log(req.params, "params");
  let usersql = "select * from sign_up where username='" + req.params.id + "'";
  let userpromise = new Promise((resolve, reject) => {
    conn.query(usersql, async (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
});


// route for add tiffin details
app.post("/saveitem",verifyJWT,upload.single("file"), (req, res) => {
  console.log(req.body,'bodydata')
  let data = {
    item_name: req.body.itemname,
    item_details: req.body.details,
    item_price: req.body.price,
    item_image: imagename,
    item_category: req.body.foodtype,
    userid: req.body.name,
  };
  console.log(data);
  // console.log(req.body.file);
  let sql = "INSERT INTO tiffin_details SET ?";
  conn.query(sql, data, (err, results) => {
    if (err) throw err;
    // res.redirect('/showitem')
    // let sql = "SELECT * FROM tiffin_details where userid='" + req.body.nm + "'";
    // conn.query(sql, (err, results) => {
    //   if (err) throw err;
      res.json(results);
    // });
  });
});

//route for specific provider items
app.get("/getusers", (req, res, err) => {
  let sql = "SELECT * FROM sign_up";
  conn.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.json(results);
  });
});

//route for specific provider items
app.post("/showitem", (req, res, err) => {
  let name = req.body.nm;
  console.log("youe s==" + name);
  let sql = "SELECT * FROM tiffin_details where userid='" + req.body.nm + "'";
  conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// route to delete from data
app.post("/itemdelete/:id",verifyJWT, function (req, res) {
  // let name = req.body.nm;
  console.log(req.params,'delete body');
  let sql = "Delete FROM tiffin_details WHERE id=" + req.params.id;
  conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
    // let sql = "SELECT * FROM tiffin_details where userid='" + name + "'";
    // conn.query(sql, (err, results) => {
    //   if (err) throw err;
    //   res.json(results);
    // });
    // res.redirect("/showitem");
  });
});

//route for edit data
app.get("/itemedit/:id", function (req, res) {
  const id = req.params.id;
  console.log(id);
  let sql = "SELECT * FROM tiffin_details WHERE id=" + id;
  conn.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.json({ result: results });
  });
});

//route to update the item
app.post("/updateitem", upload.single("file"),verifyJWT, (req, res, err) => {
  const name = req.body.nm;

  let sql =
    "update tiffin_details set item_name='" +
    req.body.itemname +
    "',item_price=" +
    req.body.price +
    ",item_details='" +
    req.body.detail +
    "', item_category='" +
    req.body.category +
    "',item_image='" +
    imagename +
    "'  where id=" +
    req.body.identity;
  console.log(req.body, "req of edit");
  // console.log(err);
  conn.query(sql, (err, results) => {
    if (err) throw err;
    let sql = "SELECT * FROM tiffin_details where userid='" + name + "'";
    conn.query(sql, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
    // res.json({result:results});
    // console.log(results,'editresults')
    // res.redirect("/showitem");
  });
});

//route for delete user
app.post("/deleteuser/:id",verifyJWT, (req, res) => {
  const id = req.params.id;
  console.log(id);
  let sql = "DELETE FROM sign_up WHERE id=" + req.params.id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// //route to update the users
app.post("/updateuser/:id", verifyJWT,upload.single("file"), (req, res, err) => {
  console.log(req.body, "req of edit");

  console.log(req.params.id, "req params");
  const id = req.params.id;

//  const  {username,email,mobileno,category}= req.body.body;
//   console.log(username,'requser')
  // console.log(err);
  // let sql = "update sign_up set username='" + req.body.username + "',email=" + req.body.email + ",mobileno='" + req.body.mobileno + "', category='" + req.body.category + "',profile_img='" + imagename + "',city='" +  where id=" + req.body.identity;

  let sql =
    "update sign_up set username='" +
    req.body.username +
    "',email='" +
    req.body.email +
    "',mobileno='" +
    req.body.mobileno +
    "', category='" +
    req.body.category +
    "',profile_img='" +
    imagename +
    "',city='" +
    req.body.city +
    "',address='" +
    req.body.address +
    "'  where id='" +
    id +
    "'";

  console.log(sql, "sql query");
  conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
    // console.log(results,'editresults')
    // res.redirect("/showusers");
  });
});

//get all providers
app.get("/providers",(req,res)=>{
    sql = "select *from sign_up where category='Provider'";
 
  // console.log(sql);
  conn.query(sql, (err, results) => {
    if (err) throw err("No data found");
    res.json(results);
  });
})

//route for show data
app.post("/add_provrating/:id", (req, res) => {
  const id = req.params.id;
  const avgrate = req.body.avgrating;

  console.log(id, "params rateid");
  console.log(avgrate, "datarating");

  var sqlavg =
    "update sign_up set avgrating= " + avgrate + " where email='" + id + "'";
  console.log(sqlavg, "avg sql_query");
  conn.query(sqlavg, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//route to update the item
app.post("/searchprovider/:id", (req, res) => {
  // let sql ="select *from sign_up where  id=" + req.body.id;
  const cite = req.params.id;
  console.log(cite);
  let sql = "";

  if (cite === "pop") {
    sql = "select *from sign_up where category='Provider'";
  } else {
    sql =
      "SELECT * FROM sign_up WHERE category='Provider' and city LIKE '" +
      cite +
      "%'";

    // sql =
    //   "select * from sign_up where category='Provider' and city='" + cite + "'";
  }
  // console.log(sql);
  conn.query(sql, (err, results) => {
    if (err) throw err("No data found");
    res.json(results);
  });
});



// //route to login
// app.post("/login", (req, res) => {
//   const msg= [{type:"invalid"}];

//   let sql =
//     "select * from sign_up where email='" +
//     req.body.email +
//     "'";
//   console.log(sql);

//   conn.query(sql, async(err, results) => {
//     if (err) throw err;
    
//     else{
//       console.log(results,'password')
//       if(results.length>0)
//       {
      
//         res.json(results);
        
//       }
//       else
//       {
//         res.json(msg);
//       }
//     }
//   });
// });

app.get('/isUserAuth', verifyJWT , (req, res) => {
  res.send("You are authenticated Congrats:")
})



 //route to login
app.post("/login", (req, res) => {
  const msg= [{type:"invalid"}];

  let sql =
    "select * from sign_up where email='" +
    req.body.email +
    "'";
  console.log(sql);

  conn.query(sql, async(err, results) => {
    if (err) throw err;
    
    else{
      console.log(results,'password')
      if(results.length>0)
      {
        const match= await bcrypt.compare(req.body.password, results[0].password);
        if(match)
        {
            const id = results[0].id
            const token = jwt.sign({id}, jwtSecret)
            req.session.user = results;
           console.log(req.sessionID,'sessionuser');
        res.json({auth: true, token: token, results: req.session.user,message:"user found successfully"});
        }
        if(!match)
        {
          res.json({auth: false, message: "user not authenticated"});

        }
      }
      else
      {
        res.json({message:'please enter the valid email'});
      }
    }
  });
});


app.get('/isUserAuth', verifyJWT , (req, res) => {
  res.send("You are authenticated Congrats:")
})

app.get("/getsession", (req, res) => {
  console.log(req.session.user,'session_reqest')
  if (req.session) {
    res.send({ loggedIn: true,id:req.sessionID });
  } else {
    res.send({ loggedIn: false });
  }
});

//route to  breakfast
app.get("/viewbreak/:id", function (req, res) {
  const id = req.params.id;
  console.log(id);

  // let sql = "select * from product";
  if (id !== "pop") {
    let sql =
      "SELECT * FROM tiffin_details where  userid='" +
      id +
      "' and item_category='breakfast'";
    console.log(sql);
    conn.query(sql, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  }
});

//route to  lunch
app.get("/viewlunch/:id", function (req, res) {
  const id = req.params.id;
  console.log(id);
  // let sql = "select * from product";
  if (id !== "pop") {
    let sql =
      "SELECT * FROM tiffin_details where userid='" +
      id +
      "' and item_category='lunch'";
    console.log(sql, "lunch sql");
    conn.query(sql, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  }
});

//route to  View Lunch for Admin Panel
app.get("/viewdinner/:id", function (req, res) {
  const id = req.params.id;
  console.log(id);
  if (id !== "pop") {
    let sql =
      "SELECT * FROM tiffin_details where userid='" +
      id +
      "' and item_category='dinner'";
    console.log(sql);
    conn.query(sql, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  }
});

//route to  get discounted customer
app.get("/discount/:id", function (req, res) {
  const id = req.params.id;
  console.log(id);
  let sql = "SELECT * FROM bill where customer='" + id + "'";
  console.log(sql);
  conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//route to get provider rating
app.get("/provider_rating/:id", function (req, res) {
  const id = req.params.id;
  console.log(id);
  if (id !== "pop") {
    let sql = "SELECT * FROM rating where pack_id='" + id + "'";
    console.log(sql);
    conn.query(sql, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  }
});

//avg rating of providers
app.post("/avg_rating/:id", function (req, res) {
  const id = req.params.id;
  console.log(id, "params id");

  let sql =
    "SELECT ROUND(AVG(rating)) x,pack_id FROM rating where pack_id='" +
    id +
    "'";
  console.log(sql, "prov avg");
  conn.query(sql, (err, results) => {
    if (err) throw err;

    console.log({ results });
    res.json(results);
  });
});

//route for category products
app.get("/category/:id", function (req, res) {
  const id = req.params.id;
  console.log(id);
  let sql = "";
  if (id === "allproducts") sql = "SELECT *FROM tiffin_details";
  else sql = "SELECT * FROM tiffin_details where item_category='" + id + "'";
  console.log(sql);

  conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//route to  show all items
app.get("/getitems", function (req, res) {
  let sql = "SELECT * FROM tiffin_details";
  console.log(sql);
  conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//route for countcart
app.get("/viewcount", (req, res) => {
  let sql = "SELECT count(*) count from cart";

  conn.query(sql, (err, results) => {
    // if (results.length > 1) {
    //   let cartqty = "delete *from cart";
    //   let query = conn.query(cartqty, (err, results) => {
    //     if (err) throw err;
    //     res.json(results);

    //   });
    // }

    if (err) throw err;
    console.log(results);
    res.json(results);
  });
});

//delete all cart
app.post("/delcart", async function (req, res) {
  let sql = "DELETE FROM cart ";
  conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//Add Cart
app.post("/addcart/:id", async function (req, res) {
  const id = req.params.id;
  const price = req.params.price;
  const provName = req.body.provName;

  console.log(provName, "providername");
  var flag = 1;
  let sql1 = "select * from cart where id in(" + id + ")";
  let promise = new Promise((resolve, reject) => {
    conn.query(sql1, async (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });

  let result = await promise;

  if (result.length <= 0) {
    console.log("ddddddd " + flag);
    let sql =
      "insert into cart values('haridas'," + id + ",1,'" + provName + "')";
    let query = conn.query(sql, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  } else res.json();
});

//route for increment
app.get("/incqty/:id", function (req, res) {
  const id = req.params.id;
  console.log(id);
  let sql = "update cart set qty=qty+1 WHERE qty<3 AND id=" + id;
  conn.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect("/viewcart");
  });
});

//route for decrement
app.get("/decQty/:id", function (req, res) {
  const id = req.params.id;
  let flag = false;
  let sq = "select qty from cart where id=" + id;
  conn.query(sq, async (err, results) => {
    console.log(results[0].qty);
    if (results[0].qty == 1) {
      let sql1 = "delete  FROM cart where id=" + id;
      console.log(sql1);
      conn.query(sql1, async (err, results) => {
        if (err) throw err;
        flag = true;
      });
    }
  });

  if (flag == false) {
    let sql = "update cart set qty=qty-1 WHERE qty>0 AND id=" + id;
    conn.query(sql, (err, results) => {
      if (err) throw err;
    });
  }
  res.redirect("/viewcart");
});

//route for delete item from cart
app.get("/delcart/:id", function (req, res) {
  const id = req.params.id;
  console.log(id);
  let sql = "DELETE FROM cart WHERE id='" + id + "'";
  conn.query(sql, (err, results) => {
    if (err) throw err;

    let sql1 = "delete  FROM cart where id='" + id + "'";
    let prom = new Promise((resolve, reject) => {
      conn.query(sql1, async (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
    // res.redirect('/viewcart1');
    res.redirect("/viewcart");
  });
});

//route for viewcart
app.get("/showcart", (req, res) => {
  let sql = "SELECT *from cart";
  conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//route for viewcart
app.get("/viewcart", (req, res) => {
  let sql =
    "SELECT tiffin_details.id,tiffin_details.item_name,tiffin_details.item_details,tiffin_details.userid,tiffin_details.item_price,tiffin_details.item_image,tiffin_details.item_category,cart.qty,cart.provname FROM tiffin_details,cart where tiffin_details.id=cart.id";
  conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//Get Recommended items
app.get("/recommended_items", (req, res) => {
  let sql =  "SELECT *from customer_orders group by product_name having count(product_name)>3";
  console.log(sql,'sql')
  let query = conn.query(sql, (err, results) => {
  
    if (err) throw err;
    
    res.json(results);
  });
});


//Showing packages to table
app.get("/showpackages", (req, res) => {
  let sql = "SELECT * FROM packages";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//route for insert data
app.post("/savepackage", upload.single("file"), (req, res) => {
  let data = {
    name: req.body.name,
    price: req.body.price,
    destination: req.body.dest,
    description: req.body.desc,
    facility: req.body.facility,
    startdate: req.body.sdate,
    enddate: req.body.edate,
    source: req.body.source,
    package_image: imagename,
  };
  console.log(data);
  //console.log(req.body.file);
  let sql = "INSERT INTO packages SET ?";
  let query = conn.query(sql, data, (err, results) => {
    if (err) throw err;
    res.redirect("/showpackages");
  });
});

// search file (destination) from table
app.post("/search", (req, res) => {
  console.log(req.body);
  let sql =
    "SELECT * FROM packages WHERE destination LIKE '" + req.body.text + "%'";
  console.log(sql);
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//route for delete
app.get("/packagedelete/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  let sql = "DELETE FROM packages WHERE id=" + id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect("/showpackages");
  });
});

//route to edit
app.get("/packageedit/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  let sql = "select*from packages where id=" + id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//update route
app.post("/update", (req, res) => {
  let sql =
    "update packages set name='" +
    req.body.name +
    "',price=" +
    req.body.price +
    ",source='" +
    req.body.source +
    "',description='" +
    req.body.desc +
    "',destination='" +
    req.body.dest +
    "',facility='" +
    req.body.facility +
    "',enddate='" +
    req.body.edate +
    "',startdate='" +
    req.body.sdate +
    "' where id=" +
    req.body.id;
  console.log(sql);
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect("/showpackages");
  });
});

//show rating all
app.get("/showrating", (req, res) => {
  let sql = "SELECT * FROM rating";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//show rating all
app.get("/customer_rating/:id", (req, res) => {
  const id = req.params.id;
  let sql = "SELECT *FROM RATING where user='" + id + "'";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//show rating all
app.get("/customer_rating/:id", (req, res) => {
  const id = req.params.id;
  let sql = "SELECT *FROM RATING where user='" + id + "'";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//show particular rating
app.post("/selected_rating", (req, res) => {
  const provid = req.body.provid;
  const cusid = req.body.cusid;
  console.log("provid", provid);

  let sql =
    "SELECT *FROM RATING where pack_id='" +
    provid +
    "' and user='" +
    cusid +
    "'";
  console.log(sql, "selected sql");
  conn.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results.length, "selectedresults");
    res.json(results);
  });
});

//rating given by users(add)
app.post("/addrating",verifyJWT, (req, res) => {
  let data = {
    user: req.body.user,
    rating: req.body.rating,
    comments: req.body.comments,
    provider: req.body.provider,
    pack_id: req.body.pack_id,
  };
  console.log(data);
  let sql = "INSERT INTO rating SET ?";
  let query = conn.query(sql, data, (err, results) => {
    if (err) throw err;
    res.redirect("/showrating");
  });
});

// avgr rating for all packages
app.get("/avgr", (req, res) => {
  let sql = "select pack_id,avg(rating) as avgr from rating group by pack_id";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//route for show data
app.post("/deleteprovider/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  let sql = "delete  FROM sign_up where email='" + id + "'";
  conn.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect("/provider");
  });
});

//route for show data
app.post("/showusers", (req, res) => {
  // const id = req.params.id;
  let sql = "SELECT *FROM sign_up";
  conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
    // res.redirect("/provider");
  });
});

//route for customerorders
app.post("/custProduct/:id", (req, res) => {
  const params = req.params.id;
  console.log(params, "getparams");

  let sql = "SELECT *from customer_orders where cname='" + params + "'";
  conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//route for providerorders
app.post("/provOrders/:id", (req, res) => {
  const params = req.params.id;
  console.log(params, "getparams");

  let sql = "SELECT *from customer_orders where provider='" + params + "'";
  conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//addresses show
app.get("/address", (req, res) => {
  let sql = "SELECT *FROM billdetails WHERE billdetails.name='name'";
  conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//route for billing
app.post("/bill", (req, res) => {
  console.log("generating bill");
  let cname1 = req.body.cname;
  console.log(cname1);
  let sql =
    "select bill.billno,bill.customer,bill.amount,tiffin_details.id,tiffin_details.item_name,purchase_qty,bill_items.purchase_price from bill,bill_items,tiffin_details where bill.billno = bill_items.billno and bill_items.product_id=tiffin_details.id";

  // let sql = "select bill.billno,customer_name,amount,product.product_id,product_name,purchase_qty,bill_items.product_price from bill,bill_items,product where bill.billno = bill_items.billno and bill_items.product_id=product.product_id and customer_name='raman'";
  let query1 = conn.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.json(results);
  });
});

//new route for payment

app.post("/payment", upload.single("file"),verifyJWT, async (req, res) => {
  console.log(req.body.products,'products');
  var data1 = { customer: req.body.cname, amount: req.body.amount };

  let sql = "INSERT INTO bill SET ?";
  // await db.query(queryString).catch(err => {throw err});
  let promise = new Promise((resolve, reject) => {
    conn.query(sql, data1, async (err, resultSet) => {
      if (err) reject(err);
      resolve(resultSet);
    });
  });

  let result = await promise;
  console.log(result);
  console.log("hello");

  console.log("done promise");

  const salt= bcrypt.genSaltSync(11)
  const hashCard= bcrypt.hashSync(req.body.cardno,salt) 

  let data = {
    customer: req.body.cname,
    cardno: hashCard,
    amount: req.body.amount,
  };
  console.log(data);

  sql = "INSERT INTO payment SET ?";
  conn.query(sql, data, (err, results) => {
    if (err) throw err;
  });

  var billno = 10;
  let s = "select max(billno) 'billno' FROM bill ";
  let promise1 = new Promise((resolve, reject) => {
    conn.query(s, async (err, results) => {
      if (err) throw err;
      resolve(results);

      //console.log("billno="+billno)
    });
  });
  let myresult = await promise1;
  billno = myresult[0].billno;

  let sql1 = "delete from bill_items";
  let prom = new Promise((resolve, reject) => {
    conn.query(sql1, async (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });

  let o = req.body.products;

  for (let x in o) {
    console.log(o[x]);
    let sql =
      "INSERT INTO bill_items values(" +
      billno +
      "," +
      o[x].id +
      "," +
      o[x].qty +
      "," +
      o[x].item_price +
      ")";
    console.log(sql);
    conn.query(sql, data, (err, results) => {
      if (err) throw err;
    });
  }

  for (let x in o) {
    console.log(o[x]);
    let sql =
      "INSERT INTO customer_orders values(" +
      billno +
      "," +
      o[x].id +
      ",'" +
      o[x].item_name +
      "','" +
      o[x].item_details +
      "','" +
      o[x].item_category +
      "'," +
      o[x].qty +
      "," +
      o[x].item_price +
      ",'" +
      data1.customer +
      "','" +
      o[x].userid +
      "','" +
      o[x].item_image +
      "','" +
      o[x].provname +
      "')";
    console.log(sql);
    conn.query(sql, data, (err, results) => {
      if (err) throw err;
    });
  }

  let cart = "delete from cart";
  conn.query(cart, async (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.listen(4700, () => {
  console.log(`express server running on 4700`);
});
