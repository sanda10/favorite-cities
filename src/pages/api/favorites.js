import { initDataSource } from "../../../data-source";
import { Favorite } from "../../../src/entity/Favorite";

export default async function handler(req, res) {
  try {
    const AppDataSource = await initDataSource();

    try {
      const favoriteRepo = AppDataSource.getRepository(Favorite);

      if (req.method === "POST") {
        const { cityName, country } = req.body;

        const existingFavorite = await favoriteRepo.findOneBy({
          cityName,
          country,
        });

        if (existingFavorite) {
          await favoriteRepo.remove(existingFavorite);

          return res
            .status(200)
            .json({ message: "Favorite removed", cityName });
        } else {
          const newFavorite = favoriteRepo.create({ cityName, country });
          await favoriteRepo.save(newFavorite);

          return res
            .status(200)
            .json({ message: "Favorite added", newFavorite });
        }
      }

      if (req.method === "GET") {
        const favorites = await favoriteRepo.find();
        //Math.random() < 0.9;
        return res.status(200).json(Array.isArray(favorites) ? favorites : []);
      }

      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    } catch (error) {
      console.error("Transaction error:", error);
      return res.status(500).json({ error: "Internal ServerError" });
    }
  } catch (error) {
    console.error("Handler error:", error);
    return res.status(500).json({ error: "Internal Server Error " });
  }
}
