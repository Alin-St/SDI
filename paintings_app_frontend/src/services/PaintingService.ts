export class PaintingService {
  private paintings: Painting[] = [
    {
      id: 1,
      name: "Starry Night",
      description:
        "Starry Night is one of the most well-known paintings by Vincent van Gogh.",
      year: 1889,
    },
    {
      id: 2,
      name: "Mona Lisa",
      description:
        "The Mona Lisa is a half-length portrait painting by the Italian Renaissance artist Leonardo da Vinci.",
      year: 1503,
    },
    {
      id: 3,
      name: "The Persistence of Memory",
      description:
        "The Persistence of Memory is a 1931 painting by artist Salvador Dalí.",
      year: 1931,
    },
    {
      id: 4,
      name: "The Starry Night",
      description:
        "The Starry Night is an oil on canvas by the Dutch post-impressionist painter Vincent van Gogh.",
      year: 1889,
    },
    {
      id: 5,
      name: "Girl with a Pearl Earring",
      description:
        "Girl with a Pearl Earring is an oil painting by Dutch Golden Age painter Johannes Vermeer.",
      year: 1665,
    },
    {
      id: 6,
      name: "The Scream",
      description:
        "The Scream is the popular name given to a composition created by Norwegian Expressionist artist Edvard Munch.",
      year: 1893,
    },
    {
      id: 7,
      name: "The Night Watch",
      description: "The Night Watch is a 1642 painting by Rembrandt van Rijn.",
      year: 1642,
    },
    {
      id: 8,
      name: "Water Lilies",
      description:
        "Water Lilies is a series of approximately 250 oil paintings by French Impressionist Claude Monet.",
      year: 1914,
    },
    {
      id: 9,
      name: "The Birth of Venus",
      description:
        "The Birth of Venus is a painting by the Italian artist Sandro Botticelli, probably made in the mid 1480s.",
      year: 1484,
    },
    {
      id: 10,
      name: "Guernica",
      description:
        "Guernica is a large oil painting on canvas by Spanish artist Pablo Picasso completed in June 1937.",
      year: 1937,
    },
  ];

  getAllPaintings(): Painting[] {
    return this.paintings;
  }

  getPaintingById(id: number): Painting | undefined {
    return this.paintings.find((painting) => painting.id === id);
  }

  addPainting(name: string, description: string, year: number): void {
    // Find the highest id and increment by 1
    const id = Math.max(...this.paintings.map((painting) => painting.id)) + 1;

    const painting: Painting = {
      id,
      name,
      description,
      year,
    };
    this.paintings.push(painting);
  }

  updatePainting(id: number, updatedPainting: Painting): void {
    const index = this.paintings.findIndex((painting) => painting.id === id);
    if (index !== -1) {
      this.paintings[index] = updatedPainting;
    }
  }

  deletePainting(id: number): void {
    this.paintings = this.paintings.filter((painting) => painting.id !== id);
  }
}

export const paintingService = new PaintingService();
