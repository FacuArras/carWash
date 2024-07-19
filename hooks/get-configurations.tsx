import axios from "axios";

const getConfigurations = async (clientId: string) => {
  try {
    const response = await axios.get(`/api/${clientId}/config`);
    return response.data.configurations;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export default getConfigurations;
