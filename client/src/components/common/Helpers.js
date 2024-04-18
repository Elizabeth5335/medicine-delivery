export function validateForm({
  name = "",
  email = "",
  phone = "",
  address = "",
}) {
  const errors = {};
  if (!name.trim()) {
    errors.name = "Name is required";
  }
  if (!email.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Email is invalid";
  }
  if (!phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (
    !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone)
  ) {
    errors.phone = "Phone number is invalid";
  }
  if (!address.trim()) {
    errors.address = "Address is required";
  }
  return errors;
}
