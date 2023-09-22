export function passwordPattern(password) {
  const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  if (!password) return "Can't be empty.";
  if (password.length < 8) return 'Password must be at least 8 characters long.';
  if (!re.test(password)) return 'Password must have at least Uppercase Lowercase Character and Special Symbol';
  return "";
}
