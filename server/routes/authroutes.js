const router = require('express').Router()
const bcrypt = require('bcryptjs')
const pool = require('../config/db')
const jwt = require("jsonwebtoken");



router.post("/register" , async (req, res)=>{
    const {email,name, password} = req.body;
    try {
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1" , [email])

        if (user.rows.length>0) {
            return res.status(401).json({"success": false ,  "message":"User already exists"});
        }

        const salt= await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password,salt);
        let newUser = await pool.query(
            "INSERT INTO users (user_name , user_email , User_password) VALUES ($1, $2,$3) RETURNING *",[name, email , bcryptPassword]
        );
        const payload = {
            user: {
              id: newUser.rows[0].user_id
            }
          };
        

        const jwtToken = jwt.sign(payload, process.env.JWTSECRET, { expiresIn: "1h" })
        return res.json({ jwtToken });



    } catch (err) {
        console.error(err);
        res.status(500).send("err");
    
    }
})

router.post('/login' , async ( req, res) => {
    const {email , password } = req.body ;
    try {
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1" , [email])

        if (user.rows.length == 0) {
            return res.status(401).json({"success": false ,  "message":"Invalid credentials"});
        }

        const validpassword = await bcrypt.compare(password , user.rows[0].user_password)
        if ( !validpassword) {
            return res.status(401).json("Invalid Credentials")
        }

        const payload = {
            user: {
              id: user.rows[0].user_id
            }
          };
        

        const jwtToken = jwt.sign(payload, process.env.JWTSECRET, { expiresIn: "1h" })
        return res.json({ jwtToken });


    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
})

module.exports = router