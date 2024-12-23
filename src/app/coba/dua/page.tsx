"use client";
import { useState } from "react";

interface VariationItem {
  id: number;
  name: string;
  image_url: string;
}

interface Variation {
  id: number;
  name: string;
  show_image: number;
  variation_item: VariationItem[];
}

const variations: Variation[] = [
  {
    id: 167,
    name: "Ukuran",
    show_image: 1,
    variation_item: [
      { id: 900, name: "XL", image_url: "image_product_variation/XL.jpg" },
      { id: 901, name: "M", image_url: "image_product_variation/M.jpg" },
      { id: 902, name: "S", image_url: "image_product_variation/S.jpg" },
    ],
  },
  {
    id: 168,
    name: "Mesin",
    show_image: 1,
    variation_item: [
      {
        id: 893,
        name: "Type A",
        image_url: "image_product_variation/typeA.jpg",
      },
      {
        id: 892,
        name: "Type B",
        image_url: "image_product_variation/typeB.jpg",
      },
    ],
  },
];

interface SelectedVariation {
  category: string;
  item: VariationItem;
}

export default function VariationSelector() {
  const [selectedVariations, setSelectedVariations] = useState<
    SelectedVariation[]
  >([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Variation | null>(
    null
  );

  const openModal = (category: Variation) => {
    setSelectedCategory(category);
    setIsOpen(true);
  };

  const handleSelect = (item: VariationItem, category: Variation) => {
    const exists = selectedVariations.some((sv) => sv.item.id === item.id);
    if (!exists) {
      setSelectedVariations((prev) => [
        ...prev,
        { category: category.name, item },
      ]);
    }
    setIsOpen(false);
  };

  const removeSelection = (id: number) => {
    setSelectedVariations((prev) => prev.filter((sv) => sv.item.id !== id));
  };

  const getSelectedItemIds = () => {
    const ids = selectedVariations.map((sv) => sv.item.id);
    console.log("Selected Item IDs:", ids);
    return ids;
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pilih Variasi Item</h1>
      <div className="space-y-4">
        {selectedVariations.map((variation, index) => (
          <div
            key={index}
            className="border p-3 rounded flex justify-between items-center"
          >
            <div className="flex items-center">
              {variation.item.image_url && (
                <img
                  src={variation.item.image_url}
                  alt={variation.item.name}
                  className="w-10 h-10 mr-3"
                />
              )}
              <div>
                <p className="font-medium">{variation.item.name}</p>
                <p className="text-sm text-gray-500">{variation.category}</p>
              </div>
            </div>
            <button
              onClick={() => removeSelection(variation.item.id)}
              className="text-red-500"
            >
              Hapus
            </button>
          </div>
        ))}
        {variations.map((variation) => (
          <button
            key={variation.id}
            className="w-full border border-gray-300 rounded py-2 flex justify-center items-center"
            onClick={() => openModal(variation)}
          >
            + Tambah {variation.name}
          </button>
        ))}
        <button
          className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
          onClick={getSelectedItemIds}
        >
          Dapatkan ID Item Terpilih
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md">
            <h2 className="text-lg font-semibold mb-4">
              Pilih {selectedCategory?.name}
            </h2>
            <div className="space-y-2">
              {selectedCategory?.variation_item.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item, selectedCategory)}
                  className="border p-3 rounded hover:bg-gray-100 cursor-pointer flex items-center"
                >
                  {selectedCategory.show_image ? (
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-10 h-10 mr-3"
                    />
                  ) : null}
                  {item.name}
                </div>
              ))}
            </div>
            <button
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded"
              onClick={() => setIsOpen(false)}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
