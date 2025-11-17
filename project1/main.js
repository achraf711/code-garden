const dataset = {
    title: "Images médicales",
    samples: 5000,
    features: ["resolution", "colorDepth", "labels"],
    source: {
        institution: "AI Research Lab",
        year: 2024
    }
};
console.log("Titre :", dataset.title);
console.log("Nombre d'échantillons :", dataset.samples);
console.log("Institution :", dataset.source.institution);
console.log("Année de création :", dataset.source.year);
