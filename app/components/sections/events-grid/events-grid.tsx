import React from 'react'
import { Card, CardHeader, CardContent, CardTitle } from '../../ui/card'

export default function EventsGrid() {
  return (
      <section id="eventos" className="py-20 bg-beige-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-brown-700">Nuestros Eventos</h2>
            <div className="mb-16">
              <h3 className="text-2xl font-semibold mb-6 text-brown-600">Próximos Eventos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { 
                    titulo: 'Taller de Cocina Saludable', 
                    fecha: '15 de Noviembre, 2023', 
                    hora: '18:00 - 20:00',
                    lugar: 'Nuestra Cocina Central'
                  },
                  { 
                    titulo: 'Cena Degustación', 
                    fecha: '3 de Diciembre, 2023', 
                    hora: '20:30 - 23:00',
                    lugar: 'Restaurante El Jardín'
                  },
                  { 
                    titulo: 'Mercado de Productos Orgánicos', 
                    fecha: '10 de Diciembre, 2023', 
                    hora: '10:00 - 14:00',
                    lugar: 'Plaza Mayor'
                  }
                ].map((evento) => (
                  <Card key={evento.titulo}>
                    <CardHeader>
                      <CardTitle>{evento.titulo}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-2">{evento.fecha}</p>
                      <p className="mb-2">{evento.hora}</p>
                      <p>{evento.lugar}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

  )
}
