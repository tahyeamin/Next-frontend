import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function Dashboard() {
  return (
    <div>
      <Navbar title="Dashboard" />
      <div style={{ padding: "50px", textAlign: "center" }}>
        <h1 style={{ color: "green", fontSize: "2.5rem" }}>Welcome to the Dashboard! 🎉</h1>
        <p style={{ fontSize: "1.2rem" }}>You have successfully logged in.</p>
        
        <div style={{ marginTop: "30px" }}>
          <Link href="/login">
            <button style={{ padding: "10px 20px", background: "red", color: "white", border: "none", cursor: "pointer", borderRadius: "5px" }}>
              Logout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}