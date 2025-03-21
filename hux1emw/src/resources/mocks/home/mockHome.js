import { LOG } from "../../../common/utilities/logger";
import homeData from "./home.json";
import DefaultHomeLayout from "../../defaults/DefaultHomeLayout.json";

export const generateMockHomes = () => {
  const mockHomes = homeData.map((home) => {
    return {
      ...home,
      layout: DefaultHomeLayout,
    };
  });

  LOG.info(`Generated mock tasks are: ${JSON.stringify(mockHomes)}`);
  return mockHomes;
};
