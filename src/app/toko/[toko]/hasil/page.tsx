"use client";
import ProductCard from "@/app/components/pencarian/product-card";
import CategoryHorizontal from "@/app/components/pencarian/category-h-bar";
import SearchbarToko from "@/app/components/toko/searchbar-toko";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import searchEtalase from "@/api/toko/getSearchEtalase";
import Loading from "@/app/components/loading";

// Tipe untuk variant produk
type VariantProduct = {
  id: number;
  name: string;
  price: number;
  discount: string;
  stock: number;
  created_at: string;
  updated_at: string;
};

// Tipe untuk merchant
type Merchant = {
  address: String;
  banner: String;
  city: String;
  country: String;
  created_at: String;
  description: String;
  id: Number;
  latitude: String;
  logo: String;
  longitude: String;
  name: String;
  postal_code: String;
  province: String;
  slug: String;
  subdistrict: String;
  updated_at: String;
  users_id: String;
  uuid: String;
  village: string;
};

// Tipe untuk rating produk
type RatingProduct = {
  id: number;
  products_id: number;
  rating: string; // menggunakan string karena nilai dalam data berupa string
  created_at: string;
  updated_at: string;
};

// Tipe untuk gambar produk
type ImageProduct = {
  id: number;
  url: string;
  alt_text: string;
};

// Tipe utama untuk data produk
type ProductData = {
  all_variant_product: VariantProduct[];
  brand: string;
  created_at: string;
  description: string;
  discount: string;
  first_price_after_discount: string;
  first_price_sell: number;
  free_shiper: number;
  id: number;
  image_product: ImageProduct[];
  material: string;
  merchant: Merchant;
  merchants_id: number;
  name: string;
  rating_product: RatingProduct;
  second_price_after_discount: string;
  second_price_sell: number;
  slug: string;
  sold_quantity: number;
  spesification_product: string | null;
  updated_at: string;
  users_id: string;
};

const HasilPencarianToko = () => {
  const [dataYangDicari, setDataYangDicari] = useState<any>({});
  const [dataPencarian, setDataPencarian] = useState<any>({});
  const [dataDitemukan, setDataDitemukan] = useState<ProductData | null>(null);

  const params = useParams(); // Mengambil parameter dari URL
  const toko = params.toko;

  const searchParams = useSearchParams();
  const queryValue = searchParams.get("q"); // Mendapatkan nilai 'q' dari query string

  console.log("Nilai dari q:", queryValue);

  useEffect(() => {
    async function fetchData() {
      const response = await searchEtalase({ merchantSlug: toko });

      setDataPencarian(response?.data?.data);
    }

    fetchData();
  }, []);

  console.log("data awal pencarian = ", dataPencarian);
  useEffect(() => {
    let ditemukan = null; // Variabel sementara untuk menyimpan data yang ditemukan
    for (let i: number = 0; i < dataPencarian?.length; i++) {
      if (
        dataPencarian[i].name.trim().toLowerCase() ===
        queryValue?.trim().toLowerCase()
      ) {
        ditemukan = dataPencarian[i]; // Simpan data yang cocok
        break; // Keluar dari loop setelah data ditemukan
      }
    }

    if (ditemukan) {
      setDataDitemukan(ditemukan); // Atur state hanya sekali
    } else {
      setDataDitemukan(null); // Reset jika tidak ditemukan
    }
  }, [dataPencarian, queryValue]); // Jalankan ulang jika salah satu berubah

  console.log(
    "Data ditemukan = ",
    dataDitemukan,
    "yang bertipe = ",
    typeof dataDitemukan
  );

  const kategori = [
    "Pria",
    "Wanita",
    "Elektronik",
    "Fashion",
    "Harian",
    "Mainan",
    "Olahraga",
    "Hewan",
    "Obat",
  ];
  return (
    <>
      {dataPencarian?.map?.((product: any, index: number) => {
        console.log(product.name);
        return <></>;
      })}
      <SearchbarToko />
      <div className="flex flex-wrap">
        <div className="px-4 font-nunito absolute top-20 items-center w-[400px] left-1/2 -translate-x-1/2">
          {/* {dataDitemukan.map} */}
          {dataDitemukan != null ? (
            <div className="product-grid grid grid-cols-2 gap-y-8 gap-x-8 py-4 mx-auto justify-items-center">
              <ProductCard
                nameProduct={dataDitemukan?.name}
                linkImage="/image/produk/sepatu.jpg"
                priceAsli={dataDitemukan?.first_price_sell}
                discountPrice={dataDitemukan?.first_price_after_discount}
                star={dataDitemukan?.rating_product.rating}
                sold={dataDitemukan?.sold_quantity}
                discount={dataDitemukan?.discount}
                lokasi={`${dataDitemukan?.merchant.city} ${dataDitemukan?.merchant.province}`}
                linkHref={`/product/${dataDitemukan?.slug}`}
                vertical={false}
              ></ProductCard>
            </div>
          ) : (
            <div className="w-full h-48 flex justify-center items-center border">
              <Loading />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HasilPencarianToko;
