import { get, set } from "idb-keyval";
import type { Picture } from "../types/picture";

const apiUrl = import.meta.env.VITE_API_URL;

export const loadPictures = async (): Promise<Picture[]> => {
  try {
    const res = await fetch(`${apiUrl}/api/pictures`);
    if (!res.ok) throw new Error("Failed to fetch pictures");
    const data: Picture[] = await res.json();
    await set("pictures", data);
    return data;
  } catch (err) {
    console.error("Error loading pictures", err);
    const savedPictures = await get<Picture[]>("pictures");
    return savedPictures || [];
  }
};

export const addPicture = async (newPicture: Picture): Promise<Picture | null> => {
  try {
    const res = await fetch(`${apiUrl}/api/pictures`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPicture)
    });
    if (!res.ok) throw new Error("Failed to add picture");
    const savedPicture: Picture = await res.json();

    const current = await get<Picture[]>("pictures") || [];
    await set("pictures", [savedPicture, ...current]);

    return savedPicture;
  } catch (err) {
    console.error("Error adding picture", err);
    return null;
  }
};

export const deletePicture = async (id: string): Promise<boolean> => {
  try {
    const res = await fetch(`${apiUrl}/api/pictures/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete picture");

    const current = await get<Picture[]>("pictures") || [];
    const updated = current.filter(pic => pic.id !== id);
    await set("pictures", updated);

    return true;
  } catch (err) {
    console.error("Delete error", err);
    return false;
  }
};