function loadLearningMaterials() {
    protectRoute(["student", "supervisor", "admin"]);

    const materials = JSON.parse(localStorage.getItem("materials") || "[]");
    const list = document.getElementById("materials-list");
    list.innerHTML = "";

    materials.forEach((m, index) => {
        const li = document.createElement("li");

        // Create title + time
        li.innerHTML = `<strong>${m.title}</strong> <small>${m.time}</small>`;

        // Create download link
        const a = document.createElement("a");
        a.href = m.fileData;        // stored as base64
        a.download = m.title + ".pdf";
        a.innerText = " Download";

        li.appendChild(a);
        list.appendChild(li);
    });
}

function uploadMaterial() {
    const title = document.getElementById("material-title").value;
    const fileInput = document.getElementById("material-file");
    const file = fileInput.files[0];

    if (!title || !file) {
        return alert("Please provide a title and select a PDF file");
    }

    if (file.type !== "application/pdf") {
        return alert("Only PDF files are allowed");
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        let materials = JSON.parse(localStorage.getItem("materials") || "[]");
        materials.push({
            title: title,
            fileData: e.target.result,  // base64 PDF
            time: new Date().toLocaleString(),
        });

        localStorage.setItem("materials", JSON.stringify(materials));

        addActivity(`Uploaded learning material: ${title}`);

        // Reset form
        document.getElementById("material-title").value = "";
        fileInput.value = "";

        loadLearningMaterials();
    };
    reader.readAsDataURL(file);
}
