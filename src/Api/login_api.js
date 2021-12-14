export function login_api(mobile_number,password,fcmToken) {

  let login_param = {
    mobile_number:mobile_number,
    password:password,
    fcm_token:fcmToken
  }

  return login_param
}
