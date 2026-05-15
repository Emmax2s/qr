import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AnimalCard } from "../components/AnimalCard";

const allAnimals = [
  {
    name: "Jaguar",
    scientificName: "Panthera onca",
    image:
      "https://images.unsplash.com/photo-1649642229170-9ef79251c0e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYWd1YXIlMjB3aWxkbGlmZSUyMG1leGljb3xlbnwxfHx8fDE3NzQ1ODUzNzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    habitat: "Selvas tropicales y bosques humedos de Chiapas",
    diet: "Carnivoro: pecaries, venados, tapires, aves y reptiles",
    status: "En Peligro de Extincion",
    statusColor: "bg-red-100 text-red-800",
    funFact: "El jaguar tiene una mordida muy potente y puede romper caparazones.",
    category: "Mamifero"
  },
  {
    name: "Tucan Pico Iris",
    scientificName: "Ramphastos sulfuratus",
    image:
      "https://images.unsplash.com/photo-1618191702724-1e413e177fde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3VjYW4lMjBiaXJkJTIwdHJvcGljYWx8ZW58MXx8fHwxNzc0NTg1Mzc5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    habitat: "Selva tropical humeda",
    diet: "Omnivoro: frutas, insectos y pequenos vertebrados",
    status: "Amenazada",
    statusColor: "bg-yellow-100 text-yellow-800",
    funFact: "Su pico es grande pero ligero gracias a su estructura interna.",
    category: "Ave"
  },
  {
    name: "Tapir Centroamericano",
    scientificName: "Tapirus bairdii",
    image:
      "https://images.unsplash.com/photo-1771253085305-f90f40feaad6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXBpciUyMHdpbGRsaWZlfGVufDF8fHx8MTc3NDU4NTM4MHww&ixlib=rb-4.1.0&q=80&w=1080",
    habitat: "Bosques tropicales y humedales",
    diet: "Herbivoro: hojas, frutas y plantas acuaticas",
    status: "En Peligro de Extincion",
    statusColor: "bg-red-100 text-red-800",
    funFact: "Es un gran dispersor de semillas en los bosques tropicales.",
    category: "Mamifero"
  },
  {
    name: "Mono Arana",
    scientificName: "Ateles geoffroyi",
    image:
      "https://images.unsplash.com/photo-1586492633743-d4477f713f3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGlkZXIlMjBtb25rZXklMjBwcmltYXRlfGVufDF8fHx8MTc3NDU4NTM4MHww&ixlib=rb-4.1.0&q=80&w=1080",
    habitat: "Selvas tropicales del sureste mexicano",
    diet: "Omnivoro: frutas, flores, semillas e insectos",
    status: "En Peligro de Extincion",
    statusColor: "bg-red-100 text-red-800",
    funFact: "Su cola prensil funciona como una quinta mano.",
    category: "Mamifero"
  },
  {
    name: "Guacamaya Roja",
    scientificName: "Ara macao",
    image:
      "https://images.unsplash.com/photo-1561236902-c0a10c2391a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2FybGV0JTIwbWFjYXclMjBwYXJyb3R8ZW58MXx8fHwxNzc0NTg1MzgwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    habitat: "Selvas tropicales humedas",
    diet: "Herbivoro: frutas, nueces, semillas y flores",
    status: "Amenazada",
    statusColor: "bg-yellow-100 text-yellow-800",
    funFact: "Forma parejas de por vida y puede vivir varias decadas.",
    category: "Ave"
  },
  {
    name: "Cocodrilo de Pantano",
    scientificName: "Crocodylus moreletii",
    image:
      "https://images.unsplash.com/photo-1600333489678-6c6a1f0269a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jb2RpbGUlMjByZXB0aWxlfGVufDF8fHx8MTc3NDU4NTM4MXww&ixlib=rb-4.1.0&q=80&w=1080",
    habitat: "Rios, lagos y pantanos",
    diet: "Carnivoro: peces, aves y pequenos mamiferos",
    status: "Protegida Especial",
    statusColor: "bg-orange-100 text-orange-800",
    funFact: "Puede permanecer bajo el agua durante largos periodos.",
    category: "Reptil"
  }
];

export function Animals() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [selectedStatus, setSelectedStatus] = useState<string>("Todos");

  const categories = [
    { value: "Todos", label: t("ui.animalsPage.categories.all") },
    { value: "Mamifero", label: t("ui.animalsPage.categories.mammal") },
    { value: "Ave", label: t("ui.animalsPage.categories.bird") },
    { value: "Reptil", label: t("ui.animalsPage.categories.reptile") }
  ];

  const statuses = [
    { value: "Todos", label: t("ui.animalsPage.statuses.all") },
    { value: "En Peligro de Extincion", label: t("ui.animalsPage.statuses.endangered") },
    { value: "Amenazada", label: t("ui.animalsPage.statuses.threatened") },
    { value: "Protegida Especial", label: t("ui.animalsPage.statuses.specialProtection") }
  ];

  const filteredAnimals = allAnimals.filter((animal) => {
    const matchesSearch =
      animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.scientificName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || animal.category === selectedCategory;
    const matchesStatus = selectedStatus === "Todos" || animal.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-white border-b border-gray-100 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 tracking-tight">{t("ui.animalsPage.title")}</h1>
          <p className="text-lg text-gray-500 max-w-2xl">{t("ui.animalsPage.subtitle")}</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 md:p-8">
          <div className="mb-8">
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={t("ui.animalsPage.searchPlaceholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <div className="flex-1">
              <label className="flex items-center text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
                <Filter className="w-4 h-4 mr-2" />
                {t("ui.animalsPage.categoryLabel")}
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category.value
                        ? "bg-gray-900 text-white"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1">
              <label className="flex items-center text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
                <Filter className="w-4 h-4 mr-2" />
                {t("ui.animalsPage.statusLabel")}
              </label>
              <div className="flex flex-wrap gap-2">
                {statuses.map((status) => (
                  <button
                    key={status.value}
                    onClick={() => setSelectedStatus(status.value)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedStatus === status.value
                        ? "bg-gray-900 text-white"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {status.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between text-sm text-gray-500">
          <p>
            {t("ui.animalsPage.showing")} <span className="font-medium text-gray-900">{filteredAnimals.length}</span> {t("ui.animalsPage.results")}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-24">
        {filteredAnimals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAnimals.map((animal, index) => (
              <AnimalCard key={index} {...animal} />
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-gray-300 rounded-2xl p-16 text-center">
            <p className="text-gray-500 mb-6">{t("ui.animalsPage.noResults")}</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("Todos");
                setSelectedStatus("Todos");
              }}
              className="bg-gray-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              {t("ui.animalsPage.clearFilters")}
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
