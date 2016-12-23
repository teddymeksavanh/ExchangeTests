import { Tinytest } from "meteor/tinytest";
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

var expect = require('expect');

  /* Creation de collections Mongo (Database)*/
UserDB = new Mongo.Collection('UserDB');
ProductDB = new Mongo.Collection('ProductDB');
ExchangeDB = new Mongo.Collection('ExchangeDB');

"use strict";

/* Class de Test */
function Test(Instance){
  /* Test on User */
  if(Instance instanceof User){
    var regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(
      regexEmail.test(Instance.email) &&
      Instance.name &&
      Instance.firstname &&
      Instance.age >= 13
    ){
      return true;
    }
  }

  /* Test on Product */
  if(Instance instanceof Product){
    var status = Instance.status.toUpperCase(),
        ownerEmail = Instance.owner.email,
        ownerExist = UserDB.findOne({email : ownerEmail});

    if(!ownerExist.email){
      return false;
    }
    if(
      Instance.name &&
      status === "ACTIVATED" &&
      ownerEmail === ownerExist.email &&
      Instance.owner.isValid()
    ){
      return true;
    }
  }

  /* Test on Exchange */
  if(Instance instanceof Exchange){
    var receiver = Instance.receiver,
        product = Instance.product,
        nowDate = Date.now(),
        startDate = Instance.startDate,
        startDateIsValid = false,
        endDate = Instance.endDate,
        receiverIsValid = receiver.isValid(),
        productIsValid = product.isValid();

    if(startDate > nowDate && startDate < endDate){
      startDateIsValid = true;
    }

    if(
      receiverIsValid &&
      productIsValid &&
      startDateIsValid
    ){
      if(receiver.age < 18){
        /* Email Sender */
        Instance.setEmailSender(true);
      }
      return true;
    }

  }

  return false;
};
/* Fin Class de Test */

/* Module Send Email */
function sendEmailTo(email, provider){
  /* Installation d'un provider pour envoyer les mails (optionel et non dans la consigne) */
}
/* Fin Module Send Email */

/* Class User */
function User(){
  this.firstname = "";
  this.name = "";
  this.age = "";
  this.email = "";
};

User.prototype = new User();

User.prototype.setFirstname = function(firstname){
  this.firstname = firstname;
};

User.prototype.setName = function(name){
  this.name = name;
};

User.prototype.setAge = function(age){
  this.age = age;
}

User.prototype.setEmail = function(email){
  this.email = email;
};

User.prototype.isValid = function(){
  return Test(this);
};
/* Fin Class User */

/* Class Product */
function Product(){
  this.name = "";
  this.status = "";
  this.owner = new User;
};

Product.prototype = new Product();

Product.prototype.setName = function(name){
  this.name = name;
};

Product.prototype.setStatus = function(status){
  this.status = status;
}

Product.prototype.setOwner = function(owner){
  this.owner = owner;
};

Product.prototype.isValid = function(){
  return Test(this);
};
/* Fin Class Product */

/* Class Exchange */
function Exchange(){
  this.receiver = new User;
  this.product = new Product;
  this.startDate = new Date();
  this.endDate = new Date();
  this.emailSender = false;
  this.dbConnection = '';
};

Exchange.prototype = new Exchange();

Exchange.prototype.setReceiver = function(user){
  this.receiver = user;
};

Exchange.prototype.setProduct = function(product){
  this.product = product;
};

Exchange.prototype.setStartDate = function(startDate){
  this.startDate = startDate;
};

Exchange.prototype.setEndDate = function(endDate){
  this.endDate = endDate;
};

Exchange.prototype.setEmailSender = function(emailSender){
  this.emailSender = emailSender;
};

Exchange.prototype.setDbConnection = function(db){
  this.dbConnection = db;
};

Exchange.prototype.isValid = function(){
  return Test(this);
};

Exchange.prototype.save = function(){
  if(this.isValid){
    if(this.emailSender){
      sendEmailTo(this.receiver.email, "EmailSenderModule");
    }
    ExchangeDB.insert(this);
    return true;
  }
  return false;
};
/* Fin Class Exchange */

if(Meteor.isServer){
  var owner = new User,
      receiver = new User,
      product = new Product,
      exchange = new Exchange,
      startDate = new Date(),
      endDate = new Date();

  startDate.setDate(startDate.getDate() + 1);
  endDate.setDate(endDate.getDate() + 10);

  owner.setFirstname("Bruce");
  owner.setName("Wayne")
  owner.setAge(38);
  owner.setEmail("brucewayne@gmail.com");

  receiver.setFirstname("Teddy");
  receiver.setName("Meksavanh")
  receiver.setAge(15);
  receiver.setEmail("teddymeksavanh@gmail.com");

  UserDB.insert(owner);
  UserDB.insert(receiver);

  product.setName("Batmobile");
  product.setStatus("activated");
  product.setOwner(owner);

  ProductDB.insert(product);

  exchange.setReceiver(receiver);
  exchange.setProduct(product);
  exchange.setStartDate(startDate);
  exchange.setEndDate(endDate);

  /* Tests unitaires */
  describe('Starting All Exchange Tests', function(){

    /* Test on User */
    describe('User', function(){
      it('User.isValid() should return true', function(){
        console.log(owner);
        expect(owner.isValid()).toExist();
      });
    });

    /* Test on Product */
    describe('Product', function(){
      it('Product.isValid() should return true', function(){
        console.log(product);
        expect(product.isValid()).toExist();
      });
    });

    /* Test on Exchange */
    describe('Exchange', function(){
      it('Exchange.isValid() should return true', function(){
        console.log(exchange);
        expect(exchange.save()).toExist();
      });
    });
  });
}

