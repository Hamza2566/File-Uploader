import { PrismaClient } from "@prisma/client/extension";

const prisma = new PrismaClient()
passport.use(
  new LocalStrategy( async (username, password, done) => {
    try {
      const user = await prisma.user.findUnique({ where: { username } });
      if (!user) return done(null, false, { message: 'Incorrect email or password' });
      const ok = await bcrypt.compare(password, user.password);
      if (!ok) return done(null, false, { message: 'Incorrect email or password' });
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);
passport.serializeUser((user, done) => {
  // store user id in the session
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });
    done(null, user || null);
  } catch (err) {
    done(err);
  }
});

