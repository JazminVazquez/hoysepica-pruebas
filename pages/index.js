import { productos } from "../data/productos"
import { useState } from "react"

export default function Home() {

  const [categoria, setCategoria] = useState("todo")

  const filtrados =
    categoria === "todo"
      ? productos
      : productos.filter(p => p.categoria === categoria)

  return (
    <div>

      {/* HEADER */}

      <header style={{
        /*padding: "20px",*/
        textAlign: "center",
        borderBottom: "1px solid #eee"
      }}>
        <h1 style={{
          fontFamily: "Bebas Neue",
          fontSize: "60px",
          letterSpacing: "3px"
        }}>
          HOY SE PICA
        </h1>
      </header>

      {/* BANNER */}

      <div style={{
        height: "40px",
        background: "#2b6fff",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        color: "white",
        fontSize: "26px",
        fontWeight: "bold"
      }}>
        jorge pelado boludo
      </div>

      {/* CATEGORIAS */}

      <div style={{
        display: "flex",
        gap: "30px",
        justifyContent: "center",
        padding: "20px",
        borderBottom: "1px solid #eee"
      }}>
        <span onClick={() => setCategoria("todo")} style={{cursor:"pointer"}}>Todo</span>
        <span onClick={() => setCategoria("bebidas")} style={{cursor:"pointer"}}>Bebidas</span>
        <span onClick={() => setCategoria("kiosco")} style={{cursor:"pointer"}}>Kiosco</span>
        <span onClick={() => setCategoria("info")} style={{cursor:"pointer"}}>Info</span>
      </div>

      {/* GRID PRODUCTOS */}

      <div style={{
        padding: "30px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px,1fr))",
        gap: "20px"
      }}>

        {filtrados.map(p => (
          <div key={p.id} style={{
            border: "1px solid #eee",
            borderRadius: "10px",
            overflow: "hidden",
            background: "white"
          }}>

            <img
              src={p.imagen}
              style={{width:"100%", height:"140px", objectFit:"cover"}}
            />

            <div style={{padding:"10px"}}>

              <div style={{fontWeight:"bold"}}>
                {p.nombre}
              </div>

              <div style={{marginTop:"5px"}}>
                ${p.precio}
              </div>

              <a
                href={`https://wa.me/5491150537280?text=hola zorrita quiero ${p.nombre}`}
                style={{
                  display:"block",
                  marginTop:"10px",
                  background:"#25D366",
                  color:"white",
                  textAlign:"center",
                  padding:"6px",
                  borderRadius:"6px",
                  textDecoration:"none"
                }}
              >
                pedir
              </a>

            </div>

          </div>
        ))}

      </div>

    </div>
  )
}