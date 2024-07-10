const mongoose = require('mongoose');
const CreditCard = require('./models/creditCard'); // Assicurati che il percorso sia corretto

mongoose.connect('mongodb+srv://lorenzoveronese:encio@databaselorenzo.uwxtppl.mongodb.net/?retryWrites=true&w=majority&appName=DatabaseLorenzo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
  return populateDatabase();
})
.then(() => {
  console.log('Database populated successfully');
  mongoose.connection.close();
})
.catch((error) => {
  console.error('Error connecting to MongoDB or populating the database:', error);
});

const creditCards = [
  {
    numeroCartaCredito: '1234567890123456',
    titolare: 'Rossi Mario',
    scadenza: new Date('2024-12-31'),
    creditoResiduo: 5000.50
  },
  {
    numeroCartaCredito: '2345678901234567',
    titolare: 'Bianchi Luca',
    scadenza: new Date('2025-05-31'),
    creditoResiduo: 3000.75
  },
  {
    numeroCartaCredito: '3456789012345678',
    titolare: 'Verdi Anna',
    scadenza: new Date('2023-08-15'),
    creditoResiduo: 1500.00
  },
  {
    numeroCartaCredito: '4567890123456789',
    titolare: 'Neri Sara',
    scadenza: new Date('2024-07-22'),
    creditoResiduo: 2500.25
  },
  {
    numeroCartaCredito: '5678901234567890',
    titolare: 'Gialli Paolo',
    scadenza: new Date('2025-11-30'),
    creditoResiduo: 1000.00
  },
  {
    numeroCartaCredito: '6789012345678901',
    titolare: 'Blu Giulia',
    scadenza: new Date('2022-04-10'), // Scaduta
    creditoResiduo: 200.00
  },
  {
    numeroCartaCredito: '7890123456789012',
    titolare: 'Marrone Marco',
    scadenza: new Date('2021-09-25'), // Scaduta
    creditoResiduo: 0.00
  }
];

async function populateDatabase() {
  try {
    await CreditCard.insertMany(creditCards);
  } catch (error) {
    console.error('Error populating the database:', error);
  }
}
