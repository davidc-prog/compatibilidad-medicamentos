let db = [];

fetch('database_real_uci.json')
.then(res => res.json())
.then(data => {
    db = data;
    console.log("✅ Base cargada", db.length);
});

function check() {
    const a = document.getElementById("drug1").value.trim().toLowerCase();
    const b = document.getElementById("drug2").value.trim().toLowerCase();

    const resultDiv = document.getElementById("result");

    if (!a || !b) {
        resultDiv.innerHTML = "⚠️ Ingresa ambos medicamentos";
        resultDiv.style.background = "#ffc107";
        return;
    }

    const match = db.find(item =>
        (item.drugA.toLowerCase() === a && item.drugB.toLowerCase() === b) ||
        (item.drugA.toLowerCase() === b && item.drugB.toLowerCase() === a)
    );

    if (!match) {
        resultDiv.innerHTML = "⚠️ Sin evidencia disponible";
        resultDiv.style.background = "#ffc107";
        return;
    }

    // RESULTADO CLÍNICO COMPLETO
    let color = "#ffc107";
    let text = "⚠️ Datos limitados";

    if (match.compatibility === "compatible") {
        color = "#28a745";
        text = "✅ Compatible";
    } else if (match.compatibility === "incompatible") {
        color = "#dc3545";
        text = "❌ Incompatible";
    }

    resultDiv.style.background = color;

    resultDiv.innerHTML = `
        <strong>${text}</strong><br><br>
        💧 Diluyente: ${match.diluent}<br>
        🧪 Condiciones: ${match.conditions}<br>
        📚 Fuente: ${match.evidence}<br>
        📝 Nota: ${match.notes}<br>
        🔬 Confianza: ${match.confidence}
    `;
}

function loadAutocomplete() {
    const datalist = document.getElementById("drugs");

    const drugs = new Set();

    db.forEach(item => {
        drugs.add(item.drugA);
        drugs.add(item.drugB);
    });

    datalist.innerHTML = "";

    drugs.forEach(d => {
        datalist.innerHTML += `<option value="${d}">`;
    });
}

// cargar autocompletado cuando cargue la base
fetch('database_real_uci.json')
.then(res => res.json())
.then(data => {
    db = data;
    loadAutocomplete();
});