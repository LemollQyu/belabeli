"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const NavBar = ({ children }: any) => {
  const pathname = usePathname();

  console.log(pathname);

  const [active, setActive] = useState("hidden");
  const [moveCss, setMoveCss] = useState("");
  const [noActive, setNoActive] = useState("");
  const [isClient, setClient] = useState<boolean>(false);

  const clickEffect = (e: any) => {
    e.preventDefault();

    const home = "left-[16px]";
    const feed = "left-[106px]";
    const shop = "left-[196px]";
    const profile = "left-[286px]";

    // console.log(e);
    if (e.target.id == "1") {
      setMoveCss(home);
      setActive("block");
      setNoActive(e.target.id);
    } else if (e.target.id == "2") {
      setMoveCss(feed);
      setActive("block");
      setNoActive(e.target.id);
    } else if (e.target.id == "3") {
      setMoveCss(shop);
      setActive("block");
      setNoActive(e.target.id);
    } else if (e.target.id == "4") {
      setMoveCss(profile);
      setActive("block");
      setNoActive(e.target.id);
    }
  };

  useEffect(() => {
    setClient(true);
  }, []);

  const onOf = `mx-auto border z-50 relative  max-w-[400px]  ${
    pathname === "/authentikasi" ||
    pathname === "/authentikasi/login" ||
    pathname === "/authentikasi/registrasi" ||
    pathname == "/authentikasi/lupa-sandi" ||
    pathname == "/authentikasi/sandi-baru" ||
    pathname == "/authentikasi/lupa-sandi/kode-otp" ||
    pathname == "/callback-google" ||
    pathname == "/coba"
      ? "hidden"
      : ""
  }`;

  const activeCss = `transition-all duration-1000 absolute bottom-2 ${moveCss} ${active}  -z-20`;

  const cssBlob =
    "w-[34px] h-[34px] border rounded-full flex justify-center items-center -z-10 ";

  return (
    <>
      {isClient && (
        <div className={onOf}>
          {children}

          <div
            className="w-[400px] border bg-white h-[44px] justify-center  fixed bg -translate-x-1/2  left-1/2 bottom-0 flex"
            onClick={clickEffect}
          >
            {/* Svg eclipse terbaru */}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="56"
              height="64"
              viewBox="0 0 56 64"
              fill="none"
              className={activeCss}
            >
              <path
                d="M56 32C37 32 45.2894 64 28.5478 64C11.8061 64 19 32 0 32C0 14.3269 11.8061 0 28.5478 0C45.2894 0 56 14.3269 56 32Z"
                fill="#51D7B1"
              />
            </svg>

            {/* penutup svg eclipse terbaru  */}
            {/* <svg
              width="90"
              height="78"
              viewBox="0 0 84 84"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={activeCss}
            >
              <path
                d="M84 42C58 42 67.9341 84 42.8216 84C17.7091 84 24 42 0 42C0 27 17.7091 5 42.8216 5C64 5 84 27 84 42Z"
                fill="#51D7B1"
              />
            </svg> */}

            <Link
              href="/"
              className="w-[90px] flex items-center justify-center h-full "
              id="1"
            >
              <div
                className={`${cssBlob}  ${
                  noActive === "1"
                    ? "transition-all delay-100 duration-1000 mb-14 bg-white"
                    : "transition-all duration-1000"
                }`}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.48907C3 9.18048 3.14247 8.88917 3.38606 8.69972L11.3861 2.47749C11.7472 2.19663 12.2528 2.19663 12.6139 2.47749L20.6139 8.69972C20.8575 8.88917 21 9.18048 21 9.48907V20ZM19 19V9.97815L12 4.53371L5 9.97815V19H19Z"
                    className={`${
                      noActive === "1"
                        ? "transition-all delay-100 duration-1000 fill-[#51D7B1]"
                        : "transition-all duration-1000 fill-[#000]"
                    }`}
                  />
                </svg>
              </div>
            </Link>
            <Link
              href="/feed"
              className="w-[90px]  flex items-center justify-center h-full "
              id="2"
            >
              <div
                className={`${cssBlob}  ${
                  noActive === "2"
                    ? "transition-all delay-100 duration-1000 w-[28px] w-[28px] mb-14 bg-white"
                    : "transition-all duration-1000 "
                }`}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.4142 5.00004H21.0082C21.556 5.00004 22 5.44467 22 6.00091V19.9992C22 20.552 21.5447 21.0001 21.0082 21.0001H2.9918C2.44405 21.0001 2 20.5554 2 19.9992V6.00091C2 5.44814 2.45531 5.00004 2.9918 5.00004H8.58579L6.05025 2.46451L7.46447 1.05029L11.4142 5.00004H12.5858L16.5355 1.05029L17.9497 2.46451L15.4142 5.00004ZM4 7.00004V19.0001H20V7.00004H4Z"
                    className={`${
                      noActive === "2"
                        ? "transition-all delay-100 duration-1000 fill-[#51D7B1]"
                        : "transition-all duration-1000 fill-[#000]"
                    }`}
                  />
                  <path
                    d="M10 15.7318V10.2679C10 10.0061 10.288 9.84652 10.51 9.98528L14.8811 12.7172C15.09 12.8477 15.09 13.152 14.8811 13.2825L10.51 16.0144C10.288 16.1532 10 15.9936 10 15.7318Z"
                    className={`${
                      noActive === "2"
                        ? "transition-all delay-100 duration-1000 fill-[#51D7B1]"
                        : "transition-all duration-1000 fill-[#000]"
                    }`}
                  />
                </svg>
              </div>
            </Link>
            <Link
              href="/cart"
              className="w-[90px]  flex items-center justify-center h-full  "
              id="3"
            >
              <div
                className={`${cssBlob}  ${
                  noActive === "3"
                    ? "transition-all delay-100 duration-1000 mb-14 bg-white"
                    : "transition-all duration-1000 "
                }`}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.00436 5.41686L0.761719 2.17422L2.17593 0.76001L5.41857 4.00265H20.6603C21.2126 4.00265 21.6603 4.45037 21.6603 5.00265C21.6603 5.09997 21.6461 5.19678 21.6182 5.29L19.2182 13.29C19.0913 13.713 18.7019 14.0027 18.2603 14.0027H6.00436V16.0027H17.0044V18.0027H5.00436C4.45207 18.0027 4.00436 17.5549 4.00436 17.0027V5.41686ZM6.00436 6.00265V12.0027H17.5163L19.3163 6.00265H6.00436ZM5.50436 22.0027C4.67593 22.0027 4.00436 21.3311 4.00436 20.5027C4.00436 19.6742 4.67593 19.0027 5.50436 19.0027C6.33279 19.0027 7.00436 19.6742 7.00436 20.5027C7.00436 21.3311 6.33279 22.0027 5.50436 22.0027ZM17.5044 22.0027C16.6759 22.0027 16.0044 21.3311 16.0044 20.5027C16.0044 19.6742 16.6759 19.0027 17.5044 19.0027C18.3328 19.0027 19.0044 19.6742 19.0044 20.5027C19.0044 21.3311 18.3328 22.0027 17.5044 22.0027Z"
                    className={`${
                      noActive === "3"
                        ? "transition-all delay-100 duration-1000 fill-[#51D7B1]"
                        : "transition-all duration-1000 fill-[#000]"
                    }`}
                  />
                </svg>
              </div>
            </Link>
            <Link
              href="/user-settings"
              className="w-[90px]  flex items-center justify-center h-full  "
              id="4"
            >
              <div
                className={`${cssBlob}  ${
                  noActive === "4"
                    ? "transition-all delay-100 duration-1000 mb-14 bg-white"
                    : "transition-all duration-1000 "
                }`}
              >
                <svg
                  width="16"
                  height="21"
                  viewBox="0 0 16 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 21H14V19C14 17.3431 12.6569 16 11 16H5C3.34315 16 2 17.3431 2 19V21H0V19C0 16.2386 2.23858 14 5 14H11C13.7614 14 16 16.2386 16 19V21ZM8 12C4.68629 12 2 9.3137 2 6C2 2.68629 4.68629 0 8 0C11.3137 0 14 2.68629 14 6C14 9.3137 11.3137 12 8 12ZM8 10C10.2091 10 12 8.20914 12 6C12 3.79086 10.2091 2 8 2C5.79086 2 4 3.79086 4 6C4 8.20914 5.79086 10 8 10Z"
                    className={`${
                      noActive === "4"
                        ? "transition-all delay-100 duration-1000 fill-[#51D7B1]"
                        : "transition-all duration-1000 fill-[#000]"
                    }`}
                  />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
