import a from "axios";

const axios = a.create({
  baseURL: process.env.NEXT_PUBLIC_HOST,
});

export default axios;
