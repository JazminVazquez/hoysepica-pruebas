import Head from "next/head"
import { useMemo, useState } from "react"
import { productos } from "../data/productos"

const dinero = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
})

const categorias = [
  { id: "todo", label: "Todo" },
  { id: "bebidas", label: "Bebidas" },
  { id: "kiosco", label: "Kiosco" },
]

export default function Home() {
  const [categoria, setCategoria] = useState("todo")
  const [carrito, setCarrito] = useState({})
  const [carritoAbierto, setCarritoAbierto] = useState(false)
  const [checkout, setCheckout] = useState(null)
  const [paso, setPaso] = useState(1)
  const [pedido, setPedido] = useState({
    nombre: "",
    telefono: "",
    modalidad: "envio",
    direccion: "",
    pago: "efectivo",
  })

  const filtrados = useMemo(
    () =>
      categoria === "todo"
        ? productos
        : productos.filter((producto) => producto.categoria === categoria),
    [categoria]
  )

  const items = productos
    .filter((producto) => carrito[producto.id])
    .map((producto) => ({ ...producto, cantidad: carrito[producto.id] }))

  const cantidadTotal = items.reduce((total, item) => total + item.cantidad, 0)
  const subtotal = items.reduce(
    (total, item) => total + item.precio * item.cantidad,
    0
  )
  const envio = pedido.modalidad === "envio" && subtotal > 0 ? 900 : 0
  const total = subtotal + envio

  function cambiarCantidad(producto, delta) {
    setCarrito((actual) => {
      const nuevaCantidad = Math.max(
        0,
        Math.min((actual[producto.id] || 0) + delta, producto.stock)
      )
      const siguiente = { ...actual }

      if (nuevaCantidad === 0) delete siguiente[producto.id]
      else siguiente[producto.id] = nuevaCantidad

      return siguiente
    })
  }

  function abrirCheckout() {
    if (!items.length) return
    setCarritoAbierto(false)
    setPaso(1)
    setCheckout(true)
  }

  function confirmarPedido(evento) {
    evento.preventDefault()
    setPaso(3)
  }

  function cerrarCheckout() {
    setCheckout(null)
    setPaso(1)
  }

  function nuevoPedido() {
    setCarrito({})
    setPedido({
      nombre: "",
      telefono: "",
      modalidad: "envio",
      direccion: "",
      pago: "efectivo",
    })
    cerrarCheckout()
  }

  const mensajeWhatsApp = encodeURIComponent(
    `Hola! Soy ${pedido.nombre}. Quiero pedir:\n${items
      .map((item) => `- ${item.cantidad}x ${item.nombre}`)
      .join("\n")}\n\nTotal: ${dinero.format(total)}\n${
      pedido.modalidad === "envio"
        ? `Envio a: ${pedido.direccion}`
        : "Retiro por el local"
    }\nPago: ${pedido.pago}`
  )

  return (
    <>
      <Head>
        <title>Hoy se pica | Kiosco online</title>
        <meta
          name="description"
          content="Tu kiosco de confianza. Elegí, armá tu pedido y listo."
        />
      </Head>

      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="Hoy se pica, inicio">
          <span className="brand-dot" />
          HOY SE PICA
        </a>
        <nav className="desktop-nav" aria-label="Navegación principal">
          <a href="#productos">Productos</a>
          <a href="#como-funciona">Cómo funciona</a>
        </nav>
        <button className="cart-button" onClick={() => setCarritoAbierto(true)}>
          <span>Mi pedido</span>
          <strong>{cantidadTotal}</strong>
        </button>
      </header>

      <main id="inicio">
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">Kiosco online · abierto ahora</span>
            <h1>Ese antojo no se va a pedir solo.</h1>
            <p>
              Elegí tus favoritos, armá el carrito y coordinamos todo por
              WhatsApp. Simple, rápido y sin vueltas.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#productos">
                Ver productos
              </a>
              <span>Entrega estimada: 30-45 min</span>
            </div>
          </div>
          <div className="hero-card" aria-hidden="true">
            <span className="hero-sticker">PICOTEO<br />RESUELTO</span>
            <div className="hero-bag">HSP</div>
            <p>Todo lo que pinta,<br />en un solo pedido.</p>
          </div>
        </section>

        <section className="benefits" id="como-funciona">
          <article><b>01</b><span><strong>Elegí</strong> entre bebidas y snacks</span></article>
          <article><b>02</b><span><strong>Armá</strong> tu pedido a tu gusto</span></article>
          <article><b>03</b><span><strong>Recibí</strong> o retiralo por el local</span></article>
        </section>

        <section className="catalog" id="productos">
          <div className="section-heading">
            <div>
              <span className="eyebrow dark">Para cortar la semana</span>
              <h2>¿Qué pinta hoy?</h2>
            </div>
            <div className="filters" aria-label="Filtrar productos">
              {categorias.map((item) => (
                <button
                  key={item.id}
                  className={categoria === item.id ? "active" : ""}
                  onClick={() => setCategoria(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="product-grid">
            {filtrados.map((producto) => {
              const cantidad = carrito[producto.id] || 0
              const sinStock = producto.stock === 0

              return (
                <article className="product-card" key={producto.id}>
                  <div className="product-image">
                    <img src={producto.imagen} alt={producto.nombre} />
                    {sinStock ? (
                      <span className="stock sold-out">Agotado</span>
                    ) : producto.stock <= 4 ? (
                      <span className="stock low-stock">Quedan {producto.stock}</span>
                    ) : (
                      <span className="stock">Disponible</span>
                    )}
                  </div>
                  <div className="product-info">
                    <span className="product-category">{producto.categoria}</span>
                    <h3>{producto.nombre}</h3>
                    <p>{producto.descripcion}</p>
                    <div className="product-footer">
                      <strong>{dinero.format(producto.precio)}</strong>
                      {cantidad > 0 ? (
                        <div className="quantity-control">
                          <button onClick={() => cambiarCantidad(producto, -1)} aria-label={`Quitar ${producto.nombre}`}>−</button>
                          <span>{cantidad}</span>
                          <button disabled={cantidad >= producto.stock} onClick={() => cambiarCantidad(producto, 1)} aria-label={`Agregar ${producto.nombre}`}>+</button>
                        </div>
                      ) : (
                        <button
                          className="add-button"
                          disabled={sinStock}
                          onClick={() => cambiarCantidad(producto, 1)}
                        >
                          {sinStock ? "Sin stock" : "Agregar +"}
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      </main>

      <footer>
        <a className="brand footer-brand" href="#inicio"><span className="brand-dot" />HOY SE PICA</a>
        <p>Hecho para resolver antojos.</p>
        <span>Buenos Aires · 2026</span>
      </footer>

      {carritoAbierto && (
        <div className="overlay" onMouseDown={() => setCarritoAbierto(false)}>
          <aside className="cart-drawer" onMouseDown={(e) => e.stopPropagation()} aria-label="Tu pedido">
            <div className="drawer-header">
              <div><span className="eyebrow dark">Casi listo</span><h2>Tu pedido</h2></div>
              <button className="close-button" onClick={() => setCarritoAbierto(false)} aria-label="Cerrar">×</button>
            </div>

            <div className="cart-items">
              {!items.length && (
                <div className="empty-cart"><span>HSP</span><h3>Tu carrito está vacío</h3><p>Sumá algo rico y volvé por acá.</p></div>
              )}
              {items.map((item) => (
                <article className="cart-item" key={item.id}>
                  <img src={item.imagen} alt="" />
                  <div><h3>{item.nombre}</h3><span>{dinero.format(item.precio)}</span></div>
                  <div className="quantity-control small">
                    <button onClick={() => cambiarCantidad(item, -1)}>−</button>
                    <span>{item.cantidad}</span>
                    <button disabled={item.cantidad >= item.stock} onClick={() => cambiarCantidad(item, 1)}>+</button>
                  </div>
                </article>
              ))}
            </div>

            <div className="cart-summary">
              <div><span>Subtotal</span><strong>{dinero.format(subtotal)}</strong></div>
              <p>El costo de envío se calcula en el siguiente paso.</p>
              <button className="primary-button full" disabled={!items.length} onClick={abrirCheckout}>Continuar pedido</button>
            </div>
          </aside>
        </div>
      )}

      {checkout && (
        <div className="overlay modal-overlay">
          <div className="checkout-modal" role="dialog" aria-modal="true" aria-label="Finalizar pedido">
            {paso < 3 && (
              <div className="checkout-top">
                <button className="close-button" onClick={cerrarCheckout} aria-label="Cerrar">×</button>
                <div className="steps"><span className="done">1</span><i /><span className={paso >= 2 ? "done" : ""}>2</span><i /><span>3</span></div>
              </div>
            )}

            {paso === 1 && (
              <form className="checkout-form" onSubmit={(e) => { e.preventDefault(); setPaso(2) }}>
                <span className="eyebrow dark">Paso 1 de 2</span>
                <h2>¿Cómo te lo damos?</h2>
                <div className="option-grid">
                  <label className={pedido.modalidad === "envio" ? "selected" : ""}>
                    <input type="radio" name="modalidad" value="envio" checked={pedido.modalidad === "envio"} onChange={(e) => setPedido({ ...pedido, modalidad: e.target.value })} />
                    <strong>Envío</strong><span>Llega a tu puerta</span>
                  </label>
                  <label className={pedido.modalidad === "retiro" ? "selected" : ""}>
                    <input type="radio" name="modalidad" value="retiro" checked={pedido.modalidad === "retiro"} onChange={(e) => setPedido({ ...pedido, modalidad: e.target.value })} />
                    <strong>Retiro</strong><span>Pasás por el local</span>
                  </label>
                </div>
                <div className="field-row">
                  <label>Nombre<input required value={pedido.nombre} onChange={(e) => setPedido({ ...pedido, nombre: e.target.value })} placeholder="Tu nombre" /></label>
                  <label>Teléfono<input required value={pedido.telefono} onChange={(e) => setPedido({ ...pedido, telefono: e.target.value })} placeholder="11 1234 5678" /></label>
                </div>
                {pedido.modalidad === "envio" && <label>Dirección<input required value={pedido.direccion} onChange={(e) => setPedido({ ...pedido, direccion: e.target.value })} placeholder="Calle, número y piso" /></label>}
                <button className="primary-button full" type="submit">Ir al pago</button>
              </form>
            )}

            {paso === 2 && (
              <form className="checkout-form" onSubmit={confirmarPedido}>
                <span className="eyebrow dark">Paso 2 de 2</span>
                <h2>Elegí cómo pagar</h2>
                <div className="payment-options">
                  {[{ id: "efectivo", title: "Efectivo", detail: "Pagás al recibir" }, { id: "transferencia", title: "Transferencia", detail: "Te enviamos el alias" }, { id: "tarjeta", title: "Tarjeta", detail: "Pago simulado" }].map((opcion) => (
                    <label key={opcion.id} className={pedido.pago === opcion.id ? "selected" : ""}>
                      <input type="radio" name="pago" value={opcion.id} checked={pedido.pago === opcion.id} onChange={(e) => setPedido({ ...pedido, pago: e.target.value })} />
                      <span><strong>{opcion.title}</strong><small>{opcion.detail}</small></span><b>✓</b>
                    </label>
                  ))}
                </div>
                <div className="order-totals">
                  <div><span>Productos</span><span>{dinero.format(subtotal)}</span></div>
                  <div><span>Envío</span><span>{envio ? dinero.format(envio) : "Gratis"}</span></div>
                  <div className="grand-total"><strong>Total</strong><strong>{dinero.format(total)}</strong></div>
                </div>
                <div className="checkout-actions"><button type="button" className="back-button" onClick={() => setPaso(1)}>Volver</button><button className="primary-button" type="submit">Confirmar pedido</button></div>
                <p className="demo-note">Esto es una demo visual. No se realizará ningún cobro.</p>
              </form>
            )}

            {paso === 3 && (
              <div className="success-state">
                <span className="success-icon">✓</span>
                <span className="eyebrow dark">Pedido confirmado</span>
                <h2>Listo, {pedido.nombre}.</h2>
                <p>Tu pedido quedó armado. En una versión real, acá recibirías la confirmación del local.</p>
                <div className="success-total"><span>Total</span><strong>{dinero.format(total)}</strong></div>
                <a className="whatsapp-button" href={`https://wa.me/5491150537280?text=${mensajeWhatsApp}`} target="_blank" rel="noreferrer">Enviar pedido por WhatsApp</a>
                <button className="text-button" onClick={nuevoPedido}>Volver al inicio</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
