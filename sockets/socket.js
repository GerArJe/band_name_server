const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand(new Band('Queen'));
bands.addBand(new Band('Bon jovi'));
bands.addBand(new Band('Heores del silencio'));
bands.addBand(new Band('Metalica'));

//Socket messages
io.on('connection', (client) => {
  console.log('Client connected');

  client.emit('active-bands', bands.getBands());

  client.on('disconnect', () => {
    console.log('Client disconnected');
  });

  client.on('message', (payload) => {
    console.log('message', payload);
    io.emit('message', { admin: 'New message' });
  });

  client.on('new-message', (payload) => {
    console.log('new message', payload);
    // io.emit('new-message', payload);
    client.broadcast.emit('new-message', payload);
  });
});
