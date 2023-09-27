export function apiLink(call) {
  // const ApiLink = "http://192.168.10.133/react-native-backend/api/"+call; // for local
  const ApiLink =
    "https://intranet.saleecolour.com/test/palmtest/react-native-backend/api/" +
    call; // for prodution
  return ApiLink;
}
