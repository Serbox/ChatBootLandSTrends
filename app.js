const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot');
const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');
require('@bot-whatsapp/provider/baileys');

// Función para añadir retardo
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Flujo para mostrar los productos disponibles
const flowProductos = addKeyword(['productos', 'ver', 'sweaters', 'suéteres'])
  .addAnswer([
    '🎄 Nuestros suéteres de Navidad están diseñados para toda la familia y parejas.',
    'Son cómodos, modernos y con los mejores diseños, perfectos para esta temporada. 🎁',
    '\n👉 Responde con *catalogo* para ver las opciones disponibles.',
  ]);

const flowCatalogo = addKeyword(['catalogo', 'catálogo']).addAnswer([
  'En el siguiente link puedes ver nuestro catálogo disponible ⌛ https://wa.me/c/573134382242 🥰',
  'Estoy atenta a tu orden 😉',
]);

// Flujo para consulta de precios
const flowPrecios = addKeyword(['precio']).addAnswer([
  '💰 Los precios son únicos 🎁😊',
  '- Todos los suéteres tienen el precio de $75.000 COP.',
  '\nEscribe *comprar* seguido del nombre del suéter para iniciar tu pedido.',
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
  '\nEn un segundo te respondemos. 😊',
]);

// Flujo de despedida
const flowDespedida = addKeyword(['gracias', 'adios', 'chao', 'bye']).addAnswer([
  '🎁 ¡Gracias por visitar L & S Trends! Esperamos que encuentres el suéter perfecto para esta Navidad. 🌟',
  'Si necesitas algo más, aquí estaremos. ¡Hasta pronto! 🎅',
  '\nNuestras redes sociales. 😊 Facebook: https://www.facebook.com/profile.php?id=61568878793294',
]);

// Flujo principal de bienvenida con retardo
const flowPrincipal = addKeyword(['hola', 'buenas', 'buenos dias', 'mas informacion', 'info', 'información', 'hello', '¡Hola! Podrías darme más información', 'Vi tu anuncio en Facebook'])
  .addAnswer('🙌 ¡Hola! Bienvenid@ a *L & S Trends* 👚', { media: 'https://i.ibb.co/KhwQyFg/ls.png' }, async (ctx, { flowDynamic }) => {
    console.log(ctx.bo);
    await delay(2000); // Retardo de 2 segundos
    await flowDynamic([
      {
        body: 'Hola, mi nombre es Leidy 😉 un gusto',
      },
      {
        body: '\n👉 *productos* para ver nuestra oferta',
      },
      {
        body: '\nEscribe una palabra clave para comenzar, *Productos*',
      },
    ]);
  }, [flowProductos, flowCatalogo, flowPrecios, flowPedidos, flowContacto, flowDespedida]);

// Configuración del bot
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
