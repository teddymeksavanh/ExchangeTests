// import { Meteor } from 'meteor/meteor';
// import { Mongo } from 'meteor/mongo'
//
// /* Classe Exchange */
// function Exchange(){
//   this.user = [];
//   this.product = [];
//   this.startDate = '';
//   this.endDate = '';
//   this.emailSender = '';
//   this.dbConnection = '';
// };
//
// Exchange.prototype = new Exchange();
//
// Exchange.prototype.setUser = function(user){
//   this.user.push(user);
// };
//
// Exchange.prototype.setProduct = function(product){
//   this.product.push(product);
// };
//
// Exchange.prototype.setStartDate = function(startDate){
//   this.startDate = startDate;
// };
//
// Exchange.prototype.setEndDate = function(endDate){
//   this.endDate = endDate;
// };
//
// Exchange.prototype.setEmailSender = function(email){
//   this.emailSender = email;
// };
//
// Exchange.prototype.setDbConnection = function(db){
//   this.dbConnection = db;
// };
// /* Fin Classe Exchange */
//
// /* Creation de collections */
// UserDB = new Mongo.Collection('UserDB');
// ProductDB = new Mongo.Collection('ProductDB');
// ExchangeDB = new Mongo.Collection('ExchangeDB');
//
// /* Insertion de data*/
// var user1Success = {
//   "firstname": "Teddy",
//   "name": "Meksavanh",
//   "age": 25,
//   "email": "teddymeksavanh@gmail.com"
// };
//
// var user2Success = {
//   "firstname": "Bruce",
//   "name": "Wayne",
//   "age": 37,
//   "email": "brucewayne@gmail.com"
// };
//
// /* Ajout des users dans la base de données */
// UserDB.insert(user1Success);
// UserDB.insert(user2Success);
//
// var productSuccess = {
//   "name": "Batmobile",
//   "status": "activated",
//   "owner": "brucewayne@gmail.com",
//   "description": "Je vend ma batmobile, à venir chercher sur place"
// };
//
// /* Ajout des product dans la base de données */
// ProductDB.insert(productSuccess);
//
// var date = new Date(),
//     dateNow = Date.now(),
//     startDateSuccess = date.setDate(date.getDate() + 1),
//     endDateSuccess = date.setDate(date.getDate() + 15);
//
// var TestExchangeSuccess = new Exchange;
//
// TestExchangeSuccess.setUser(user1Success);
// TestExchangeSuccess.setProduct(productSuccess);
// TestExchangeSuccess.setStartDate(startDateSuccess);
// TestExchangeSuccess.setEndDate(endDateSuccess);
//
// ExchangeDB.insert(TestExchangeSuccess);
//
// // /* Création de test avec erreur*/
// // var TestExchangeFail = new Exchange;
// //
// // var user1Fail = {
// //   "id": "Teddy",
// //   "firstname": '',
// //   "name": 2,
// //   "age": "Blop",
// //   "email": "teddymeksav"
// // };
// //
// // var user2Fail = {
// //   "id": "Teddy",
// //   "firstname": '',
// //   "name": 2,
// //   "age": "Blop",
// //   "email": "teddymeksav"
// // };
// //
// // var productFail = {
// //   "id": "1zaezap",
// //   "name": 5,
// //   "description": 123
// // };
// //
// // var startDateFail = date.setDate(date.getDate() - 5),
// //     endDateFail = date.setDate(date.getDate() - 10);
// //
// // /* Setter */
// // TestExchangeFail.setUser(user1Fail);
// // TestExchangeFail.setProduct(productFail);
// // TestExchangeFail.setStartDate(startDateFail);
// // TestExchangeFail.setEndDate(endDateFail);
// // /* Fin Création de test avec erreur*/
// //
// // /* Ajout des élements de test dans la base de données */
