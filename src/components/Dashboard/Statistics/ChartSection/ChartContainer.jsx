const ChartContainer = ({ title, description, children }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="mb-4 text-center">
        <h2 className="text-lg sm:text-xl font-bold text-white">{title}</h2>
        {description && <p className="text-white">{description}</p>}
      </div>
      <div className="h-64 lg:h-[calc(100vh-20rem)] w-full flex justify-center items-center">
        {children}
      </div>
    </div>
  );
};

export default ChartContainer;
