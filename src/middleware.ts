// import {  } from "next-auth/middleware";

// export default withAuth({
//   pages: {
//     signIn: "/login",
//     // newUser: "/register",
//   },
// });
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
