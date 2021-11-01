export function post_to_sell_api(sellerType,sellerName,postalAddress,contactPerson,contactNumber,email,propriterShipValue,millRegNo,millRegistrationDate,valueRMSME,firstFYTurnOver,firstFYTurnOverYear,secondFYTurnOver,secondFYTurnOverYear,thirdFYTurnOver,thirdFYTurnOverYear,cottonTradeExperience,gstNo,panNo,bankName,accountHolderName,branchAddress,ifscCode,referralCode) {

  let post_to_sell_param = {
    seller_buyer_id:"seller",
    product_id:sellerType,
    price:"ios",
    address:sellerName
  }

  return post_to_sell_api
}
