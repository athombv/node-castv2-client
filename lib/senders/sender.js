var EventEmitter  = require('events').EventEmitter;
var util          = require('util');
var debug         = require('debug')('castv2-client');

function Sender(client, senderId, receiverId) {
  EventEmitter.call(this);

  this.client = client;
  this.senderId = senderId;
  this.receiverId = receiverId;
}

util.inherits(Sender, EventEmitter);

Sender.prototype.close = function() {
  this.senderId = null;
  this.receiverId = null;
  this.client = null;
  this.removeAllListeners();
};

Sender.prototype.createController = function() {
  var args = Array.prototype.slice.call(arguments);
  var Controller = args.shift();
  return construct(Controller, [this.client, this.senderId, this.receiverId].concat(args));
};

function construct(contructor, args) {
  // changed implementation to temporary (ugly) fix to work with native classes
  // when min nodejs version will be node.js 6.x we can replace this for
  // return new constructor(...args);
  return new contructor(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9]);
}

module.exports = Sender;
