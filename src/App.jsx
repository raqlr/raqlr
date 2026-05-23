import AsciiPortrait from "./components/AsciiPortrait";

export default function App() {
  return (
    <div style={{ height: "100vh", display: "grid", placeItems: "center" }}>
      <AsciiPortrait size={400} color="#64ffda" />
    </div>
  );
}