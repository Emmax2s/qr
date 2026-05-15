import { Router } from 'express';
import { env } from '../config/env.js';

const router = Router();

// Datos en memoria (sin conexión a BD)
let speciesData = [
  {
    id: '1',
    slug: 'leon-africano',
    name: 'León Africano',
    species: 'Panthera leo',
    habitat: 'Sabana Africana',
    imageUrl: 'https://via.placeholder.com/300?text=Leon',
    conservation: 'Vulnerable',
    description: 'El león es el segundo felino más grande del mundo. Son animales sociales que viven en manadas.',
    diet: 'Carnívoro - ñus, cebras y búfalos',
    lifespan: '10 a 14 años en estado salvaje',
    activity: 'Crepuscular',
    size: '1.5 a 2 metros de altura a la hombra',
    weight: '190 kg',
    distribution: 'Sabanas de África',
  },
  {
    id: '2',
    slug: 'elefante-africano',
    name: 'Elefante Africano',
    species: 'Loxodonta africana',
    habitat: 'Reserva de Elefantes',
    imageUrl: 'https://via.placeholder.com/300?text=Elefante',
    conservation: 'Vulnerable',
    description: 'El elefante africano es el mamífero terrestre más grande del planeta.',
    diet: 'Herbívoro - pastos, hojas y corteza',
    lifespan: 'Hasta 70 años',
    activity: 'Diurno',
    size: '2.5 a 3 metros de altura a la hombra',
    weight: '6000 kg',
    distribution: 'África Subsahariana',
  },
  {
    id: '3',
    slug: 'jirafa',
    name: 'Jirafa',
    species: 'Giraffa camelopardalis',
    habitat: 'Pradera Africana',
    imageUrl: 'https://via.placeholder.com/300?text=Jirafa',
    conservation: 'Vulnerable',
    description: 'La jirafa es el mamífero más alto del mundo, alcanzando hasta 5.5 metros de altura.',
    diet: 'Herbívoro - hojas de acacia',
    lifespan: '20 a 25 años',
    activity: 'Diurno',
    size: '4.5 a 5.5 metros de altura',
    weight: '1200 kg',
    distribution: 'África Oriental',
  },
];

let nextId = speciesData.length + 1;

const assertAdminKey = (req, res, next) => {
  const adminKey = req.header('x-admin-key');
  if (!adminKey || adminKey !== env.adminKey) {
    res.status(401).json({ message: 'Unauthorized admin request' });
    return;
  }
  next();
};

// GET all species
router.get('/', (req, res) => {
  res.json(speciesData);
});

// GET species by ID or slug
router.get('/:idOrSlug', (req, res) => {
  const { idOrSlug } = req.params;
  const isId = /^\d+$/.test(idOrSlug);

  let species;
  if (isId) {
    species = speciesData.find(s => s.id === idOrSlug);
  } else {
    species = speciesData.find(s => s.slug === idOrSlug);
  }

  if (!species) {
    return res.status(404).json({ message: 'Species not found' });
  }

  res.json(species);
});

// POST create species
router.post('/', assertAdminKey, (req, res) => {
  const {
    slug,
    name,
    species: speciesName,
    habitat,
    imageUrl,
    conservation,
    description,
    diet,
    lifespan,
    activity,
    size,
    weight,
    distribution,
  } = req.body;

  if (!slug || !name || !speciesName) {
    return res.status(400).json({ message: 'Missing required fields: slug, name, species' });
  }

  // Verificar si el slug ya existe
  if (speciesData.some(s => s.slug === slug)) {
    return res.status(409).json({ message: 'Species slug already exists' });
  }

  const newSpecies = {
    id: nextId.toString(),
    slug,
    name,
    species: speciesName,
    habitat,
    imageUrl,
    conservation,
    description,
    diet,
    lifespan,
    activity,
    size,
    weight,
    distribution,
  };

  speciesData.push(newSpecies);
  nextId += 1;

  res.status(201).json(newSpecies);
});

// PUT update species
router.put('/:id', assertAdminKey, (req, res) => {
  const { id } = req.params;
  const speciesIndex = speciesData.findIndex(s => s.id === id);

  if (speciesIndex === -1) {
    return res.status(404).json({ message: 'Species not found' });
  }

  const {
    slug,
    name,
    species: speciesName,
    habitat,
    imageUrl,
    conservation,
    description,
    diet,
    lifespan,
    activity,
    size,
    weight,
    distribution,
  } = req.body;

  // Si se intenta cambiar el slug, verificar que no existe otro
  if (slug && slug !== speciesData[speciesIndex].slug) {
    if (speciesData.some(s => s.slug === slug)) {
      return res.status(409).json({ message: 'Species slug already exists' });
    }
  }

  const updatedSpecies = {
    ...speciesData[speciesIndex],
    slug: slug || speciesData[speciesIndex].slug,
    name: name || speciesData[speciesIndex].name,
    species: speciesName || speciesData[speciesIndex].species,
    habitat: habitat || speciesData[speciesIndex].habitat,
    imageUrl: imageUrl || speciesData[speciesIndex].imageUrl,
    conservation: conservation || speciesData[speciesIndex].conservation,
    description: description || speciesData[speciesIndex].description,
    diet: diet || speciesData[speciesIndex].diet,
    lifespan: lifespan || speciesData[speciesIndex].lifespan,
    activity: activity || speciesData[speciesIndex].activity,
    size: size || speciesData[speciesIndex].size,
    weight: weight || speciesData[speciesIndex].weight,
    distribution: distribution || speciesData[speciesIndex].distribution,
  };

  speciesData[speciesIndex] = updatedSpecies;
  res.json(updatedSpecies);
});

// DELETE species
router.delete('/:id', assertAdminKey, (req, res) => {
  const { id } = req.params;
  const speciesIndex = speciesData.findIndex(s => s.id === id);

  if (speciesIndex === -1) {
    return res.status(404).json({ message: 'Species not found' });
  }

  speciesData.splice(speciesIndex, 1);
  res.json({ message: 'Species deleted successfully', id });
});

export default router;
