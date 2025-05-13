const images = [
  "/img1.jpg",
  "/img2.jpg",
  "/img3.jpg"
];

function CheckUp() {
  return (
    <div>
      <h2>Фотогалерея</h2>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {images.map((src, i) => (
          <img key={i} src={src} alt={`img-${i}`} style={{ width: "200px" }} />
        ))}
      </div>
    </div>
  );
}

export default CheckUp;

