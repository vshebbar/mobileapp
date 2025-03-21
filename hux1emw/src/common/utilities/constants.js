export const STORAGE_USER_KEY = "@user";
export const STORAGE_ADDRESS_KEY = "@address";

export const DEFAULT_APP_CONTEXT = {
  userName: "",
  address: "",
  userInfo: {
    displayName: null,
    email: null,
    photoURL: null,
    phone: "",
  },
  session: {
    accessToken: null,
    expirationTime: null,
    refreshToken: null,
  },
};

export const CATEGORIES = ["Plumbing", "Electrical", "Painting", "Carpentry", "Cleaning", "Gardening", "HVAC", "Handyman", "Other"];
export const PRIORITIES = ["Low", "Medium", "High"];
