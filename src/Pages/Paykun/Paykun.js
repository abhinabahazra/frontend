// import React, { Component } from 'react'

// // Create Paykun object
// // Currently Sandbox does not support JS checkout, and so you will not be able to test JS integration, 
// // isLive can only be true for now
// const pk = new PayKun({ merchantId : "merchantId", accessToken: "accessToken", isLive: true});
// // Add this function in your javascript tag or your js file
// // This method can be called to initialize payment, It can be any event User Generated Or system Generated
//   function initPayment() {
//       let order = {
//           amount: "10", // Amount to collect
//           orderId: "ORD" + (new Date).getTime(), // Unique order id, You can use your custom login here, but make sure it generates unique ID everytime
//           productName: "Mobile", // Name of the product
//           customerName: "Test name", // Name of the customer
//           customerEmail: "test@gmail.com", // Email of the customer
//           customerMobile: "9999999999", // Mobile of customer
//           currency: "INR", //set your 3 digit currency code here
//           // Following are callback function and will be called when any result is received after payment, 
//           // If payment is success then onSuccess method will be called Or else onCancelled method will be called
//           onSuccess: function (transactionId) {
//               // You can use 'transactionId' variable to process payment at your server side if you like, 
//               // In that case you can call our transaction status API on your server to get transaction information Or
//               // You can get complete transaction details by calling the following function
//               // WARNING: It is advisable to verify transaction amount and status at your server side using Transaction ID before delivering any service for security reason
//               var transaction = pk.getTransactionDetail(transactionId, function(transaction) {
//                   // You can show payment success message to user here, Also process this payment success at your server side to deliver services to customer
//                   console.log(transaction);
//                   alert('Payment is success, Your transaction ID : ' + transaction.transaction.payment_id);
//               });
//           },
//           onCancelled: function (transactionId) {
//               // You can use 'transactionId' variable to process payment at your server side if you like, 
//               // In that case you can call our transaction status API on your server to get transaction information Or
//               // You can get complete transaction details by calling following function
//               var transaction = pk.getTransactionDetail(transactionId, function(transaction) {
//                   // You can show payment canceled message to user here, Also mark this payment as failed/cancelled at your server side
//                   console.log(transaction);
//                   alert('Payment is cancelled, Your transaction ID : ' + transaction.transaction.payment_id);
//               });
//           }
//       };
//       //Init Paykun Payment and open checkout popup
//       pk.init(order);
//   }
// export class Paykun extends Component {
//     render() {
//         return (
//             <div>
                
//             </div>
//         )
//     }
// }

// export default Paykun
