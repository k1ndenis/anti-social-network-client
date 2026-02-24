interface TileStyle {
  background: string;
  color?: string;
  fontSize?: string;
}

export const CELLS_STYLES: Record<number, TileStyle> = {
    0: { background: "#ccc0b3"},
    2: { background: "#eee4da", color: "#776e65", fontSize: "55px" },
    4: { background: "#ede0c8", color: "#776e65", fontSize: "55px" },
    8: { background: "#f2b179", color: "#f9f6f2", fontSize: "55px" },
    16: { background: "#f59563", color: "#f9f6f2", fontSize: "55px" },
    32: { background: "#f67c5f", color: "#f9f6f2", fontSize: "55px" },
    64: { background: "#f65e3b", color: "#f9f6f2", fontSize: "55px" },
    128: { background: "#edcf72", color: "#f9f6f2", fontSize: "45px" },
    256: { background: "#edcc61", color: "#f9f6f2", fontSize: "45px" },
    512: { background: "#edc850", color: "#f9f6f2", fontSize: "45px" },
    1024: { background: "#edc53f", color: "#f9f6f2", fontSize: "35px" },
    2048: { background: "#edc22e", color: "#f9f6f2", fontSize: "35px" }
  }