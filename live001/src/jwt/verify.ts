import { generateSignature } from "../generateSignature";

interface IVerfyOptions{
  token: string;
  secret: string;
}

export function verify({ token, secret }: IVerfyOptions) {
  const [headerSent, payloadSent, signatureSent] = token.split('.');

  const signature = generateSignature({
    header: headerSent,
    payload: payloadSent,
    secret
  });

  if (signature !== signatureSent) {
    throw new Error('Invalid JWT token');
  }

  const decodedPayload = JSON.parse(Buffer.from(payloadSent, 'base64url').toString('utf-8'))

  if (decodedPayload.exp < Date.now()) {
    throw new Error('Expired Token');
  }

  return decodedPayload;
}