import Navbar from "../components/Navbar";

function EmptyPage() {
  return (
    <div className="empty-page-container">
      <Navbar />

      <main className="empty-page">
        <h1>Empty page</h1>
      </main>
    </div>
  );
}

export default EmptyPage;