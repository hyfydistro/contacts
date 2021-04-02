// Validates for the following pattern:
// +XX-XXXX-XXXX
// +XX.XXXX.XXXX
// +XX XXXX XXXX
// XXXXXXXXXX (max length: 10)

export default function validatePhoneNumber (numebr) {
  const regex = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
  if (numebr.match(regex)) {
    return true;
  }
  return false;
}