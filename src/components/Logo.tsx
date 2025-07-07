export default function Logo() {
  return (
    <a href="." className="logo" style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <i className="fa-solid fa-cloud" style={{ fontSize: 28, color: "#2563eb" }}></i>
      <span style={{ fontWeight: 700, fontSize: 22, color: "#2563eb" }}>Remote</span>
      <span style={{ fontWeight: 400, fontSize: 22, color: "#22d3ee" }}>Dev</span>
    </a>
  );
}
