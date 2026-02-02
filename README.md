# AutoElite - Sistema de Gestión de Concesionaria

Sistema completo para gestión de concesionaria de vehículos con panel administrativo y sitio público.

## Características Principales

### Funcionalidades
- **Catálogo Público**: Navegación y búsqueda de vehículos disponibles
- **Panel Administrativo**: Gestión completa de persona, autos y reservas (CRUD)
- **Sistema de Reservas**: Seguimiento de reservas con múltiples estados
- **Búsqueda y Filtros**: Filtrado avanzado por marca, combustible, transmisión, etc.

### Características de Accesibilidad (4 implementadas)

1. **Navegación por Teclado**: 
   - Todos los elementos interactivos son accesibles mediante tabulación
   - Focus visible con `focus:ring-2` en todos los controles
   - Skip link para saltar al contenido principal

2. **ARIA Labels y Roles**:
   - Navegación semántica con roles apropiados (`navigation`, `main`, `contentinfo`)
   - Labels descriptivos en todos los formularios
   - Live regions para feedback dinámico (`aria-live="polite"`)

3. **Textos Alternativos**:
   - Todas las imágenes con `alt` descriptivo
   - Iconos decorativos marcados con `aria-hidden="true"`
   - Textos de solo lectura de pantalla con clase `sr-only`

4. **Alto Contraste y Legibilidad**:
   - Paleta de colores con ratios de contraste WCAG AA
   - Tamaños de fuente legibles (min 14px)
   - Espaciado generoso con `leading-relaxed`

### Características de Usabilidad (4 implementadas)

1. **Feedback Visual Inmediato**:
   - Toasts para confirmación de acciones
   - Estados de hover en todos los elementos interactivos
   - Badges de estado con colores semánticos

2. **Validación de Formularios**:
   - Validación en tiempo real con HTML5
   - Mensajes de error claros y descriptivos
   - Campos marcados como requeridos con asterisco

3. **Búsqueda y Filtrado en Tiempo Real**:
   - Búsqueda instantánea sin recargas de página
   - Múltiples filtros combinables
   - Contador de resultados visible

4. **Diseño Responsive**:
   - Mobile-first approach
   - Menú hamburguesa en móviles
   - Tablas y formularios adaptables
   - Grid responsive con breakpoints apropiados

## Estructura Técnica

### Tipos TypeScript (Entidades JPA)
- `Persona`: Información completa de personas
- `Auto`: Detalles de vehículos con características
- `Reserva`: Sistema de reservas con relaciones

### API Mock
Las funciones en `lib/api.ts` simulan llamadas a un backend Spring Boot:
- Funciones async con delay simulado
- CRUD completo para todas las entidades


## Paleta de Colores

- **Primary**: Azul marino profesional (#1e3a8a)
- **Accent**: Azul cielo para CTAs (#3b82f6)
- **Neutrals**: Escala de grises para texto y fondos
- **Success**: Verde para estados positivos
- **Destructive**: Rojo para alertas y eliminaciones

## Tecnologías

- **Frontend**: Next.js 16, React 19.2, TypeScript
- **Estilos**: Tailwind CSS v4, shadcn/ui
- **Estado**: React Hooks, SWR-ready
- **Backend (preparado)**: Spring Boot + Maven + PostgreSQL


## Rutas Principales

- `/` - Página de inicio
- `/catalogo` - Catálogo de vehículos
- `/contacto` - Formulario de contacto
- `/sobre-nosotros` - Información de la empresa
- `/admin` - Dashboard administrativo
- `/admin/personas` - Gestión de personas
- `/admin/autos` - Gestión de autos
- `/admin/reservas` - Gestión de reservas

