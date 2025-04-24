// api/convert.js

export default async function handler(req, res) {
    if (req.method === 'GET') {
      const { from, to, amount } = req.query;
  
      if (!from || !to || !amount) {
        return res.status(400).json({ error: 'Faltan parámetros' });
      }
  
      const apiKey = process.env.API_CURRENCY_KEY; // Usamos la variable de entorno correcta
      const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`;
  
      console.log(`Llamada a la API: ${url}`); // Verificando si la URL es correcta
  
      try {
        const response = await fetch(url);
        const data = await response.json();
  
        console.log('Datos de la API:', data); // Verificando qué datos recibimos de la API
  
        if (data.result === 'error') {
          return res.status(500).json({ error: 'Error al obtener las tasas de cambio' });
        }
  
        const conversionRate = data.conversion_rates[to];
  
        if (!conversionRate) {
          return res.status(400).json({ error: 'Moneda de destino no válida' });
        }
  
        console.log(`Tasa de conversión: ${conversionRate}`); // Verificando la tasa de conversión
  
        const result = (parseFloat(amount) * conversionRate).toFixed(2);
        return res.status(200).json({ result });
      } catch (error) {
        console.error("Error interno:", error); // Verificando si hay algún error interno
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
    } else {
      res.status(405).json({ error: 'Método no permitido' });
    }
  }
  