const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('/Work Archive/LapTrinhWeb/FINALVFINAL/models/user')

async function initialize(passport, getUserByEmail, getUserById){
    const athenticateUser = async (email, password, done) => {
        const user = await getUserByEmail(email)
        if (user == null){
            return done(null, false, {message : 'no user with that email'})
        }
        console.log(user)
        console.log(password)
        console.log(user[0].password)
        try{
            if( await bcrypt.compare(password, user[0].password)){
                console.log(user)
                return done(null, user)
                
            }
            else{
                return done(null,false,{message: 'password incorrect'})
            }
        }
        catch (err) {
            return done(err)
        }
        
    }
    passport.use(new LocalStrategy({ usernameField: 'email'}, athenticateUser))
    passport.serializeUser((user , done) => done(null, user[0].id))
    passport.deserializeUser((id,done) => {
        done(null, getUserById(id))
    
    })
}

module.exports = initialize