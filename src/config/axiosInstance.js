import axios from "axios";
import * as url from "../enums/url";

const $axios = axios.create({
  baseURL: url.BASE_URL,
  timeout: 500000
});

export default $axios;
