export function positionRank(posi) {
  let position = "";
  if (posi == 15) {
    position = "Staff";
  } else if (posi == 35) {
    position = "Group leader";
  } else if (posi == 45) {
    position = "Foreman";
  } else if (posi == 55) {
    position = "Supervisor";
  } else if (posi == 65) {
    position = "Asst manager";
  } else if (posi == 75) {
    position = "Manager";
  } else if (posi == 85) {
    position = "Director";
  } else if (posi == 95) {
    position = "Manager director";
  } else if (posi == 105) {
    position = "Chairman";
  } else {
    position = "No Position";
  }

  return position;
}
