import mongoose from "mongoose";

const userDetailsSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true, 
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  LikedPost: {
    type: [String],
    default: [],
  },
  CommentedPosts: {
    type: [String], 
    default: [],
  },
});

const reporterSchema = new mongoose.Schema({
  uniqueId: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    default: "xyz",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  aadhaarNumber:{
    type:String,
    required:true,
  },
  headQuarterLocation:{
    type:String,
    required:true,
  },
  photo:{
    type:String,
    required:true,
  },
  nonApprovedNews: {
    type: [Object],
    default: [],
  },
  approvedNews: {
    type: [Object],
    default: [],
  },
  nonApproveVideo: {
    type: [Object],
    default: [],
  },
  approvedVideo: {
    type: [Object],
    default: [],
  },
});

const commentSchema = new mongoose.Schema({
  user: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const administratorSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    default: "xyz",
  },
  name: {
    type: String,
    required: true,
  },
  nonApprovedNews: {
    type: [Object],
    default: [],
  },
  nonApprovedNewsVid: {
    type: [Object],
    default: [],
  },
  approvedNews: {
    type: [Object],
    default: [],
  },
  approvedNewsVid: {
    type: [Object],
    default: [],
  },
  reporters: {
    type: [reporterSchema],
    default: [],
  },
  allReportsOnNews: {
    type: [Object],
    default: [],
  },
});

const newsItemSchema = new mongoose.Schema({
  newsID: {type:String,required:true},
  author: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  country: { type: String, required: true },
  tags: { type: [String], default: [] },
  categories: { type: [String], default: [] },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  images: { type: [String], default: [] },
  comments: { type: [commentSchema], default: [] },
  likes: { type: [String], default: 0 },
  approvedBy:{
    type:String,
    required:true,
  }
});

const newsSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "news",
  },
  administrator: {
    type: [administratorSchema],
    default: [],
  },
  reporters: {
    type: [reporterSchema],
    default: [],
  },
  approvedNews: {
    type: [newsItemSchema],
    default: [],
  },
  users:{
    type:[userDetailsSchema],
    default:[],
  }
});

const News = mongoose.model("News", newsSchema);
export default News;
