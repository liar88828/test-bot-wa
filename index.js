const qrcode = require( 'qrcode-terminal' );
const { Client } = require( 'whatsapp-web.js' );

const express = require( "express" );

const app = express();
app.use( express.static( 'public' ) )
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


app.get( "/", ( req, res ) =>
{
  res.send( '<h1 >Hello </h1>' )
}
)

app.get( "/api", ( req, res ) =>
{
  client.on( 'qr', qr =>
  {
    // qrcode.generate( qr, { small: true } );
    res.send( `deploy for vercel : ${ qr }` );
  } );

} );

app.listen( PORT, () =>
{
  client.initialize();
  console.log( "Running on port 5000." );
} );



// Export the Express API
module.exports = app;

