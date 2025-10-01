import Cookies from "js-cookie";

export default function checkCookie(): boolean {
  // Get all cookies as a string
  const cookies = document.cookie;

  // Check if token cookie exists
  const tokenCookie = cookies
    .split("; ")
    .find((row) => row.startsWith("token="));

  if (tokenCookie) {
    const token = tokenCookie.split("=")[1];
    console.log("Token found:", token);
    return true; // Returns "remon"
  } else {
    console.log("No token found");
    return false;
  }
}

export function handleLogout() {
  Cookies.remove("token");
}
