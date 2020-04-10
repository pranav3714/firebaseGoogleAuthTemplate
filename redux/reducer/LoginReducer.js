const loginReducer = (state=false, action) => {
  console.log(action);
  switch (action.type) {
    case "SIGN_IN":
      return true
    case "SIGN_OUT":
      return false
    default:
      return state
  }
}
export default loginReducer;
