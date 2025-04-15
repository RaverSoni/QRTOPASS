// export default function handler(req, res) {
//   const { length, lowercase, uppercase, numbers, symbols } = req.query;

//   const charset = {
//     lowercase: "abcdefghijklmnopqrstuvwxyz",
//     uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
//     numbers: "0123456789",
//     symbols: "!@#$%^&*()_+",
//   };

//   let availableCharset = '';
//   let password = '';

//   // Add selected character sets
//   if (lowercase === 'true') availableCharset += charset.lowercase;
//   if (uppercase === 'true') availableCharset += charset.uppercase;
//   if (numbers === 'true') availableCharset += charset.numbers;
//   if (symbols === 'true') availableCharset += charset.symbols;

//   // Ensure at least one charset is selected
//   if (!availableCharset) {
//     return res.status(400).json({ error: "At least one character set must be selected." });
//   }

//   const passwordLength = parseInt(length, 10) || 12;

//   // Ensure that the password contains at least one character from each selected set
//   if (lowercase === 'true') password += charset.lowercase[Math.floor(Math.random() * charset.lowercase.length)];
//   if (uppercase === 'true') password += charset.uppercase[Math.floor(Math.random() * charset.uppercase.length)];
//   if (numbers === 'true') password += charset.numbers[Math.floor(Math.random() * charset.numbers.length)];
//   if (symbols === 'true') password += charset.symbols[Math.floor(Math.random() * charset.symbols.length)];

//   // Now fill the remaining password length with random characters from availableCharset
//   for (let i = password.length; i < passwordLength; i++) {
//     password += availableCharset[Math.floor(Math.random() * availableCharset.length)];
//   }

//   // Shuffle the password to ensure the characters are distributed randomly
//   password = password.split('').sort(() => Math.random() - 0.5).join('');

//   res.status(200).json({ password });
// }

import QRCode from 'qrcode';

export default async function handler(req, res) {
  const { length, lowercase, uppercase, numbers, symbols } = req.query;

  const charset = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+",
  };

  let availableCharset = '';
  let password = '';

  // Add selected character sets
  if (lowercase === 'true') availableCharset += charset.lowercase;
  if (uppercase === 'true') availableCharset += charset.uppercase;
  if (numbers === 'true') availableCharset += charset.numbers;
  if (symbols === 'true') availableCharset += charset.symbols;

  // Ensure at least one charset is selected
  if (!availableCharset) {
    return res.status(400).json({ error: "At least one character set must be selected." });
  }

  const passwordLength = parseInt(length, 10) || 12;

  // Ensure that the password contains at least one character from each selected set
  if (lowercase === 'true') password += charset.lowercase[Math.floor(Math.random() * charset.lowercase.length)];
  if (uppercase === 'true') password += charset.uppercase[Math.floor(Math.random() * charset.uppercase.length)];
  if (numbers === 'true') password += charset.numbers[Math.floor(Math.random() * charset.numbers.length)];
  if (symbols === 'true') password += charset.symbols[Math.floor(Math.random() * charset.symbols.length)];

  // Now fill the remaining password length with random characters from availableCharset
  for (let i = password.length; i < passwordLength; i++) {
    password += availableCharset[Math.floor(Math.random() * availableCharset.length)];
  }

  // Shuffle the password to ensure the characters are distributed randomly
  password = password.split('').sort(() => Math.random() - 0.5).join('');

  // Generate QR code for the password
  try {
    const qrCodeDataURL = await QRCode.toDataURL(password);

    // Respond with both password and QR code image as base64 PNG
    res.status(200).json({ password, qrCode: qrCodeDataURL });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
}
