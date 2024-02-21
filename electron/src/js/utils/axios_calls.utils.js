import axios from "axios";

export default {
  async axiosCall(action, endpoint, method, credentials, data) {
    const url = `http://${process.env.VUE_APP_API_IP}:${process.env.VUE_APP_API_PORT}/${process.env.VUE_APP_API_VERSION}/${action}/${endpoint}`;
    const response = await axios({
      method: method,
      url: url,
      data: data,
      withCredentials: credentials,
      headers: {
        "x-api-key": process.env.VUE_APP_API_KEY,
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    });
    return response;
  },
};
