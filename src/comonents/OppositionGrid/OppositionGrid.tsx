import { Button } from '../Button';

const oppositions = [
  'Policía Nacional',
  'Guardia Civil',
  'Bomberos',
  'Auxiliar Administrativo del Estado',
  'Administrativo Seguridad Social',
  'EIR',
  'MIR',
  'Ayudante Instituciones Penitenciarias',
  'Técnico de Hacienda'
];

export default function OppositionGrid() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-10">
      {oppositions.map(title => (
        <div
          key={title}
          className="bg-white shadow-xl rounded-2xl p-6 hover:shadow-2xl transition duration-300">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="mb-4 text-sm text-gray-600">
            Formación específica, materiales actualizados y seguimiento personalizado.
          </p>
          <Button onClick={() => document.getElementById('n8n-chat-target')?.click()}>
            Más información
          </Button>
        </div>
      ))}
    </section>
  );
}
