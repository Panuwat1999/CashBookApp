// Define initial state
const initialState = {
  user: { Username: "", Password: "", login: false, fullname: "", token: "" },
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: {
          Username: action?.payload?.Username,
          Password: action?.payload?.Password,
          login: true,
          fullname: action?.payload?.fullname,
          token: action?.payload?.token,
        },
      };
    case "LOOUT":
      return {
        ...state,
        user: initialState,
      };
    default:
      return state;
  }
}
