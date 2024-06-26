const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

const port = process.env.PORT || 5000;

// git deployment is not working properly with vercel

const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.DB_URL;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const jwt_secret = process.env.JWT_SECRET;

const createToken = (user) => {
  return jwt.sign(
    {
      email: user?.email,
    },
    jwt_secret,
    { expiresIn: "7d" }
  );
};

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(403)
      .send({ message: "Forbidden access! header is missing" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, jwt_secret, function (err, decoded) {
    if (err) {
      return res
        .status(401)
        .send({ message: "Unauthorized access! Token is not valid" });
    }

    req.decoded = decoded;
    next();
  });
};

async function run() {
  try {
    const careerNestDB = client.db("studyNest");

    const usersCollection = careerNestDB.collection("users");
    const courseCollection = careerNestDB.collection("course");
    const enrollCollection = careerNestDB.collection("enroll");
    const paymentsCollection = careerNestDB.collection("payments");

    // ---------------------------- Users Routes --------------------

    app.post("/users", async (req, res) => {
      const user = req.body;
      const email = user?.email;
      const token = createToken(user);

      const isUserExist = await usersCollection.findOne({ email });
      console.log({ isUserExist });

      if (!isUserExist) {
        const result = await usersCollection.insertOne(user);
        return res.send({
          success: true,
          message: "Successfully login",
          data: { ...result, token },
        });
      } else {
        res.send({
          success: false,
          message: `You already have an account. Successfully login`,
          data: { token },
        });
      }
    });

    app.get("/users", async (req, res) => {
      const email = req.query.email;
      const result = await usersCollection.findOne({ email });
      res.send({
        success: true,
        message: "Successfully get user data",
        data: result,
      });
    });

    app.get("/users/profile/:id", verifyJWT, async (req, res) => {
      const id = req.params.id;
      const result = await usersCollection.findOne({ _id: new ObjectId(id) });
      res.send({
        success: true,
        message: "User data fetched successfully",
        data: result,
      });
    });

    app.patch("/users/profile/:id", verifyJWT, async (req, res) => {
      const id = req.params.id;
      const data = req.body;

      const result = await usersCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: data },
        { upsert: true }
      );

      res.send({
        success: true,
        message: "User data update successfully",
        data: result,
      });
    });

    // TODO: add verifyUser middleware for delete
    app.delete("/users", async (req, res) => {
      const email = req.query.email;

      const filter = { userEmail: email };
      const result = await usersCollection.deleteOne(filter);
      res.send(result);
    });

    // ---------------------------- Course Routes --------------------

    app.post("/course", verifyJWT, async (req, res) => {
      const jobData = req.body;
      const result = await courseCollection.insertOne(jobData);
      res.send(result);
    });

    app.get("/course", async (req, res) => {
      const result = await courseCollection.find({}).toArray();
      res.send(result);
    });

    app.get("/my-course", verifyJWT, async (req, res) => {
      const email = req.query.email;
      const result = await courseCollection.find({ email: email }).toArray();
      res.send(result);
    });

    app.get("/course/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };

      const result = await courseCollection.findOne(filter);
      res.send(result);
    });

    app.patch("/course/:id", verifyJWT, async (req, res) => {
      const email = req.decoded?.email;
      const id = req.params.id;
      const courseData = req.body;

      const filter = { _id: ObjectId(id) };
      const updatedDoc = { $set: courseData };

      const isCourseExist = await courseCollection.findOne(filter);

      if (!isCourseExist) {
        return res.status(404).send({ message: "Course not found!" });
      }

      if (isCourseExist?.email !== email) {
        return res.status(401).send({
          message: "Forbidden access. User is not creator of this course",
        });
      }

      const result = await courseCollection.updateOne(filter, updatedDoc);

      res.status(200).send({
        success: true,
        message: "Course updated success",
        data: result,
      });
    });

    app.delete("/course/:id", verifyJWT, async (req, res) => {
      const email = req.decoded?.email;
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };

      const isCourseExist = await courseCollection.findOne(filter);

      if (!isCourseExist) {
        return res.status(404).send({ message: "Course not found!" });
      }

      if (isCourseExist?.email !== email) {
        return res.status(401).send({
          message: "Forbidden access. User is not creator of this course",
        });
      }

      const result = await courseCollection.deleteOne(filter);

      res.status(200).send({
        success: true,
        message: "Course delete success",
        data: result,
      });
    });

    // ---------------------------- Payment Routes --------------------

    app.post("/create-payment-intent", async (req, res) => {
      const price = req.body.productPrice;
      const amount = price * 100;

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });

      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });

    app.post("/payments", async (req, res) => {
      const { payment, course } = req.body;

      await enrollCollection.insertOne({ ...payment, course });

      const result = await paymentsCollection.insertOne(payment);
      res.send(result);
    });

    // ---------------------------- Enroll Routes --------------------

    app.post("/enroll", verifyJWT, async (req, res) => {
      const order = req.body;
      const result = await enrollCollection.insertOne(order);
      res.send(result);
    });

    app.get("/enroll", verifyJWT, async (req, res) => {
      const decodedEmail = req.decoded.email;
      const query = { email: decodedEmail };
      const result = await enrollCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/enroll/:id", verifyJWT, async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await enrollCollection.findOne(query);
      res.send(result);
    });

    app.delete("/enroll/:id", verifyJWT, async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };

      const enrollDataExist = await enrollCollection.findOne(query);

      if (!enrollDataExist) {
        return res.status(404).send({ message: "Enroll data is not found!" });
      }

      const result = await enrollCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
  }
}

run().catch(console.log);

app.get("/", (req, res) => {
  res.send("Study Nest server is running");
});

app.listen(port, () => {
  console.log(`Study Nest server is running on port ${port}`);
});
