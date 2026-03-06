export default function Home() {
  return (
    <div style={{textAlign:"center", padding:"40px"}}>

      <h1 style={{
        fontFamily:"Bebas Neue",
        fontSize:"64px",
        letterSpacing:"2px"
      }}>
        HOY SE PICA
      </h1>

      <p style={{fontSize:"18px", marginBottom:"40px"}}>
        jorge pelado gay
      </p>

      <a
        href="https://wa.me/549XXXXXXXXXX"
        style={{
          display:"inline-block",
          marginBottom:"40px",
          padding:"12px 20px",
          background:"#25D366",
          color:"white",
          borderRadius:"8px",
          textDecoration:"none",
          fontWeight:"bold"
        }}
      >
        pedir por whatsapp
      </a>

      {/* NAV DE CATEGORIAS */}

      <div style={{
        display:"flex",
        justifyContent:"center",
        gap:"25px",
        fontSize:"16px",
        borderTop:"1px solid #ddd",
        paddingTop:"20px"
      }}>

        <span style={{cursor:"pointer"}}>todo</span>
        <span style={{cursor:"pointer"}}>bebidas</span>
        <span style={{cursor:"pointer"}}>kiosco</span>
        <span style={{cursor:"pointer"}}>info</span>

      </div>

    </div>
  )
}