// /* Création d'une base de données de test coté serveur */
// if(Meteor.isServer){
//
//   /* Creation de collections Mongo */
//   UserDB = new Mongo.Collection('UserDB');
//   ProductDB = new Mongo.Collection('ProductDB');
//   ExchangeDB = new Mongo.Collection('ExchangeDB');
//
//   /* Insertion de data*/
//
//   /** User **/
//   var user1Success = {
//     "firstname": "Teddy",
//     "name": "Meksavanh",
//     "age": 25,
//     "email": "teddymeksavanh@gmail.com"
//   };
//
//   var user2Success = {
//     "firstname": "Bruce",
//     "name": "Wayne",
//     "age": 37,
//     "email": "brucewayne@gmail.com"
//   };
//
//   var user1Fail = {
//     "firstname": '',
//     "name": 2,
//     "age": "Blop",
//     "email": "finalfantasy"
//   };
//
//   var user2Fail = {
//     "firstname": '',
//     "name": 2,
//     "age": "Blop",
//     "email": "batman"
//   };
//
//   UserDB.insert(user1Success);
//   UserDB.insert(user2Success);
//   UserDB.insert(user1Fail);
//   UserDB.insert(user2Fail);
//
//   /** Product **/
//   var productSuccess = {
//     "name": "Batmobile",
//     "status": "activated",
//     "owner": "teddymeksavanh@gmail.com",
//     "description": "Je vend ma batmobile, à venir chercher sur place"
//   };
//
//   ProductDB.insert(productSuccess);
//
//   /** Exchange **/
//   var date = new Date(),
//       dateNow = Date.now(),
//       startDateSuccess = date.setDate(date.getDate() + 1),
//       endDateSuccess = date.setDate(date.getDate() + 15);
//
//   var TestExchangeSuccess = new Exchange;
//
//   TestExchangeSuccess.setUser(user1Success);
//   TestExchangeSuccess.setProduct(productSuccess);
//   TestExchangeSuccess.setStartDate(startDateSuccess);
//   TestExchangeSuccess.setEndDate(endDateSuccess);
//
//   ExchangeDB.insert(TestExchangeSuccess);
//
//   var userTest = UserDB.findOne({email : "teddymeksavanh@gmail.com"});
//   var productTest = ProductDB.findOne({name : "Batmobile"});
//
//   /* Mes Tests */
//
//   var regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//
//   describe('Starting All Exchange Tests', function(){
//
//     /* Test on User */
//     describe('User isValid', function(){
//       it('User name should return a string', function(){
//         expect(userTest.name).toBeA('string');
//       });
//
//       it('User name should exist', function(){
//         expect(userTest.name).toExist();
//       });
//
//       it('User firstname should return a string', function(){
//         expect(userTest.firstname).toBeA('string');
//       });
//
//       it('User firstname should exist', function(){
//         expect(userTest.firstname).toExist();
//       });
//
//       it('User age should return a number', function(){
//         expect(userTest.age).toBeA('number');
//       });
//
//       it('User age should be greater or equal to 18', function(){
//         expect(userTest.age).toBeGreaterThanOrEqualTo(18);
//       });
//
//       it('User email should match an email pattern', function(){
//         expect(userTest.email).toMatch(regexEmail);
//       });
//     });
//     /* Fin Test on User */
//
//     // /* Test on Product */
//     describe('Product isValid', function(){
//       it('Product name should return a string', function(){
//         expect(productTest.name).toBeA('string');
//       });
//
//       it('Product name should exist', function(){
//         expect(productTest.name).toExist();
//       });
//
//       it('Product status should return activated', function(){
//         let lowerCaseStatus = productTest.status.toLowerCase();
//         expect(lowerCaseStatus).toEqual('activated');
//       });
//
//       it('Product description should return a string', function(){
//         expect(productTest.description).toBeA('string');
//       });
//
//       it('Product owner should exist in database', function(){
//         let checkUsers = UserDB.findOne({email : productTest.owner});
//         expect(productTest.owner).toEqual(checkUsers.email);
//       });
//     });
//     // /* Fin Test on Product */
//     //
//     // /* Test on Date */
//     // describe('Date isValid', function(){
//     //   it('startDate should be greater than current date', function(){
//     //     expect(testObject.startDate).toBeGreaterThan(dateNow);
//     //   });
//     //
//     //   it('startDate should be less than endDate', function(){
//     //     expect(testObject.startDate).toBeLessThan(testObject.endDate);
//     //   });
//     //
//     //   it('endDate should be Greater then StartDate', function(){
//     //     expect(testObject.endDate).toBeGreaterThan(testObject.startDate);
//     //   });
//     // });
//     // /* Fin Test on Date */
//
//   });
//   // }
// }
