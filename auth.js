const passport = require("passport");
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const {hash, compare, genSalt} = require('bcrypt');
const jwt = require("jsonwebtoken")

const ClientModel = require("./models/clientModel");

// Passport
passport.use(new LocalStrategy({
    usernameField: "client_name",
    passwordField: "password",
    session: false
}, async (client_name, password, done) => {
    let user; try { user = await ClientModel.findOne({ client_name }); } catch (e) { return done(e, false); }
    if (!user) return done(null, false);
    if (!await compare(password, user.password_hash)) return done(null, false);
    done(null, user);
}));

passport.use(
    new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
        algorithms: [process.env.JWT_ALGORITHM],
    },
    async (jwt_payload, done) => {
        let user; try { user = await ClientModel.findOne({ _id: jwt_payload.sub }); } catch (e) { return done(null, false); }
        if (!user) return done(null, false);
        return done(null, user);
    }
));

//
//
//

const login = async (req, res, next) => {
    passport.authenticate("local", { session: false }, async (error, user) => {
        if (error || !user) {
            console.log(error, user);
            return res.json({ success: false, error: true, message: "Invalid/Username or Password", error });
        } else {
            const payload = {
                sub: user._id,
                exp: Date.now() + parseInt(process.env.JWT_LIFETIME),
                username: user.username,
                isAdmin: user.is_admin
            };
            const token = await jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET, { algorithm: process.env.JWT_ALGORITHM });
            res.json({ success: true, data: { token: token, client: user.view() } });
        }
    })(req, res);
}

const ensureAuthenticated = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (info)
            return res.status(401).json({ success: false, error: true, message: "Unauthorized", info });
        if (err)
            return next(err);
        if (!user)
            return res.status(401).json({ success: false, error: true, message: "Unauthorized", info: 2 });

        req.user = user;
        next();
    })(req, res, next);
}

const ensureIsAdmin = (req,res,next) =>{
    const check =() =>{
        if(req.user.is_admin){
            next()
        }else{
            console.log(req.user)
            return res.status(401).json({ success: false, error: true, message: "Not Admin"});
        }
    }
    ensureAuthenticated(req,res,check)
}


//
//
//

module.exports = {
    //
    //
    //

    controllers: {
       login
    },

    //
    //
    //
    
    middleware: {
        ensureAuthenticated,
        ensureIsAdmin,
    }
}