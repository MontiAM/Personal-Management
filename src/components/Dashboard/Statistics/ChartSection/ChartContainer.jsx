const ChartContainer = ({ title, description, children }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full h-full">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        {description && <p className="text-gray-600">{description}</p>}
      </div>
      <div className="h-64 lg:h-[calc(100vh-35rem)]">
        {children}
      </div>
    </div>
  );
};

export default ChartContainer;
