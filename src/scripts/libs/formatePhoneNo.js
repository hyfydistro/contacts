export default function formatPhoneNo (number) {
  const regex = /([\+?\d]{3})(\d{3})(\d*)/;
  const str = number;
  return str.replace(regex, "$1 $2 $3");
}