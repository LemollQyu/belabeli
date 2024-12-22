const LayoutUtama = ({ children }: any) => {
  return (
    <>
      <div className="w-full h-screen relative mx-auto border border-white sm:w-[400px]">
        {children}
      </div>
    </>
  );
};

export default LayoutUtama;
