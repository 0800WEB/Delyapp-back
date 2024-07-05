import { connect } from "mongoose";

connect(process.env.LINK_DB)
    .then(() => console.log("connected to db"))
    .catch((err) => console.log(err))