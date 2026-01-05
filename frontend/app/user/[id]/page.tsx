export default async function UserProfile({ params }: { params: { id: string } }) {
  
  const { id } = await params;

  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold">User Profile</h1>
      <p className="text-xl mt-4">User ID: <span className="text-blue-600">{id}</span></p>
    </div>
  );
}