import { Strategy as LocalStartegy } from 'passport-local';
import bcrypt from 'bcrypt';
import { User } from '../Models/UserModel.js';
//if user details stored as username, password no issues, we can directly pass arguments as username, password
//else we need to map fields from DB to passport fields,
//if username stored in name field in db, then explicitly mention usernameField:"name"
//for password, passwordField
export default function configurePassport(passport) {
  passport.use(
    new LocalStartegy(
      { usernameField: 'name' },
      async (name, password, done) => {
        console.log('passport username', name, password);
        const user = await User.findOne({ name }); //validate user present in db or not
        const passwordMatch = bcrypt.compare(password, user.password);
        if (passwordMatch) {
          done(
            null,
            user, // this will pass data to serializer below
            { message: 'User Found' }
          );
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id); //based on the field name(user.id), it will serialize and store in server sessions
  });
  passport.deserializeUser(async (id, done) => {
    console.log('deserializeUservalue', id);
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (e) {
      done(false, e);
    }
  });
}
