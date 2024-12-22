export default function ProcessBar() {
  return (
    <>
      <div className="relative mt-3 mx-auto w-[200px] h-[16px] rounded-full bg-buttonGrey">
        <div
          className={`rounded-xl absolute  top-[3px] bottom-[3px] left-1 right-20 transition-all duration-600 bg-warnaUtama`}
        ></div>
      </div>
    </>
  );
}
