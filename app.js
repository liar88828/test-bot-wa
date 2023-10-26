const qrcode = require( 'qrcode-terminal' );
const http = require( "http" );
const { Client } = require( 'whatsapp-web.js' );

const PORT = process.env.PORT || 5000;
const client = new Client( {
} );


client.on( 'ready', () =>
{
  console.log( 'Client is ready!' );
} );

client.on( 'message', message =>
{
  if ( message.body.toLowerCase() === 'p' )
  {
    client.sendMessage( message.from, 'apakah yang bisa saya bantu ?' );
  }

  if ( message.body === 'koe neng endi' )
  {
    client.sendMessage( message.from, 'indonesia' );
  }

  if ( message.body !== 'baik' )
  {
    console.log( message.from )
    console.log( message.body )
    client.sendMessage( message.from, 'baik' );
  }
} );


const server = http.createServer( async ( req, res ) =>
{
  //set the request route
  if ( req.url === "/api" && req.method === "GET" )
  {

    client.on( 'qr', qr =>
    {
      // qrcode.generate( qr, { small: true } );
      res.writeHead( 200, { "Content-Type": "application/json" } );
      res.write( `Hi there, This is a Vanilla Node.js API '${ qr }'` );
      res.end();
    } );






  }

  // If no route present
  else
  {
    res.writeHead( 404, { "Content-Type": "application/json" } );
    res.end( JSON.stringify( { message: "Route not found" } ) );
  }
} );
server.listen( PORT, () =>
{
  console.log( `server started on port: ${ PORT }` );
} );

client.initialize();

