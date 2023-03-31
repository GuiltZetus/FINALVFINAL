const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('/Work Archive/LapTrinhWeb/FINALVFINAL/models/user')

async function initialize(passport, getUserByEmail, getUserById){
    const athenticateUser = async (email, password, done) => {
        const user = await getUserByEmail(email)
        if (user.length == 0){
            return done(null, false, {message : 'no user with that email'})
        }
        console.log(user)
        
        
        try{
            if( await bcrypt.compare(password, user.password)){
                console.log(user._id)
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
    // passport.serializeUser((user , done) => done(null, user._id))
    // passport.deserializeUser((_id,done) => {
    //     done(null, getUserById(_id))
    // })

    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
 
}


module.exports = initialize