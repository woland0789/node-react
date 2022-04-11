class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ message: "Invalid request", errors });
            }

            const { email, password } = req.body;

            const candidate = await UserSchema.findOne({ email });

            if (candidate) {
                res.status(400).json({ message: `User with email ${email} alrady exist` });
            }


            const hashPassword = await bcrypt.hash(password, 6);
            const user = new UserSchema({ email, password: hashPassword });

            await user.save();

            return res.json({ message: "User was created" });
        } catch (e) {
            console.log(e.message);
            res.send({ message: 'Server Error' });
        }
    }
    
    async login(req, res, next) {
        try {
            const { email, password } = req.body;

            const user = await UserSchema.findOne({ email });

            if (!user) {
                return req.status(400).json({ message: "User not found." });
            }

            const isPasswordValid = bcrypt.compareSync(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Password is not valid.' });
            }

            const token = jwt.sign({ id: user.id }, config.get('sercretKey'), { expiresIn: '1h' });

            return res.json({
                token,
                user: {
                    id: user.id,
                    emial: user.email
                }
            });
        } catch (e) {
            console.log(e.message);
            res.send({ message: 'Server Error' });
        }
    }
    async logout(req, res, next) {
        try {

        } catch (e) {

        }
    }
    async refresh(req, res, next) {
        try {

        } catch (e) {

        }
    }
    async getUsers(req, res, next) {
        try {

        } catch (e) {

        }
    }
}

export const userController = new UserController();