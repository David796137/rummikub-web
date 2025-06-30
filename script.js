const colores = ['azul', 'rojo', 'negro', 'naranja'];
const mesa = document.getElementById('mesa');
const repartirBtn = document.getElementById('repartirBtn');

let fichas = [];

function obtenerFichasAleatorias(cantidad) {
    let mazo = [];
    let id = 0;
    for (let rep = 0; rep < 2; rep++) {
        for (let color of colores) {
            for (let numero = 1; numero <= 13; numero++) {
                mazo.push({ numero, color, id: id++ });
            }
        }
    }
    // Barajar
    for (let i = mazo.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [mazo[i], mazo[j]] = [mazo[j], mazo[i]];
    }
    return mazo.slice(0, cantidad);
}

function renderFichas() {
    mesa.innerHTML = '';
    fichas.forEach(ficha => {
        const div = document.createElement('div');
        div.className = `ficha ${ficha.color}`;
        div.textContent = ficha.numero;
        div.draggable = true;
        div.dataset.id = ficha.id;
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

repartirBtn.addEventListener('click', () => {
    fichas = obtenerFichasAleatorias(14);
    renderFichas();
});

fichas = obtenerFichasAleatorias(14);
renderFichas();