# Guía de Responsive Design - Aplicación QR Zoo

## Principios Implementados

### 1. Mobile-First Approach
- Diseño primero para móvil (pantalla pequeña)
- Luego escalar para tablets y desktop
- Usar clases Tailwind sin prefijo para móvil, con prefijo para pantallas mayores

### 2. Breakpoints Utilizados (Tailwind CSS)
```
sm:  640px   (teléfonos grandes)
md:  768px   (tablets)
lg:  1024px  (laptops)
xl:  1280px  (monitores)
2xl: 1536px  (monitores grandes)
```

### 3. Estructura de Componentes Responsive

#### Layouts Flexibles
```tsx
// Móvil: 1 columna
// Tablet/Desktop: 2+ columnas
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

#### Tipografía Escalable
```tsx
// Móvil: más pequeño
// Desktop: más grande
<h1 className="text-2xl md:text-3xl lg:text-4xl">
<p className="text-sm md:text-base lg:text-lg">
```

#### Espaciado Adaptativo
```tsx
// Móvil: espacios menores
// Desktop: espacios mayores
<div className="px-4 md:px-8 lg:px-12 py-6 md:py-12 lg:py-24">
```

### 4. Patrones Comunes

#### Menú Responsivo
- Móvil: Menú hamburguesa
- Desktop: Menú horizontal
```tsx
<nav className="hidden md:flex">...</nav>  {/* Desktop */}
<button className="md:hidden">...</button>   {/* Móvil */}
```

#### Grillas de Tarjetas
```tsx
{/* Móvil: 1 columna, Tablet: 2, Desktop: 3+ */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
```

#### Imágenes Responsivas
```tsx
<img 
  src={image}
  alt={alt}
  className="w-full h-auto object-cover"  /* Ancho 100% adaptativo */
/>
```

#### Modales/Overlays
```tsx
{/* Móvil: pantalla completa, Desktop: centrado */}
<div className="fixed inset-0 md:inset-auto md:max-w-4xl md:rounded-lg">
```

## Checklist de Implementación

### Componentes Refactorizados ✓
- [x] Navigation - Menú responsivo con hamburguesa
- [x] AnimalCard - Ficha adaptativa de animal
- [x] Animals page - Grilla de tarjetas responsiva
- [x] RootLayout - Estructura flexible
- [x] Footer - Contenido adaptativo

### Características Implementadas ✓
- [x] Mobile-first design
- [x] Flexbox y Grid layouts
- [x] Responsive tipografía
- [x] Adaptive spacing
- [x] Touch-friendly buttons (h-12 en móvil)
- [x] Proper viewport meta tag
- [x] Max-width containers
- [x] Hidden/visible elements por breakpoint

## Mejores Prácticas Aplicadas

### 1. Siempre usar medidas relativas
```tsx
// ❌ Evitar píxeles fijos
<div className="w-500">

// ✅ Usar porcentajes/unidades relativas
<div className="w-full max-w-4xl">
```

### 2. Contenedores con límite de ancho
```tsx
// Nunca dejar contenido a todo ancho
<div className="max-w-7xl mx-auto px-4">
```

### 3. Imágenes siempre responsive
```tsx
// ✅ Correcto
<img className="w-full h-auto object-cover" src={src} />

// ❌ Evitar alturas fijas
<img className="w-96 h-96" src={src} />
```

### 4. Tipografía escalable
```tsx
// Siempre tener variantes para cada breakpoint
<h1 className="text-xl md:text-2xl lg:text-4xl">
```

### 5. Espacios adaptativos
```tsx
// Móvil compacto, Desktop generoso
<div className="py-4 md:py-8 lg:py-16">
```

### 6. Elementos táctiles en móvil
```tsx
// Botones > 48px en móvil para fácil toque
<button className="h-12 md:h-10 px-4">
```

## Testing Responsive

Abrir DevTools (F12) → Toggle Device Toolbar
- Testear en: 375px (móvil), 768px (tablet), 1024px+ (desktop)
- Verificar: Texto legible, botones tocables, sin overflow

## Recursos Tailwind Responsive
- https://tailwindcss.com/docs/responsive-design
- https://tailwindcss.com/docs/breakpoints
- https://tailwindcss.com/docs/flex
- https://tailwindcss.com/docs/grid
