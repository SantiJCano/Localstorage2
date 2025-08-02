document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos();

    document.getElementById('productForm').addEventListener('submit', guardarProducto);
    document.getElementById('search').addEventListener('input', buscarProductos);
});

function obtenerProductos() {
    return JSON.parse(localStorage.getItem('productos')) || [];
}

function guardarProducto(e) {
    e.preventDefault();
    const producto = document.getElementById('producto').value.trim();
    const precio = document.getElementById('precio').value;
    const descripcion = document.getElementById('descripcion').value.trim();
    const imagen = document.getElementById('imagen').value.trim();
    const id = document.getElementById('productId').value;

    if (!producto || !precio || !descripcion || !imagen) return;

    let productos = obtenerProductos();

    if (id) {
        const index = productos.findIndex(p => p.id === id);
        productos[index] = { id, producto, precio, descripcion, imagen };
    } else {
        productos.push({
            id: crypto.randomUUID(),
            producto,
            precio,
            descripcion,
            imagen
        });
    }

    localStorage.setItem('productos', JSON.stringify(productos));
    document.getElementById('productForm').reset();
    document.getElementById('productId').value = '';
    mostrarProductos();
}

function mostrarProductos(filtrados = null) {
    const productos = filtrados || obtenerProductos();
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';

    productos.forEach(({ id, producto, precio, descripcion, imagen }) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
    <td><img src="${imagen}" width="60" height="60" style="object-fit:cover"/></td>
    <td>${producto}</td>
    <td>$${precio}</td>
    <td>${descripcion}</td>
    <td>
        <button class="btn btn-warning btn-sm me-1" onclick="editarProducto('${id}')">Editar</button>
        <button class="btn btn-danger btn-sm" onclick="eliminarProducto('${id}')">Eliminar</button>
    </td>
    `;
        tbody.appendChild(fila);
    });
}

function eliminarProducto(id) {
    const productos = obtenerProductos().filter(p => p.id !== id);
    localStorage.setItem('productos', JSON.stringify(productos));
    mostrarProductos();
}

function editarProducto(id) {
    const producto = obtenerProductos().find(p => p.id === id);
    document.getElementById('producto').value = producto.producto;
    document.getElementById('precio').value = producto.precio;
    document.getElementById('descripcion').value = producto.descripcion;
    document.getElementById('imagen').value = producto.imagen;
    document.getElementById('productId').value = producto.id;
}

function buscarProductos(e) {
    const texto = e.target.value.toLowerCase();
    const productos = obtenerProductos().filter(p =>
        p.producto.toLowerCase().includes(texto)
    );
    mostrarProductos(productos);
}

function exportarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let y = 10;

    doc.setFontSize(16);
    doc.text('Listado de Productos', 10, y);
    y += 10;

    const productos = obtenerProductos();
    doc.setFontSize(10);

    productos.forEach(p => {
        doc.text(`Producto: ${p.producto}`, 10, y);
        doc.text(`Precio: $${p.precio}`, 80, y);
        y += 5;
        doc.text(`Descripción: ${p.descripcion}`, 10, y);
        y += 10;

        if (y > 270) {
            doc.addPage();
            y = 10;
        }
    });

    doc.save('productos.pdf');
}
