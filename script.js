// Prototipo de fichas de Rummikub
const colores = ['azul', 'rojo', 'negro', 'naranja'];
const mesa = document.getElementById('mesa');

// Crear 12 fichas de ejemplo
let fichas = [];
for (let i = 0; i < 12; i++) {
    const color = colores[i % colores.length];
    const numero = (i % 13) + 1;
    fichas.push({ numero, color, id: i });
}

// Renderizar fichas en la mesa
function renderFichas() {
    mesa.innerHTML = '';
    fichas.forEach(ficha => {
        const div = document.createElement('div');
        div.className = `ficha ${ficha.color}`;
        div.textContent = ficha.numero;
        div.draggable = true;
        div.dataset.id = ficha.id;
        // Eventos drag and drop
        div.addEventListener('dragstart', dragStart);
        div.addEventListener('dragend', dragEnd);
        mesa.appendChild(div);
    });
}

let dragSrcId = null;

function dragStart(e) {
    dragSrcId = this.dataset.id;
    this.classList.add('dragging');
}

function dragEnd(e) {
    this.classList.remove('dragging');
    dragSrcId = null;
}

mesa.addEventListener('dragover', function(e) {
    e.preventDefault();
    const dragging = document.querySelector('.ficha.dragging');
    const afterElement = getDragAfterElement(mesa, e.clientX);
    if (afterElement == null) {
        mesa.appendChild(dragging);
    } else {
        mesa.insertBefore(dragging, afterElement);
    }
});

function getDragAfterElement(container, x) {
    const draggables = [...container.querySelectorAll('.ficha:not(.dragging)')];
    return draggables.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = x - box.left - box.width / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: -Infinity }).element;
}

renderFichas();