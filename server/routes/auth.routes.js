const Router = require('express');
const User  = require('../models/User');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');

const router = new Router();

router.post('/registration',
    [
        check('email', 'Uncorrect email').isEmail(),
        check('password', 'Password must be longer than 3 and shorter than 12').isLength({min: 3, max: 12});
    ]
async (req, res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).json({message: "Uncorrect request", errors });
        }

        const {email, password} = req.body;

        const candidate = await User.findOne({email});

        if(candidate){
            res.status(400).json({message: `User with email ${email} alrady exist`});
        }


        const hashPassword = await bcrypt.hash(password, 15);
        const user = new User({ email, password: hashPassword });

        await user.save();

        return res.json({message: "User was created"});
    }catch(e){
        console.log(e.message);
        res.send({ message: 'Server Error' });
    }
})

module.exports = router;