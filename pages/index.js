import { productos } from "../data/productos"
import { useState } from "react"

export default function Home() {
  const [categoria, setCategoria] = useState("todo")

  const categorias = ["todo", "bebidas", "kiosco", "info"]

  const filtrados =
    categoria === "todo"
      ? productos
      : productos.filter((p) => p.categoria === categoria)

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          background: "white",
          minHeight: "100vh",
          boxShadow: "0 0 30px rgba(0,0,0,0.06)",
        }}
      >
        {/* header */}

        <header
          style={{
            textAlign: "center",
            padding: "28px 20px 20px",
            borderBottom: "1px solid #ececec",
            background: "white",
          }}
        >
          <h1
            style={{
              fontFamily: "Bebas Neue, sans-serif",
              fontSize: "64px",
              letterSpacing: "4px",
              margin: 0,
              color: "#111",
            }}
          >
            hoy se pica
          </h1>
        </header>

        {/* banner */}

        <div
          style={{
            /* minHeight: "120px", */
            background: "linear-gradient(135deg, #2b6fff 0%, #6ea1ff 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "20px",
            fontWeight: "bold",
            textAlign: "center",
            /* padding: "20px", */
          }}
        >
          tu kiosco de confianza ñery yasupiste
        </div>

        {/* nav categorias */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "12px",
            padding: "22px 20px",
            borderBottom: "1px solid #eee",
            background: "#fff",
          }}
        >
          {categorias.map((cat) => {
            const activa = categoria === cat

            return (
              <button
                key={cat}
                onClick={() => setCategoria(cat)}
                style={{
                  border: activa ? "1px solid #2b6fff" : "1px solid #d9dce3",
                  background: activa ? "#2b6fff" : "#f7f8fb",
                  color: activa ? "white" : "#333",
                  padding: "10px 18px",
                  borderRadius: "999px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  transition: "all 0.2s ease",
                  boxShadow: activa
                    ? "0 8px 20px rgba(43, 111, 255, 0.25)"
                    : "none",
                }}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* titulo seccion */}

        <div
          style={{
            textAlign: "center",
            padding: "28px 20px 10px",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "28px",
              color: "#111",
              textTransform: "capitalize",
            }}
          >
            {categoria === "todo" ? "todos los productos" : categoria}
          </h2>

          <p
            style={{
              marginTop: "8px",
              color: "#666",
              fontSize: "14px",
            }}
          >
            {filtrados.length} producto{filtrados.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* grid productos */}

        <div
          style={{
            padding: "30px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
            gap: "22px",
          }}
        >
          {filtrados.map((p) => (
            <div
              key={p.id}
              style={{
                border: "1px solid #ececec",
                borderRadius: "18px",
                overflow: "hidden",
                background: "white",
                boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
              }}
            >
              <img
                src={p.imagen}
                alt={p.nombre}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  display: "block",
                }}
              />

              <div style={{ padding: "14px" }}>
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    color: "#111",
                    minHeight: "40px",
                  }}
                >
                  {p.nombre}
                </div>

                <div
                  style={{
                    marginTop: "8px",
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#2b6fff",
                  }}
                >
                  ${p.precio}
                </div>

                <a
                  href={`https://wa.me/5491150537280?text=hola zorrita quiero ${p.nombre}`}
                  style={{
                    display: "block",
                    marginTop: "14px",
                    background: "#25D366",
                    color: "white",
                    textAlign: "center",
                    padding: "10px 12px",
                    borderRadius: "10px",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                >
                  pedir
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}