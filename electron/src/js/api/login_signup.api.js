import axiosUtils from "@/js/utils/axios_calls.utils";

export default {
  async loginUser(payload) {
    const response = await axiosUtils.axiosCall(
      "login",
      "",
      "post",
      true,
      payload
    );
    return response;
  },
};
