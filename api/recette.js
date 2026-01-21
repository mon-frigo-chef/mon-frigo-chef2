import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Méthode non autorisée");
  }

  const { ingredients, personnes = 2, contraintes = "" } = req.body;

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  try {
    const response = await client.responses.create({
      model: "gpt-5.2",
      input: `
Tu es Mon Frigo Chef.
Voici les ingrédients disponibles : ${ingredients}
Nombre de personnes : ${personnes}
Contraintes : ${contraintes || "aucune"}

Donne une recette avec :
- Titre
- Ingrédients avec quantités
- Étapes numérotées
- Temps total
`
    });

    res.status(200).json({ recipe: response.output_text });
  } catch (error) {
    res.status(500).json({ error: "Erreur OpenAI" });
  }
}
