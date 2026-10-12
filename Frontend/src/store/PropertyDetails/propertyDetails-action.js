import { propertyDetailsAction } from "./propertyDetails-slice";
import { axiosInstance } from "../../util/axiosInstance";
import { STATIC_PROPERTIES, STATIC_PROPERTY_DETAILS } from "../../data/staticData";

export const getPropertyDetails = (id) => async (dispatch) => {
  try {
    dispatch(propertyDetailsAction.getListRequest());
    const response = await axiosInstance.get(`/v1/rent/properties/${id}`);
    if (!response || !response.data) {
      throw new Error("Could not fetch property details");
    }
    const propertyData = response.data.data || response.data;
    dispatch(propertyDetailsAction.getPropertyDetails(propertyData));
  } catch (error) {
    const found = STATIC_PROPERTIES.find((property) => property._id === id);
    if (found) {
      dispatch(
        propertyDetailsAction.getPropertyDetails({
          ...STATIC_PROPERTY_DETAILS,
          ...found,
        })
      );
    } else {
      dispatch(
        propertyDetailsAction.getError(
          error.response?.data?.error || error.message || "Failed to fetch property details"
        )
      );
    }
  }
};