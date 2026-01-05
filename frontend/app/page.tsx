import Link from "next/link";

export default function Home() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '80vh'
    }}>


      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#333' }}>
        This is landing page.
      </h1>

      <p style={{ marginBottom: '30px', color: '#666' }}>
        Welcome!
      </p>


      <div style={{ display: 'flex', gap: '20px' }}>


        <Link href="/register">
          <button style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#0070f3', // Blue
            color: 'white',
            border: 'none',
            borderRadius: '5px'
          }}>
            Registration
          </button>
        </Link>


        <Link href="/login">
          <button style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: 'black',
            color: 'white',
            border: 'none',
            borderRadius: '5px'
          }}>
            Login
          </button>
        </Link>

      </div>

    </div>
  );
}