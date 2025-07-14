export default function Loader({ children }) {
  return (
    <div className=" w-full h-[70svh] flex flex-col items-center justify-center gap-[1.5rem] ">
      <div className="w-[50px] h-[50px] border-[0.5rem] border-t-purple border-e-purple rounded-full animate-spin md:w-[70px] md:h-[70px] "></div>

      <p className=" font-[400] text-[18px] capitalize">{children}</p>
    </div>
  );
}
