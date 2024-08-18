import { sign } from "./jwt/sign";
import { verify } from "./jwt/verify";

const secret = '#ludmillo'

const token = sign({
  exp: Date.now() + (24 * 60 * 60 * 1000),
  data: {
    sub: '@oleonardo.deandrade',
  },
  secret: secret + ''
});

const decoded = verify({
  token,
  secret
});

console.log({decoded});