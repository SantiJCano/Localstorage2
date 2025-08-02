# Localstorage2
Aplicación web simple para gestionar productos utilizando el almacenamiento local del navegador (localStorage).

## Características

- 🛍️ Crear, leer, actualizar y eliminar productos
- 🔍 Búsqueda en tiempo real
- 💾 Almacenamiento persistente en el navegador
- 📄 Exportación a PDF
- 🖼️ Soporte para imágenes de productos

## Estructura de Datos

Cada producto tiene la siguiente estructura:
```javascript
{
    id: string,           // ID único generado automáticamente
    producto: string,     // Nombre del producto
    precio: number,       // Precio del producto
    descripcion: string,  // Descripción del producto
    imagen: string        // URL de la imagen del producto
}
```

## Funciones Principales

- `obtenerProductos()`: Obtiene todos los productos almacenados
- `guardarProducto(e)`: Guarda un nuevo producto o actualiza uno existente
- `mostrarProductos(filtrados)`: Muestra los productos en la tabla
- `eliminarProducto(id)`: Elimina un producto por su ID
- `editarProducto(id)`: Carga los datos de un producto para editar
- `buscarProductos(e)`: Filtra productos según el texto de búsqueda
- `exportarPDF()`: Genera un PDF con el listado de productos

## Uso

1. Completa el formulario con los datos del producto
2. Haz clic en "Guardar" para agregar un nuevo producto
3. Usa los botones Editar/Eliminar para gestionar los productos
4. Utiliza el campo de búsqueda para filtrar productos
5. Exporta el listado a PDF con el botón correspondiente

## Requisitos

- Navegador web moderno con soporte para:
  - localStorage
  - ES6+
  - jsPDF (para la exportación a PDF)

## Notas

- Los datos se guardan localmente en el navegador del usuario
- Al limpar los datos del navegador, se perderá la información almacenada
- Se recomienda implementar una copia de seguridad periódica de los datos
