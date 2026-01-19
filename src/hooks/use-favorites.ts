"use client";

import { useState, useEffect, useCallback } from "react";

const FAVORITES_KEY = "rahman-estates-favorites";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(FAVORITES_KEY);
      if (item) {
        setFavorites(JSON.parse(item));
      }
    } catch (error) {
      console.error("Failed to load favorites from localStorage", error);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      try {
        window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      } catch (error) {
        console.error("Failed to save favorites to localStorage", error);
      }
    }
  }, [favorites, isInitialized]);

  const toggleFavorite = useCallback((propertyId: string) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(propertyId)) {
        return prevFavorites.filter((id) => id !== propertyId);
      } else {
        return [...prevFavorites, propertyId];
      }
    });
  }, []);

  return { favorites, toggleFavorite, isInitialized };
};
