const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot');
const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');
require('@bot-whatsapp/provider/baileys')

// Flujo para mostrar los productos disponibles
const flowProductos = addKeyword(['productos', 'ver', 'sweaters', 'suéteres'])
  .addAnswer([
    '🎄 Nuestros suéteres de Navidad están diseñados para toda la familia y parejas.',
    'Son cómodos, modernos y con los mejores diseños, perfectos para esta temporada. 🎁',
    '\n👉 Responde con *catalogo* para ver las opciones disponibles.',
  ]);

  const flowCatalogo = addKeyword(['catalogo','catálogo']).addAnswer([
    'En un segundo te envio nuestro catalogo ⌛'
  ]

  )


// Flujo para consulta de precios
const flowPrecios = addKeyword(['precio']).addAnswer([
  '💰 Los precios son unicos y te incluyen el envio si estas en Bogota o alrededores 🎁😊',
  '- Todos los sueters tienen el precio de $75.000 COP.',
  '\nEscribe *comprar* iniciar tu pedido.',
]);

// Flujo para realizar pedidos
const flowPedidos = addKeyword(['comprar']).addAnswer([
  '🛒 ¡Perfecto! Por favor, indícanos tu nombre completo, talla(s) y cantidad del producto que deseas comprar.',
  'Ejemplo: *Suéter Deadpool, talla L, 2 unidades*.',
  '\nTe enviaremos un enlace de pago y confirmaremos el envío. 📦',
]);

// Flujo de contacto
const flowContacto = addKeyword(['contacto', 'asesor']).addAnswer([
  '📞 Si necesitas más información, no dudes en escribirnos.',
  'Estamos disponibles para resolver tus dudas y ayudarte con tu pedido. 😊',
  '\nEn un segundo te respondemos.😊',
]);

// Flujo de despedida
const flowDespedida = addKeyword(['gracias', 'adios', 'chao', 'bye']).addAnswer([
  '🎁 ¡Gracias por visitar L & S Trends! Esperamos que encuentres el suéter perfecto para esta Navidad. 🌟',
  'Si necesitas algo más, aquí estaremos. ¡Hasta pronto! 🎅',
  '\nNuestras redes sociales.😊 Faceboock : https://www.facebook.com/profile.php?id=61568878793294',
]);

// Flujo principal de bienvenida
const flowPrincipal = addKeyword(['hola', 'buenas', 'buenos dias','mas informacion','info','información', 'hello','¡Hola! Podrías darme más información','Vi tu anuncio en Facebook'])
.addAnswer('Este mensaje envia tres botones', {
  buttons: [{ body: 'Boton 1' }, { body: 'Boton 2' }, { body: 'Boton 3' }],
})

  .addAnswer([
    'Somos una tienda especializada en suéteres navideños modernos y de alta calidad. 🎄',
    '¿En qué podemos ayudarte hoy? Puedes elegir entre las siguientes opciones:',
    '\n👉 *productos* para ver nuestra oferta',
    '👉 *contacto* para hablar con un asesor',
    '\nEscribe una palabra clave para comenzar, *Productos* o *Contacto*',
  ], null, null, [flowProductos, flowCatalogo, flowPrecios, flowPedidos, flowContacto, flowDespedida]);

const main = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = createFlow([flowPrincipal, flowProductos, flowCatalogo, flowPrecios, flowPedidos, flowContacto, flowDespedida]);
  const adapterProvider = createProvider(BaileysProvider);

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  QRPortalWeb();
};

main();
