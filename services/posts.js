var mongoose = require('mongoose');  
var Post = require('../models/post');

module.exports.addPost = function(req, res) {};

module.exports.getAllPosts = function(req, res) {
    Post.find(function(err, posts) {
        if (err) {
            res.send(err);
        }
        res.json({posts: posts});
    });
};

module.exports.getSinglePost = function(req, res, id) {};

module.exports.updatePost = function(req, res, id) {};

module.exports.deletePost = function(req, res, id) {};
