import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "The Rise of Decentralized Finance",
    content:
      "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
    author: "Alex Thompson",
    date: "2023-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    content:
      "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
    author: "Mia Williams",
    date: "2023-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Samuel Green",
    date: "2023-08-10T09:15:00Z",
  },
];

let lastId = 3;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// GET all posts
app.get('/posts', (req, res) => {
  res.json(posts);
});

// GET a specific post by id
app.get('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const postIndex = posts.findIndex(post => post.id === id);

  if (postIndex > -1) {
    res.json(posts[postIndex]);
  } else {
    res.sendStatus(404);
  }
});

// POST a new post
app.post('/posts', (req, res) => {
  lastId += 1;
  const newPost = {
    id: lastId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date(),
  };

  posts.push(newPost);
  console.log(posts[lastId - 1]);
  res.json(newPost);
});

//  PATCH a post 
app.patch('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const postIndex = posts.findIndex(post => post.id === id);
  const updatedPost = {
    id: id,
    title: req.body.title || posts[postIndex].title,
    content: req.body.content || posts[postIndex].content,
    author: req.body.author || posts[postIndex].author,
    date: new Date(),
  };

  if (postIndex > -1) {
    posts[postIndex] = updatedPost;
    console.log(posts[postIndex]);
    res.json(updatedPost);
  } else {
    res.sendStatus(404);
  }
});

// DELETE a specific post
app.delete('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const postIndex = posts.findIndex(post => post.id === id);

  if (postIndex > -1) {
    posts.splice(postIndex, 1);
    console.log("Post deleted");
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
